import matchTemplate from './match.html';

const matchComponent = {
    templateUrl: matchTemplate,
    bindings: {
        match: '<',
        cart1: '<'
    },
    controllerAs: 'matchCtrl',
    controller: class matchContrloller {

        constructor($state) {
            'ngInject';
            this.$state = $state;
          }

          $onInit() {
            this.priceSchema = this.match.priceSchema.priceSchema;
          }
        
          goToSector($event) {
            if ($event.price) {
              this.$state.go('main.sector', {id: this.match.id, tribune: $event.tribune, sector: $event.sector});
            }
          }
    }
};

export default matchComponent;