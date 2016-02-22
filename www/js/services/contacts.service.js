/**
 * ContactsService
 *
 * @description description
 */
(function() {
  'use strict';

  angular
    .module('starter.services')
    .factory('ContactsService', ContactsService);

  ContactsService.$inject = ['devUtils'];

  function ContactsService(devUtils) {
  	return {
  		get: get
	  };

	  /**
	   * @description Gets the list of contacts for a particular _
	   * @param  {string} accountId The Id of the account we are interested in.
	   * @return {promise}	resolves to a list of contact records (or an error)
	   */
	  function get(accountId){
      return new Promise(function(resolve, reject) {
        var smartSql = "SELECT * from {Contact__ap} WHERE {Contact__ap:AccountId} = '" + accountId + "'";
        devUtils.smartSql(smartSql).then(function(resObject) {
          resolve(resObject.records);        }).catch(function(resObject){
          reject(resObject);
        });
      });
    }

  }

})();
