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
	    all: all,

	    get: get
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

	  /**
	   * @function get
	   * @description Gets a single account by Id
	   * @param  {string} id
	   * @return {promise} Resolves to a single account object
	   */
	  function get(id){
	  	return new Promise(function(resolve, reject) {
        var smartSql = "SELECT * from {Account__ap} WHERE {Account__ap:Id} = '" + id + "'";
        devUtils.smartSql(smartSql).then(function(resObject) {
          console.log('resObject', resObject);
          resolve(resObject.records[0]);
        }).catch(function(resObject){
          reject(resObject);
        });
      });
	  }

  }

})();
