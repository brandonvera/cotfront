import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";

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

import EditarUsuarios from "@/pages/Usuarios/EditarUsuarios.vue";
import EditarAlimentos from "@/pages/Editables/EditarAlimentos.vue";

import CrearAlimentos from "@/pages/Creables/CrearAlimentos.vue";
import CrearUsuarios from "@/pages/Usuarios/CrearUsuario.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
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
        component: EditarAlimentos
      },

      //CREABLES
      {
        path: "crear-alimentos",
        name: "Crear Alimento",
        component: CrearAlimentos
      },

      //USUARIOS
      {
        path: "usuarios",
        name: "Usuarios",
        component: Usuarios
      },
      {
        path: "editar-usuarios",
        name: "Editar Usuario",
        component: EditarUsuarios
      },
      {
        path: "crear-usuarios",
        name: "Crear Usuario",
        component: CrearUsuarios
      },
    ]
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
