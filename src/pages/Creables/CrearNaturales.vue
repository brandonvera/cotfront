<template>
	<div class="row justify-content-center">
    	<div class="col-xl-8 col-lg-7 col-md-6">
    		<div class="bot">
				<label v-on:click.prevent="atras" class="atras mb-4">
	            	Atras <span class="ti-arrow-left"></span>
	        	</label>
        	</div>
    		<card class="card" title="Crear Atractivo Natural">
          		<div>
          			<form class="form" @submit.stop.prevent="crearNatural">

          				<div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Nombre"
		                              placeholder="Nombre"
		                              v-model="naturales.nombre"
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
		                      v-model="naturales.direccion"
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
		                      v-model="naturales.estado"
		                    >
		                      <option disabled value="">Seleccione algún Estado</option>
		                      <option value="ACTIVO">Activo</option>
		                      <option value="INACTIVO">Inactivo</option>
		                    </select>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <label for="Municipio">Municipio</label>
		                    <select
		                        name="Municipio"
		                        id="Municipio"
		                        class="form-control"
		                        required
		                        v-model="naturales.id_municipio"
		                    >
		                        <option disabled value="">
		                        </option>
		                        <option v-for="m in muni" :key="m.id" v-bind:value="m.id">{{
		                          m.nombre
		                        }}</option>
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
		name: 'CrearNaturales',

		data() {
			return {
				token: localStorage.getItem('user_token'),
				muni: [],
				repre: [],
				naturales: {
					nombre: '',
					direccion: '',
					estado: '',
					id_municipio: Number,
				},
				loader: null,
      			loader2: true
			}
		},

		mounted() {
			this.Municipios()
			this.Representantes()
		},

		methods: {
			async Municipios() {
		      let response = await this.axios.get(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/municipio`, {
		        headers:{
		          "Authorization": `Bearer ${this.token}`
		        }
		      })
		      this.muni = response.data.municipio
		    },

		    async Representantes() {
		      let response = await this.axios.get(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/representante`, {
		        headers:{
		          "Authorization": `Bearer ${this.token}`
		        }
		      })
		      this.repre = response.data.representante
		    },

		    atras(){
    			this.$router.push('/naturales')
    		},

    		async crearNatural() {
    			this.loader = true
      			this.loader2 = false

      			await this.axios.post(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/natural/crear`, this.naturales, {
		        	headers:{
		          		"Authorization": `Bearer ${this.token}`
		        	}
		      	})
      			.then(response => {
      				this.loader = false
			        this.loader2 = true
			        this.naturales.nombre = ''			   
			        this.naturales.direccion = ''
			        this.naturales.estado = ''
			        this.naturales.id_municipio = ''
			        this.$swal({
			              icon: 'success',
			              title: 'Creación éxitosa!',
			              text: 'Registro de atractivo natural creado con éxito!',
			        });
			        this.$router.push('/naturales')
      			})
      			.catch(error => {
			        this.loader = false
			        this.loader2 = true
			        this.$swal({
			              title: 'Ocurrió un error!',
			              text: 'Valide la información suministrada nuevamente!',
			              icon: 'info'
			    	})
    			})
    		}
		}
	};
</script>

<style>
	.spinnerc {
	  border: 4px solid #759eff;
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