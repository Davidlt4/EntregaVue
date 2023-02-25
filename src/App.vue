<script setup>
//import HelloWorld from './components/HelloWorld.vue'
//import TheWelcome from './components/TheWelcome.vue'
import pie from "./components/pie.vue"
import cabecera from "./components/cabecera.vue"
import { onAuthStateChanged,signOut} from "firebase/auth";
import {ref} from "vue";
import {auth} from "./firebase.js";




</script>

<template>

    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
    <cabecera></cabecera>

    <pie></pie>


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

  header {
    width: 100%;
  }
  
  nav{
    margin: auto;
    width: 100%;
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
