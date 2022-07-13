<template>
  <nav class="navbar navbar-expand-lg tam">
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
                <p>
                  <i class="ti-arrow-circle-down"></i>
                  Salir
                </p>
              </button>
            </form>
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
    
    async logout()
    {  

      try {

        let response = await this.axios.post(`https://enigmatic-oasis-44862.herokuapp.com/api/auth/logout`, {
          headers:{
            'Authorization': `Bearer ${this.token}`
          } 
        })
        if (response.status == 200) {
          this.$swal({
            icon: 'success',
            title: 'Cierre de Sesión Éxitoso!',
          })
          this.$router.push('/inicio')
        }

      } catch (error) {

          localStorage.removeItem('user_token');
          localStorage.removeItem('ref');
          localStorage.removeItem('rol');

          this.$swal({
            icon: 'success',
            title: 'Cierre de Sesión Éxitoso!',
          })
          this.$router.push('/inicio')

      }
    }
  }
};
</script>
<style>

  .tam {
    /*height: 99px;*/
  }

</style>
