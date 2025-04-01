import { GetServerSideProps } from 'next';
import { fetchUser } from '../../services/github';
import { User } from '../../types/user';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAppContext } from '../../contexts/AppContext';

interface UserDetailPageProps {
  user: User | null;
}

const UserDetailPage: React.FC<UserDetailPageProps> = ({ user }) => {
  const router = useRouter();
  const { favoriteUsers, toggleFavorite } = useAppContext();
  const isFavorite = !!favoriteUsers.find((u) => u.login === user?.login);

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card border border-gray-200 p-8 rounded-md shadow-md relative w-full max-w-xl">
        <div className="flex items-center justify-center mb-6">
          <Image src={user.avatar_url} alt={user.login} width={150} height={150} className="rounded-full" />
          <Image
            src={isFavorite ? '/favorito-seleccionado.png' : '/favorito-sin-seleccionar.png'}
            alt={isFavorite ? 'Eliminar Favorito' : 'Agregar Favorito'}
            width={35}
            height={35}
            onClick={() => toggleFavorite(user)}
            className="cursor-pointer absolute top-4 right-4"
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-4">{user.login}</h1>
        <p className="text-center mb-4 text-lg">{user.bio}</p>
        <p className="text-center mb-4 text-lg">Repositorios: {user.public_repos}</p>
        <p className="text-center mb-4 text-lg">Seguidores: {user.followers}</p>
        <p className="text-center mb-6 text-lg">Siguiendo: {user.following}</p>
        <div className="flex justify-center">
          <button onClick={() => router.back()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg">Volver</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const username = params?.username as string;

  if (!username) {
    return {
      notFound: true,
    };
  }

  try {
    const user = await fetchUser(username);

    if (!user) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      notFound: true,
    };
  }
};

export default UserDetailPage;