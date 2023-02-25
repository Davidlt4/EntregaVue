<script setup>

    import { onAuthStateChanged} from "firebase/auth";
    import {ref} from "vue";
    import {auth} from "../firebase.js"
    import {useFirestore,useCollection } from 'vuefire'
    import {collection,doc,deleteDoc} from "firebase/firestore"; 
    import crearCurso from "./crearCurso.vue"


    const db = useFirestore()
    const cursos = useCollection(collection(db, 'Cursos'))

    let nombreUsuario=ref("");

    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        nombreUsuario.value=user.email;
    }
    });

    function borrarCurso(id){
        deleteDoc(doc((db), 'Cursos', id));
    }



</script>

<template>
    <h1>Bienvenido a la zona de Administración</h1>
    <h2>{{ nombreUsuario }}</h2><br>
    <h2>Cursos</h2><br>

    <h3>Programación</h3>
    <table>
        <thead>
            <tr>
                <td>Nombre</td>
                <td>Horas</td>
                <td>Imagen</td>
                <td v-if="nombreUsuario=='admin@gmail.com'">Borrar</td>
            </tr>
        </thead>
        <tbody v-for="curso in cursos" :key="curso.nombre">
            <tr v-if="curso.categoria=='programacion'">
                <td>{{ curso.nombre }}</td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/img/'+curso.imagen" width="50" height="50"></td>
                <td v-if="nombreUsuario=='admin@gmail.com'"><button @click="borrarCurso(curso.id)">Borrar</button></td>
            </tr>
        </tbody>
    </table><br><br>

    <h3>Sistemas Operativos</h3>
    <table>
        <thead>
            <tr>
                <td>Nombre</td>
                <td>Horas</td>
                <td>Imagen</td>
                <td v-if="nombreUsuario=='admin@gmail.com'">Borrar</td>
            </tr>
        </thead>
        <tbody v-for="curso in cursos" :key="curso.nombre">
            <tr v-if="curso.categoria=='SOs'">
                <td>{{ curso.nombre }}</td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/img/'+curso.imagen" width="50" height="50"></td>
                <td v-if="nombreUsuario=='admin@gmail.com'"><button @click="borrarCurso(curso.id)">Borrar</button></td>
            </tr>
        </tbody>
    </table><br><br>

    <h3>Ofimatica</h3>
    <table>
        <thead>
            <tr>
                <td>Nombre</td>
                <td>Horas</td>
                <td>Imagen</td>
                <td v-if="nombreUsuario=='admin@gmail.com'">Borrar</td>
            </tr>
        </thead>

        <tbody v-for="curso in cursos" :key="curso.nombre">
            <tr v-if="curso.categoria=='ofimatica'">
                <td>{{ curso.nombre }}</td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/img/'+curso.imagen" width="50" height="50"></td>
                <td v-if="nombreUsuario=='admin@gmail.com'"><button @click="borrarCurso(curso.id)">Borrar</button></td>
            </tr>
        </tbody>
        
    </table><br><br>

    <crearCurso></crearCurso>

</template>