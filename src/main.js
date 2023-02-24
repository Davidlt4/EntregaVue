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


import { createRouter,createWebHistory } from 'vue-router'
import { onAuthStateChanged,signOut } from "firebase/auth";
import {auth} from "./firebase.js"


let estaAutenticado=false;


onAuthStateChanged(auth, (user) => {

    if (user) {
        const uid = user.uid;
        estaAutenticado=true;
    } else {
        estaAutenticado=false;
        router.push("/");
    }

});



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

]


export const router=createRouter({
    history: createWebHistory(),
    routes
})

const app= createApp(App)
app.use(router)
app.mount('#app')
