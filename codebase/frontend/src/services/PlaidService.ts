export const exchangePublicToken = async (publicToken: string) => {
    const response = await fetch('/api/plaid/exchange_public_token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token: publicToken }),
    });
  
    return response.json();
  };
  
  export const getTransactions = async () => {
    const token = localStorage.getItem('access_token');
    console.log("The transaction token is", token)
  
    const response = await fetch('http://127.0.0.1:8000/api/plaid/get_transactions/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch transactions'); 
    }
  
    return response.json(); 
  };
  