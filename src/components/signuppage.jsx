import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Get existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    // Check if email already exists
    const userExists = existingUsers.some((user) => user.email === email);
    if (userExists) {
      setError('Email already exists');
      return;
    }
    // Create new user object
    const newUser = {
      email,
      password,
    };
    // Add new user to existing users
    existingUsers.push(newUser);
    // Store updated users in local storage
    localStorage.setItem('users', JSON.stringify(existingUsers));
    // Handle sign up logic here (e.g., API call)
    navigate('/login'); // Redirect to homepage after successful sign up
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-gray-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>

        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
