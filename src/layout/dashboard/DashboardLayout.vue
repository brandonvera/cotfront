<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <!-- <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel"/> -->
        <!-- <sidebar-link to="/stats" name="User Profile" icon="ti-user"/> -->
        <!-- <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt"/> -->
        <sidebar-link to="/municipios" name="Municipios" icon="ti-view-list-alt"/>
        <sidebar-link to="/usuarios" name="Usuarios" icon="ti-pencil-alt2"/>
        <sidebar-link to="/representantes" name="Representantes" icon="ti-pencil-alt2"/>
        <!-- <sidebar-link to="/typography" name="Typography" icon="ti-text"/> -->
        <!-- <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2"/> -->
        <!-- <sidebar-link to="/maps" name="Map" icon="ti-map"/> -->
        <!-- <sidebar-link to="/notifications" name="Notifications" icon="ti-bell"/> -->
      </template>
      <mobile-menu>
        <form @submit.stop.prevent="logout">
          <li class="nav-item d-flex justify-content-center">
            <button class="nav-link btn btn-link" type="submit">
              <p><i class="ti-panel"></i>Salir</p>
            </button>
          </li>
        </form>

        <li class="nav-item d-flex justify-content-center">
          <router-link to="/dashboard" class="nav-link">
            <i class="ti-settings"></i>
            <p>Perfil</p>
          </router-link>
        </li>
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
    }
  },

  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },

    logout()
    {  
      localStorage.removeItem('user_token');
      this.$swal( 
        'Cierre de Sesión Exitoso!'
      );
      this.$router.push("/inicio");
    }
  }
};
</script>
