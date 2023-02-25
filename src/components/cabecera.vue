<script setup>

    /** Todos los imports que necesitamos para nuestro componente*/

    import { onAuthStateChanged,signOut} from "firebase/auth";
    import {ref} from "vue";
    import {auth} from "../firebase.js"
    import { onMounted } from 'vue';

    /**Varible nombreUsuario para distinguir si hay un usuario logeado o no*/
    let nombreUsuario=ref("");

    /**Función para logear un usuario y guardar su email en la variable nombreUsuario*/
    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        nombreUsuario.value=user.email;
    }
    });

    /**Función para cerrar sesión y poner la variable nombreUsuario a vacio*/
    function cerrarSesion(){
        signOut(auth).then(() => {
            nombreUsuario='';
            location.reload();
        }).catch((error) => {
        // An error happened.
        });
    }

    /**Constante loading para poner la imagen mientras carga los datos de nuestra página*/
    const loading = ref(true)

    onMounted(() => {
    // Establecemos un loading en false después de 2 segundos
    setTimeout(() => {
        loading.value = false
    }, 2000)
    })

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

    <main>
    <!-- <TheWelcome /> -->
        <div v-if="loading" class="preload"></div>
        <div v-else> <router-view></router-view> </div>
    </main>

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

    .preload {
  width: 60px;
  height: 60px;
  border: 8px solid #ffffff;
  border-top: 8px solid #ffac3f;
  border-radius: 50%;
  animation: spin 0.8s ease-in-out infinite;
  margin: 0 auto;
  backdrop-filter: blur(100px);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


</style>
