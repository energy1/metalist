const logoutComponent = {
  template: '',
  controller: class logoutController {
    constructor($state, $http, Auth, CartService) {
      'ngInject';
      this.Auth = Auth;
      this.$http = $http;
      this.$state = $state;
      this.loadCart = CartService.loadCart.bind(CartService);

      this.Auth.logout();
      this.logoutSession();
    }

    logoutSession() {
      return this.$http.get('/auth/local/logout')
        .then(() => {
          this.loadCart();

          this.$state.go('main.home');
        })
        .catch((error) => {
          console.error(error);
          this.$state.go('404');
        });
    }
  }
};

export default logoutComponent;