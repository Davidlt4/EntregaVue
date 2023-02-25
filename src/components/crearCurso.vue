<script setup>
    
    /** Este componente nos genera una vista de los detalles del curso que le pasemos */
    /** Todos los imports que necesitamos para nuestro componente*/
    import { useFirestore,useCollection } from 'vuefire'
    import { collection,addDoc} from "firebase/firestore"; 
    import { getStorage, ref as refStrg, uploadBytes } from "firebase/storage";
    import { ref } from "vue";

    /**Sacamos los cursos de la base de firestore*/
    const db = useFirestore()
    const cursos = useCollection(collection(db, 'Cursos'))


    //Cogemos el archivo file por referencia
    let file = ref ("");


    //Función para poder subir la imagen a firestore
    function uploadFile(){

        const storage = getStorage();
        const storageRef = refStrg(storage, file.value.files[0].name);
        uploadBytes(storageRef, file.value.files[0]).then((snapshot) => {
            console.log('Archivo subido');
        });

    }

    //Función para crear un nuevo curso a través de los datos que recogemos de la vista
    function nuevoCurso(){

        //Recogemos los datos de la vista
        let categoria=document.getElementById("categoria").value;
        let nombre=document.getElementById("nombre").value;
        let horas=document.getElementById("horas").value;
        console.log(horas);
        let imagen=file.value.files[0].name;

        //Y lo añadimos a la colección
        const docRef = addDoc(collection(db, "Cursos"), {
            categoria: categoria,
            nombre: nombre,
            horas: horas,
            imagen: imagen
        });

        //Avisamos al usuario de que el curso se ha creado correctamente
        alert("El curso se ha creado correctamente");

    }

    //Definimos los campos que va a tener el curso
    defineProps({
        categoria: String,
        nombre: String,
        horas: String,
        imagen: String
    })


</script>

<template>

    <!--Fieldset donde colocamos inputs para rellenar los datos necesarios para crear un curso-->
    <fieldset>
        
        <h3>Nueva Curso: </h3><br>

        <label>Categoria: </label>

        <!--Mostramos las categorías disponibles-->
        <select name="categoria" id="categoria">
            <option value="programacion">Programación</option>
            <option value="SOs">Sistemas Operativos</option>
            <option value="ofimatica">Ofimatica</option>
        </select>
        <br><br>

        <label>Nombre: </label>
        <input type="text" name="nombre" id="nombre" /><br><br>

        <label>Horas: </label>
        <input type="number" min="20" max="999" name="horas" id="horas" /><br><br>

        <label>Imagen: </label>
        <!--Este input nos subirá la imagen que se coloque a firestore-->
        <input type="file" name="file" id="file" ref="file" @change="uploadFile">
        <br><br>

        <button @click="nuevoCurso">Crear Curso</button>

    </fieldset>


</template>