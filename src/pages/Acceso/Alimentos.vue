<template>
  <div class="row">
      <div class="col-12">
      	
          Atras <span style="cursor: pointer" class="ti-arrow-left" v-on:click.prevent="atras"></span>
        
          <label class="btn btn-danger" style="margin: 5px" v-on:click.prevent="crear">
              Crear
              <span style="cursor: pointer" class="ti-plus"></span>
          </label>
        
          <label class="btn btn-danger" style="margin: 5px">
              Exportar Archivo
              <span class="ti-arrow-down"></span>
              <input style="display:none" v-on:click.prevent="exportar">
          </label>
          
          <form id="mainForm">
            <label class="btn btn-info" style="margin: 5px">
              Seleccionar Archivo
              <span class="ti-exchange-vertical"></span>
              <input style="display:none" type="file" name="data" class="btn btn-danger">
            </label>
            <label class="btn btn-success" style="margin: 5px">
              Importar Archivo
              <span class="ti-arrow-up"></span>
              <input type="submit" style="display:none" name="upload" @click.prevent="importar">
            </label>
          </form>
        
          <card class="card-plain">
            <div class="table-full-width table-responsive">
              <table class="table table-hover">
                <thead class="bg-dark text-white">
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
                  <th>Acción</th>           
                </slot>
                </thead class="bg-white">
                <tbody>
                <tr v-for="(item, index) in ali" :key="index">
                  <slot>
                    <td>{{item.id}}</td>
                    <td>{{item.razon_social}}</td>
                    <td>{{item.establecimientos}}</td>
                    <td>{{item.telefono}}</td>
                    <td>{{item.correo}}</td>
                    <td>{{item.direccion_principal}}</td>
                    <td>{{item.municipio.nombre}}</td>
                    <td>{{item.representante.nombre}}</td>
                    <td>{{item.estado}}</td>
                    <!-- <td>{{item.created_at.split("T")[0]}}</td> -->
                    <td>
                      <div >
                        <span class="ti-pencil mx-3 text-warning" style="cursor: pointer" v-on:click.prevent="editar(item.id)"></span>
                        <span class="ti-na mx-3 text-danger" style="cursor: pointer" v-on:click.prevent="eliminar(item.id)"></span>
                        </div>
                    </td>
                  </slot>
                </tr>
                </tbody>
              </table>
            </div>
            <!-- <div class="spinner my-auto mx-auto" v-if="loader"></div> -->
          </card>
      </div>
  </div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'Alimentos',

		data() {
			return {
				token: localStorage.getItem('user_token'),
				municipio: localStorage.getItem('ref'),
        data: '',
				ali: []
			}
		},

		created() {
			axios.get(`http://127.0.0.1:8000/api/auth/alimento/${this.municipio}`,{
		      headers:{
		        'Authorization': `Bearer ${this.token}`
		      }
		    }).then((result) => {
		      this.ali = result.data.alimentoTodo;
		    }).catch(error => {
		      console.log(error);
		    })
		},

		methods: {
      async crear() {
        this.$router.push('crear-alimentos');
      },

      atras() {
        this.$router.push('/opciones');
      },

      async editar(id) {
        localStorage.setItem("alim", id);
        this.$router.push('/editar-alimentos');
      },

      async eliminar(id) {
        try 
        {
          let response = await axios.delete(`http://127.0.0.1:8000/api/auth/alimento/eliminar/${id}`,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
          })
          if (response.status == 200) {
            this.$swal({
                  icon: 'success',
                  title: 'Alimento desactivado con exito!',
                  text: 'El alimento seleccionado fue desactivado con exito!',
            })
          }
        }
        catch (error)
        {
          this.$swal({title: 'Ocurrio un error!',text: 'Valide la accion nuevamente!',icon: 'info'})
        }
      },

      async exportar() {

        axios({
          url: `http://127.0.0.1:8000/api/auth/alimento/exportar`,
          method: 'GET',
          headers:{"Authorization": `Bearer ${this.token}`},
          responseType: 'blob',
        })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', `Alimentos.xlsx`);
          document.body.appendChild(fileLink);
          fileLink.click();
          // this.loader = false
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: '¡Archivo descargado con exito!',
            showConfirmButton: false,
            timer: 2000
          })
        });

        // await axios.get(`http://127.0.0.1:8000/api/auth/alimento/exportar`,{
        //   headers:{
        //     'Authorization': `Bearer ${this.token}`
        //   }
        // }).then(response => {
        //   this.$swal({title: 'Ocurrio un error!',text: 'Valide la accion nuevamente!',icon: 'info'})
        // }).catch(error => {
        //   console.log(error);
        // })
      },

      importar() {
        var $mainForm = ('#mainForm')
        var data = new FormData(mainForm)

        axios.post(`http://127.0.0.1:8000/api/auth/alimento/importar`, data, {
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
        })
        .then((response) => {
          this.$swal({
            icon: 'success',
            title: 'Alimento importado con exito!',
            text: 'El alimento seleccionado fue importado con exito!',
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
	
</style>