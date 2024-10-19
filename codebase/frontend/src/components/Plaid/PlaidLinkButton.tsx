import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLinkButton: React.FC<{ token: string }> = ({ token }) => {
  const onSuccess = useCallback((public_token: string) => {
    console.log("the public token is:", public_token);
    const accessToken = localStorage.getItem('access_token');
    fetch('http://127.0.0.1:8000/api/plaid/exchange_public_token/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,  // Send the JWT token in Authorization header
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    });
  }, []);

  const config = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect Bank Account
    </button>
  );
};

export default PlaidLinkButton;