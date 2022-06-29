<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <form @submit.stop.prevent="logout"> 
              <button class="nav-link btn btn-link" type="submit">
                <i class="ti-panel"></i>
                <p>
                  Salir
                </p>
              </button>
            </form>
          </li>

          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">
              <i class="ti-settings"></i>
              <p>
                Perfil
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </div></nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      token: localStorage.getItem('user_token'),
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    logout()
    {  
      localStorage.removeItem('user_token');
      localStorage.removeItem('alim');
      localStorage.removeItem('ref');
      this.$swal( 
        'Cierre de Sesión Exitoso!'
      );
      this.$router.push("/inicio");

      // await this.axios.post(`http://127.0.0.1:8000/api/auth/logout`, {
      //   headers:{
      //     'Authorization': `Bearer ${this.token}`
      //   } 
      // })
      // .then(response => {
      //   this.$swal( 
      //     'Cierre de Sesión Exitoso!'
      //   );
      //   this.$router.push("/inicio");
      // })
      // .catch(error => {
      //   localStorage.removeItem('user_token');
      //   this.$swal( 
      //     'Cierre de Sesión!'
      //   );
      //   this.$router.push("/inicio");
      // })
    }
  }
};
</script>
<style>
</style>
