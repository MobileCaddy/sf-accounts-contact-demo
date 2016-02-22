/**
 * AccountService
 *
 * @description Service to deal with DB reads/writes of accounts
 */
(function() {
  'use strict';

  angular
    .module('starter.services')
    .factory('AccountService', AccountService);

  // inject our dependencies
  AccountService.$inject = ['devUtils'];

  function AccountService(devUtils) {

  	return {
	    all: all
	  };

	  /**
	   * @function all
	   * @description Gets a list of accounts.
	   * @return {promise} Resolves to an array of accounts
	   */
	  function all() {
	    return new Promise(function(resolve, reject) {
	      devUtils.readRecords('Account__ap', []).then(function(resObject) {
	        resolve(resObject.records);
	      }).catch(function(resObject){
	        reject(resObject);
	      });
	    });
	  }

  }

})();
