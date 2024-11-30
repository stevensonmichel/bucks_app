import jwt
import json
from datetime import date
from rest_framework_simplejwt.settings import api_settings
from rest_framework.views import APIView
from .plaid_service import plaid_client
from .models import PlaidItem
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.accounts_get_request import AccountsGetRequest
from plaid.model.country_code import CountryCode
from plaid.model.products import Products
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.transactions_get_request import TransactionsGetRequest
from plaid import ApiException
from accounts.models import Account
from budgets.models import Budget
from datetime import datetime


@permission_classes([IsAuthenticated])
class CreateLinkTokenView(APIView):
    permission_classes = [IsAuthenticated]  
    
    def post(self, request):
        request_data = LinkTokenCreateRequest(
            products=[Products("transactions")],
            client_name="Expense Tracker App",
            country_codes=[CountryCode('US')],
            language="en",
            user=LinkTokenCreateRequestUser(client_user_id=str(request.user.id)),
        )
        
        response = plaid_client.link_token_create(request_data)
        return JsonResponse(response.to_dict())


@permission_classes([IsAuthenticated])
class ExchangePublicTokenView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if request.method == "POST":
            
            try:
                user = request.user
                data = json.loads(request.body)
                public_token = data.get('public_token')

                if public_token:
                    exchange_request = ItemPublicTokenExchangeRequest(public_token=public_token)
                    exchange_response = plaid_client.item_public_token_exchange(exchange_request)
                    access_token = exchange_response['access_token']
                    item_id = exchange_response['item_id']
                    accounts_request = AccountsGetRequest(access_token=access_token)
                    accounts_response = plaid_client.accounts_get(accounts_request)
                    accounts = accounts_response['accounts']
                    
                    plaid_item, created = PlaidItem.objects.get_or_create(
                            user=user, 
                            defaults={
                                'access_token': access_token,
                                'item_id': item_id,
                            }
                        )
                    
                    if not created:
                        plaid_item.access_token = access_token
                        plaid_item.item_id = item_id
                        plaid_item.save()
                        
                    for account in accounts:
                        save_bank_information(account, user)
                        
                    transactions_response = get_transactions(request)
                    if "error" in transactions_response:
                        print("Error fetching transactions:", transactions_response["error"])
                    else:
                        transactions = transactions_response.get("transactions", [])
                        print("Here are the transactions baby:", transactions)
                    

                    return JsonResponse({
                        'access_token': access_token,
                        'item_id': item_id
                    })
                
                return JsonResponse({'error': 'No public_token provided'}, status=400)
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid JSON'}, status=400)
        else:
            return JsonResponse({'error': 'Invalid request method'}, status=405)
        

def save_bank_information(data, user):
    plaid_account_id = data['account_id']
    name = data.get('official_name', 'Unnamed Account')
    account_type = data['type']
    subtype = data.get('subtype', '')
    balance = data['balances'].get('current', '')

    account, created = Account.objects.get_or_create(
        user=user,
        plaid_account_id=plaid_account_id,
        defaults={
            'name': name,
            'type': account_type,
            'subtype': subtype,
            'balance': balance,
        }
    )

    if not created:
        account.name = name
        account.type = account_type
        account.subtype = subtype
        account.balance = balance
        account.save()

    return


def get_transaction_count(data):
    """Returns the total number of transactions."""
    return data.get('total_transactions', 0)


def get_transactions(request):
    try:
        plaid_item = PlaidItem.objects.get(user=request.user)
        budget = Budget.objects.filter(user=request.user).first()
        if not budget:
            return JsonResponse({"error": "No budget found for the user"}, status=404)

        # Extract start_date and end_date from the budget
        # start_date = budget.start_date
        # end_date = budget.end_date
        
        
        start = "2024-01-01"  
        end = "2024-11-30" 
        
        start_date = datetime.strptime(start, "%Y-%m-%d").date()
        end_date = datetime.strptime(end, "%Y-%m-%d").date()

        request_data = TransactionsGetRequest(
            access_token=plaid_item.access_token,
            start_date=start_date,
            end_date=end_date,
        )
        
        print("This is the request data baby", request_data)

        response = plaid_client.transactions_get(request_data)
        transactions = response['transactions']
        print("there we can see you", transactions)
        print("Bro what are you doing?")
        processed = extract_transaction_details(transactions=transactions)
        print("The processed are these", processed)

        return JsonResponse({"transactions": transactions}, safe=False, status=200)

    except PlaidItem.DoesNotExist:
        return JsonResponse({"error": "Plaid item not found for the user"}, status=404)
    except Budget.DoesNotExist:
        return JsonResponse({"error": "No budget found for the user"}, status=404)
    except Exception as e:
        print("Error retrieving transactions:", str(e))
        return JsonResponse({"error": "Failed to retrieve transactions", "details": str(e)}, status=500)
    
    
    
from typing import List, Dict

def extract_transaction_details(transactions):
    """
    Extract date, name, category, amount, and description from transaction data.
    
    :param transactions: List of transaction dictionaries
    :return: Processed list of dictionaries containing the required fields
    """
    processed_transactions = []
    for transaction in transactions:
        category = transaction.get("category")  
        if not isinstance(category, list): 
            category = []
        
        processed_transactions.append({
            "date": transaction.get("date"),  
            "name": transaction.get("name"), 
            "category": ", ".join(category),  
            "amount": transaction.get("amount"), 
            "description": transaction.get("merchant_name") or transaction.get("name")
        })
    return processed_transactions
