import template404 from './404.html';

const NotFoundComponent = {
  templateUrl: template404,
  controller: class NotFoundController {
    constructor($http) {
      'ngInject';
      this.$http = $http;
      this.matches = [];
    }
  }

};

export default NotFoundComponent;