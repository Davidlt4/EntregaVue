<script setup>

    /** Este componente nos genera una vista con todos los cursos para Ofimatica*/
    /** Todos los imports que necesitamos para nuestro componente*/
    import { useFirestore,useCollection } from 'vuefire'
    import { collection} from "firebase/firestore";
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

</script>

<template>

    <h1>Ofimatica</h1>

    <!--Generamos una tabla con los detalles de los cursos-->
    <table>
        <thead>
            <tr>
                <td>Nombre</td>
                <td>Horas</td>
                <td>Imagen</td>
                <td v-if="nombreUsuario!=''">Inscripción</td>
            </tr>
        </thead>
        <!--Recorremos nuestros cursos-->
        <tbody v-for="curso in cursos" :key="curso.nombre">
            <!--Y solo mostramos aquellos cuya categoria sea ofimatica-->
            <tr v-if="curso.categoria=='ofimatica'">
                <!--Creamos un router link con el id del curso para así poder mostrar los detalles-->
                <td><router-link v-bind:to="'/detallesCurso/'+curso.id">{{ curso.nombre }}</router-link></td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/img/'+curso.imagen" width="50" height="50"></td>
                <!--Solo mostramos este botón si el usuario está registrado-->
                <td v-if="nombreUsuario!=''"><button>Incribirse</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style>
    table,tr,td{
        border-collapse: collapse;
        padding: 10px;
    }
    thead{
        background-color: rgb(255, 136, 0);
        color: black;
    }
    button{
        background-color: rgb(255, 136, 0);
    }
    a{
        color:  rgb(255, 136, 0);
    }
    a:hover{
        background-color: rgba(0, 0, 0, 0);
        color: white;
    }
</style>