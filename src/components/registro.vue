<script setup>

    /** Todos los imports que necesitamos para nuestro componente*/
    import {ref} from "vue";
    import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
    import {auth} from "../firebase.js"

    //Variables de usuario y contrasena pasadas por referencia
    var usuario=ref(""),contrasena=ref("");

    //Función para poder dar de alta a un Usuario a través de un un email y contraseña
    function altaUsuario(){
        createUserWithEmailAndPassword(auth,usuario.value,contrasena.value).then((userCredential) => {
            const user = userCredential.user;  
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    //Login de un usuario por correo y contraseña
    function loginUsuario(){
        signInWithEmailAndPassword(auth,usuario.value, contrasena.value).then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    //---------------Para el login con Google---------------------

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

    //------------------------------------------------------------

</script>


<template>

    <!--Fieldset para mostrar los campos necesarios para registrarse y logearse-->
    <fieldset>
        <legend><h2>Registro Usuario</h2></legend><br>
        Email: <input type="text" name="" id="" v-model="usuario" placeholder="Email"/><br><br>
        Password: <input type="password" name="" id="" v-model="contrasena" placeholder="Contraseña"/><br><br>
        <!--Botón para registrar usuario-->
        <button @click="altaUsuario">Registro de usuario</button>
        <br><br>
        <!--Boton para logear un usuario-->
        <button @click="loginUsuario">Login de usuario</button>
        <br><br>
        <!--Login de Google-->
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
