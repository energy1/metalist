import loginTemplate from './login.html';

const loginComponent = {
	templateUrl: loginTemplate,
	controller: class LoginController {
		constructor(Auth, $state, CartService) {
			'ngInject';
			this.user = {};
			this.errors = '';
			this.submitted = false;	
			this.Auth = Auth;
			this.$state = $state;
			this.CartService = CartService;
			this.referrer = $state.params.referrer || $state.current.referrer || 'main.home';
			this.params = $state.current.params || {};
		}

		login(form) {
			this.submitted = true;
	
			if (form.$valid) {
				this.Auth.login({
					email: this.user.email,
					password: this.user.password
				})
					.then(() => {
						//get user`s cart
						this.CartService.loadCart();
						// Logged in, redirect to home
						this.$state.go(this.referrer, this.params);
					})
					.catch(err => {
						this.errors = err.message;
					});
			}
		}
	}
};

export default loginComponent;