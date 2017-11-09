import template from './cashier-days-statistic.html';

let cashierDaysStatisticComponent = {
  templateUrl: template,
  bindings: {
    dayStatistics: '<'
  },
  controller: class CashierDaysStatisticController {

    constructor(TicketsService) {
      'ngInject';
      this.ticketsService = TicketsService;
      this.date = new Date();
      this.statistics = [];
      this.dayStatistics = [];

    }

    $onInit() {
      this.statistics = this.dayStatistics;
    }

    dateChanges($event) {
      this.getStatistics({
        date: $event.date,
        metod: 'day'
      });
    };

    getStatistics(date) {
      this.ticketsService.getStatistics(date)
        .then(response => {
          this.statistics = response;
        })
    }

    isStatistics(){
      return this.statistics
    }

    getAmount(){
      return this.statistics.reduce((sum, current) => {
        return sum + current.sum
      }, 0);
    }

  }
};

export default cashierDaysStatisticComponent;