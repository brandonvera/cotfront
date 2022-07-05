<template>
  <div class="row">
      <div class="col-12">

        <div class="barra">
          <form class="form-inline my-2 my-lg-0">
              <input
                  class="form-control mr-sm-2 buscador"
                  type="search"
                  placeholder="Razon Social"
                  aria-label="Search"
                  v-model="buscador"
                  @keyup="buscarRecreaciones"
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
          
          <form id="mainForm">
            <label class="btn btn-dark m-2">
              Seleccionar
              <span class="ti-exchange-vertical"></span>
              <input style="display:none" type="file" name="data" class="btn btn-danger">
            </label>
            <label class="btn btn-danger m-2">
              Importar 
              <span class="ti-arrow-up"></span>
              <input type="submit" style="display:none" name="upload" @click.prevent="importar">
            </label>
          </form>
        </div>
          <paginate 
            name="recre" 
            :list="recre" 
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
                  <th>Razon Social</th>
                  <th>Establecimientos</th>
                  <th>Telefono</th>
                  <th>Correo</th>
                  <th>Dirección</th>
                  <th>Municipio</th>
                  <th>Representante</th>
                  <th>Estado</th>
                  <th>Creado</th>
                  <th>Modificado</th>
                  <th>Acción</th>           
                </slot>
                </thead>
                <tbody class="table-bordered text-center">    
                <tr v-for="(item, index) in paginated('recre')" :key="index">
                  <slot> 
                    <td>{{item.id}}</td>
                    <td>{{item.razon_social}}</td>
                    <td>{{item.establecimientos}}</td>
                    <td>{{item.telefono}}</td>
                    <td>{{item.correo}}</td>
                    <td>{{item.direccion_principal}}</td>
                    <td>{{item.municipio.nombre}}</td>
                    <td>{{item.representante.persona}}</td>
                    <td>{{item.estado}}</td>
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
                  for="recre"
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
		name: 'Recreaciones',

		data() {
			return {
        loader: null,
        loader2: true,
				token: localStorage.getItem('user_token'),
				municipio: localStorage.getItem('ref'),
        data: '',
				recre: [],
        paginate: ['recre'],
        buscador: '',
        setTimeoutBuscador: ''
			}
		},

		created() {
			this.verRecreaciones()
		},

		methods: {
      verRecreaciones() {
        axios.get(`http://127.0.0.1:8000/api/auth/recreacion/${this.municipio}`,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            },
            params:{
              buscador: this.buscador
            }
          }).then((result) => {
            this.recre = result.data.recreacionTodo;
          }).catch(error => {
            console.log(error);
        })
      },

      buscarRecreaciones() {
        clearTimeout( this.setTimeoutBuscador )
        this.setTimeoutBuscador = setTimeout(this.verRecreaciones, 360)
      },

      async crear() {
        this.$router.push('crear-recreaciones');
      },

      atras() {
        this.$router.push('/opciones');
      },

      async editar(id) {
        localStorage.setItem("rec", id);
        this.$router.push('editar-recreaciones');
      },

      async eliminar(id) {
        try 
        {
          this.loader2 = false
          this.loader = true

          let response = await axios.delete(`http://127.0.0.1:8000/api/auth/recreacion/eliminar/${id}`,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
          })
          if (response.status == 200) {
            this.$swal({
                  icon: 'success',
                  title: 'Recreacion desactivada con exito!',
                  text: 'La recreacion seleccionada fue desactivada con exito!',
            })
            this.$router.push('/opciones')
          }
        }
        catch (error)
        {
          this.loader2 = true
          this.loader = null
          this.$swal({title: 'Ocurrio un error!',text: 'Valide la accion nuevamente!',icon: 'info'})
        }
      },

      async exportar() {

        axios({
          url: `http://127.0.0.1:8000/api/auth/recreacion/exportar`,
          method: 'GET',
          headers:{"Authorization": `Bearer ${this.token}`},
          responseType: 'blob',
        })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', `Recreaciones.xlsx`);
          document.body.appendChild(fileLink);
          fileLink.click();
          this.$swal({
            icon: 'success',
            title: '¡Archivo descargado con exito!',
          })
        });
      },

      importar() {
        var $mainForm = ('#mainForm')
        var data = new FormData(mainForm)

        axios.post(`http://127.0.0.1:8000/api/auth/recreacion/importar`, data, {
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
        })
        .then((response) => {
          this.$swal({
            icon: 'success',
            title: 'Recreacion importada con exito!',
            text: 'La Recreacion seleccionada fue importada con exito!',
          })
        })
        .catch((error) => {
          this.$swal({
            icon: 'info',
            title: 'Ocurrio un error!',
            text: 'Valide la información nuevamente!',
          })
        })
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