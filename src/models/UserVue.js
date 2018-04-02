import Vue from 'vue';

export const User = Vue.extend({
  data: () => ({
    id: null,
    firstName: '',
    lastName: '',
    age: 0,
    permissions: []
  }),

  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },

    admin() {
      return this.permissions.includes('admin');
    }
  },

  methods: {
    togglePermission(permission, flag) {
      if (flag === undefined) {
        flag = !this.permissions.includes(permission);
      }

      if (flag && !this.permissions.includes(permission)) {
        this.permissions.push(permission);
      } else if (!flag && this.permissions.includes(permission)) {
        this.permissions = this.permissions.filter(userPerm => userPerm !== permission);
      }
    }
  }
});
