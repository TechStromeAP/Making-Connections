public class ReferringAgentRegistrationFormController {
	@AuraEnabled
    public static void createReferringAgent(Contact referringAgentDetails){
        try{
            referringAgentDetails.RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Referring Agent').getRecordTypeId();
            insert referringAgentDetails;  
        } catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable= true)
    public static List<String> getOccupationOptions(sObject objObject, string fieldName){
		return GeneralUtil.getSelectOptions(objObject, fieldName);
    }
    
}