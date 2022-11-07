const apiHost = 'http://localhost:3000'
export const apiRoot = `${apiHost}/api`

export const apiRoutes = {
  imagePosts: {
    root: '/image_posts',
    show: (id: string) => `/image_posts/${id}`
  }
}
