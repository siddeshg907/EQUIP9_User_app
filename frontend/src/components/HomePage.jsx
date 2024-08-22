import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:8080/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/login');
      });
  }, [token, navigate]);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (!data.firstName) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button 
        onClick={handleLogout} 
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
      <div className="bg-white p-8 rounded-lg shadow-md text-center relative">
        <h2 className="text-3xl font-semibold mb-4">{`${getTimeGreeting()}, Mr. ${data.firstName} ${data.lastName}`}</h2>
        {data.avatar && <img src={data.avatar} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300" />}
        <p className="text-lg font-medium">{data.firstName} {data.lastName}</p>
        <p className="text-sm text-gray-500">{data.mobile}</p>
      </div>
    </div>
  );
}

export default HomePage;
