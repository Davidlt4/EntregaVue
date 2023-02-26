<script setup>

    /** Todos los imports que necesitamos para nuestro componente*/
    import { onAuthStateChanged} from "firebase/auth";
    import {ref} from "vue";
    import {auth} from "../firebase.js"
    import {useFirestore,useCollection } from 'vuefire'
    import {collection,doc,deleteDoc} from "firebase/firestore"; 
    import crearCurso from "./crearCurso.vue"
    import { getStorage,ref as ref2,getDownloadURL } from "firebase/storage";

    /**Sacamos los cursos de la base de firestore*/
    const db = useFirestore()
    const cursos = useCollection(collection(db, 'Cursos'))

    //Funcion para sacar las imagenes de firebase
    function sacarImagen(imagen,nombre){

        var nombre_img= imagen
        // Create a reference with an initial file path and name
        const storage = getStorage();
        const pathReference = ref2(storage, nombre_img);

        getDownloadURL(pathReference).then((url) => {
            const img = document.getElementById(nombre);
            img.setAttribute('src', url);
        })
        .catch((error) => {
            // Handle any errors
        });

    }

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
                 <td><img v-bind:src="sacarImagen(curso.imagen,curso.nombre)" v-bind:id="curso.nombre" width="50" height="50"></td>
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
                 <td><img v-bind:src="sacarImagen(curso.imagen,curso.nombre)" v-bind:id="curso.nombre" width="50" height="50"></td>
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
                 <td><img v-bind:src="sacarImagen(curso.imagen,curso.nombre)" v-bind:id="curso.nombre" width="50" height="50"></td>
                <!--En el caso de que sea admin damos opción a borrar-->
                <td v-if="nombreUsuario=='admin@gmail.com'"><button @click="borrarCurso(curso.id)">Borrar</button></td>
            </tr>
        </tbody>

    </table><br><br>

    <!-- ---------------------------------------------------------------------------------------------------------------- -->

    <!--Mostramos el componente crear curso-->
    <crearCurso></crearCurso>

</template>