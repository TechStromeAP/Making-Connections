public with sharing class VolunteerExpressionController {
    @AuraEnabled
    public static void createLeadVolunteer(Lead leadRecord){
        try {
            leadRecord.Active__c = 'Active';
            insert leadRecord;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static List<String> getPicklistValues(){
        List <String> options= new List <String>();
        Schema.SObjectType s = Schema.getGlobalDescribe().get('Lead') ;
        Schema.DescribeSObjectResult r = s.getDescribe() ;
        Map<String,Schema.SObjectField> fields = r.fields.getMap() ;
        Schema.DescribeFieldResult fieldResult = fields.get('Volunteer_Opportunities__c').getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            options.add(pickListVal.getValue());
        } 
        return options;
    }
}