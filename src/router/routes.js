const meta = {
  public: {
    section: 'public',
    layout: 'LoginLayout',
  },
  account: {
    section: 'account',
    layout: 'AccountLayout',
    auth: true,
  },
}

const routes = [
  {
    name: 'login',
    path: '/',
    component: () => import('@/pages/public/login-page'),
    meta: {
      ...meta.public,
    },
  },
  {
    name: 'account',
    path: '/account',
    component: () => import('@/pages/account/account-page'),
    meta: {
      ...meta.account,
    },
  },
]

export default routes
