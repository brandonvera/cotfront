<template>
	<div class="row justify-content-center">
    	<div class="col-xl-8 col-lg-7 col-md-6">
    		<div class="bot">
				<label v-on:click.prevent="atras" class="atras mb-4">
	            	Atras <span class="ti-arrow-left"></span>
	        	</label>
        	</div>
    		<card class="card" title="Editar Usuario">
          		<div>
          			<form class="form" @submit.stop.prevent="editarUsuario">

          				<div class="row">
		                  <div class="col-md-12">
		                    <fg-input type="text"
		                              label="Código"
		                              placeholder="COD000"      
		                              v-model="usuarios.codigo"        
		                              id="inputCodigo"
		                              maxlength="6"		                 
		                              onkeypress="return ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 67 || event.charCode == 68 || event.charCode == 79))">
		                    </fg-input>
		                  </div>
		                </div>

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
		                      v-model="usuarios.estado"
		                    >
		                      <option disabled value="">Seleccione algun Estado</option>
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
		                        <option disabled value="">
		                        {{tipoActual}}</option>
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
		
		name: 'EditarUsuarios',

		data() {
			return {
				token: localStorage.getItem('user_token'),
				user: localStorage.getItem('user'),
				tipoActual: null,
				rol: [],
				usuarios: {
					codigo: '',
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
			this.MostrarUsuarios()
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

			async MostrarUsuarios() {
		      await this.axios.get(`http://127.0.0.1:8000/api/auth/usuario/${this.user}`,{
		        headers:{
		          "Authorization": `Bearer ${this.token}`
		        }
		      })
		      .then(response => {
		        const {
		        	codigo,
		        	nombre,
		        	apellido,
		        	email,
		        	password,
		        	estado,
		        	id_tipo,		    
		        } = response.data.user

		        this.usuarios.codigo = codigo
		        this.usuarios.nombre = nombre
		        this.usuarios.apellido = apellido
		        this.usuarios.email = email
		        this.usuarios.estado = estado
		        this.usuarios.id_tipo = id_tipo		    
		        this.tipoActual = response.data.user.tipo_usuario.tipo_usuario

		      })
		      .catch(error => {
		        console.log(error)
		      })
		    },

			async editarUsuario() {
			  	this.loader = true
		      	this.loader2 = false

		      	const regla2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;

		      	if (this.usuarios.password == "" || this.usuarios.password == null)
		      	{
			      	try {
				        let response = await this.axios.put(`http://127.0.0.1:8000/api/auth/usuario/modificar/${this.user}`,this.usuarios,{
				          		headers:{
				          			"Authorization": `Bearer ${this.token}`
				          		}
				        })

				        this.$swal({
				            icon: 'success',
				            title: 'Modificación éxitosa!',
				            text: 'Perfil de usuario modificado con éxito!',
				        });

				        localStorage.removeItem('user')
				        this.$router.push('/usuarios')
				        this.loader = false
				        this.loader2 = true

			        } catch (error) {
			          	this.$swal({
				          icon: 'info',
				          title: 'Oops...',
				          text: 'Ocurrió un error, valida la información nuevamente!',
			          	})
			          	this.loader = false
			          	this.loader2 = true
		        	}	
		      	} else {
		      		if (regla2.test(this.user.password)) 
		      		{
			          	try {
			          		let response = await this.axios.put(`http://127.0.0.1:8000/api/auth/usuario/modificar/${this.user}`,this.usuarios,{
			          			headers:{
			          				"Authorization": `Bearer ${this.token}`
			          			}
			        		})

			        		this.$swal({
					              icon: 'success',
					              title: 'Modificación éxitosa!',
					              text: 'Perfil de usuario modificado con éxito!',
					        });

					        localStorage.removeItem('user')
				       	 	this.$router.push('/usuarios')
					        this.loader = false
					        this.loader2 = true
		      			} catch (error) {
			            	this.$swal({
				          		icon: 'info',
				          		title: 'Oops...',
				          		text: 'Ocurrió un érror, valida la información nuevamente!',
				          	})
				          	this.loader = false
				          	this.loader2 = true
				        }	     		      		    
		      		} else {
	      				this.$swal({
			          		icon: 'error',
			          		title: 'Oops... Valida la Contraseña!',
			          		text: 'El formato de contrsaeña debe ser mínimo 6 y máximo 12 caracteres, debe poseer 1 Mayúscula, 1 minúscula, 1 número y 1 carácter especial como mínimo!',
			          	})
			          	this.loader = false
			          	this.loader2 = true
				    }
		      		 
		      	}
			},

			atras(){
				localStorage.removeItem('user')
    			this.$router.push('/usuarios')
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