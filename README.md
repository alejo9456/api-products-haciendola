<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# API products

# Instrucciones para ejecutar el proyecto

A continuación se detallan los pasos para clonar, configurar y ejecutar el proyecto localmente:

1. **Clonar el proyecto**
    - Clona el repositorio desde GitHub o la fuente correspondiente:
    ```shell
    git clone https://github.com/alejo9456/api-products-haciendola.git
    ```
    - Cambia al directorio del proyecto:
    ```shell
    cd api-products-haciendola
    ```

2. **Instalar dependencias**
    - Instala las dependencias necesarias con el siguiente comando:
    ```shell
    npm install
    ```

3. **Configurar variables de entorno**
    - Clona el archivo de configuración de variables de entorno:
    ```shell
    cp .env.template .env
    ```
    - Abre el archivo `.env` y cambia las variables de entorno según sea necesario.

4. **Levantar la base de datos**
    - Inicia los contenedores de Docker con el siguiente comando:
    ```shell
    docker-compose up -d
    ```

5. **Iniciar la aplicación**
    - Ejecuta el siguiente comando para iniciar la aplicación en modo de desarrollo:
    ```shell
    npm run start:dev
    ```

6. **Ejecutar el proceso de Seed**
    - Accede a la siguiente URL en tu navegador o realiza una solicitud HTTP con tu cliente favorito (por ejemplo, `curl` o `Postman`) para ejecutar el proceso de seed y crear los datos por defecto (productos y usuarios):
    ```shell
    http://localhost:3000/api/seed
    ```
    - También puedes consultar la documentación de la API en Swagger 
     ```shell
    http://localhost:3000/api#/
    ```

¡Listo! Ahora el proyecto debería estar configurado y ejecutándose correctamente en tu entorno local. Si tienes alguna pregunta o problema, no dudes en revisar la documentación adicional o en contactar con el autor del proyecto.
