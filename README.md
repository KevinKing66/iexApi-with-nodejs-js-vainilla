# iexApi-with-nodejs-js-vainilla

## Este proyecto no tiene dependencias

Para arrancar el proyecto debemos:

* Entrar a la carpeta del backend desde nuestra terminal y escribimos  `node server`

*el front-end lo podemos iniciar de dos maneras, la primera es que iniciamos abriendo el html con el navegador (click derecho, abrir con Navegador) y la otra opción es iniciar usando el live server(extension de visual) despues instalarla nos aparece en el visual una opción en la parte inferior derecha que dice "Go Live" le damos ahí y nos abrira una carpeta en el navegador, tendremos que juscar el archivo la carpeta del front y listo.


Este fué un buen ejercicio para conocer las 
limitaciones de js al no contar con funciónes 
como fetch, reduce,etc. Esto nos hace pensar 
en alternas las cuales nos ayudan a 
desarrollar mayor logica de programación 
aunque no siempre son las mejores opciones. 

# Nota: el backend presenta un bug
## cuando ejecutamos el backend, gracias al control de flujo que tiene el servidor, para recibir el json que nos interesaen cuyo caso que nunca se haya buscado la accion que queremos, deberemos ejecutar dos fetch hacía el backend para que se actualice y al llamar el objecto que necesitemos lo encontremos en el back para que el front lo reciba
