<script setup>

    import { useFirestore,useCollection } from 'vuefire'
    import { collection} from "firebase/firestore";
    import { jsPDF } from "jspdf";
    import { onAuthStateChanged} from "firebase/auth";
    import {ref} from "vue";
    import {auth} from "../firebase.js"

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


    function generarPdf(nombre, horas, img,categoria){

        let pdf = new jsPDF();
        let imagen_curso = new Image();
        let contenido = 'Contenido: Bienvendido a este curso de ' + nombre + '\nEspero que te sea de utilidad,buena suerte.';
        pdf.addFont('bromellonavidadregular', 'bromellonavidadregular', 'normal');
        pdf.setFont("bromellonavidadregular");
        pdf.setFont(undefined, 'bold');
        imagen_curso.src = '../src/img/' + img;
        pdf.setTextColor(255,0,0);
        pdf.text(10,10,'Categoria: '+categoria);
        pdf.setTextColor(0,0,0);
        pdf.text(25,25, 'Curso: ' + nombre);
        pdf.text(25,40, 'Horas del curso: ' + horas);
        pdf.addImage(imagen_curso,'png', 20, 50, 70, 70);
        pdf.text(25,140, contenido);
        pdf.save(nombre + '.pdf');
    }

</script>


<template>

    <table>
        <thead>
            <tr>
                <td>Nombre</td>
                <td>Horas</td>
                <td>Imagen</td>
                <td>Pdf</td>
                <td v-if="nombreUsuario!=''">Inscripción</td>
            </tr>
        </thead>
        <tbody v-for="curso in cursos" :key="curso.nombre">
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