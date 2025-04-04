import { User } from '../types/user';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface UserCardProps {
  user: User;
  isFavorite: boolean;
  toggleFavorite: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, isFavorite, toggleFavorite }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/user/${user.login}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    toggleFavorite(user);
  };

  return (
    <div className="card border border-gray-200 p-4 rounded-md shadow-md cursor-pointer flex flex-col items-center relative" onClick={handleClick}>
      <Image src={user.avatar_url} alt={user.login} width={100} height={100} className="rounded-full mb-4" priority />
      <h2 className="text-lg font-semibold mb-2">{user.login}</h2>
      <Image
        src={isFavorite ? '/favorito-seleccionado.png' : '/favorito-sin-seleccionar.png'}
        alt={isFavorite ? 'Eliminar Favorito' : 'Agregar Favorito'}
        width={30}
        height={30}
        onClick={handleFavoriteClick}
        className="cursor-pointer absolute top-2 right-2"
      />
    </div>
  );
};

export default UserCard;