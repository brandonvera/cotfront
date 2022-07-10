<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link 
          to="/municipios" 
          name="Municipios" 
          icon="ti-world"
        />
        <sidebar-link 
          to="/usuarios" 
          name="Usuarios" 
          icon="ti-pencil-alt2"
          v-if="rol == 1"
        />
        <sidebar-link 
          to="/representantes" 
          name="Representantes" 
          icon="ti-agenda"
          v-if="rol == 1"
        />
      </template>
      <mobile-menu>
        <form @submit.stop.prevent="logout">
          <li class="nav-item d-flex justify-content-center">
            <button class="nav-link btn btn-link" type="submit">
              <p><i class="ti-arrow-circle-down"></i>Salir</p>
            </button>
          </li>
        </form>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },

  data(){
    return {
      token: localStorage.getItem('user_token'),
      rol: localStorage.getItem('rol'),
    }
  },

  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },

    async logout()
    {  

      try {

        let response = await this.axios.post(`http://127.0.0.1:8000/api/auth/logout`, {
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
