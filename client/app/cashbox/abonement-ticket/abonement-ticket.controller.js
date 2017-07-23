export default class AbonementTicketController {

    constructor(SeasonTicketService) {
        'ngInject';
        this.seasonTicketService = SeasonTicketService;

        this.seasonTickets = [];
        this.blockRowSeats = [];
        this.errorMessageSeat = '';
        this.errorMessageBlockRow = '';
    }

    $onInit() {
        this.loadSeasonTickets();
    }


    $onChanges(changes) {
        if ( changes.seasonTickets ) {
            this.tickets = this.seasonTickets;
        }
    }

    loadSeasonTickets() {
        this.seasonTicketService.loadSeasonTickets().then(response => this.seasonTickets = response.data);
        this.errorMessageSeat = '';
    }

    deleteTicket($event) {
        this.seasonTicketService.deleteSeasonTicket($event.slug)
            .then(() => {
            this.loadSeasonTickets();
         });
    }

}