export const apiHost = 'http://localhost:3000'
export const apiRoot = `${apiHost}/api`

export const apiRoutes = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  users: {
    show: (id: any) => `/users/${id}`
  },
  imagePosts: {
    root: '/image_posts',
    show: (id: string) => `/image_posts/${id}`
  }
}

export const localRoutes = {
  root: '/',
  imagePosts: {
    add: '/upload',
    root: '/',
  },
  login: '/login',
  register: '/register',
  logout: '/logout',
  profile: '/profile'
}
