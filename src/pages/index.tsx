import React from 'react';
import UserList from '../components/UserList';
import ThemeToggle from '../components/ThemeToggle';
import Search from '../components/Search';
import UserLoader from '../components/UserLoader';
import LoadingIndicator from '../components/LoadingIndicator';
import UserNotFound from '../components/UserNotFound';
import useUserSearch from '../hooks/useUserSearch';

const Home = () => {
    const { users, isLoading, userNotFound } = useUserSearch();

    return (
        <div className="p-4">
            <div className="sticky top-4 z-10 flex justify-between items-center mb-6 flex-wrap gap-2 pt-4 p-4 rounded-md">
                <Search />
                <ThemeToggle />
            </div>
            <UserLoader />
            {isLoading ? <LoadingIndicator /> : userNotFound ? <UserNotFound /> : <UserList users={users} />}
        </div>
    );
};

export default Home;