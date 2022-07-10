<template>
	<div class="row justify-content-center">
    	<div class="col-xl-8 col-lg-7 col-md-6">
    		<div class="bot">
				<label v-on:click.prevent="atras" class="atras mb-4">
	            	Atras <span class="ti-arrow-left"></span>
	        	</label>
        	</div>
    		<card class="card" title="Editar Atractivo Natural">
          		<div>
          			<form class="form" @submit.stop.prevent="editarNatural">

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
		name: 'EditarNaturales',

		data() {
			return {
				token: localStorage.getItem('user_token'),
				nat_id: localStorage.getItem('nat'),
				municipio: localStorage.getItem('ref'),
				municipioActual: null,
				muni: [],
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
			this.MostrarNatural()
			this.Municipios()
		},

		methods: {
			async Municipios(){
		      let response = await this.axios.get(`http://127.0.0.1:8000/api/auth/municipio`, {
		        headers:{
		          "Authorization": `Bearer ${this.token}`
		        }
		      })
		      this.muni = response.data.municipio
		    },

		    async MostrarNatural() {
		      await this.axios.get(`http://127.0.0.1:8000/api/auth/natural/ver/${this.nat_id}`,{
		        headers:{
		          "Authorization": `Bearer ${this.token}`
		        }
		      })
		      .then(response => {
		        const {
		        	nombre,
		        	direccion,
		        	estado,
		        	id_municipio,		        
		        } = response.data.natural

		        this.naturales.nombre = nombre
		        this.naturales.direccion = direccion
		        this.naturales.estado = estado
		        this.naturales.id_municipio = id_municipio
		        this.municipioActual = response.data.natural.municipio.nombre

		      })
		      .catch(error => {
		        console.log(error)
		      })
		    },

		    async editarNatural() {
		      this.loader = true
		      this.loader2 = false
		      
		      await this.axios.put(`http://127.0.0.1:8000/api/auth/natural/modificar/${this.nat_id}`,this.naturales,
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
		              title: 'Modificación éxitosa!',
		              text: 'Atractivo Natural modificado con éxito!',
		        }); 
		        localStorage.removeItem('nat')
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
    		},

    		atras(){
    			localStorage.removeItem('nat')
    			this.$router.push('/naturales')
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