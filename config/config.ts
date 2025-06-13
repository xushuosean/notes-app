import { defineConfig } from '@umijs/max';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  chainWebpack(memo) {
    // 代码高亮显示
    memo.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // 支持高亮显示的代码语言
        languages: ['json', 'xml', 'yaml', 'html', 'typescript'],
      },
    ]);
  },
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: './Home',
      layout: false,
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
    {
      path: '/repo',
      component: './Repo',
      layout: false,
    },
  ],
  npmClient: 'yarn',
  proxy: {
    '/api': {
      target: 'http://localhost:3098/',
      changeOrigin: true,
    },
  },
});
