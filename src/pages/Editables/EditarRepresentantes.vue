<template>
	<div class="row justify-content-center">
    	<div class="col-xl-8 col-lg-7 col-md-6">
    		<div class="bot">
				<label v-on:click.prevent="atras" class="atras mb-4">
	            	Atras <span class="ti-arrow-left"></span>
	        	</label>
        	</div>
    		<card class="card" title="Editar Representante">
          		<div>
          			<form class="form" @submit.stop.prevent="editarRepresentante">

          				<div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Persona"
		                              placeholder="Persona"
		                              v-model="representantes.persona"
		                              id="inputNombre">
		                    </fg-input>
		                  </div>
		                </div>

		                <!-- <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Apellido"
		                              placeholder="Apellido"
		                              v-model="representantes.apellido"
		                              id="inputNombre">
		                    </fg-input>
		                  </div>
		                </div> -->

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Cargo"
		                              placeholder="Cargo"
		                              v-model="representantes.cargo"
		                              id="inputNombre">
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Telefono"
		                              placeholder="Telefono"
		                              v-model="representantes.telefono"
		                              id="inputEstado"
		                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)">
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="email"
		                              label="Correo"
		                              placeholder="Correo"
		                              v-model="representantes.correo"
		                              id="inputNombre">
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <label for="Dirección">Dirección Principal</label>
		                    <textarea
		                      name="Dirección"
		                      id="descripcion"
		                      class="form-control"
		                      cols="30"
		                      rows="1"
		                      v-model="representantes.direccion"
		                      placeholder="Dirección"
		                    >
		                    </textarea>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <label for="Estado">Estado</label>
		                    <select
		                      name="Estado"
		                      id="Estado"
		                      class="form-control"
		                      v-model="representantes.estado"
		                    >
		                      <option disabled value="">Seleccione algun Estado</option>
		                      <option value="ACTIVO">Activo</option>
		                      <option value="INACTIVO">Inactivo</option>
		                    </select>
		                  </div>
		                </div>

		                <div class="text-center">
			                <button class="btn btn-info" type="submit" v-if="loader2">guardar</button>
			            </div>

              			<div class="spinnerc my-auto mx-auto" v-if="loader"></div>

          			</form>
          		</div>
          	</card>
    	</div>
    </div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'EditarRepresentantes',

		data() {
			return {
				token: localStorage.getItem('user_token'),
				rep_id: localStorage.getItem('rep'),
				municipio: localStorage.getItem('ref'),
				representantes: {
					persona: '',
					cargo: '',
					telefono: '',
					correo: '',
					direccion: '',
					estado: '',
				},
				loader: null,
      			loader2: true
			}
		},

		mounted() {
			this.MostrarRepresentante()
		},

		methods: {
		    async MostrarRepresentante() {
		      await this.axios.get(`http://127.0.0.1:8000/api/auth/representante/${this.rep_id}`,{
		        headers:{
		          "Authorization": `Bearer ${this.token}`
		        }
		      })
		      .then(response => {
		        const {
		        	persona,
		        	cargo,
		        	telefono,
		        	correo,
		        	direccion,
		        	estado,
		        } = response.data.representante

		        this.representantes.persona = persona
		        this.representantes.cargo = cargo
		        this.representantes.telefono = telefono
		        this.representantes.correo = correo		        
		        this.representantes.direccion = direccion
		        this.representantes.estado = estado	      
		      })
		      .catch(error => {
		        console.log(error)
		      })
		    },

		    async editarRepresentante() {
		      this.loader = true
		      this.loader2 = false
		      
		      await this.axios.put(`http://127.0.0.1:8000/api/auth/representante/modificar/${this.rep_id}`,this.representantes,
		      {
		        headers:{
		          "Authorization": `Bearer ${this.token}`
		        }
		      })
		      .then(response => {
		        this.loader = false
		        this.loader2 = true
		        this.$swal({
		              icon: 'success',
		              title: 'Modificación exitosa!',
		              text: 'Representante modificado con exito!',
		        }); 
		        localStorage.removeItem('rep')
		        this.$router.push('/representantes')
		      })
		      .catch(error => {
		        this.loader = false
		        this.loader2 = true
		        this.$swal({
		              title: 'Ocurrio un error!',
		              text: 'Valide la informacion suministrada nuevamente!',
		              icon: 'info'
		        })
		      })
    		},

    		atras(){
    			localStorage.removeItem('rep')
    			this.$router.push('/representantes')
    		}
		}
	}
</script>

<style>
	.spinnerc {
	  border: 4px solid green;
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
</style>