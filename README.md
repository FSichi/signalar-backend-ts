# Proyecto Signando Backend (New)

## Configuración del entorno

El proyecto utiliza variables de entorno para configurar la conexión a la base de datos y otras configuraciones sensibles. Sigue los siguientes pasos para configurar el entorno local:

1. Duplica el archivo `.env.example` y nómbralo `.env`:
2. Abre el archivo `.env` en un editor de texto o codigo y actualiza los valores de las siguientes variables de entorno con tus propios datos:


    ```
        DB_USER=mi_usuario
        DB_PASSWORD=mi_contraseña
        DB_NAME=nombre_basedatos
    ```

3. Guarda los cambios en el archivo `.env`.


## Ejecución del proyecto

1. Instala las dependencias del proyecto:

    ```
        npm install
    ```

2. Inicia la aplicación:

    ```
        npm start --> Para iniciar el servidor local sin registro de cambios
        npm run dev --> Para iniciar el servidor local con Nodemon
    ```


La aplicación ahora utilizará las variables de entorno configuradas en el archivo `.env` para establecer la conexión a la base de datos.

> NOTA: No compartas tu archivo `.env` en repositorios públicos. Asegúrate de agregar `.env` al archivo `.gitignore` para evitar que se incluya en el repositorio. (Verificar que se encuentre en el gitignore, por defecto ya esta configurado)
