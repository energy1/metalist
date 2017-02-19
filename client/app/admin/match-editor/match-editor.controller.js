'use strict';

(function () {

  class MatchEditorController {

    constructor(MatchEditorService, PriceSchemaService) {
      this.matchEditorService = MatchEditorService;
      this.priceSchemaService = PriceSchemaService;

      this.matches = [];
      this.priceSchemas = [];
      this.priceSchema = '';
      this.rival = '';
      this.date = new Date();
      this.date.setDate(this.date.getDate() + 1);
      this.matchToEdit = {"rival": this.rival, "date": this.date};
    }

    $onInit() {
      this.loadPriceSchemas();
      this.loadMatches();
    }

    edit(match) {
      this.matchToEdit = Object.assign({}, match);
    }

    loadPriceSchemas() {
      return this.priceSchemaService.loadPrices()
        .then(response => {
          this.priceSchemas = response.data;
          this.priceSchema = this.priceSchemas[0];
        });
    }

    loadMatches() {
      return this.matchEditorService.loadMatches().then(mathces => this.matches = mathces)
    }

    addMatch() {
      this.matchEditorService.createMatch({rival: this.matchToEdit.rival, date: this.matchToEdit.date, priceSchema: this.priceSchema})
        .then(() => this.loadMatches());
    }

    saveMatch() {
      this.matchEditorService.editMatch(this.matchToEdit)
        .then(() => this.loadMatches());
    }

  }

  angular.module('metalistTicketsApp.admin')
    .controller('MatchEditorController', MatchEditorController);
})();
