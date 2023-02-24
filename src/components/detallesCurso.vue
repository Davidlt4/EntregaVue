<script setup>

    import { useFirestore,useCollection } from 'vuefire'
    import { collection} from "firebase/firestore";
    import { jsPDF } from "jspdf";

    const db = useFirestore()
    const cursos = useCollection(collection(db, 'Cursos'))


    function generarPdf(nombre, horas, img){
        let doc = new jsPDF();
        let logo = new Image();
        let descripcion = 'Descripcion: Bienvendido a este curso de' + nombre + 'Espero que te sea de utilidad, buena suerte.';
        logo.src = '../src/img/' + img;
        doc.text(20,20, 'Curso: ' + nombre);
        doc.text(20,40, 'Horas del curso: ' + horas);
        doc.addImage(logo,'png', 20, 50, 70, 70);
        doc.text(20,140, descripcion);
        doc.save(nombre + '.pdf');
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
                <td>Inscripción</td>
            </tr>
        </thead>
        <tbody v-for="curso in cursos" :key="curso.nombre">
            <tr v-if="curso.id==$route.params.id">
                <td>{{ curso.nombre }}</td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/img/'+curso.imagen" width="50" height="50"></td>
                <td><button @click="generarPdf(curso.nombre, curso.horas, curso.imagen)">Generar Pdf</button></td>
                <td><button>Incribirse</button></td>
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