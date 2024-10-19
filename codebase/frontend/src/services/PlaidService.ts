export const exchangePublicToken = async (publicToken: string) => {
    const response = await fetch('/api/plaid/exchange_public_token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token: publicToken }),
    });
  
    return response.json();
  };
  
  export const getTransactions = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/plaid/get_transactions/');
    console.log("THe data is", response)
    return response.json();
  };