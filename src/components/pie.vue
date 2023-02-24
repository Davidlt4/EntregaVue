<script setup>

</script>

<template>
    <footer>
        <copy>Autor: David López Tapias</copy>
        <a href="#">Politica de privacidad</a>
        <a href="">Github</a>
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

    footer{
        position: sticky;
        bottom: 0;
        margin-top: 100px;
        display: flex;
        flex-direction: row;
    }

    copy{
        margin: 10px;
    }

    a{
        color: rgb(255, 136, 0);
        margin:10px;
    }

    a:hover{
        color: white;
        background-color:rgba(0, 0, 0, 0);
    }

</style>