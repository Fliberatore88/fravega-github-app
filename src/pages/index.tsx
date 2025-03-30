import { useState, useEffect } from 'react';
import { fetchUsers } from '../services/github';
import { User } from '../types/user';
import UserList from '../components/UserList';
import Head from 'next/head';
import Search from '../components/Search';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers(searchTerm);
      setUsers(fetchedUsers);
    };

    getUsers();
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="p-4">
      <Head>
        {users.slice(0, 5).map((user) => (
          <link key={user.name} rel="preload" href={user.avatar_url} as="image" />
        ))}
      </Head>
      <div className="flex justify-between items-center mb-4">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} clearSearch={clearSearch} />
        <ThemeToggle />
      </div>
      <UserList users={users} />
    </div>
  );
};

export default Home;