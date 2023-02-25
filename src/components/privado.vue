<script setup>

    /** Todos los imports que necesitamos para nuestro componente*/
    import { onAuthStateChanged} from "firebase/auth";
    import {ref} from "vue";
    import {auth} from "../firebase.js"
    import {useFirestore,useCollection } from 'vuefire'
    import {collection,doc,deleteDoc} from "firebase/firestore"; 
    import crearCurso from "./crearCurso.vue"

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

    //Función para borrar un curso(solo si eres admin)
    function borrarCurso(id){
        deleteDoc(doc((db), 'Cursos', id));
    }



</script>

<template>

    <h1>Bienvenido a la zona de Administración</h1>
    <h2>{{ nombreUsuario }}</h2><br>
    <h2>Cursos</h2><br>

    <!-- -------------------------------------Cursos->Categoría: Programación------------------------------------- -->
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
                <td><router-link v-bind:to="'/detallesCurso/'+curso.id">{{ curso.nombre }}</router-link></td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/img/'+curso.imagen" width="50" height="50"></td>
                <!--En el caso de que sea admin damos opción a borrar-->
                <td v-if="nombreUsuario=='admin@gmail.com'"><button @click="borrarCurso(curso.id)">Borrar</button></td>
            </tr>
        </tbody>
    </table><br><br>
    <!-- ---------------------------------------------------------------------------------------------------------------- -->


    <!-- -------------------------------------Cursos->Categoría: Sistemas Operativos------------------------------------- -->

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
                <td><router-link v-bind:to="'/detallesCurso/'+curso.id">{{ curso.nombre }}</router-link></td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/img/'+curso.imagen" width="50" height="50"></td>
                <!--En el caso de que sea admin damos opción a borrar-->
                <td v-if="nombreUsuario=='admin@gmail.com'"><button @click="borrarCurso(curso.id)">Borrar</button></td>
            </tr>
        </tbody>
    </table><br><br>

    <!-- ---------------------------------------------------------------------------------------------------------------- -->

    <!-- -------------------------------------Cursos->Categoría: Ofimatica------------------------------------- -->

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
                <td><router-link v-bind:to="'/detallesCurso/'+curso.id">{{ curso.nombre }}</router-link></td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/img/'+curso.imagen" width="50" height="50"></td>
                <!--En el caso de que sea admin damos opción a borrar-->
                <td v-if="nombreUsuario=='admin@gmail.com'"><button @click="borrarCurso(curso.id)">Borrar</button></td>
            </tr>
        </tbody>

    </table><br><br>

    <!-- ---------------------------------------------------------------------------------------------------------------- -->

    <!--Mostramos el componente crear curso-->
    <crearCurso></crearCurso>

</template>