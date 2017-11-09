import template from './tickets-statistic.html';

let ticketsStatisticComponent = {
  templateUrl: template,
  controller: class TicketsStatisticController {

    constructor(TicketsService) {
      'ngInject';
      this.ticketsService = TicketsService;
      this.eventsStatistics = [];
      this.daysStatistics = [];
    }

    $onInit() {
      this.getEventsStatistics();
    }

    getEventsStatistics() {
      this.ticketsService.getStatistics({metod: 'admin'})
        .then(statistic => {
          this.eventsStatistics = this.createEventsStatisticModel(statistic);
          this.daysStatistics = this.createDaysStatisticModel(statistic);
        });
    }

    createEventsStatisticModel(statistic) {
      let uniqueDatesForMatch = [...new Set(statistic.map(item => item.date))];

      return uniqueDatesForMatch.map(date => {
        let uniqueUserTypes = [...new Set(statistic.filter(item => item.date === date)
          .map(item => item.cashier))];
        return uniqueUserTypes
          .map(buyer => {

            let itemsPrices = statistic.filter(item => item.date === date && item.cashier === buyer)
              .map(item => item.amount);
            let itemSectors = statistic.filter(item => item.date === date && item.cashier === buyer)
              .map(item => item.sector);

            return {
              date: new Date(date),
              headline: this.getHeadLineByDate(date, statistic),
              cashier: buyer,
              count: itemsPrices.length,
              sum: this.getSumOfArray(itemsPrices),
              details: this.getDetailsSectorsByEvent(itemSectors)
            }
          })
      })
    }

    createDaysStatisticModel(statistic) {
      let uniqueDates = [...new Set(statistic.map(item => item.dateBuy))];

      return uniqueDates.map(date => {
        let uniqueUserTypes = [...new Set(statistic.filter(item => item.dateBuy === date)
          .map(item => item.cashier))];
        return uniqueUserTypes
          .map(buyer => {
            let itemPrices = statistic.filter(item => item.dateBuy === date && item.cashier === buyer)
              .map(item => item.amount);
            return {
              cashier: buyer,
              date: new Date(date),
              sum: this.getSumOfArray(itemPrices),
              count: itemPrices.length,
              details: this.getDetailsPricesByDate(itemPrices)
            };
          })
      });
    }

    getHeadLineByDate(date, statistic) {
      return statistic.filter(item => item.date == date)[0].headline;
    }

    getUniqueItems(items) {
      return [...new Set(items)];
    }

    getSumOfArray(array) {
      return array.reduce((a, b) => a + b, 0);
    }

    getItemsByKey(key, items) {
      return items.filter(item => item == key);
    }

    getDetailsPricesByDate(itemPrices) {
      let uniquePrices = this.getUniqueItems(itemPrices);

      return uniquePrices.map(price => {
        return {
          price: price,
          count: this.getItemsByKey(price, itemPrices).length
        };
      });
    }

    getDetailsSectorsByEvent(itemSectors) {
      let uniqueSectors = this.getUniqueItems(itemSectors);

      return uniqueSectors.map(sector => {
        return {
          sector: sector,
          count: this.getItemsByKey(sector, itemSectors).length
        };
      });
    }
  }
};

export default ticketsStatisticComponent;
