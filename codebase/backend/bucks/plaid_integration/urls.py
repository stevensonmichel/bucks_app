from django.urls import path
from .views import CreateLinkTokenView, ExchangePublicTokenView
urlpatterns = [
    path('create_link_token/', CreateLinkTokenView.as_view(), name='create_link_token'),
    path('exchange_public_token/', ExchangePublicTokenView.as_view(), name='exchange_public_token'),
    # path('get_transactions/', GetTransactionView.as_view(), name='get_transactions'),
]