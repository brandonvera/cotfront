<template>
	<div class="row">
      <div class="col-12">

        <div class="barra">
          <form class="form-inline my-2 my-lg-0">
              <input
                  class="form-control mr-sm-2 buscador"
                  type="search"
                  placeholder="Código o Estado"
                  aria-label="Search"
                  v-model="buscador"
                  @keyup="buscarUsuarios"
              >
          </form>
        </div>

        <div class="barra">
          <label v-on:click.prevent="atras" class="atras m-2">
            Atras <span class="ti-arrow-left"></span>
          </label>
          
          <label class="btn btn-success m-2"  v-on:click.prevent="crear">
              Crear
              <span style="cursor: pointer" class="ti-plus"></span>
          </label>
          
          <label class="btn btn-info m-2">
              Exportar 
              <span class="ti-arrow-down"></span>
              <input style="display:none" v-on:click.prevent="exportar">
          </label>
        </div>
          <paginate 
            name="usuarios" 
            :list="usuarios" 
            :per="5" 
            tag="tbody"
          >
          </paginate>
          <card class="card-plain">
            <div class="table table-responsive-xl">
              <table class="table table-hover table-dark">
                <thead class="text-center">
                <slot>
                  <th>Id</th>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                  <!-- <th>Contraseña</th> -->
                  <th>Estado</th>
                  <!-- <th>Usuario Creador</th> -->
                  <!-- <th>Usuario Modificador</th> -->
                  <th>Rol</th>
                  <th>Creado</th>
                  <th>Modificado</th>
                  <th>Acción</th>                            
                </slot>
                </thead>
                <tbody class="table-bordered text-center">    
                <tr v-for="(item, index) in paginated('usuarios')" :key="index">
                  <slot> 
                    <td>{{item.id}}</td>
                    <td>{{item.codigo}}</td>
                    <td>{{item.nombre}}</td>
                    <td>{{item.apellido}}</td>
                    <td>{{item.email}}</td>
                    <!-- <td>{{item.password}}</td> -->
                    <td>{{item.estado}}</td>
                    <!-- <td>{{item.usuario_creador.nombre}}</td> -->
                    <!-- <td>{{item.usuario_modificador.nombre}}</td> -->
                    <td>{{item.tipo_usuario.tipo_usuario}}</td>
                    <td>{{item.created_at.split("T")[0]}}</td>
                    <td>{{item.updated_at.split("T")[0]}}</td>
                    <td>
                      <div>
                        <span class="ti-pencil mx-3 text-warning" style="cursor: pointer" v-on:click.prevent="editar(item.id)" v-if="loader2"></span>

                        <span class="ti-na mx-3 text-danger" style="cursor: pointer" v-on:click.prevent="eliminar(item.id)" v-if="loader2"></span>
                      </div>

                      <div class="spinnera my-auto mx-auto" v-if="loader">
                      </div>
                    </td>
                  </slot>
                </tr>            
                </tbody> 
              </table>
            </div>
          </card>
          <div class="d-flex justify-content-center mt-4">
          <paginate-links 
                  for="usuarios"
                  :show-step-links="true"
                  :async="true"
                  :limit="2"
                  :classes="{
                    ul: 'pagination',
                    li: 'page-item',
                    a: 'page-link',
                  }"
                >              
          </paginate-links>
          </div>
      </div>
  </div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'Usuarios',

		data() {
			return {
				loader: null,
				loader2: true,
				token: localStorage.getItem('user_token'),
				usuarios: [],
				paginate: ['usuarios'],
		    buscador: '',
		    setTimeoutBuscador: ''
			}
		},

		mounted() {
			this.verUsuarios() 
		},

		methods: {
			verUsuarios() {
				axios.get(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/usuario`,{
		            	headers:{
		              		'Authorization': `Bearer ${this.token}`
		            	},
		            	params:{
		              		buscador: this.buscador
		            	}
		        }).then((result) => {
		            this.usuarios = result.data.user;
		        }).catch(error => {
		            console.log(error);
		        })
			},

			buscarUsuarios() {
		    clearTimeout( this.setTimeoutBuscador )
		    this.setTimeoutBuscador = setTimeout(this.verUsuarios, 360)
		  },

		    atras() {
		        this.$router.push('/municipios');
		    },

		    async crear() {
		        this.$router.push('/crear-usuarios');
		    },

		    async editar(id) {
		        localStorage.setItem("user", id);
		        this.$router.push('/editar-usuarios');
		    },

		    async eliminar(id) {
		        try 
		        {
		          this.loader2 = false
		          this.loader = true

		          let response = await axios.delete(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/usuario/eliminar/${id}`,{
		            headers:{
		              'Authorization': `Bearer ${this.token}`
		            }
		          })
		          if (response.status == 200) {
		            this.$swal({
	                  icon: 'success',
	                  title: 'Usuario desactivado con éxito!',
	                  text: 'El Usuario seleccionado fue desactivado con éxito!',
		            })
		            this.$router.push('/municipios')
		          }
		        }
		        catch (error)
		        {
		          this.loader2 = true
		          this.loader = null
		          this.$swal({
                  icon: 'error',
                  title: 'No se pudo ejecutar la acción!',
                  text: 'No puedes desactivar este usuario!',
              })
		        }
      		},

      		async exportar() {

		        axios({
		          url: `https://enigmatic-oasis-44862.herokuapp.com/api/auth/usuario/exportar`,
		          method: 'GET',
		          headers:{"Authorization": `Bearer ${this.token}`},
		          responseType: 'blob',
		        })
		        .then((response) => {
		          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
		          var fileLink = document.createElement('a');
		          fileLink.href = fileURL;
		          fileLink.setAttribute('download', `Usuarios.xlsx`);
		          document.body.appendChild(fileLink);
		          fileLink.click();
		          this.$swal({
		            icon: 'success',
		            title: '¡Archivo descargado con éxito!',
		          })
		        });
		    },
		}
	}
</script>

<style>
.atras{
    margin: 5px; 
    cursor: pointer; 
  }

  .atras:hover{
    transform: scale(1.1);
    transition: transform .2s;
  }

  .barra {
    display: flex;
    justify-content: center;
  }

  .spinnera {
    border: 4px solid grey;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: white;

    animation: spin 1s ease infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 680px) {
    .barra{
      display: grid;
      justify-content: center;
    }
  }
</style>