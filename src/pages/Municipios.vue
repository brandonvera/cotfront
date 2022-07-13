<template>
	<div class="container">
		<div class="gallery">
			<div 
				class="card text-white bg-success mb-3  zoom" 
				style="max-width: 12rem;"
				v-for="(item, index) in municipios"
				:key="index"
			>
			  	<div class="card-header">Municipio:</div>
				  <div  class="card-body">
				    <h5 class="card-title text-white">
				    	{{item.nombre}}
				    	<span 
				    		style="cursor: pointer" 
				    		class="ti-arrow-up"
				    		v-on:click.prevent="mover(item.id)"
				    	>
				    	</span>
				    </h5>			
				</div>					  
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				token: localStorage.getItem('user_token'),
				municipios: []
			}
		},

		created() {
			axios.get(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/municipio`,{
		      headers:{
		        'Authorization': `Bearer ${this.token}`
		      }
		    }).then((result) => {
		      this.municipios = result.data.municipio
		    }).catch(error => {
		      console.log(error);
		    })
		},

		methods: {
			async mover(id) {
				localStorage.setItem("ref", id);
				this.$router.push('/opciones');
			}
		}
	};
</script>

<style>
.gallery {
	display: grid;
	gap: 1rem;
	grid-auto-rows: 8rem;
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 14rem), 12rem));
}

.zoom:hover{
	transform: scale(1.2);
	transition: transform .2s;
}

@media (max-width: 480px) {
	.container{
		display: flex;
		justify-content: center;
	}
}
</style>