<template>
  <div class="root">
    <label class="filter">
      <input v-model="users.filter.admin" type="checkbox">
      Show only admins
    </label>
    <label class="filter">
      Name:
      <input v-model="users.filter.name" type="text">
    </label>
    <label class="filter">
      Age from
      <input v-model.number="users.filter.age.min" type="text" size="3">
      to
      <input v-model.number="users.filter.age.max" type="text" size="3">
    </label>
    <div>Users list (total: {{ users.count }}; filtered: {{ users.filteredCount }}):</div>
    <div class="user">
      <User v-for="user in users.filtered"
            :key="user.id"
            :user="user"
            :highlight="users.filter.name"
            class="user">
        <template slot="actions">
          <button type="button" @click="users.deleteUser(user)">Delete user</button>
        </template>
      </User>
    </div>
    <div v-if="!users.filteredCount">{{ noUsersText }}</div>
  </div>
</template>

<script>
  import User from '../components/User';
  import {UsersStore} from '../stores/UsersStore';

  export default {
    components: {
      User
    },

    props: {
      users: {
        type: UsersStore,
        required: true
      }
    },

    computed: {
      noUsersText() {
        return this.users.filter.admin ? 'No admins' : 'No users';
      }
    }
  };
</script>

<style scoped>
  .filter {
    display: block;
  }

  .user + .user {
    margin-top: 15px;
  }
</style>
