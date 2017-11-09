import template from './days-summary.html';

let daysSummaryComponent = {
  templateUrl: template,
  bindings: {
    daysStatistics: '<'
  },
  controller: class DaysSummaryController {

    constructor() {
      this.statistics = [];
    }

    $onChanges(changes) {
      console.log('$onChanges', this.daysStatistics);
      if (changes.daysStatistics) {
        if (!this.daysStatistics.length) {
          this.statistics = [];
        }
        if (this.daysStatistics.length) {
          this.statistics = this.daysStatistics;
        }
      }
    }
  }
};

export default daysSummaryComponent;