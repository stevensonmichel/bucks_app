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
from buckets.models import Bucket
from expenses.models import Expense
from notifications.models import Notification
from datetime import datetime
from django.db import transaction
from django.utils.timezone import now


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
                    print("We got transactions", transactions_response)
                    
                
                    add_buckets(transactions_response, user)
                    add_expenses(transactions_response, user)
                    

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
    
    if Account.objects.filter(plaid_account_id=plaid_account_id, user=user).exists():
        print(f"Duplicate expense detected: {plaid_account_id}. Skipping creation.")
        return 

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
    
    Notification.objects.create(
                            user=user,
                            message=f'A new account "{name}" has been created.',
                            type='account',
                            date=now(),
                            read=False,
                        )

    if not created:
        account.name = name
        account.type = account_type
        account.subtype = subtype
        account.balance = balance
        account.save()
        
        Notification.objects.create(
                            user=user,
                            message=f'The account "{name}" has been updated.',
                            type='account',
                            date=now(),
                            read=False,
                        )

    return


def get_transaction_count(data):
    """Returns the total number of transactions."""
    return data.get('total_transactions', 0)


def get_transactions(request):
    try:
        # Retrieve the Plaid item and budget for the user
        plaid_item = PlaidItem.objects.get(user=request.user)
        # budget = Budget.objects.filter(user=request.user).first()
        # if not budget:
        #     raise ValueError("No budget found for the user")

        # Extract start_date and end_date (hardcoded for now)
        start = "2024-01-01"
        end = "2024-11-30"
        start_date = datetime.strptime(start, "%Y-%m-%d").date()
        end_date = datetime.strptime(end, "%Y-%m-%d").date()

        # Fetch transactions using Plaid's API
        request_data = TransactionsGetRequest(
            access_token=plaid_item.access_token,
            start_date=start_date,
            end_date=end_date,
        )
        response = plaid_client.transactions_get(request_data)

        # Extract and process transactions
        transactions = response['transactions']
        print("We got raw transactions", transactions)
        processed = extract_transaction_details(transactions=transactions)

        # Ensure processed is a list of dictionaries
        if not isinstance(processed, list) or not all(isinstance(item, dict) for item in processed):
            raise ValueError("Processed transactions are not in the expected format")

        return processed

    except PlaidItem.DoesNotExist:
        print("Error: Plaid item not found for the user")
        return []
    except Budget.DoesNotExist:
        print("Error: Budget not found for the user")
        return []
    except ValueError as ve:
        print(f"ValueError: {str(ve)}")
        return []
    except Exception as e:
        print("Error retrieving transactions:", str(e))
        return []
    
    
from typing import List, Dict

def extract_transaction_details(transactions):
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
            "description": transaction.get("merchant_name") or transaction.get("name"),
            "transaction_id": transaction.get("transaction_id"),
            "account_id": transaction.get("account_id"),
            "account_owner": transaction.get("account_owner"),
        })
    return processed_transactions



def add_buckets(processed_data, user):
    try:
        with transaction.atomic():
            bucket_map = {}  # To track already created buckets
            for entry in processed_data:
                category = entry.get('category', '').strip() or 'Uncategorized'

                # Avoid creating duplicate buckets for the same category
                if category not in bucket_map:
                    bucket, created = Bucket.objects.get_or_create(
                        user=user,
                        name=category,
                        defaults={
                            'description': 'pending',
                            'max_amount': None,
                            'current_amount': 0.00,
                            'is_active': True,
                            'created_at': now(),
                            'updated_at': now(),
                        },
                    )
                    if created:
                        # Only create a notification for new buckets
                        Notification.objects.create(
                            user=user,
                            message=f'A new bucket "{category}" has been created.',
                            type='bucket',
                            date=now(),
                            read=False,
                        )

                    bucket_map[category] = bucket  # Cache the bucket

    except Exception as e:
        print(f"Error occurred while adding buckets: {e}")

        

def add_expenses(processed_data, user):
    try:
        with transaction.atomic():
            for entry in processed_data:
                category = entry.get('category', '').strip() or 'Uncategorized'

                # Find the corresponding bucket for the expense
                bucket = Bucket.objects.filter(name=category, user=user).first()
                if not bucket:
                    # Default to an "Uncategorized" bucket if the category bucket doesn't exist
                    bucket, _ = Bucket.objects.get_or_create(
                        user=user,
                        name='Uncategorized',
                        defaults={
                            'description': 'pending',
                            'max_amount': None,
                            'current_amount': entry['amount'],
                            'is_active': True,
                            'created_at': now(),
                            'updated_at': now(),
                        },
                    )
                
                
                
                plaid_account_id = entry.get('account_id')
                account = Account.objects.filter(plaid_account_id=plaid_account_id, user=user).first()
                if not account:
                    raise ValueError(f"Account with plaid_account_id {plaid_account_id} not found for user {user.id}.")

                plaid_transaction_id = entry.get('transaction_id')  # Assuming 'transaction_id' is unique from Plaid
                if Expense.objects.filter(plaid_transaction_id=plaid_transaction_id, user=user).exists():
                    print(f"Duplicate expense detected: {plaid_transaction_id}. Skipping creation.")
                    continue

                # Create the expense
                print("Ladies and Gents, the bucket is", bucket)
                Expense.objects.get_or_create(
                    user=user,
                    name=entry['name'],
                    plaid_transaction_id=entry['transaction_id'],
                    description=entry['description'],
                    amount=entry['amount'],
                    date=entry['date'],
                    account=account,  # Use the passed account ID
                    created_at=now(),
                    bucket=bucket,
                )

                # Create a notification for the new expense
                Notification.objects.create(
                    user=user,
                    message=f'A new expense "{entry["name"]}" from Plaid has been created.',
                    type='expense',
                    date=now(),
                    read=False,
                )

    except Exception as e:
        print(f"Error occurred while adding expenses: {e}")
