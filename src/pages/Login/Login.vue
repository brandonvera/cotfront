<template>
	<section class="vh-100">
	  <div class="container-fluid">
	    <div class="row">
	      <div class="col-sm-6 text-black">

	        <div class="ms-xl-4 d-flex justify-content-center">
	          	<img src="@/assets/img/Logo.png" class=" imago">	  
	        </div>

	        <div class="d-flex align-items-center h-custom-2 px-5 pt-5 ms-xl-4 pt-xl-0 mt-xl-n5">

	          <form style="width: 23rem;" @submit.stop.prevent="submit">
	            <h3 class="fw-normal mb-3 pb-3 text-center" style="letter-spacing: 1px;">Bienvenido!</h3>

	            <div class="form-outline mb-4">
	              <input type="email" id="form2Example18" class="form-control form-control-lg" v-model="login.email" maxlength="100" required autocomplete="off" autofocus/>
	              <label class="form-label" for="form2Example18">Correo</label>
	            </div>

	            <div class="form-outline mb-4">
	              <input type="password" id="form2Example28" class="form-control form-control-lg" v-model="login.password" minlength="6" maxlength="12" autocomplete="off" required/>
	              <label class="form-label" for="form2Example28">Contraseña</label>
	            </div>

	            <p v-if="error" class="error text-red">Algun Dato es incorrecto, revisa de nuevo.</p>

	            <div class="pt-1 mb-4">
	              <button class="btn btn-success btn-lg btn-block" type="submit" v-if="loader2">Ingresar</button>
	            </div>

	            <div class="spinner my-auto mx-auto" v-if="loader"></div>
	          </form>

	        </div>

	      </div>
	      <div class="col-sm-6 px-0 d-none d-sm-block">
	        <img src="@/assets/img/log.jpg" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
	      </div>
	    </div>
	  </div>
	</section>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'Login',

		data() {
			return {
				login: {
					email: '',
					password: '',
				},
				error: false,
        		loader: null,
        		loader2: true
			}
		},

		methods: {
			async submit() 
			{
				this.loader = true
       			this.loader2 = false

       			await this.axios.post(`http://127.0.0.1:8000/api/auth/login`, this.login)
       			.then(response => {
       				localStorage.setItem('rol', response.data.usuario.id_tipo);
       				localStorage.setItem('user_token', response.data.token.original.access_token);

       				if(response.data.usuario.estado == 'ACTIVO')
       				{
       					this.$router.push('/municipios');
       				} 
       				else if(response.data.usuario.estado == 'INACTIVO') 
       				{
       					localStorage.removeItem('rol')
       					localStorage.removeItem('user_token')

       					this.$swal({
                			icon: 'info',
                			title: 'Oops...',
                			text: 'Tu usuario posee un Estado INACTIVO! para continuar comunicate con el administrador para reactivar tu usuario',
                		})
                		this.loader = false
                		this.loader2 = true
       				} 
       				else 
       				{
       					localStorage.removeItem('rol')
       					localStorage.removeItem('user_token')
       					
       					this.$swal({
                			icon: 'error',
                			title: 'Oops...',
                			text: 'Tu usuario posee un Estado fuera de los permitidos! Contacta con el administrador para resolver tu caso de Actividad',
                		})
                		this.loader = false
                		this.loader2 = true
       				}

       			})
       			.catch(error => {
		            this.loader = false
		            this.loader2 = true
		            this.error = true
		        })
			}
		}
	};
</script>

<style>
.bg-image-vertical {
	position: relative;
	overflow: hidden;
	background-repeat: no-repeat;
	background-position: right center;
	background-size: auto 100%;
}

.imago{
  width: 50%;
  height: 80%;
}

.spinner {
  border: 4px solid green;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: white;

  animation: spin 1s ease infinite;
}

.error{
	color: red;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (min-width: 1025px) {
	.h-custom-2 {
		height: 100%;
	}
}
</style>

