import React, { useEffect, useState } from 'react';
import PlaidLinkButton from './PlaidLinkButton';

const PlaidComponent: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/plaid/create_link_token/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Link Token is:', data.link_token);
        setLinkToken(data.link_token)
      });
  }, []);

  return linkToken ? <PlaidLinkButton token={linkToken} /> : <div>Loading...</div>;
};

export default PlaidComponent;