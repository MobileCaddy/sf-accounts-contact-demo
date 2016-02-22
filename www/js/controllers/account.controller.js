
/**
 * AccountDetail Controller
 */
(function() {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = [ '$stateParams', 'AccountService'];

  function AccountCtrl($stateParams, AccountService) {

    var vm = this;

		AccountService.get($stateParams.accountId).then(function(account) {
	   vm.account = account;
	  }, function(e) {
	    console.error('error', e);
	  });

  }

})();
