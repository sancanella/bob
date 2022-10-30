# BOB.IO CODING CHALLENGE

## Front

Se ha creado un front con NextJs. Al arrancarlo asegurarse de que tiene las dependencias instaladas y el archivo .env con la URL del back configurada correctamente. Tal y como se pedia se ven dos vistas. 

Una primera vista en la ruta ***"/"*** donde se ve toda la información del back.

Y una segunda vista en la ruta ***"/new"*** con un formulario para crear nuevos elementos. Con unos validadores internos que solo dejan enviar la información cuando el campo Nombre cumple los requisitos pedidos.


## Back

El back se ha creado usando NodeJs con TypeScript. Para arrancar el correcto asegurarse de que el .env esta configurado correctamente, y la base de datos esta levantada con la collection userbags. Se ha creado un docker file y un docker compose para facilitar la configuracion del enviroment.

El back implementa todos los endpoints del CRUD de la entidad requerida.
```
{
  Name:   ‘John Doe’,
  Bags: 5
}
```
Para ejecutar los test, asegurarse de que no hay otra instancia del back ejecutandose. Y ejecutar el comando ```npm test```