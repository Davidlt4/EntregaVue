<script setup>
//import HelloWorld from './components/HelloWorld.vue'
//import TheWelcome from './components/TheWelcome.vue'
import pie from "./components/pie.vue"
import cabecera from "./components/cabecera.vue"

import { onAuthStateChanged} from "firebase/auth";

import {ref} from "vue";
import {auth} from "./firebase.js";

import { onMounted } from 'vue';


let nombreUsuario=ref("");

onAuthStateChanged(auth, (user) => {
if (user) {
    const uid = user.uid;
    nombreUsuario.value=user.email;
}
});


const loading = ref(true)

onMounted(() => {
  // Aquí obtén los datos
  // Cuando se hayan obtenido, establece loading en false después de 2 segundos
  setTimeout(() => {
    loading.value = false
  }, 2000)
})

</script>

<template>

  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
    <cabecera></cabecera>
  </header>

  <main>
    <!-- <TheWelcome /> -->
    <div v-if="loading" class="preload"></div>
    <div v-else> <router-view></router-view> </div>
  </main>

  <footer>
    <pie></pie>
  </footer>

</template>

<style scoped>

  html{
    margin: 0;
    height: 100%;
  }

  body{
    margin: 0;
  }


  a{
    color: rgb(255, 136, 0);
  }

  a:hover{
    color: white;
    background-color:rgba(0, 0, 0, 0);
  }

  header {
    line-height: 1.5;
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


@media (min-width: 1024px){

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
    header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }


}

</style>
