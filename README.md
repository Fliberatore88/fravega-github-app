# Aplicación de Búsqueda de Usuarios de GitHub

Este proyecto es una aplicación web construida con [Next.js](https://nextjs.org) que te permite buscar y visualizar usuarios de GitHub. Uso la API de GitHub para traerte la data de los usuarios y mostrarla de una manera bien organizada.

## Características Principales

* **Búsqueda de Usuarios:** Podés buscar usuarios de GitHub por su nombre de usuario.
* **Visualización de Información:** Te muestro la info importante de cada usuario, como su avatar, nombre de usuario, cantidad de seguidores y repositorios públicos.
* **Interfaz de Usuario Moderna:** Diseñada con una interfaz que es intuitiva y fácil de usar.
* **Manejo de Errores:** Incluido un manejo de errores para cuando no se encuentra un usuario o hay algún drama con la conexión a la API de GitHub.
* **Favoritos:** Podés marcar usuarios como favoritos.
* **Detalle de Usuario:** Te muestro los detalles de un usuario cuando lo seleccionás.

## Requisitos

* **Node.js:** Te recomiendo la versión 20.x.x (necesario si querés usar Turbopack).
* **npm:** El administrador de paquetes de Node.js.

## Instrucciones de Instalación y Ejecución

1.  **Clonar el Repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_PROYECTO>
    ```

2.  **Instalar Dependencias:**

    ```bash
    npm install
    ```

3.  **Ejecutar el Servidor de Desarrollo:**

    ```bash
    npm run dev
    ```

    Este comando levanta el servidor de desarrollo de Next.js con la configuración que viene por defecto (`next dev`). Si querés usar **Turbopack** (que compila más rápido), podés correr este otro comando:

    ```bash
    npm run dev:turbopack
    ```

    **IMPORTANTE:** Para usar `npm run dev:turbopack`, necesitás tener instalada la versión 20 o superior de Node.js.

4.  **Abrir en el Navegador:**

    Entrá a [http://localhost:3000](http://localhost:3000) con tu navegador para ver la aplicación andando.

## Comandos Útiles

* `npm run dev`: Arranca el servidor de desarrollo de Next.js.
* `npm run dev:turbopack`: Arranca el servidor de desarrollo de Next.js usando Turbopack (necesitás Node.js 20+).
* `npm run build`: Compila la aplicación para que la puedas poner en producción.
* `npm run start`: Levanta el servidor en modo producción.
* `npm run test`: Ejecuta los tests unitarios.

## Configuración Experimental de `allowedDevOrigins` (Para evitar un warning en consola)

Cuando levantás el servidor de desarrollo,vas a ver una advertencia en la consola que dice "Cross origin request detected". Esto pasa cuando Next.js se da cuenta que hay peticiones a cosas internas desde una IP que no es `localhost` (por ejemplo, si estás entrando desde otro celu en tu misma red).

Para que no te aparezca esa advertencia (y para evitar problemas en futuras versiones de Next.js) si necesitás entrar a la aplicación desde otros dispositivos en tu red, podés configurar la opción `allowedDevOrigins` en el archivo `next.config.js`.

Acá te dejo un ejemplo de cómo quedaría en `next.config.js`:

```javascript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },

    ],
  },
  experimental: {
    allowedDevOrigins: ['192.168.0.129'],
  },
  reactStrictMode: true,
};

export default nextConfig;