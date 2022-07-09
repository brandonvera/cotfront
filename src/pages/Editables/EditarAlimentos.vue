<template>
	<div class="row justify-content-center">
    	<div class="col-xl-8 col-lg-7 col-md-6">
    		<div class="bot">
				<label v-on:click.prevent="atras" class="atras mb-4">
	            	Atras <span class="ti-arrow-left"></span>
	        	</label>
        	</div>
    		<card class="card" title="Editar Alimento">
          		<div>
          			<form class="form" @submit.stop.prevent="editarAlimento">


          				<div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Razón Social"
		                              placeholder="Razón Social"
		                              v-model="alimentos.razon_social"
		                              id="inputNombre">
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Establecimientos"
		                              placeholder="Establecimientos"
		                              v-model="alimentos.establecimientos"
		                              id="inputEstado"
		                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)">
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Teléfono"
		                              placeholder="Teléfono"
		                              v-model="alimentos.telefono"
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
		                              v-model="alimentos.correo"
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
		                      v-model="alimentos.direccion_principal"
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
		                      v-model="alimentos.estado"
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
		                        v-model="alimentos.id_municipio"
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
		                        v-model="alimentos.id_representantes"
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
				alim_id: localStorage.getItem('alim'),
				municipio: localStorage.getItem('ref'),
				municipioActual: null,
				representanteActual: null,
				muni: [],
				repre: [],
				alimentos: {
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
			this.MostrarAlimento()
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

		    async MostrarAlimento() {
		      await this.axios.get(`http://127.0.0.1:8000/api/auth/alimento/ver/${this.alim_id}`,{
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
		        } = response.data.alimento

		        this.alimentos.razon_social = razon_social
		        this.alimentos.establecimientos = establecimientos
		        this.alimentos.telefono = telefono
		        this.alimentos.correo = correo
		        this.alimentos.direccion_principal = direccion_principal
		        this.alimentos.estado = estado
		        this.alimentos.id_municipio = id_municipio
		        this.alimentos.id_representantes = id_representantes
		        this.municipioActual = response.data.alimento.municipio.nombre
		        this.representanteActual = response.data.alimento.representante.nombre

		      })
		      .catch(error => {
		        console.log(error)
		      })
		    },

		    async editarAlimento() {
		      this.loader = true
		      this.loader2 = false
		      
		      await this.axios.put(`http://127.0.0.1:8000/api/auth/alimento/modificar/${this.alim_id}`,this.alimentos,
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
		              text: 'Alimento modificado con exito!',
		        }); 
		        localStorage.removeItem('alim')
		        this.$router.push('/alimentos')
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
    			localStorage.removeItem('alim')
    			this.$router.push('/alimentos')
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