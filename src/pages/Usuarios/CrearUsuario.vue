<template>
	<div class="row justify-content-center">
    	<div class="col-xl-8 col-lg-7 col-md-6">
    		<div class="bot">
				<label v-on:click.prevent="atras" class="atras mb-4">
	            	Atras <span class="ti-arrow-left"></span>
	        	</label>
        	</div>
    		<card class="card" title="Crear Usuario">
          		<div>
          			<form class="form" @submit.stop.prevent="crearUsuario">


          				<div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Nombre"
		                              placeholder="Nombre"
		                              v-model="usuarios.nombre"
		                              onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 32))"
		                              id="inputNombre">
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Apellido"
		                              placeholder="Apellido"
		                              v-model="usuarios.apellido"
		                              onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 32))"
		                              id="inputApellido"
		                    >
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="email"
		                              label="Correo"
		                              placeholder="Correo"
		                              v-model="usuarios.email"
		                              id="inputCorreo"
		                    >
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Contraseña"
		                              placeholder="Contraseña"
		                              v-model="usuarios.password"
		                              id="inputPassword">
		                    </fg-input>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <label for="Estado">Estado</label>
		                    <select
		                      name="Estado"
		                      id="Estado"
		                      class="form-control"
		                      required
		                      v-model="usuarios.estado"
		                    >
		                      <option disabled>Estado</option>
		                      <option value="ACTIVO">Activo</option>
		                      <option value="INACTIVO">Inactivo</option>
		                    </select>
		                  </div>
		                </div>

		                <div class="row">
		                  <div class="col-md-12">
		                    <label for="id_tipo">Rol</label>
		                    <select
		                        name="id_tipo"
		                        id="id_tipo"
		                        class="form-control"
		                        required
		                        v-model="usuarios.id_tipo"
		                    >
		                        <option disabled>Rol</option>
		                        <option v-for="r in rol" :key="r.id" v-bind:value="r.id">{{
		                          r.tipo_usuario
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
		name: 'CrearUsuario',

		data() {
			return {
				token: localStorage.getItem('user_token'),
				rol: [],
				usuarios: {
					nombre: '',
					apellido: '',
					email: '',
					password: '',
					estado: '',
					id_tipo: Number
				},
				loader: null,
      			loader2: true,
			}
		},

		mounted() {
			this.rolUser()
		},

		methods: {
			async rolUser() {
				let response = await this.axios.get(`http://127.0.0.1:8000/api/auth/rol`, {
			        headers:{
			          "Authorization": `Bearer ${this.token}`
			        }
			    })
			    this.rol = response.data.rol
			},

			async crearUsuario() {
				this.loader = true
      			this.loader2 = false

      			const regla2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;

      			if (regla2.test(this.usuarios.password))
      			{
      				await this.axios.post('http://127.0.0.1:8000/api/auth/usuario/crear',this.usuarios, {
				        headers:{
				          "Authorization": `Bearer ${this.token}`
				        }
				    })
				    .then(response => {
				      	this.usuarios.nombre = ''
				      	this.usuarios.apellido = ''
				      	this.usuarios.email = ''
				      	this.usuarios.password = ''
				      	this.usuarios.estado = ''
				      	this.usuarios.id_tipo = ''
				      	this.loader = false
				      	this.loader2 = true
				      	this.$swal({
				            icon: 'success',
				            title: 'Creación éxitosa!',
				            text: 'Usuario creado con éxito!',
				      	});
				      	this.$router.push('/usuarios');
				    })
				    .catch(error => {
					    this.loader = false
					    this.loader2 = true
					    this.$swal({
				            title: 'Ocurrió un error!',
				            text: 'Valide la información suministrada nuevamente!',
				            icon: 'info'
					    })
				    });
      			} else {
      				this.loader = false
			        this.loader2 = true
			        this.$swal({
			          icon: 'error',
			          title: 'Oops... Valida la contraseña!',
			          text: 'El formato de contrsaeña debe ser mínimo 6 y máximo 12 caracteres, debe poseer 1 Mayúscula, 1 minúscula, 1 número y 1 carácter especial como mínimo!',
			        })
      			}
			},

			atras(){
				localStorage.removeItem('user')
    			this.$router.push('/usuarios')
    		},
		}
	}
</script>

<style>

</style>