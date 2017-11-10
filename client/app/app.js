"use strict";

import angular from 'angular';
import datePicker from './../../node_modules/angular-datepicker/index';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import validationMatch from 'angular-validation-match';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';
import ioBarcode from 'angular-io-barcode';

import './angular-locale_ru-ru';

import MatchDetailsComponent from './match-details/match-details.component';
import CartDetailsComponent from './cart/details/cart-details.component';
import CartSummaryComponent from './cart/summary/cart-summary.component';
import NavpanelComponent from './navpanel/navpanel.component';
import StadiumComponent from './stadium/stadium.component';
import CalendarComponent from './calendar/calendar.component';
import RenderTicketComponent from './render-ticket/render-ticket.component';

import CartService from './services/cart.service';
import MatchService from './services/match.service';
import TicketsService from './services/ticket.service';
import PrintTicketService from './print-ticket/print-ticket.servise';
import FileService from './services/file.service';

import footerDirective from './footer/footer.directive';
import mongooseErrorDirective from './mongoose-error/mongoose-error.directive';
import navbarDirective from './navbar/navbar.directive';
import oauthButtonsDirective from './oauth-buttons/oauth-buttons.directive';

import { routerConfig } from './router';
import routerDecorator from './auth/router.decorator';

import adminModule from './admin/admin.module';
import cashboxModule from './cashbox/cashbox.module';
import authModule from './auth/auth.module';
import ticketsModule from './tickets/tickets.module';
import constantsModule from './app.constant';
import filtersModule from './filters/filters';
import CheckoutComponent from './checkout/checkout.component';
import HomeComponent from './home/home.component';
import LoginComponent from './account/login/login.component';
import LogoutController from './account/logout/logout.controller';
import LogoutComponent from './account/logout/logout.component';
import SignupComponent from './account/signup/signup.component';
import MatchComponent from './match/match.component';
import NotFoundController from './404/404.controller';
import NavbarController from './navbar/navbar.controller';
import RecoveryComponent from './account/recovery/recovery.component';
import SectorComponent from './sector/sector.component';
import SettingsComponent from './account/settings/settings.component';

import '../favicon.ico';
import './app.less';
import './../../node_modules/angular-datepicker/dist/index.min.css';

angular.module('metalistTicketsApp', [
  adminModule,
  cashboxModule,
  authModule,
  filtersModule,
  constantsModule,
  ngCookies,
  ngResource,
  ngSanitize,
  uiRouter,
  uiBootstrap,
  validationMatch,
  datePicker,
  ioBarcode.name,
  ticketsModule
])
  .component('loginComponent', LoginComponent)
  .component('logoutComponent', LogoutComponent)
  .component('signupComponent', SignupComponent)
  .component('recoveryComponent', RecoveryComponent)
  .component('settingsComponent', SettingsComponent)
  .component('homeComponent', HomeComponent)
  .component('matchDetails', MatchDetailsComponent)
  .component('matchComponent', MatchComponent)
  .component('cartDetails', CartDetailsComponent)
  .component('cartSummary', CartSummaryComponent)
  .component('navpanel', NavpanelComponent)
  .component('stadium', StadiumComponent)
  .component('calendar', CalendarComponent)
  .component('renderTicket', RenderTicketComponent)
  .component('checkoutComponent', CheckoutComponent)
  .component('sectorComponent', SectorComponent)
  
  .directive('footer', footerDirective)
  .directive('mongooseError', mongooseErrorDirective)
  .directive('navbar', navbarDirective)
  .directive('oauthButtons', oauthButtonsDirective)
  
  .service('CartService', CartService)
  .service('MatchService', MatchService)
  .service('TicketsService', TicketsService)
  .service('PrintTicketService', PrintTicketService)
  .service('FileService', FileService)
    
  
  .controller('NavbarController', NavbarController)
  .controller('NotFoundController', NotFoundController)


  .config(routerConfig)
  .config(function ($httpProvider) {
    'ngInject';
    $httpProvider.interceptors.push('authInterceptor');
  })
  .run(function ($rootScope, $window) {
    'ngInject';
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, prev, prevParams) {
      if (next.name === 'login' && prev && prev.name && !prev.authenticate) {
        next.referrer = prev.name;
        next.params = prevParams;
        $window.sessionStorage.href = $window.location.href;
      }
      if (next.name === 'signup') {
        $window.sessionStorage.href = $window.location.href;
      }
      if ($window.location.hash && ( $window.location.hash == '#_=_' || $window.location.hash == '#-=-' )) {
        event.preventDefault();
        $window.location.href = $window.sessionStorage.href;
      }
    });
  })
  .run(routerDecorator);