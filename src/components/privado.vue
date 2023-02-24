<script setup>

    import { onAuthStateChanged} from "firebase/auth";
    import {ref} from "vue";
    import {auth} from "../firebase.js"
    

    let nombreUsuario=ref("");

    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        nombreUsuario.value=user.email;
    }
    });


    

</script>

<template>
    <h1>Bienvenido a la zona de Administración</h1>
    <h2>{{ nombreUsuario }}</h2><br>
    <br><br>
</template>