import React, { useState } from 'react';

interface SignUpFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password2: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (formData.password !== formData.password2) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.password2,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Signup successful! You can now log in.');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="bg-gray-200 max-w-md mx-auto mt-10 p-6 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-500">SIGN UP</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="first_name" className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="last_name" className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col justify-center items-center space-y-4">
          <button
            type="submit"
            className="py-2 px-12 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign up
          </button>
          <p className="text-gray-700">Already have an account?</p>
          <a
            href="/login"
            className="py-2 px-8 bg-cyan-400 text-white font-semibold rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          >
            Login
          </a>
        </div>

      </form>

      {errorMessage && (
        <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mt-4 text-green-500 text-center">{successMessage}</p>
      )}
    </div>
  );
};

export default SignUp;
