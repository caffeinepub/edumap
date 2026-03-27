import { createRootRoute, createRoute, createRouter, RouterProvider, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Recommendations from './pages/Recommendations';
import Compare from './pages/Compare';
import MapPage from './pages/Map';
import Guidelines from './pages/Guidelines';
import CollegeDetail from './pages/CollegeDetail';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});

const recommendationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recommendations',
  component: Recommendations,
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/compare',
  component: Compare,
});

const mapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/map',
  component: MapPage,
});

const guidelinesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guidelines',
  component: Guidelines,
});

const collegeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/college/$id',
  component: CollegeDetail,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  profileRoute,
  recommendationsRoute,
  compareRoute,
  mapRoute,
  guidelinesRoute,
  collegeDetailRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
