export default class TicketsService {

  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  fetchReservedSeats(matchId, sectorName) {
    return this.$http.get('api/seats/reserved-on-match/' + matchId + '/sector/' + sectorName)
      .then(response => response.data);
  }

  getMyTickets() {
    return this.$http.get('api/tickets/my')
      .then(response => response.data);
  }

  getPendingStatus() {
    return this.$http.get('api/orders/payment-status')
      .then(response => response.data.status);
  }

  getStatistics(data) {
    return this.$http.get('api/tickets/statistics', {params: {date: data.date, metod: data.metod}})
      .then(response => response.data);
  }

  removeTicket(ticketId) {
    return this.$http.delete('/api/tickets/'+ ticketId)
      .then(response => response.data);
  }

}