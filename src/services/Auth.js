export default {
	auth(to, from, next) {
		const token = localStorage.getItem('user_token');
		if(!token){
			next('/inicio');
		}
		next();
	},
}