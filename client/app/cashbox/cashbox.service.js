export default class CashboxService {

  constructor($http, Auth, $cookies) {
    'ngInject';
    this.$http = $http;
    this.Auth = Auth;
    this.$cookies = $cookies;
  }

  getTicketByAccessCode(accessCode) {
    return this.$http.get('api/tickets/abonticket/' + accessCode)
      .then(response => response.data);
  }

  setTicketUsed(ticketId) {
    return this.$http.get('api/tickets/useabonticket/' + ticketId)
      .then(response => response.data);
  }
}