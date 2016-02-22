
/**
 * Contacts Controller
 *
 * @description description
 */
(function() {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('ContactsCtrl', ContactsCtrl);

  ContactsCtrl.$inject = ['$scope', '$stateParams', 'ContactsService'];

  function ContactsCtrl($scope, $stateParams, ContactsService) {

    var contactsVm = this;

    activate();

    function activate() {
    	// Request contact details from our ContactService. We are passing in
    	// the accountId, taken from the URL (stateparams) as in our app.js
  	  ContactsService.get($stateParams.accountId).then(function(contacts) {
  	    //$scope.contacts = contacts;
        contactsVm.contacts = contacts;

  	    $scope.$apply();
  	  }).catch(function(e) {
  	    console.error('error', e);
  	  });
    }



  }

})();
