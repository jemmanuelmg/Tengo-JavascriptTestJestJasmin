/**
 * @description       : 
 * @author            : emmanuel.martinez@tengo.co
 * @group             : 
 * @last modified on  : 09-10-2020
 * @last modified by  : emmanuel.martinez@tengo.co
 * Modifications Log 
 * Ver   Date         Author                       Modification
 * 1.0   09-10-2020   emmanuel.martinez@tengo.co   Initial Version
**/
public with sharing class TestingLWCController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Id engagementId){
        
        List<Account> accountList = [SELECT Name, Phone, Region__c, CreatedDate FROM Account ORDER BY Name DESC];
        return accountList;
        
    }

}
