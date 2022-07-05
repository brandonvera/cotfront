<template>
	<div class="row justify-content-center">
    	<div class="col-xl-8 col-lg-7 col-md-6">
    		<div class="bot">
				<label v-on:click.prevent="atras" class="atras mb-4">
	            	Atras <span class="ti-arrow-left"></span>
	        	</label>
        	</div>
    		<card class="card" title="Editar Transporte">
          		<div>
          			<form class="form" @submit.stop.prevent="editarTransporte">


          				<div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Razon Social"
		                              placeholder="Razon Social"
		                              v-model="transportes.razon_social"
		                              id="inputNombre">
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Establecimientos"
		                              placeholder="Establecimientos"
		                              v-model="transportes.establecimientos"
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
		                              v-model="transportes.telefono"
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
		                              v-model="transportes.correo"
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
		                      v-model="transportes.direccion_principal"
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
		                      v-model="transportes.estado"
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
		                        v-model="transportes.id_municipio"
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
		                        v-model="transportes.id_representantes"
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
		name: 'EditarTransportes',

		data() {
			return {
				token: localStorage.getItem('user_token'),
				tra_id: localStorage.getItem('tra'),
				municipio: localStorage.getItem('ref'),
				municipioActual: null,
				representanteActual: null,
				muni: [],
				repre: [],
				transportes: {
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
			this.MostrarTransporte()
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

		    async MostrarTransporte() {
		      await this.axios.get(`http://127.0.0.1:8000/api/auth/transporte/ver/${this.tra_id}`,{
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
		        } = response.data.transporte

		        this.transportes.razon_social = razon_social
		        this.transportes.establecimientos = establecimientos
		        this.transportes.telefono = telefono
		        this.transportes.correo = correo
		        this.transportes.direccion_principal = direccion_principal
		        this.transportes.estado = estado
		        this.transportes.id_municipio = id_municipio
		        this.transportes.id_representantes = id_representantes
		        this.municipioActual = response.data.transporte.municipio.nombre
		        this.representanteActual = response.data.transporte.representante.nombre

		      })
		      .catch(error => {
		        console.log(error)
		      })
		    },

		    async editarTransporte() {
		      this.loader = true
		      this.loader2 = false
		      
		      await this.axios.put(`http://127.0.0.1:8000/api/auth/transporte/modificar/${this.tra_id}`,this.transportes,
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
		              text: 'Transporte modificado con exito!',
		        }); 
		        localStorage.removeItem('tra')
		        this.$router.push('/transportes')
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
    			localStorage.removeItem('tra')
    			this.$router.push('/transportes')
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