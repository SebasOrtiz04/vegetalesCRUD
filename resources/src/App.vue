<template>

    <header>
        <nav class="nav">
            <router-link to="/">Inventario</router-link>
            <router-link to="/historial">Historial</router-link>
            <router-link to="/admin">Administrador</router-link>
        </nav>
    </header>
    <div class="vista">
        <router-view/>
    </div>

    <footer>
        <p>Todos los derechos reservados Sebastian Ortiz &copy;</p>
    </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;700;900&display=swap');
@import "scss/_variables.scss";

html {
  box-sizing: border-box;
  font-family: 'Mulish', sans-serif;
  background: $blanco;
}
*, *:before, *:after {
  box-sizing: inherit;
}
.nav{
    background-color:$azul;
    padding: 1rem;
    a {
        color:$blanco;
        text-decoration: none;
        margin: 1rem;
        text-transform:uppercase;
        font-weight: 700;
        transition: all .4s ease-in-out;
        &:hover{
            color:$verde;
        }

        &.router-link-exact-active {
            color: $verde;
        }
    }
}

.vista{
    min-height:80vh;
}

footer{
    background-color:$azul;
    padding: .2rem 3rem;
    text-align:right;
    p{
        color:$blanco;
    }
}
</style>