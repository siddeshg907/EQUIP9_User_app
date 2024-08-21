import React from 'react';
import { useLocation } from 'react-router-dom';

function HomePage() {
  const location = useLocation();
  const { firstName, lastName, mobile, avatar } = location.state || {};

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (!firstName || !lastName) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">User data is not available.</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl mb-4">{`${getTimeGreeting()}, Mr. ${firstName} ${lastName}`}</h2>
        {avatar && <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />}
        <p className="text-lg">{firstName} {lastName}</p>
        <p className="text-sm text-gray-500">{mobile}</p>
      </div>
    </div>
  );
}

export default HomePage;
