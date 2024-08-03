import React from 'react';

const Home = ({ user }) => {
  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <h1>Welcome to our website!</h1>
      )}
    </div>
  );
};

export default Home;
