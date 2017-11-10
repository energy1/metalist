import TicketsService from './../services/ticket.service';
import ticketsComponent from './tickets.component';

const ticketsModule = angular.module('metalistTicketsApp.tickets', [])
  .service('TicketsService', TicketsService)
  .component('ticketsComponent', ticketsComponent)
  .name;

export default ticketsModule;


