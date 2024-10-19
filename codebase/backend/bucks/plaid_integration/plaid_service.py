# from plaid.api import plaid_api
# from plaid.model.accounts_balance_get_request import AccountsBalanceGetRequest
# from plaid.model.transactions_get_request import TransactionsGetRequest
# from plaid.model.transactions_get_request_options import TransactionsGetRequestOptions
# from plaid.model.products import Products
# from plaid.model.country_code import CountryCode
# from plaid import Configuration, ApiClient
# from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
# from plaid.model.link_token_create_request import LinkTokenCreateRequest
# from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
# from plaid.api import plaid_api
# import datetime

# configuration = Configuration(
#     host="https://sandbox.plaid.com",  # Use Plaid's sandbox environment during development
#     api_key={
#         'clientId': PLAID_CLIENT_ID,
#         'secret': PLAID_SECRET
#     }
# )

# api_client = ApiClient(configuration)
# plaid_client = plaid_api.PlaidApi(api_client)

from plaid.api import plaid_api
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.transactions_get_request import TransactionsGetRequest
from plaid.model.country_code import CountryCode
from plaid import Configuration, ApiClient

import os

# Configuration for Plaid using environment variables
PLAID_CLIENT_ID = os.getenv('PLAID_CLIENT_ID')
PLAID_SECRET = os.getenv('PLAID_SECRET')

configuration = Configuration(
    host="https://sandbox.plaid.com",  # Sandbox for development
    api_key={
        'clientId': PLAID_CLIENT_ID,
        'secret': PLAID_SECRET
    }
)

api_client = ApiClient(configuration)
plaid_client = plaid_api.PlaidApi(api_client)