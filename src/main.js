/** Este componente nos genera una vista de los detalles del curso que le pasemos */
/** Todos los imports que necesitamos para nuestro componente*/

import { createApp } from 'vue'
import App from './App.vue'

//Rutas principales
import './assets/main.css'
import TheWelcome from "./components/TheWelcome.vue"
import registro from "./components/registro.vue"
import privado from "./components/privado.vue"

//Categorías
import ofimatica from "./components/ofimatica.vue"
import programacion from "./components/programacion.vue"
import SOs from "./components/SOs.vue"
import detallesCurso from "./components/detallesCurso.vue"

//Para Rutas y Login
import { createRouter,createWebHistory } from 'vue-router'
import { onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase.js"


let estaAutenticado=false;

//Funcion que nos cambia el estado de autenticado
onAuthStateChanged(auth, (user) => {

    if (user) {
        const uid = user.uid;
        estaAutenticado=true;
    } else {
        estaAutenticado=false;
        
        router.push("/");
    }

});


//Establecemos las rutas para nuestra página
const routes = [

    { 
        path: '/',
        component: TheWelcome
    },

    { 
        path: '/registro', component: registro
    },

    { 
        path: '/ofimatica', component: ofimatica
    },

    { 
        path: '/programacion', component: programacion
    },

    { 
        path: '/SOs', component: SOs
    },

    { 
        path: '/privado', component: privado,
        beforeEnter: (to, from) => {
            // reject the navigation
            return estaAutenticado
        }
    },

    {
        path: "/detallesCurso/:id",
        component: detallesCurso
    }

]

//Y las generamos
export const router=createRouter({
    history: createWebHistory(),
    routes
})

const app= createApp(App)
app.use(router)
app.mount('#app')
