import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1 className='text-main-purple text-3xl font-bold'>Home Page</h1>
      <ul>
        {users.map((user: { _id: string; name: string; description: string }) => (
          <li key={user._id}>
            <h2>{user.name}</h2>
            <p>{user.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
