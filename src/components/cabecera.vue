<script setup>

    import { onAuthStateChanged,signOut} from "firebase/auth";
    import {ref} from "vue";
    import {auth} from "../firebase.js"

    let nombreUsuario=ref("");

    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        nombreUsuario.value=user.email;
    }
    });


    function cerrarSesion(){
        signOut(auth).then(() => {
            nombreUsuario='';
            //location.reload();
        }).catch((error) => {
        // An error happened.
        });
    }

</script>

<template>
    <header>
        <nav>

            <router-link to="/">Inicio</router-link>
            <router-link to="/ofimatica">Ofimatica</router-link>
            <router-link to="/programacion">Programación</router-link> 
            <router-link to="/SOs">SOs</router-link>
            <router-link v-if="nombreUsuario!=''" to="/privado">Administración</router-link>
            <router-link v-if="nombreUsuario==''" to="/registro">Login</router-link>
            <button @click="cerrarSesion" v-else="nombreUsuario!=''">Cerrar sesion</button>
            <p v-if="nombreUsuario!=''">{{ nombreUsuario }}</p>

        </nav>
    </header>
</template>


<style scoped>

header {
    width: 100%;
  }
  
  nav{
    margin: auto;
    width: 100%;
  }


    button{
        width: 100px;
        height: 30px;
        border-radius: 10px;
    }

    a{
        color: rgb(255, 136, 0);
        margin:10px;
        font-size: 25px;
    }

    a:hover{
        color: white;
        background-color:rgba(0, 0, 0, 0);
    }

</style>
