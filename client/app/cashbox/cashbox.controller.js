export default class CashboxController {
    constructor(SeasonTicketService, CashboxService) {
        'ngInject';
        this.seasonTicketService = SeasonTicketService;
        this.cashboxService = CashboxService;
        this.errorMessageSeat;
        this.preSellTicket = null;
        this.ticket = {};
        this.date = new Date(2018, 6, 1);
    }

    $onInit() {
    }

    regTicket(accessCode) {
        this.cashboxService.getTicketByAccessCode(accessCode)
            .then(response => {
        this.preSellTicket = response;
        });
    }

    createSeasonTicket() {
        let slug = 's' + this.preSellTicket.seat.sector + 'r' + this.preSellTicket.seat.row + 'st' + this.preSellTicket.seat.seat;
        let ticket =  this.preSellTicket.seat;
        ticket.reservedUntil = this.date;
        ticket.accessCode = this.preSellTicket.accessCode;
        this.seasonTicketService.createSeasonTicket(ticket, slug)
            .then(() => {
                        this.cashboxService.setTicketUsed(this.preSellTicket._id)
                        })
            .catch((err) => {
                if (err.status === 409) { this.errorMessageSeat = 'Это место уже занято.'; }
            });
    }
}