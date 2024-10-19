def format_transactions(transactions):
    """
    Function to format and clean transaction data fetched from Plaid.
    """
    formatted = []
    for transaction in transactions:
        formatted.append({
            "date": transaction.date,
            "amount": transaction.amount,
            "name": transaction.name,
        })
    return formatted