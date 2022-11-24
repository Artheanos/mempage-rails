export const apiHost = 'http://localhost:3000'
export const apiRoot = `${apiHost}/api`

export const apiRoutes = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    tokens: '/auth/token',
  },
  comments: {
    show: (id: number) => `/comments/${id}`,
    root: '/comments',
  },
  users: {
    show: (id: any) => `/users/${id}`,
  },
  imagePosts: {
    root: '/image_posts',
    show: (id: string) => `/image_posts/${id}`,
  },
}

export const localRoutes = {
  imagePosts: {
    add: '/upload',
    root: '/',
    show: (id: number | string = ':id') => `/posts/${id}`,
  },
  login: '/login',
  logout: '/logout',
  profile: '/profile',
  register: '/register',
  root: '/',
  users: {
    show: (id: number | string = ':id') => `/users/${id}`,
  },
}
