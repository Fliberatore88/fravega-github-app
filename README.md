# Aplicación de Búsqueda de Usuarios de GitHub

Este proyecto es una aplicación web construida con [Next.js](https://nextjs.org) que permite buscar y visualizar usuarios de GitHub. Utiliza la API de GitHub para obtener información de los usuarios y mostrarla de manera organizada.

## Características Principales

* **Búsqueda de Usuarios:** Permite buscar usuarios de GitHub por su nombre de usuario.
* **Visualización de Información:** Muestra información relevante de cada usuario, como su avatar, nombre de usuario, número de seguidores y repositorios públicos.
* **Interfaz de Usuario Moderna:** Diseñada con una interfaz intuitiva y fácil de usar.
* **Manejo de Errores:** Incluye manejo de errores para situaciones como usuarios no encontrados o problemas de conexión con la API de GitHub.

## Requisitos

* **Node.js:** Se recomienda la versión 20.x.x o superior.
* **npm:** Administrador de paquetes de Node.js.

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

4.  **Abrir en el Navegador:**

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

## Comandos Útiles

* `npm run dev`: Inicia el servidor de desarrollo.
* `npm run build`: Construye la aplicación para producción.
* `npm run start`: Inicia el servidor de producción.
* `npm run test`: Ejecuta las pruebas unitarias.

## Tecnologías Utilizadas

* [Next.js](https://nextjs.org): Framework de React para la construcción de aplicaciones web.
* [React](https://reactjs.org): Librería de JavaScript para construir interfaces de usuario.
* [GitHub API](https://docs.github.com/en/rest): API para obtener información de los usuarios de GitHub.
* [Jest](https://jestjs.io) y [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/): Para realizar tests unitarios.
