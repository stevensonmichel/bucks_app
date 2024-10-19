from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .plaid_service import plaid_client
from .models import PlaidItem
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.country_code import CountryCode
from plaid.model.products import Products

# Generate Plaid Link Token
def create_link_token(request):
    request_data = LinkTokenCreateRequest(
        products=[Products("transactions")],
        client_name="Expense Tracker App",
        country_codes=[CountryCode('US')],
        language="en",
        user=LinkTokenCreateRequestUser(client_user_id=str(request.user.id)),
    )
    response = plaid_client.link_token_create(request_data)
    return JsonResponse(response.to_dict())



import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid import ApiException

@csrf_exempt
def exchange_public_token(request):
    if request.method == "POST":
        # Parse JSON from request body
        try:
            data = json.loads(request.body)
            public_token = data.get('public_token')

            # Ensure the public token is present
            if public_token:
                # Exchange the public token for an access token
                exchange_request = ItemPublicTokenExchangeRequest(public_token=public_token)
                exchange_response = plaid_client.item_public_token_exchange(exchange_request)

                # Extract the access token and item ID
                access_token = exchange_response['access_token']
                item_id = exchange_response['item_id']
                

                return JsonResponse({
                    'access_token': access_token,
                    'item_id': item_id
                })
            else:
                return JsonResponse({'error': 'No public_token provided'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)



# Get Transactions
def get_transactions(request):
    plaid_item = PlaidItem.objects.get(user=request.user)
    print(1000*"##")
    print("The plaid_item is", plaid_item)
    request_data = TransactionsGetRequest(
        access_token=plaid_item.access_token,
        start_date='2023-01-01',  # Example: replace with dynamic dates
        end_date='2024-02-01',
    )
    print(1000*"*")
    print("The request_data is", request_data)
    response = plaid_client.transactions_get(request_data)
    print(1000*"((")
    print("The response is", response)
    return JsonResponse(response.to_dict())