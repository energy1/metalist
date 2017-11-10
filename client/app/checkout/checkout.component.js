import moment from 'moment-timezone';
import checkoutTemplate from './checkout.html'

const checkoutComponent = {
  templateUrl: checkoutTemplate,
  controller: class CheckoutController {

    constructor($window, CartService, $scope, $interval, Auth) {
      'ngInject';
      this.$window = $window;
      this.$interval = $interval;
      this.$scope = $scope;
      this.cartService = CartService;
      this.Auth = Auth;
      this.isLoggedIn = Auth.isLoggedIn;

      this.stopTime = '';
      this.confirm = false;
      this.message = '';
      this.cart = {};
      this.duration = 0;
      this.reserveDate = '';

      this.checkReservedSeatForTimerOn();
      this.$scope.$on('$destroy', this.stopHandling.bind(this));
    }

    checkReservedSeatForTimerOn() {
      this.cart = this.cartService.getMyCart();

      if (this.cart.seats.length) {
        this.getReserveDate();
        this.timerOn();
      }
    }

    timerOn() {
      let diffTime = moment(this.reserveDate).tz("Europe/Kiev") - moment().tz("Europe/Kiev"),
        interval = 1000;

      this.duration = moment.duration(diffTime, 'milliseconds') > 0 ? moment.duration(diffTime, 'milliseconds') : moment.duration(0, 'milliseconds');

      this.stopTime = this.$interval(() => {
        if (this.duration <= 0) {
          return this.stopHandling();
        }
        this.duration = moment.duration(this.duration - interval, 'milliseconds');
      }, interval);
    }

    getReserveDate() {
      if (this.cart.seats.length > 1) {
        this.cart.seats.sort((a, b) => b.reservedUntil - a.reservedUntil);
      }
      this.reserveDate = this.cart.seats[0].reservedUntil;
    }

    stopHandling() {
      this.$interval.cancel(this.stopTime);
    }

    updateCart() {
      this.reserveDate = '';
      this.match = {};
      this.stopHandling();
      this.checkReservedSeatForTimerOn();
    }

    confirmEmail(form, user) {
      form.$setDirty();
      form.email.$setDirty();

      let email = user.email;

      if (form.$valid) {
        this.Auth.generateGuestPassword(email)
          .then(response => {
            this.confirm = true;
            this.message = response.message;
          })
          .catch(err => {
            this.confirm = false;
            if (err.status === 409) {
              this.message = 'Вы уже зарегистрированы.';
            } else {
              this.message = err.message;
            }
          });
      }
    }

    guestLogin(form, user) {
      form.$setDirty();
      form.email.$setDirty();
      form.password.$setDirty();

      if (form.$valid) {
        this.Auth.login({
          email: user.email,
          password: user.password
        })
          .catch(err => {
            this.message = err.message;
          });
      }
    }

    checkout() {
      this.cartService.checkout()
        .then(response => {
          this.$window.location.href = response.paymentLink;
        })
        .catch((err) => {
          if (err.status === 406) { this.isReserveSuccess = true; }
        });
    }
  }

};

export default checkoutComponent;