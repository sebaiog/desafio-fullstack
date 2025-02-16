# Instrucciones

## Instrucciones con Docker Compose

Para levantar la aplicacion con Docker compose se deben seguir los siguientes pasos:

    1- El archivo docker-compose.yml debe estar en la raiz del proyecto

    2- Cada servicio debe tener un Dockerfile en la carpeta correspondiente
        - `api/Dockerfile`
        - `frontend/Dockerfile`

    3- Ejecutar el comando para construir los contenedores:
        - `docker compose build`

    4- Ejecutar el comando para levantar los contenedores:
        - `docker compose up -d`

    5- Las rutas de los servicios son:
        - **API**: `http://localhost:8181`  
        - **Frontend**: `http://localhost:3000`

    6- Ejecutar el comando para terminar los contenedores:
        - `docker compose down -v`

    7- Ejecutar el comando para borrar los contenedores:
        - `docker system prune -f`  

    8- Ejecutar el comando para borrar las redes:
        - `docker network prune -f`

    9- Ejecutar el comando para borrar las imagenes:
        - `docker compose down --rmi all`

## Instrucciones con Maven y NPM.

Para levantar la aplicacion con Maven y NPM se deben seguir los siguientes pasos:

    1- Ejecutar los comandos maven para limpiar, construir y ejecutar la aplicacion en spring boot:
        - Se debe ejecutar en el directorio `api`
            - `mvn clean package spring-boot:run`

    2- Ejecutar el comando para levantar el frontend en React:
        - Se debe ejecutar en el directorio `frontend`
        - `npm run dev`
    
    3- Las rutas de los servicios son:
        - **API**: `http://localhost:8181`  
        - **Frontend**: `http://localhost:3000`