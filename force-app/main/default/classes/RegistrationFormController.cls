public without sharing class RegistrationFormController {
    public static Id referringAgentId = null;
    @AuraEnabled(cacheable= true)
    public static sObject authorizeRegistration(String volunteerEmail, String volunteerType){
        sObject sObjectToReturn = null;
        if(String.isEmpty(volunteerType) || String.isEmpty(volunteerEmail)){
            return null;
        }
        
        if(volunteerType == 'Volunteer'){
            Contact volunteer = [SELECT Id, Name, Email, MailingAddress, Birthdate, Phone, MobilePhone, Occupation__c,
                                 Name_and_location_of_company__c, Anything_to_interrupt_volunteering__c, Registration_Form_submitted__c, Professional_Title__c, Name_of_Primary_Care_Centre__c 
                                 FROM Contact WHERE Email=: volunteerEmail AND RecordTypeId =: Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Volunteer').getRecordTypeId() ];
            sObjectToReturn = volunteer;
        } else if (volunteerType == 'ReferringAgentforClient' || volunteerType == 'Client'){
            Contact referringAgent = [SELECT Id, Name, Email, MailingAddress, Birthdate, Phone, MobilePhone, Occupation__c,
                                 Name_and_location_of_company__c, Anything_to_interrupt_volunteering__c, Registration_Form_submitted__c
                                 FROM Contact WHERE Email=: volunteerEmail AND RecordTypeId =: Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Referring Agent').getRecordTypeId()];
            referringAgentId = referringAgent.Id;
            sObjectToReturn = referringAgent;
        } 
        
        return sObjectToReturn;
    }
    
    @AuraEnabled(cacheable = true)
    public static sObject authorizeClient(String clientLastNameDob){
        sObject sObjectToReturn;
        if(String.isEmpty(clientLastNameDob)){
            return null;
        }
        
        Account client = [SELECT Id, Is_BS_section_updated__c , Is_GFD_section_updated__c, D_O_B__c, Phone_alternative__c, Client_s_HSE_Area__c, Client_s_Health_Centre_name_and_location__c, Client_s_Public_Health_Nurse__c, Client_Contact_Person_1_First_Name__c, Client_Contact_Person_1_Surname__c, Relationship_to_applicant__c, Client_Contact_Person_1_Phone__c, Client_Contact_Person_1_Alternate_Phone__c,Client_Contact_Person_1_Email__c, Location_County_Country__c, Client_Contact_Person_2_First_Name__c, Client_Contact_Person_2_Surname__c, Relationship_to_applicant_2nd_contact__c, Client_Contact_Person_2_Phone__c,Client_Contact_Person_2_Alternate_Phone__c, Client_Contact_Person_2_Email__c, Location_County_Country_of_2nd_Contact__c,GP_Name__c, Surgery_name_location__c, Client_GP_s_Phone__c,BS_Source_of_referral__c, B_S_Referral_Source_Name__c,B_S_Referral_Source_surname__c, Professional_Title__c, B_S_Referral_Source_Telephone__c,B_S_Referral_Source_Email__c,B_S_Referral_Source_Date__c, Client_Consented_to_Referral__c, Client_Consent_to_GP__c, Reason_for_Referral__c,Befriending_Agency_Name__c,Home_Supports__c, Day_care__c,Meal_Supply__c, Family_Visit__c, Friends_Neighbours__c, Details_of_Support__c,Speech__c, Hearing__c,Client_has_pets__c, Client_is_a_smoker__c,Vision__c, Mobility__c, Cognitive_Status__c, Client_lives_alone__c, Client_has_a_spouse__c, Client_has_children__c,Previous_occupation__c, Any_specific_interests_hobbies__c,BS_Any_specific_RISK_concerns__c, Client_info_leaflet_provided__c,GFD_Source_of_referral__c, GFD_Source_of_referral_First_Name__c, GFD_Source_of_referral_Surname__c, GFD_Professional_Title__c, GFD_Telephone__c, GFD_Email__c, GFD_Date__c, Consent_given_by__c, GFD_Consent_for_referral__c,Consent_to_share_with_Making_Connections__c, GFD_Please_clarify_reason_for_no__c,Consent_to_share_into_with_HSE__c, Consent_to_share_info_with_Airfield__c, Conset_to_participate_in_Airfield_resear__c,GFD_Reason_for_referral__c, Relevant_Information__c, Method_of_invoicing__c, Invoicing_Name__c,Invoicing_Surname__c, Allergens_if_any__c, Client_Name__c, Client_Surname__c, ClientUniqueDetial__c FROM Account WHERE ClientUniqueDetial__c =: clientLastNameDob ];
        sObjectToReturn = client;
        return  sObjectToReturn;   
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getInterestPicklistValues(sObject objObject, string fieldName){   
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getInterestTransportationValues(sObject objObject, string fieldName){   
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getReferenceStatusValues(sObject objObject, string fieldName){   
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getSourceOfMakingConnections(sObject objObject, string fieldName){   
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getCommunicationMethods(sObject objObject, string fieldName){   
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getDrivingDays(sObject objObject, string fieldName){   
        return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
    @AuraEnabled
    public static void updateContactRecordDetails(Contact sobjectRecord, String sobjectType, List<String> volunteerTypes){
        Boolean isAlreadyUpdated = [SELECT Registration_Form_submitted__c FROM Contact WHERE id =: sobjectRecord.Id].Registration_Form_submitted__c;
        if(!isAlreadyUpdated){
            
            if(volunteerTypes.size() == 2){
                sobjectRecord.GFD_and_BS_Registration_Date__c = Date.today();
            } else{
                if(volunteerTypes.contains('GoodFoodDelivered')){
                	sobjectRecord.GFD_Registration_Date__c = Date.today();
                } else if(volunteerTypes.contains('BefriendingAndSupport')){
                    sobjectRecord.BS_Registration_Date__c  = Date.today();
                }
            }
             
            sobjectRecord.Registration_Form_submitted__c = true;
            sobjectRecord.RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Volunteer').getRecordTypeId();
            update sobjectRecord;
        }
    }
}