// __tests__/UserList.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '@/contexts/AppContext';
import UserList from '@/components/UserList';
import { User } from '@/types/user';
import { useRouter } from 'next/router';

jest.mock('next/router');

describe('UserList', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('debería renderizar una lista de usuarios', () => {
    const users: User[] = [
      {
        login: 'usuario1',
        avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
        html_url: 'https://github.com/usuario1',
        followers: 4,
        public_repos: 1,
      },
      {
        login: 'usuario2',
        avatar_url: 'https://avatars.githubusercontent.com/u/67890?v=4',
        html_url: 'https://github.com/usuario2',
        followers: 0,
        public_repos: 20,
      },
    ];

    render(
      <AppProvider>
        <UserList users={users} />
      </AppProvider>
    );

    expect(screen.getByText('usuario1')).toBeInTheDocument();
    expect(screen.getByText('usuario2')).toBeInTheDocument();
  });

    it('debería renderizar las imágenes de avatar', () => {
    const users: User[] = [
      {
        login: 'usuario1',
        avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
        html_url: 'https://github.com/usuario1',
        followers: 4,
        public_repos: 1,
      },
      {
        login: 'usuario2',
        avatar_url: 'https://avatars.githubusercontent.com/u/67890?v=4',
        html_url: 'https://github.com/usuario2',
        followers: 0,
        public_repos: 20,
      },
    ];

    render(
      <AppProvider>
        <UserList users={users} />
      </AppProvider>
    );

    // Seleccionar las imágenes de avatar por su alt text
    const img1 = screen.getByAltText('usuario1');
    const img2 = screen.getByAltText('usuario2');

    // Decodificar las URLs antes de la comparación
    const img1Src = decodeURIComponent(img1.getAttribute('src')!.split('url=')[1].split('&')[0]);
    const img2Src = decodeURIComponent(img2.getAttribute('src')!.split('url=')[1].split('&')[0]);

    expect(img1Src).toContain('https://avatars.githubusercontent.com/u/12345?v=4');
    expect(img2Src).toContain('https://avatars.githubusercontent.com/u/67890?v=4');
  });
  it('debería manejar la funcionalidad de agregar/quitar favorito', () => {
    const users: User[] = [
      {
        login: 'usuario1',
        avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
        html_url: 'https://github.com/usuario1',
        followers: 4,
        public_repos: 1,
      },
    ];

    const { container } = render(
      <AppProvider>
        <UserList users={users} />
      </AppProvider>
    );

    const favoriteButton = container.querySelector('[alt="Agregar Favorito"]');
    fireEvent.click(favoriteButton!);

  });

  it('debería manejar una lista de usuarios vacía', () => {
    render(
      <AppProvider>
        <UserList users={[]} />
      </AppProvider>
    );

  });

  it('debería renderizar los datos de los usuarios correctamente', () => {
    const users: User[] = [
      {
        login: 'usuario1',
        avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
        html_url: 'https://github.com/usuario1',
        followers: 4,
        public_repos: 1,
      },
    ];

    render(
      <AppProvider>
        <UserList users={users} />
      </AppProvider>
    );

    expect(screen.getByText('usuario1')).toBeInTheDocument();
  });
});