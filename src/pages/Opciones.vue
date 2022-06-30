<template>	
	<!-- <div class="row"> -->
	<div class="col-12">
		<div class="bot">
			<label v-on:click.prevent="atras" class="atras mb-4">
	            Atras <span class="ti-arrow-left"></span>
	        </label>
        </div>
        
		<div class="gallery">

			<div 
				class="card text-white bg-info mb-3  zoom" 
				style="max-width: 12rem;"
			>
			  	<div class="card-header">Acceder</div>
				  <div  class="card-body">
				    <h5 class="card-title text-white">
				    	Alimentos
				    	<span 
				    		style="cursor: pointer" 
				    		class="ti-arrow-up"
				    		v-on:click.prevent="alimentos"
				    	>
				    	</span>
				    </h5>			
				</div>					  
			</div>

			<div 
				class="card text-white bg-info mb-3  zoom" 
				style="max-width: 12rem;"
			>
			  	<div class="card-header">Acceder</div>
				  <div  class="card-body">
				    <h5 class="card-title text-white">
				    	Hospedajes
				    	<span 
				    		style="cursor: pointer" 
				    		class="ti-arrow-up"
				    		v-on:click.prevent="hospedajes"
				    	>
				    	</span>
				    </h5>			
				</div>					  
			</div>

			<div 
				class="card text-white bg-info mb-3  zoom" 
				style="max-width: 12rem;"
			>
			  	<div class="card-header">Acceder</div>
				  <div  class="card-body">
				    <h5 class="card-title text-white">
				    	Recreaciones
				    	<span 
				    		style="cursor: pointer" 
				    		class="ti-arrow-up"
				    		v-on:click.prevent="recreaciones"
				    	>
				    	</span>
				    </h5>			
				</div>					  
			</div>

			<div 
				class="card text-white bg-info mb-3  zoom" 
				style="max-width: 12rem;"
			>
			  	<div class="card-header">Acceder</div>
				  <div  class="card-body">
				    <h5 class="card-title text-white">
				    	Transportes
				    	<span 
				    		style="cursor: pointer" 
				    		class="ti-arrow-up"
				    		v-on:click.prevent="transportes"
				    	>
				    	</span>
				    </h5>			
				</div>					  
			</div>

			<div 
				class="card text-white bg-info mb-3  zoom" 
				style="max-width: 12rem;"
			>
			  	<div class="card-header">Acceder</div>
				  <div  class="card-body">
				    <h5 class="card-title text-white">
				    	Atractivos
				    	<span 
				    		style="cursor: pointer" 
				    		class="ti-arrow-up"
				    		v-on:click.prevent="culturales"
				    	>
				    	</span>
				    	Culturales				    	
				    </h5>			
				</div>					  
			</div>

			<div 
				class="card text-white bg-info mb-3  zoom" 
				style="max-width: 12rem;"
			>
			  	<div class="card-header">Acceder</div>
				  <div  class="card-body">
				    <h5 class="card-title text-white">
				    	Atractivos 
				    	<span 
				    		style="cursor: pointer" 
				    		class="ti-arrow-up"
				    		v-on:click.prevent="naturales"
				    	>
				    	</span>
				    	Naturales				 
				    </h5>			
				</div>					  
			</div>
		</div>
	</div>
	<!-- </div> -->
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'Opciones',

		data() {
			return {
				// token: localStorage.getItem('user_token'),
				municipio: localStorage.getItem('ref'),
				// ali: []
			}
		},

		methods: {
			async alimentos() {
			    this.$router.push('/alimentos');
			},

			async hospedajes() {
				this.$router.push('/hospedajes');
			},

			async recreaciones() {
				this.$router.push('/recreaciones');
			},

			async transportes() {
				this.$router.push('/transportes');
			},

			async culturales() {
				this.$router.push('/culturales');
			},

			async naturales() {
				this.$router.push('/naturales');
			},

			atras(){
    			this.$router.push('/municipios')
    		}
		}
	}
</script>

<style>
.gallery {
	display: grid;
	gap: 1rem;
	grid-auto-rows: 8rem;
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 14rem), 12rem));
	justify-content: center;
}

.zoom:hover{
	transform: scale(1.2);
	transition: transform .2s;
}

.bot {
	display: flex;
    justify-content: center;
}
.bot label{
	cursor: pointer;
}

</style>