import {User} from './UserMobx';
import {computed, observable} from 'vue-model-x';

export class AdminUser extends User {
  @observable adminLevel = 1;

  constructor(data) {
    super(data);
    this.togglePermission('admin', true);
  }

  @computed get fullName() {
    return `${super.fullName} (level ${this.adminLevel})`;
  }

  togglePermission(permission, flag) {
    if (flag === undefined) {
      flag = !this.permissions.includes(permission);
    }

    if (permission === 'admin' && !flag) {
      return;
    }

    super.togglePermission(permission, flag);
  }

  increaseAdminLevel() {
    this.adminLevel++;
  }
}
