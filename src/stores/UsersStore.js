import _ from 'lodash';
import {computed, VueModel, observable} from 'vue-model-x';

export class UsersStore extends VueModel {
  @observable list = [];
  @observable filter = {
    admin: false,
    name: '',
    age: {
      min: null,
      max: null
    }
  };

  constructor(userFactory, users) {
    super();
    this.userFactory = userFactory;
    this.addUsers(users);
  }

  @computed get filtered() {
    const {admin, name, age} = this.filter;
    const nameRegexp = name ? new RegExp(_.escapeRegExp(name), 'i') : null;

    return this.list.filter(user => {
      if (admin && !user.admin) {
        return false;
      }

      if (_.isNumber(age.min) && user.age < age.min) {
        return false;
      }

      if (_.isNumber(age.max) && user.age > age.max) {
        return false;
      }

      return !nameRegexp || nameRegexp.test(user.fullName);
    });
  }

  @computed get count() {
    return this.list.length;
  }

  @computed get filteredCount() {
    return this.filtered.length;
  }

  addUsers(usersData) {
    const users = usersData.map(data => this.userFactory(data));
    this.list.push(...users);
  }

  deleteUser(user) {
    const index = this.list.indexOf(user);

    if (index >= 0) {
      this.list.splice(index, 1);
    }
  }
}
