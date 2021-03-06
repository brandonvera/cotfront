import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
// import Dashboard from "@/pages/Dashboard.vue";
// import UserProfile from "@/pages/UserProfile.vue";
// import Notifications from "@/pages/Notifications.vue";
// import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
// import Typography from "@/pages/Typography.vue";
// import TableList from "@/pages/TableList.vue";

import Login from "@/pages/Login/Login";

import Municipios from "@/pages/Municipios.vue";
import Opciones from "@/pages/Opciones.vue";

import Usuarios from "@/pages/Usuarios/Usuarios.vue";
import Alimentos from "@/pages/Acceso/Alimentos.vue";
import Hospedajes from "@/pages/Acceso/Hospedajes.vue";
import Recreaciones from "@/pages/Acceso/Recreaciones.vue";
import Transportes from "@/pages/Acceso/Transportes.vue";
import AtractivosCulturales from "@/pages/Acceso/AtractivosCulturales.vue";
import AtractivosNaturales from "@/pages/Acceso/AtractivosNaturales.vue";
import Representantes from "@/pages/Acceso/Representantes.vue";

import EditarUsuarios from "@/pages/Usuarios/EditarUsuarios.vue";
import EditarAlimentos from "@/pages/Editables/EditarAlimentos.vue";
import EditarHospedajes from "@/pages/Editables/EditarHospedajes.vue";
import EditarRecreaciones from "@/pages/Editables/EditarRecreaciones.vue";
import EditarTransportes from "@/pages/Editables/EditarTransportes.vue";
import EditarCulturales from "@/pages/Editables/EditarCulturales.vue";
import EditarNaturales from "@/pages/Editables/EditarNaturales.vue";
import EditarRepresentantes from "@/pages/Editables/EditarRepresentantes.vue";

import CrearUsuarios from "@/pages/Usuarios/CrearUsuario.vue";
import CrearAlimentos from "@/pages/Creables/CrearAlimentos.vue";
import CrearHospedajes from "@/pages/Creables/CrearHospedajes.vue";
import CrearRecreaciones from "@/pages/Creables/CrearRecreaciones.vue";
import CrearTransportes from "@/pages/Creables/CrearTransportes.vue";
import CrearCulturales from "@/pages/Creables/CrearCulturales.vue";
import CrearNaturales from "@/pages/Creables/CrearNaturales.vue";
import CrearRepresentantes from "@/pages/Creables/CrearRepresentantes.vue";

import Guard from "@/services/Auth";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/municipios",
    children: [
      {
        path: "mapa",
        name: "mapa",
        component: Maps
      },

      //MUNICIPIOS Y OPCIONES 
      {
        path: "municipios",
        name: "Municipios",
        component: Municipios
      },
      {
        path: "opciones",
        name: "Opciones",
        component: Opciones
      },

      //VISTAS DE LAS OPCIONES
      {
        path: "representantes",
        name: "Representantes",
        component: Representantes,
        beforeEnter: Guard.rolI,
      },
      {
        path: "alimentos",
        name: "Alimentos",
        component: Alimentos
      },
      {
        path: "hospedajes",
        name: "Hospedajes",
        component: Hospedajes
      },
      {
        path: "recreaciones",
        name: "Recreaciones",
        component: Recreaciones
      },
      {
        path: "culturales",
        name: "Atractivos Culturales",
        component: AtractivosCulturales
      },
      {
        path: "naturales",
        name: "Atractivos Naturales",
        component: AtractivosNaturales
      },
      {
        path: "transportes",
        name: "Transportes",
        component: Transportes
      },

      //EDITABLES
      {
        path: "editar-alimentos",
        name: "Editar Alimento",
        component: EditarAlimentos,
        beforeEnter: Guard.rolI,
      },
      {
        path: "editar-hospedajes",
        name: "Editar Hospedaje",
        component: EditarHospedajes,
        beforeEnter: Guard.rolI,
      },
      {
        path: "editar-recreaciones",
        name: "Editar Recreacion",
        component: EditarRecreaciones,
        beforeEnter: Guard.rolI,
      },
      {
        path: "editar-transportes",
        name: "Editar Transporte",
        component: EditarTransportes,
        beforeEnter: Guard.rolI,
      },
      {
        path: "editar-culturales",
        name: "Editar Atractivo Cultural",
        component: EditarCulturales,
        beforeEnter: Guard.rolI,
      },
      {
        path: "editar-naturales",
        name: "Editar Atractivo Natural",
        component: EditarNaturales,
        beforeEnter: Guard.rolI,
      },
      {
        path: "editar-representantes",
        name: "Editar Representante",
        component: EditarRepresentantes,
        beforeEnter: Guard.rolI,
      },

      //CREABLES
      {
        path: "crear-alimentos",
        name: "Crear Alimento",
        component: CrearAlimentos,
        beforeEnter: Guard.rolI,
      },
      {
        path: "crear-hospedajes",
        name: "Crear Hospedaje",
        component: CrearHospedajes,
        beforeEnter: Guard.rolI,
      },
      {
        path: "crear-recreaciones",
        name: "Crear Recreacion",
        component: CrearRecreaciones,
        beforeEnter: Guard.rolI,
      },
      {
        path: "crear-transportes",
        name: "Crear Transporte",
        component: CrearTransportes,
        beforeEnter: Guard.rolI,
      },
      {
        path: "crear-culturales",
        name: "Crear Atractivo Cultural",
        component: CrearCulturales,
        beforeEnter: Guard.rolI,
      },
      {
        path: "crear-naturales",
        name: "Crear Atractivo Natural",
        component: CrearNaturales,
        beforeEnter: Guard.rolI,
      },
      {
        path: "crear-representantes",
        name: "Crear Representante",
        component: CrearRepresentantes,
        beforeEnter: Guard.rolI,
      },

      //USUARIOS
      {
        path: "usuarios",
        name: "Usuarios",
        component: Usuarios,
        beforeEnter: Guard.rolI,
      },
      {
        path: "editar-usuarios",
        name: "Editar Usuario",
        component: EditarUsuarios,
        beforeEnter: Guard.rolI,
      },
      {
        path: "crear-usuarios",
        name: "Crear Usuario",
        component: CrearUsuarios,
        beforeEnter: Guard.rolI,
      },
    ],

    beforeEnter: Guard.auth
  },

  { path: "*", component: NotFound },
  { path: "/inicio", name: "Login", component: Login },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
