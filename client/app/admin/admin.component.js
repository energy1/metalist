import adminTemplate from './admin.html';

const adminComponent = {
    templateUrl: adminTemplate,
    controllerAs: adminCtrl,
    controller: class adminController{
        constructor () {}
    },    
};

export default adminComponent;