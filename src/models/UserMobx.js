import {observable, computed, VueModel} from 'vue-model-x';

export class User extends VueModel {
  @observable id;
  @observable firstName = '';
  @observable lastName = '';
  @observable age = 0;
  @observable permissions = [];

  constructor(data) {
    super();
    this.update(data);
  }

  @computed get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @computed get admin() {
    return this.permissions.includes('admin');
  }

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
