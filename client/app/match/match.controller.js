export default class MatchController {

  constructor(match, cart, $state) {
    'ngInject';
    this.$state = $state;

    this.match = match;
    debugger
    this.cart = cart;
    this.priceSchema = this.match.priceSchema.priceSchema;

    console.log('this.cart', this.cart);
  }

  goToSector($event) {
    if ($event.price) {
      this.$state.go('main.sector', {id: this.match.id, tribune: $event.tribune, sector: $event.sector});
    }
  }

}
