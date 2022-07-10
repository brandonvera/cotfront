<template>
	<div class="row justify-content-center">
    	<div class="col-xl-8 col-lg-7 col-md-6">
    		<div class="bot">
				<label v-on:click.prevent="atras" class="atras mb-4">
	            	Atras <span class="ti-arrow-left"></span>
	        	</label>
        	</div>
    		<card class="card" title="Editar Atractivo Cultural">
          		<div>
          			<form class="form" @submit.stop.prevent="editarCultural">

          				<div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Nombre"
		                              placeholder="Nombre"
		                              v-model="culturales.nombre"
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
		                      v-model="culturales.direccion"
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
		                      v-model="culturales.estado"
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
		                        v-model="culturales.id_municipio"
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
		name: 'EditarCulturales',

		data() {
			return {
				token: localStorage.getItem('user_token'),
				cul_id: localStorage.getItem('cul'),
				municipio: localStorage.getItem('ref'),
				municipioActual: null,
				muni: [],
				culturales: {
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
			this.MostrarCultural()
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

		    async MostrarCultural() {
		      await this.axios.get(`http://127.0.0.1:8000/api/auth/cultural/ver/${this.cul_id}`,{
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
		        } = response.data.cultural

		        this.culturales.nombre = nombre
		        this.culturales.direccion = direccion
		        this.culturales.estado = estado
		        this.culturales.id_municipio = id_municipio
		        this.municipioActual = response.data.cultural.municipio.nombre

		      })
		      .catch(error => {
		        console.log(error)
		      })
		    },

		    async editarCultural() {
		      this.loader = true
		      this.loader2 = false
		      
		      await this.axios.put(`http://127.0.0.1:8000/api/auth/cultural/modificar/${this.cul_id}`,this.culturales,
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
		              text: 'Atractivo Cultural modificado con éxito!',
		        }); 
		        localStorage.removeItem('cul')
		        this.$router.push('/culturales')
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
    			localStorage.removeItem('cul')
    			this.$router.push('/culturales')
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