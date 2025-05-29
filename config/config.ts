import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/landingpage',
      component: './LandingPage',
      layout: false,
    },
    {
      path: '/api/auth/callback',
      component: './Callback',
      layout: false,
    },
  ],
  npmClient: 'yarn',
});
