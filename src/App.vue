<script setup>

/**
 * 
 * Autor: David López Tapias
 * Github:Davidlt4
 * 
 */

 import pie from "./components/pie.vue"
 import cabecera from "./components/cabecera.vue"

/** Todos los imports que necesitamos para nuestra App principal
 * en este caso solo los componentes de pie y de cabecera
*/


</script>

<template>

    <!--Componente cabecera con todos los links necesarios para navegar por nuestra página-->
    <cabecera></cabecera>

    <!--Componente pie para añadir un footer a nuestrá página-->
    <pie></pie>


</template>

<style scoped>

  /* Todo lo referente al css de nuestra web */

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
