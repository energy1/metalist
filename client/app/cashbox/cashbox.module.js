import CashboxController from './cashbox.controller';
import AbonementTicketComponent from './abonement-ticket/abonement-ticket.component';
import CashboxService from './cashbox.service';

let cashboxModule = angular.module('metalistTicketsApp.cashbox', [])
  .service('CashboxService', CashboxService)
  .controller('CashboxController', CashboxController)
  .component('abonementTicket', AbonementTicketComponent)
  .name;

export default cashboxModule;