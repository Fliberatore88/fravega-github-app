import React from 'react';
import Lottie from 'lottie-react';
import notFoundAnimation from '../../public/animations/not-found.json'

const UserNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <Lottie animationData={notFoundAnimation} style={{ height: 200, width: 200 }} />
      <h2 className="text-2xl font-bold mt-4">Usuario no encontrado</h2>
      <p className="mt-2">El usuario que buscaste no existe.</p>
    </div>
  );
};

export default UserNotFound;