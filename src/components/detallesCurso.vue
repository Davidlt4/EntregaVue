<script setup>

    /** Este componente nos genera una vista de los detalles del curso que le pasemos */
    /** Todos los imports que necesitamos para nuestro componente*/
    import { useFirestore,useCollection } from 'vuefire'
    import { collection} from "firebase/firestore";
    import { jsPDF } from "jspdf";
    import { onAuthStateChanged} from "firebase/auth";
    import {ref} from "vue";
    import {auth} from "../firebase.js"

    /**Sacamos los cursos de la base de firestore*/
    const db = useFirestore()
    const cursos = useCollection(collection(db, 'Cursos'))

    /**Varible nombreUsuario para distinguir si hay un usuario logeado o no*/
    let nombreUsuario=ref("");

    /**Función para logear un usuario y guardar su email en la variable nombreUsuario*/
    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        nombreUsuario.value=user.email;
    }
    });

    //Función con la cuál generamos los pdfs dinámicamente para que así no los tengamos que crear a mano
    //Para ello hemos instalado el paquete de npm JsPDF
    //Para ellos con los parámetros que le pasamos desde las vistas que mostramos el curso, generamos el pdf
    function generarPdf(nombre, horas, img,categoria){
        //Lo que hace está función es generar un pdf y mostrarlo como si fuese html

        //Creamos un nuevo objeto pdf
        let pdf = new jsPDF();
        //Creamos un nuevo objeto tipo imagen
        let imagen_curso = new Image();

        //Establecemos el contenido de nuestro pdf
        let contenido = 'Contenido: Bienvendido a este curso de ' + nombre + '\nEspero que te sea de utilidad,buena suerte.';
        //Establecemos la fuente de nuestro pdf
        pdf.addFont('bromellonavidadregular', 'bromellonavidadregular', 'normal');
        pdf.setFont("bromellonavidadregular");
        pdf.setFont(undefined, 'bold');

        //Añadimos la imagen
        imagen_curso.src = '../src/img/' + img;
        //Añadimos la categoría
        pdf.setTextColor(255,0,0);
        //Los dos primeros números establecen la posición donde queremos que aparezca el contenido
        //En esta caso ese contenido sería Categoría
        //Para el resto de campos sería igual
        pdf.text(10,10,'Categoria: '+categoria);
        //Esto sirve para establecer el color de la fuente de lo siguiente que añadamos
        pdf.setTextColor(0,0,0);
        pdf.text(25,25, 'Curso: ' + nombre);
        pdf.text(25,40, 'Horas del curso: ' + horas);
        pdf.addImage(imagen_curso,'png', 20, 50, 70, 70);
        pdf.text(25,140, contenido);
        pdf.save(nombre + '.pdf');
    }

</script>


<template>
    <!--Generamos una tabla con los detalles del curso-->
    <table>
        <thead>
            <tr>
                <!--Campos que tiene nuestra tabla-->
                <td>Nombre</td>
                <td>Horas</td>
                <td>Imagen</td>
                <td>Pdf</td>
                <td v-if="nombreUsuario!=''">Inscripción</td>
            </tr>
        </thead>
        <!--Recorremos los datos de nuestros cursos-->
        <tbody v-for="curso in cursos" :key="curso.nombre">
            <!--Y solo mostramos el curso cuyo id concuerde con el que le hemos pasado a través de la url que es el que nos intersa-->
            <tr v-if="curso.id==$route.params.id">
                <td>{{ curso.nombre }}</td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/img/'+curso.imagen" width="50" height="50"></td>
                <td><button @click="generarPdf(curso.nombre, curso.horas, curso.imagen,curso.categoria)">pdf</button></td>
                <td v-if="nombreUsuario!=''"><button>Incribirse</button></td>
            </tr>
        </tbody>
    </table>

</template>

<style>

    table,tr,td{
        border-collapse: collapse;
        padding: 20px;
        font-size:25px;
    }
    thead{
        background-color: rgb(255, 136, 0);
        color: black;
    }
    button{
        background-color: rgb(255, 136, 0);
    }

</style>