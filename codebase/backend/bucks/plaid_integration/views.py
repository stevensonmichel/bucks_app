from django.http import JsonResponse
import jwt
from rest_framework_simplejwt.settings import api_settings
from django.views.decorators.csrf import csrf_exempt
from .plaid_service import plaid_client
from .models import PlaidItem
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.country_code import CountryCode
from plaid.model.products import Products
import json
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid import ApiException


@api_view(['GET'])
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

@csrf_exempt
@permission_classes([IsAuthenticated])
def create_link_token(request):
    print("The user requesting for Plaid is", request.headers)
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1] 
    
    decoded_token = jwt.decode(token, options={"verify_signature": False}, algorithms=[api_settings.ALGORITHM])
    print("Decoded Token:", decoded_token)
    
     
    if auth_header:
        print("Authorization Header:", auth_header)  # This will print the Bearer token
        # Extract the token (Bearer token)
        token = auth_header.split(' ')[1]
        print("Access Token:", token)  #
    
    
    # user = User(client_user_id=str(request.user.id))
    print("authentication is", request.user.is_authenticated)
    request_data = LinkTokenCreateRequest(
        products=[Products("transactions")],
        client_name="Expense Tracker App",
        country_codes=[CountryCode('US')],
        language="en",
        user=LinkTokenCreateRequestUser(client_user_id=str(request.user.id)),
    )
    print("The request data is", request_data)
    response = plaid_client.link_token_create(request_data)
    print("The response from create_link_token is ", response)
    return JsonResponse(response.to_dict())




@csrf_exempt
@permission_classes([IsAuthenticated])
def exchange_public_token(request):
    if request.method == "POST":
        # Parse JSON from request body
        try:
            user = request.user
            print(100*"@")
            print(user)
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
                
                plaid_item, created = PlaidItem.objects.get_or_create(
                        user=user,  # Associate with the currently logged-in user
                        defaults={
                            'access_token': access_token,
                            'item_id': item_id,
                        }
                        
                    )
                # print(1000*"@")
                # print(plaid_item)

            if not created:
                # If PlaidItem already exists, update the access_token and item_id
                plaid_item.access_token = access_token
                plaid_item.item_id = item_id
                plaid_item.save()

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
    # print(1000*"##")
    # print("The plaid_item is", plaid_item)
    request_data = TransactionsGetRequest(
        access_token=plaid_item.access_token,
        start_date='2023-01-01',  # Example: replace with dynamic dates
        end_date='2024-02-01',
    )
    # print(1000*"*")
    # print("The request_data is", request_data)
    response = plaid_client.transactions_get(request_data)
    # print(1000*"((")
    # print("The response is", response)
    return JsonResponse(response.to_dict())