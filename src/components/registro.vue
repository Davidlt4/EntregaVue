<script setup>

    import {ref} from "vue";
    import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
    import {auth} from "../firebase.js"

    var usuario=ref(""),contrasena=ref("");

    function altaUsuario(){
        createUserWithEmailAndPassword(auth,usuario.value,contrasena.value).then((userCredential) => {
            const user = userCredential.user;  
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    function loginUsuario(){
        signInWithEmailAndPassword(auth,usuario.value, contrasena.value).then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const provider = new GoogleAuthProvider();

    function loginGoogle(){
        signInWithPopup(auth, provider).then((result) => {
        
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        
        }).catch((error) => {
        
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

        });
    }

</script>


<template>

    <fieldset>
        <legend><h2>Registro Usuario</h2></legend><br>
        Email: <input type="text" name="" id="" v-model="usuario" placeholder="Email"/><br><br>
        Password: <input type="password" name="" id="" v-model="contrasena" placeholder="Contraseña"/><br><br>

        <button @click="altaUsuario">Registro de usuario</button>
        <br><br>
        <button @click="loginUsuario">Login de usuario</button>
        <br><br>
        <button @click="loginGoogle">Login de Google</button>
        
    </fieldset>

</template>


<style>

    legend{
        color: white;
    }

    input{
        outline: none;
    }

    input:focus{
        transition: all 300ms;
        border:1px solid hsla(160, 100%, 37%, 1);
        box-shadow: 0px 0px 8px hsla(160, 100%, 37%, 1);
    }

    button{
        padding: 3px;
        border-radius: 5px;
        background-color:  hsla(160, 100%, 37%, 1) ;
        border: none;
    }

    button:hover{
        background-color: white;
    }


</style>
