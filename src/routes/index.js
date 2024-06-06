
// Importar los enrutadores
import authRouter from './AuthRoutes.js';
import userRouter from './UserRoutes.js';
import centroRouter from './CentroRoutes.js';
import alumnoRouter from './AlumnoRoutes.js';
import materialRouter from './MaterialRoutes.js';
import contenidoMatRouter from './ContenidoMaterialRoutes.js';
import progresoRouter from './ProgresoRoutes.js';

// Enrutadores
const routerPaths = {
  AUTH: authRouter,
  USERS: userRouter,
  CENTRO_EDUCATIVO: centroRouter,
  ALUMNOS: alumnoRouter,
  MATERIAL: materialRouter,
  CONTENIDO_MAT: contenidoMatRouter,
  PROGRESO: progresoRouter,
}

// Direcciones de la API
const routesPaths = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  CENTRO_EDUCATIVO: '/api/centros',
  ALUMNOS: '/api/alumnos',
  MATERIAL: '/api/material',
  CONTENIDO_MAT: '/api/contenido-mat',
  PROGRESO: '/api/progreso',
}

export const routes = ({ app }) => {
  app.use(routesPaths.AUTH, routerPaths.AUTH);
  app.use(routesPaths.USERS, routerPaths.USERS);
  app.use(routesPaths.CENTRO_EDUCATIVO, routerPaths.CENTRO_EDUCATIVO);
  app.use(routesPaths.ALUMNOS, routerPaths.ALUMNOS);
  app.use(routesPaths.MATERIAL, routerPaths.MATERIAL);
  app.use(routesPaths.CONTENIDO_MAT, routerPaths.CONTENIDO_MAT);
  app.use(routesPaths.PROGRESO, routerPaths.PROGRESO);
};

export default routes;