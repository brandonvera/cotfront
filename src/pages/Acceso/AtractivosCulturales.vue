<template>
  <div class="row">
      <div class="col-12">

        <div class="barra">
          <form class="form-inline my-2 my-lg-0">
              <input
                  class="form-control mr-sm-2 buscador"
                  type="search"
                  placeholder="Nombre"
                  aria-label="Search"
                  v-model="buscador"
                  @keyup="buscarCulturales"
              >
          </form>
        </div>

        <div class="barra">
          <label v-on:click.prevent="atras" class="atras m-2">
            Atras <span class="ti-arrow-left"></span>
          </label>
          
          <label class="btn btn-success m-2"  v-on:click.prevent="crear" v-if="rol == 1">
              Crear
              <span style="cursor: pointer" class="ti-plus"></span>
          </label>
          
          <label class="btn btn-info m-2" v-if="rol == 1">
              Exportar 
              <span class="ti-arrow-down"></span>
              <input style="display:none" v-on:click.prevent="exportar">
          </label>
          
          <form id="mainForm" v-if="rol == 1">
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
            name="cult" 
            :list="cult" 
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
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                  <th>Municipio</th>        
                  <th>Creado</th>
                  <th>Modificado</th>
                  <th v-if="rol == 1">Acción</th>           
                </slot>
                </thead>
                <tbody class="table-bordered text-center">    
                <tr v-for="(item, index) in paginated('cult')" :key="index">
                  <slot> 
                    <td>{{item.id}}</td>
                    <td>{{item.nombre}}</td>
                    <td>{{item.direccion}}</td>
                    <td>{{item.estado}}</td>
                    <td>{{item.municipio.nombre}}</td>     
                    <td>{{item.created_at.split("T")[0]}}</td>
                    <td>{{item.updated_at.split("T")[0]}}</td>
                    <td v-if="rol == 1">
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
                  for="cult"
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
		name: 'Culturales',

		data() {
			return {
        loader: null,
        loader2: true,
				token: localStorage.getItem('user_token'),
        rol: localStorage.getItem('rol'),
				municipio: localStorage.getItem('ref'),
        data: '',
				cult: [],
        paginate: ['cult'],
        buscador: '',
        setTimeoutBuscador: ''
			}
		},

		created() {
			this.verCulturales()
		},

		methods: {
      verCulturales() {
        axios.get(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/cultural/${this.municipio}`,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            },
            params:{
              buscador: this.buscador
            }
          }).then((result) => {
            if(this.rol == 1) {
              this.cult = result.data.culturalTodo;
            } else{
              this.cult = result.data.cultural;
            }
          }).catch(error => {
            console.log(error);
        })
      },

      buscarCulturales() {
        clearTimeout( this.setTimeoutBuscador )
        this.setTimeoutBuscador = setTimeout(this.verCulturales, 360)
      },

      async crear() {
        this.$router.push('crear-culturales');
      },

      atras() {
        this.$router.push('/opciones');
      },

      async editar(id) {
        localStorage.setItem("cul", id);
        this.$router.push('editar-culturales');
      },

      async eliminar(id) {
        try 
        {
          this.loader2 = false
          this.loader = true

          let response = await axios.delete(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/cultural/eliminar/${id}`,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
          })
          if (response.status == 200) {
            this.$swal({
                  icon: 'success',
                  title: 'Atractivo Cultural desactivado con éxito!',
                  text: 'El atractivo cultural seleccionado fue desactivado con éxito!',
            })
            this.$router.push('/opciones')
          }
        }
        catch (error)
        {
          this.loader2 = true
          this.loader = null
          this.$swal({title: 'Ocurrió un érror!',text: 'Valide la acción nuevamente!',icon: 'info'})
        }
      },

      async exportar() {

        axios({
          url: `https://enigmatic-oasis-44862.herokuapp.com/api/auth/cultural/exportar`,
          method: 'GET',
          headers:{"Authorization": `Bearer ${this.token}`},
          responseType: 'blob',
        })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', `AtractivosCulturales.xlsx`);
          document.body.appendChild(fileLink);
          fileLink.click();
          this.$swal({
            icon: 'success',
            title: '¡Archivo descargado con éxito!',
          })
        });
      },

      importar() {
        var $mainForm = ('#mainForm')
        var data = new FormData(mainForm)

        axios.post(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/cultural/importar`, data, {
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
        })
        .then((response) => {
          this.$swal({
            icon: 'success',
            title: 'Atractivo Cultural importado con éxito!',
            text: 'El atractivo cultural seleccionado fue importado con éxito!',
          })
        })
        .catch((error) => {
          this.$swal({
            icon: 'info',
            title: 'Ocurrió un érror!',
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