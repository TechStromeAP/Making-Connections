public without sharing class ClientRegistrationController {
    @AuraEnabled(cacheable= true)
    public static List<String> getHseAreas(sObject objObject, string fieldName){
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getGfdReferenceStatus(sObject objObject, string fieldName){
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getBAndSReferenceStatus(sObject objObject, string fieldName){
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getConsentBy(sObject objObject, string fieldName){
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getServiceSelections(sObject objObject, string fieldName){
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
       
    @AuraEnabled(cacheable= true)
    public static List<String> getMethodOfInvoicing(sObject objObject, string fieldName){
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getOtherBefriendingAgencies(sObject objObject, string fieldName){
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }

    @AuraEnabled
    public static void saveClientDetails(Account clientRecord, string registrationType, String referringAgentEmail){
        try{
            Contact conToUpdate = [SELECT Id, AccountId, FirstName, LastName, Occupation1__c,
                                   Professional_Title__c, MobilePhone, Email FROM Contact WHERE Email =: referringAgentEmail AND RecordTypeId =: Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Referring Agent').getRecordTypeId() LIMIT 1];
            
            clientRecord.RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('HH_Account').getRecordTypeId();
            if(registrationType == 'BefriendingAndSupport'){
                clientRecord.B_S_Referral_Source_Name__c = conToUpdate.FirstName;
                clientRecord.B_S_Referral_Source_surname__c = conToUpdate.LastName;
                clientRecord.Professional_Title__c = conToUpdate.Professional_Title__c;
                clientRecord.B_S_Referral_Source_Telephone__c = conToUpdate.MobilePhone;
                clientRecord.B_S_Referral_Source_Email__c = conToUpdate.Email;
                clientRecord.BS_Source_of_referral__c = conToUpdate.Occupation1__c;
				clientRecord.Is_BS_section_updated__c  = true;
            } else{
                clientRecord.GFD_Source_of_referral_First_Name__c  = conToUpdate.FirstName;
                clientRecord.GFD_Source_of_referral_Surname__c = conToUpdate.LastName;
                clientRecord.GFD_Professional_Title__c = conToUpdate.Professional_Title__c;
                clientRecord.GFD_Source_of_referral__c = conToUpdate.Occupation1__c;
                clientRecord.GFD_Telephone__c = conToUpdate.MobilePhone;
                clientRecord.GFD_Email__c = conToUpdate.Email;
                clientRecord.Is_GFD_section_updated__c = true;     
            }
            upsert clientRecord;
        
            //conToUpdate.AccountId = clientRecord.Id;
            //update conToUpdate;
            List<AccountContactRelation> conRel =[SELECT ContactId FROM AccountContactRelation WHERE AccountId =:clientRecord.Id AND ContactId=:conToUpdate.Id ];
            if(conRel.isEmpty()){
                AccountContactRelation nw = new AccountContactRelation();
                nw.AccountId = clientRecord.Id;
                nw.ContactId = conToUpdate.Id;
                upsert nw;
            }
        } catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}