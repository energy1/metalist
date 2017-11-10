import footerTemplate from './footer.html';

const footerComponent = {
  templateUrl: footerTemplate,
  controller: class FooterController {
    constructor($element){
      $element.addClass('footer');
    }
  }

};

export default footerComponent;