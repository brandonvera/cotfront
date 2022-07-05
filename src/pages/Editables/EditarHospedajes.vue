<template>
	<div class="row justify-content-center">
    	<div class="col-xl-8 col-lg-7 col-md-6">
    		<div class="bot">
				<label v-on:click.prevent="atras" class="atras mb-4">
	            	Atras <span class="ti-arrow-left"></span>
	        	</label>
        	</div>
    		<card class="card" title="Editar Hospedaje">
          		<div>
          			<form class="form" @submit.stop.prevent="editarHospedaje">


          				<div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Razon Social"
		                              placeholder="Razon Social"
		                              v-model="hospedajes.razon_social"
		                              id="inputNombre">
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Establecimientos"
		                              placeholder="Establecimientos"
		                              v-model="hospedajes.establecimientos"
		                              id="inputEstado"
		                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)">
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Telefono"
		                              placeholder="Telefono"
		                              v-model="hospedajes.telefono"
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
		                              v-model="hospedajes.correo"
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
		                      v-model="hospedajes.direccion_principal"
		                      placeholder="Dirección Principal"
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
		                      v-model="hospedajes.estado"
		                    >
		                      <option disabled value="">Seleccione algun Estado</option>
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
		                        v-model="hospedajes.id_municipio"
		                    >
		                        <option disabled value="">
		                        {{municipioActual}}</option>
		                        <option v-for="m in muni" :key="m.id" v-bind:value="m.id">{{
		                          m.nombre
		                        }}</option>
		                    </select>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <label for="Representante">Representante</label>
		                    <select
		                        name="Representante"
		                        id="Representante"
		                        class="form-control"
		                        required
		                        v-model="hospedajes.id_representantes"
		                    >
		                        <option disabled value="">
		                        {{representanteActual}}</option>
		                        <option v-for="r in repre" :key="r.id" v-bind:value="r.id">{{
		                          r.persona
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
		name: 'EditarAlimentos',

		data() {
			return {
				token: localStorage.getItem('user_token'),
				hos_id: localStorage.getItem('hos'),
				municipio: localStorage.getItem('ref'),
				municipioActual: null,
				representanteActual: null,
				muni: [],
				repre: [],
				hospedajes: {
					razon_social: '',
					establecimientos: '',
					telefono: '',
					correo: '',
					direccion_principal: '',
					estado: '',
					id_municipio: Number,
					id_representantes: Number,
				},
				loader: null,
      			loader2: true
			}
		},

		mounted() {
			this.MostrarHospedaje()
			this.Municipios()
			this.Representantes()
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

		    async Representantes(){
		      let response = await this.axios.get(`http://127.0.0.1:8000/api/auth/representante`, {
		        headers:{
		          "Authorization": `Bearer ${this.token}`
		        }
		      })
		      this.repre = response.data.representante
		    },

		    async MostrarHospedaje() {
		      await this.axios.get(`http://127.0.0.1:8000/api/auth/hospedaje/ver/${this.hos_id}`,{
		        headers:{
		          "Authorization": `Bearer ${this.token}`
		        }
		      })
		      .then(response => {
		        const {
		        	razon_social,
		        	establecimientos,
		        	telefono,
		        	correo,
		        	direccion_principal,
		        	estado,
		        	id_municipio,
		        	id_representantes
		        } = response.data.hospedaje

		        this.hospedajes.razon_social = razon_social
		        this.hospedajes.establecimientos = establecimientos
		        this.hospedajes.telefono = telefono
		        this.hospedajes.correo = correo
		        this.hospedajes.direccion_principal = direccion_principal
		        this.hospedajes.estado = estado
		        this.hospedajes.id_municipio = id_municipio
		        this.hospedajes.id_representantes = id_representantes
		        this.municipioActual = response.data.hospedaje.municipio.nombre
		        this.representanteActual = response.data.hospedaje.representante.nombre

		      })
		      .catch(error => {
		        console.log(error)
		      })
		    },

		    async editarHospedaje() {
		      this.loader = true
		      this.loader2 = false
		      
		      await this.axios.put(`http://127.0.0.1:8000/api/auth/hospedaje/modificar/${this.hos_id}`,this.hospedajes,
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
		              title: 'Modificacion exitosa!',
		              text: 'Hospedaje modificado con exito!',
		        }); 
		        localStorage.removeItem('hos')
		        this.$router.push('/hospedajes')
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
    			localStorage.removeItem('hos')
    			this.$router.push('/hospedajes')
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