import Main from '../components/main.vue'
export default [
  {
    path: '/',
    redirect: '/films',
    component: Main,
    children: [
      {
        path: '/films',
        name: 'films',
        component: () => import('../views/movies/movies.vue')
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('../views/mine/mine.vue')
      },
      {
        path: '/cinemas',
        name: 'cinemas',
        component: () => import('../views/cinemas/cinemas.vue')
      }
    ]
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('../views/info/info.vue')
  },
  {
    path: '/filminfo/:filmId',
    name: 'filminfo',
    component: () => import('../views/movies/info/filmInfo.vue')
  },
  {
    path: '/seePhoto',
    name: 'seePhoto',
    component: () => import('../views/movies/info/photo.vue')
  },
  {
    path: '/local',
    name: 'local',
    component: () => import('../views/local/local.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/cinemas/cinemasDetails/cinemasDetails.vue')
  }
]