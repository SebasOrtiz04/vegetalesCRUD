<template>
    <section>
        <div class="titulo">
            <h2>Productos</h2>
        </div>

        <Loader v-if="loader"/>

        <table v-if="tabla">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th>Última actualización</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(producto, id) in productos" 
                v-bind:key="id">
                    <td>{{ producto.id}}</td>
                    <td>{{ producto.nombre}}</td>
                    <td>{{ producto.descripcion}}</td>
                    <td>{{ producto.cantidad}}</td>
                    <td>{{ producto.unidad}}</td>
                    <td>{{ 
                            producto.fecha.getDate() +'/' +
                            (producto.fecha.getMonth()+1) +'/' +
                            producto.fecha.getFullYear() +' '+
                            producto.fecha.getHours() + ':'+
                            producto.fecha.getMinutes()
                        }}</td>
                    <td>
                        <Boton titulo="Editar" 
                        @click="$router.push({path:'/admin/editar/'+producto.id})"/>
                        <Boton titulo="Eliminar"
                        @click="eliminar(producto.id)"
                        v-if="producto.cantidad===0"/>
                    </td>
                </tr>
            </tbody>

        </table>

    </section>
</template>

<script>

import Boton from "../components/Boton.vue";
import Loader from "../components/Loader.vue";
import axios from "axios";

export default {
    components:{
        Boton,
        Loader
    },
    data(){
        return{
            loader:true,
            tabla:false,
            productos:[]
        }
    },

    methods:{
        peticion(){
            this.productos=[];
            const respuesta = axios.get('http://localhost:8000/api/productos/join');

            respuesta.then((data)=>{
                this.productos=data.data.lista;
                this.configurarDate();
            })
            .catch(e=>{
                console.log(e)
            });
        },
        configurarDate(){
            this.productos.forEach(producto=>{
                    producto.fecha = new Date(producto.updated_at);
            });
            this.loader = false;
            this.tabla = true;
        },
        eliminar(id){
            const respuesta = axios.delete('http://localhost:8000/api/producto/' + id);
            respuesta.then(respuesta =>{
                if(respuesta.data.res) {
                    this.peticion();
                    this.$router.push({path:'/admin/Producto eliminado'});
                }
            });
        }
    },

    beforeMount(){
        this.peticion();
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_normalize.scss";
@import "../scss/_globales.scss";

.titulo{
    margin:2rem 2rem 2rem 0;
    border-bottom:2px solid $azul;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h2{
        margin:0;
    }
    .lupa{
    height: 1rem;
    width:1rem;
    margin: 0 3px;
    &:hover{
        cursor:pointer;
    }
    }
    input{
        border:1px solid $negro;
        border-radius:2px;
        background:$blanco;
        height:2rem;
        margin: .5rem;
        outline:none;
        padding: 0 .5rem;
    }
}

</style>