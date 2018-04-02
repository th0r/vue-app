import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: {name: 'problem'}},
    {
      path: '/problem',
      name: 'problem',
      component: () => import('../components/ProblemPage')
    },
    {
      path: '/example',
      name: 'example',
      component: () => import('../components/ExamplePage')
    }
  ]
});
