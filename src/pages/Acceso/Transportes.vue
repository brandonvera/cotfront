<template>
  <div class="row">
      <div class="col-12">

        <div class="barra">
          <form class="form-inline my-2 my-lg-0">
              <input
                  class="form-control mr-sm-2 buscador"
                  type="search"
                  placeholder="Razón Social o Estado"
                  aria-label="Search"
                  v-model="buscador"
                  @keyup="buscarTransportes"
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
            name="tran" 
            :list="tran" 
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
                  <th>Razón Social</th>
                  <th>Establecimientos</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Dirección</th>
                  <th>Municipio</th>
                  <th>Representante</th>
                  <th>Estado</th>
                  <th>Creado</th>
                  <th>Modificado</th>
                  <th v-if="rol == 1">Acción</th>           
                </slot>
                </thead>
                <tbody class="table-bordered text-center">    
                <tr v-for="(item, index) in paginated('tran')" :key="index">
                  <slot> 
                    <td>{{item.id}}</td>
                    <td>{{item.razon_social}}</td>
                    <td>{{item.establecimientos == null ? "-" : item.establecimientos}}</td>
                    <td>{{item.telefono == null ? "-" : item.telefono}}</td>
                    <td>{{item.correo == null ? "-" : item.correo}}</td>
                    <td>{{item.direccion_principal == null ? "-" : item.direccion_principal}}</td>
                    <td>{{item.municipio.nombre}}</td>
                    <td>{{item.representante == null ? "-" : item.representante.persona}}</td>
                    <td>{{item.estado}}</td>
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
                  for="tran"
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
		name: 'Transportes',

		data() {
			return {
        loader: null,
        loader2: true,
				token: localStorage.getItem('user_token'),
				municipio: localStorage.getItem('ref'),
        rol: localStorage.getItem('rol'),
        data: '',
				tran: [],
        paginate: ['tran'],
        buscador: '',
        setTimeoutBuscador: ''
			}
		},

		created() {
			this.verTransportes()
		},

		methods: {
      verTransportes() {
        axios.get(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/transporte/${this.municipio}`,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            },
            params:{
              buscador: this.buscador
            }
          }).then((result) => {
            if(this.rol == 1) {             
              this.tran = result.data.transporteTodo;
            }else {
              this.tran = result.data.transporte;
            }           
          }).catch(error => {
            console.log(error);
        })
      },

      buscarTransportes() {
        clearTimeout( this.setTimeoutBuscador )
        this.setTimeoutBuscador = setTimeout(this.verTransportes, 360)
      },

      async crear() {
        this.$router.push('crear-transportes');
      },

      atras() {
        this.$router.push('/opciones');
      },

      async editar(id) {
        localStorage.setItem("tra", id);
        this.$router.push('editar-transportes');
      },

      async eliminar(id) {
        try 
        {
          this.loader2 = false
          this.loader = true

          let response = await axios.delete(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/transporte/eliminar/${id}`,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
          })
          if (response.status == 200) {
            this.$swal({
                  icon: 'success',
                  title: 'Transporte desactivado con éxito!',
                  text: 'El trasnporte seleccionado fue desactivado con éxito!',
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
          url: `https://enigmatic-oasis-44862.herokuapp.com/api/auth/transporte/exportar`,
          method: 'GET',
          headers:{"Authorization": `Bearer ${this.token}`},
          responseType: 'blob',
        })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', `Transportes.xlsx`);
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

        axios.post(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/transporte/importar`, data, {
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
        })
        .then((response) => {
          this.$swal({
            icon: 'success',
            title: 'Transporte importado con éxito!',
            text: 'El transporte seleccionado fue importado con éxito!',
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