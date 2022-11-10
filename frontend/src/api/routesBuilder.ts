export const apiHost = 'http://localhost:3000'
export const apiRoot = `${apiHost}/api`

export const apiRoutes = {
  auth: {
    login: '/auth/login'
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
  logout: '/logout',
}
