!!A TENER EN CUENTA¡¡

A la hora de crear un curso selecciona una imagen de la carpeta img del proyecto
El hosting está hecho pero alguna funcionalidades en el host no funcionan
Localmente funciona todo

PUNTOS COMPLETADOS:

1. La cabecera debe tener una entrada de inicio, una entrada para cada una de las 
categorías (Ofimática, Programación y SOs) y un botón de Login.

2. Inicio → Debe tener una bienvenida, una imagen y una pequeña descripción de la 
empresa

3. Categorías (Ofimática, Programación y SOs) → Para cada entrada (categoría), aparecerá 
el título de la categoría y un listado de al menos 3 cursos (ej. Excel, Word,..), donde 
aparezcan por lo menos los campos de nombre, horas, una imagen e inscripción, sólo
aparece el botón si está autenticado (no tendrá actualmente ninguna funcionalidad)

4. Si pinchas en un curso debe aparecer el detalle de este: los mismos campos que antes y 
un índice de contenidos (un pdf), estructurado de una forma más visual

5. Si se autentica un usuario (administrador) debe aparecer en la cabecera una nueva 
entrada privada llamada “Administración”

6. En la entrada Administración debe aparecer el listado de todos los cursos ordenados por 
categoría y sólo puede entrar un usuario autenticado

7. Cuando se loguea (mediante email/password o Google) un usuario, el botón cambia a 
Salir.

8. Debe estar en producción.

9. La web debe estar desarrollada con componentes Vue.

10. Deben usarse como mínimo los componentes: cabecera, pie, cursos, privado y 
detalleCurso.
11. En el pie de página debe aparecer el autor, política de privacidad y el contacto de la 
empresa (se indica, pero no tienes porque crear el enlace o componente). 

12. Los cursos mostrados deben estar en una base de datos Firestore de Firebase.

13. Se trata de una SPA, con lo que la única recarga de la página se produce al inicio.

14. Cada vez que se recarga la página se debe mostrar un preload mientras se obtienen los 
datos.

EXTRAS:

(1 punto) Darle funcionalidad al botón de registro de la cabecera, que permita el registro 
(email/password y Google) de usuarios (todos serán administradores) mediante la 
creación de un formulario. 

(1 punto) Si pinchas en el botón de “Cerrar Sesión” se cerrará la sesión, se irá a la página 
de inicio, en la cabecera volverá a estar el botón de Login y no se verá el nombre de 
usuario.

(1 punto) El panel de administración debe permitir añadir nuevos cursos a la base de 
datos, para lo cual los documentos pdf y las imágenes se almacenan usando Storage de 
Firebase.

(1 punto) El panel de administración debe permitir el borrado de un curso

(1 punto) Permitir registrar usuarios estándar y administradores, de tal manera que una 
vez logados los de tipo estándar puedan matricularse en un curso.
