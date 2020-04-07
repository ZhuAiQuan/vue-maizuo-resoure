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
        component: () => import('../views/movies/movies.vue'),
        meta: {
          title: '电影'
        }
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('../views/mine/mine.vue'),
        meta: {
          title: '我的'
        }
      },
      {
        path: '/cinemas',
        name: 'cinemas',
        component: () => import('../views/cinemas/cinemas.vue'),
        meta: {
          title: '影院'
        }
      }
    ]
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('../views/info/info.vue'),
    meta: {
      title: '电影资讯'
    }
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
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/cinemas/search/search.vue')
  }
]