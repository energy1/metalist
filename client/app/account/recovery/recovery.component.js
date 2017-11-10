import recoveryTemplate from './recovery.html';

const recoveryComponent = {
  templateUrl: recoveryTemplate,
  controller: class RecoveryController {
    constructor(Auth) {
      'ngInject';
      this.Auth = Auth;
      this.message = '';
      this.errors = {};
      this.submitted = false;
    }
  
  
    recovery(form, email) {
      form.$setDirty();
      form.email.$setDirty();
      this.submitted = true;
  
      if (form.$valid) {
        this.Auth.recoveryPassword(email)
          .then((response) => {
            this.message = response.message;
          })
          .catch(err => {
            this.errors.other = err.message;
          });
      }
    }
  }

};

export default recoveryComponent;