<script setup>

    import { useFirestore,useCollection } from 'vuefire'
    import { collection} from "firebase/firestore";

    const db = useFirestore()
    const cursos = useCollection(collection(db, 'Cursos'))

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
                <td><a v-bind:href="'/src/pdf/'"></a></td>
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