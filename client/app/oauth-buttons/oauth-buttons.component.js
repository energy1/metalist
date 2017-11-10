import template from './oauth-buttons.html';
import OauthButtonsController from './oauth-buttons.controller';

const oauthButtonsComponent = {
  templateUrl: template,
  bindings: {
    classes: '@'
  },
  controller: OauthButtonsController
};

export default oauthButtonsComponent;