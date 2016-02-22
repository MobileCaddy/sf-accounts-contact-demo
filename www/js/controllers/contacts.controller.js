
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

  ContactsCtrl.$inject = ['$scope', '$stateParams', '$ionicListDelegate', '$ionicModal', 'ContactsService','SyncService'];

  function ContactsCtrl($scope, $stateParams, $ionicListDelegate, $ionicModal, ContactsService, SyncService) {

    var contactsVm = this;

    contactsVm.showEdit    = showEdit;
    contactsVm.saveContact = saveContact;
    contactsVm.closeModal  = closeModal;

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


    function showEdit(event, contact){
      var data2 = _.clone(contact);
      if(event){
        event.stopPropagation();
        event.preventDefault();
      }
      $ionicModal.fromTemplateUrl("editModal.html", {
        scope: $scope,
        backdropClickToClose: false
      }).then(function(modal) {
        contactsVm.editModal = modal;
        contactsVm.editModal.data = data2;
        contactsVm.editModal.show();
      });
    }

    function saveContact(contact){
      closeModal();
      var updatedContact = {'Id': contact.Id};
      updatedContact.Email = contact.Email;
      ContactsService.update(updatedContact).then(function(res) {
        $ionicListDelegate.closeOptionButtons();
        SyncService.syncTables(['Contact__ap']);
      }).catch(function(resObject){
        logger.error('ContactsCtrl ' + JSON.stringify(resObject));
        // TODO - some other standard UI thing showing issue?
      });
    }


    function closeModal(data) {
      if (contactsVm.editModal) {
        contactsVm.editModal.hide();
        contactsVm.editModal.remove();
        $ionicListDelegate.closeOptionButtons();
        delete contactsVm.editModal;
      }
    }

  }

})();
