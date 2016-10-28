'use strict';

(function () {

  class MatchesController {

    constructor($http, temp) {
      this.$http = $http;
      this.matches = [];

      this.$http.get('/api/matches')
        .then((response) => {
          this.matches = response.data;
        });

    }


  }

  angular.module('metalistTicketsApp')
    .controller('MatchesController', MatchesController);
})();
