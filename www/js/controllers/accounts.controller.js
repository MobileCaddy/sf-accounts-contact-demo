
/**
 * Accounts Controller
 *
 * @description A controller for our Accounts listing screen
 */
(function() {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('AccountsCtrl', AccountsCtrl);

  // Inject dependencies that we need
  AccountsCtrl.$inject = ['$rootScope', '$ionicLoading', 'AccountService'];

  function AccountsCtrl($rootScope, $ionicLoading, AccountService) {

		// unhide our nav bar (element defined in index.html)
	  var e = document.getElementById('my-nav-bar');
	  angular.element(e).removeClass( "mc-hide" );

	  var vm = this;

	  activate();

	  function activate(){
		  // Start a loading spinner, this will be closed once the data has been
		  // returned from our service
		  $ionicLoading.show({
		    template: '<h1>Loading...</h1><p class="item-icon-left">Fetching accounts...<ion-spinner/></p>',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 600,
		    duration: 30000,
	      delay : 400
		  });
		  // Request data from our AccountService
		  AccountService.all().then(function(accounts) {
		    vm.accounts = accounts;
		    console.log('AccountsCtrl, got accounts', vm.accounts);
		    $ionicLoading.hide();
		  }, function(e) {
		    $ionicLoading.hide();
		    logger.error('error', e);
		  });
		}

		    /**
     * @event on syncTables
     * @description Handle events fired from the SyncService.
     */
    var handleSyncTables = $rootScope.$on('syncTables', function(event, args) {
      console.log("tops AccountsCtrl syncTables: " + JSON.stringify(args));
      switch (args.result.toString()) {
        case "InitialLoadComplete" :
          // Re-read from service if data hasn't yet been rendered
          if (vm.accounts.length === 0) {
            activate(true);
          }
          break;
      }
    });


  }

})();
