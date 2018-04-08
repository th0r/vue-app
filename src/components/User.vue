<template>
  <div :class="['root', {admin: user.admin}]">
    <input v-if="editMode" v-model="newName" @keyup.enter="toggleEditMode(false)">
    <strong v-else class="name" @click="toggleEditMode(true)">
      <Highlight :text="user.fullName" :q="highlight"/>
    </strong> ({{ info }})
    <div class="actions">
      <button v-if="isPermanentAdmin" type="button" @click="user.increaseAdminLevel()">
        Increase admin level
      </button>
      <button v-else type="button" @click="user.togglePermission('admin')">
        {{ user.admin ? 'Make non-admin' : 'Make admin' }}
      </button>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  import t from 'vue-types';
  import {User as UserMobx} from '../models/UserMobx';
  import {User as UserVue} from '../models/UserVue';
  import {AdminUser} from '../models/AdminUserMobx';
  import Highlight from './Highlight';

  export default {
    components: {
      Highlight
    },

    props: {
      user: t.oneOfType([t.instanceOf(UserMobx), t.instanceOf(UserVue)]).isRequired,
      active: t.bool.def(false),
      highlight: t.string
    },

    data() {
      return {
        editMode: false,
        newName: ''
      };
    },

    computed: {
      info() {
        let info = `${this.user.age} years old`;

        if (this.user.permissions.length) {
          info += `; permissions: ${this.user.permissions.join(', ')}`;
        }

        return info;
      },

      isPermanentAdmin() {
        return this.user instanceof AdminUser;
      }
    },

    methods: {
      toggleEditMode(flag) {
        this.editMode = flag;
        if (flag) {
          this.newName = this.user.fullName;
        } else {
          const [firstName, lastName] = this.newName.split(/\s/);
          [this.user.firstName, this.user.lastName] = [firstName || '', lastName || ''];
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .admin {
    color: red;
  }
</style>
