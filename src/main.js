import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import faker from 'faker';
import _ from 'lodash';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

const count = 1000;
const permissions = ['admin', 'manager', 'seller', 'buyer'];
const usersData = [];
for (let i = 0; i < count; i++) {
  usersData.push({
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.random.number({max: 90}),
    permissions: _.shuffle(permissions)
      .slice(0, faker.random.number({max: 2}))
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  provide: {
    usersData
  },
  render: h => h(App)
});
