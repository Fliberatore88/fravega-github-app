import { User } from '../types/user';
import UserCard from './UserCard';
import { useAppContext } from '../contexts/AppContext';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { favoriteUsers, toggleFavorite } = useAppContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {users.map((user, index) => (
        <UserCard
          key={user.login}
          user={user}
          isFavorite={!!favoriteUsers.find((u) => u.login === user.login)}
          toggleFavorite={toggleFavorite}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};

export default UserList;