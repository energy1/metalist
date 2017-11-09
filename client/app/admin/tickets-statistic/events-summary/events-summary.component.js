import template from './events-summary.html';

let eventsSummaryComponent = {
  templateUrl: template,
  bindings: {
    eventsStatistics: '<'
  },
  controller: class EventsSummaryController {

    constructor() {
      'ngInject';
      this.statistics = [];
    }

    $onChanges(changes) {
      if (changes.eventsStatistics) {
        this.eventsStatistics = angular.copy(this.eventsStatistics);
        if (!this.eventsStatistics.length) {
          this.statistics = [];
        }
        if (this.eventsStatistics.length) {
          this.eventsStatistics = angular.copy(this.eventsStatistics);
          this.statistics = angular.copy(this.eventsStatistics);
        }
      }
    }
  }
};

export default eventsSummaryComponent;