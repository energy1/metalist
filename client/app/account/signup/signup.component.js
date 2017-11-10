import signupTemplate from './signup.html';

const signupComponent = {
  templateUrl: signupTemplate,
  controller: class SignupController {
    constructor(Auth, $state) {
      'ngInject';
      this.Auth = Auth;
      this.$state = $state;
      this.errors = {};
    }
  
    //start-non-standard
    
    register(form) {
      this.submitted = true;
  
      if (form.$valid) {
        this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          isOfferNotification: this.user.isOfferNotification
        })
          .then(() => {
            // Account created, redirect to home
            this.$state.go('main.home');
          })
          .catch(err => {
            err = err.data;
  
            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, (error, field) => {
              form[field].$setValidity('mongoose', false);
              this.errors[field] = error.message;
            });
          });
      }
    }
  }

};

export default signupComponent;