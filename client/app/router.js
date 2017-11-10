"use strict";

import adminTemplate from './admin/admin.html';
import checkoutTemplate from './checkout/checkout.html';
import homeTemplate from './home/home.html';
import notFoundTemplate from './404/404.html';
import matchTemplate from './match/match.html';
import sectorTemplate from './sector/sector.html';
import ticketsTemplate from './tickets/tickets.html';
import accountTemplate from './account/login/login.html';
import recoveryTemplate from './account/recovery/recovery.html';
import signupTemplate from './account/signup/signup.html';
import settingsTemplate from './account/settings/settings.html';

export function routerConfig($cookiesProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/404');
  let n = new Date();
  $cookiesProvider.defaults.expires = new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours() + 6);
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('cashbox', {
      url: "/cashbox",
      component: 'cashbox'
    })
    .state('cashbox.abonementTicket', {
      url: "/abonementTicket",
      component: 'abonementTicket'
    })
    .state('cashbox.daysStatistic', {
      url: "/daysStatistic",
      component: 'cashierDaysStatistic',
      resolve: {
        dayStatistics: (TicketsService) => {
          'ngInject';
          return TicketsService.getStatistics({
            date: new Date(),
            metod: 'day'
          })
        },
      }
    })
    .state('cashbox.lastTickets', {
      url: "/lastTickets",
      component: 'cashierLastTickets',
      resolve: {
        lastTickets: (TicketsService) => {
          'ngInject';
          return TicketsService.getStatistics({
            date: new Date(),
            metod: 'event'
          })
        },
      }
    });

    $stateProvider.state('main.tickets', {
      url: '/my/tickets',
      component: 'ticketsComponent'  
    });

  $stateProvider.state('main', {
    abstract: true,
    url: '',
    template: '<ui-view />',
    resolve: {
      cart: (CartService) => {
        'ngInject';
        return CartService.loadCart()
          .catch((error) => {
            console.error(error);
          });
      }
    }
  });

  $stateProvider.state('admin', {
    url: '/admin',
    component: 'adminComponent',
    authenticate: 'admin'
  });

  $stateProvider.state('main.home', {
    url: '/',
    component: 'homeComponent'
  });

  $stateProvider.state('main.match', {
    url: '/match/:id/sectors',
    component: 'matchComponent',

    resolve: {
      match: (MatchService, $stateParams, $state) => {
        'ngInject';
        return MatchService
          .fetchMatch($stateParams.id)
          .catch((error) => {
            console.error(error);
            $state.go('404');
          })
          ;
      }
    }
  });

  $stateProvider.state('main.checkout', {
    url: '/checkout',
    component: 'checkoutComponent'
  });

  $stateProvider.state('main.sector', {
    url: '/match/:id/tribune/:tribune/sectors/:sector',
    component: 'sectorComponent',

    resolve: {
      //sector:  $stateParams,

      sector: ($stateParams) => {
        'ngInject';
        return $stateParams;
      },

      //sector: (Stadium, $stateParams) => {
      //
      //console.log('$stateParams', $stateParams);
      //
      //
      //  'ngInject';
      //  return Stadium['tribune_' + $stateParams.tribune]['sector_' + $stateParams.sector];
      //},
      match: (MatchService, $stateParams, $state) => {
        'ngInject';
        console.log('MatchService', MatchService.fetchMatch($stateParams.id))
        return MatchService
          .fetchMatch($stateParams.id)
          .catch((error) => {
            console.error(error);
            $state.go('404');
          });
      }
    }
  });

  

  $stateProvider.state('login', {
    url: '/login?referrer',
    referrer: 'main.home',
    component: 'loginComponent'
  })
    .state('logout', {
      url: '/logout',
      component: 'logoutComponent',
    })
    .state('signup', {
      url: '/signup',
      component: 'signupComponent'
    })
    .state('recovery', {
      url: '/recovery',
      templateUrl: recoveryTemplate,
      controller: 'RecoveryController',
      controllerAs: 'vm'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: settingsTemplate,
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true
    });

  $stateProvider.state('404', {
    url: '/404',
    templateUrl: notFoundTemplate,
    controller: '404Controller',
    controllerAs: 'vm'
  });
}