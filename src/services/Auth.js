export default {
	auth(to, from, next) {
		const token = localStorage.getItem('user_token');
		if(!token){
			next('/inicio');
		}
		next();
	},

	rolI(to, from, next) {
		const rol = localStorage.getItem('rol');
		if(rol == "2"){
			next('/municipios');
		} 
		next();
	},
}