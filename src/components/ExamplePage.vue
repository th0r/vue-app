<template>
  <div class="root">
    <h2>Example</h2>
    <label>
      Model type:
      <select v-model="type">
        <option value="mobx">Mobx</option>
        <option value="vue">Vue</option>
      </select>
    </label>
    <template v-if="users">
      <div><strong>Generation of {{ usersData.length }} models took
        <time>{{ time }}ms</time>
      </strong></div>
      <UsersList :users="users"/>
    </template>
    <button v-else type="button" @click="generateUsers()">Generate Users</button>
  </div>
</template>

<script>
  import {cloneDeep} from 'lodash-es';
  import UsersList from '../components/UsersList';
  import {UsersStore} from '../stores/UsersStore';
  import {User as UserMobx} from '../models/UserMobx';
  import {User as UserVue} from '../models/UserVue';

  export default {
    components: {
      UsersList
    },
    inject: ['usersData'],
    data() {
      return {
        type: 'mobx',
        users: null,
        time: null,
        renderTime: null
      };
    },
    watch: {
      type() {
        if (this.users) {
          this.generateUsers();
        }
      }
    },
    methods: {
      generateUsers() {
        const userFactory = this.type === 'mobx' ? this.mobxUserFactory : this.vueUserFactory;
        const usersData = cloneDeep(this.usersData);
        const startTime = Date.now();
        const users = new UsersStore(userFactory, usersData);
        const endTime = Date.now();
        this.users = users;
        this.time = endTime - startTime;
      },
      mobxUserFactory: userData => new UserMobx(userData),
      vueUserFactory: userData => new UserVue({data: userData})
    }
  };
</script>

<style scoped>
  time {
    font-weight: bold;
    color: red;
  }
</style>
