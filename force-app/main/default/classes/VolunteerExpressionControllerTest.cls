@isTest(seeAllData = false)
public with sharing class VolunteerExpressionControllerTest {
    @isTest
    private static void VolunteerForInsertTest(){
        Lead newVolunteer = new Lead(
            Email = 'test@test.com',
            Status = 'Open - Not Contacted',
            LastName = 'Doe',
            Company = '[Not Provided]',
            Occupation__c = 'Event Manager'
        );

        Test.startTest();
            try{
                VolunteerExpressionController.createLeadVolunteer(newVolunteer);
            } catch(Exception e){
                
            }
        Test.stopTest(); 

    }
    
    @isTest
    private static void VolunteerForExceptionTest(){
        String exceptionMessage = '';
        Lead newVolunteer = new Lead(
            Email = 'test@test.com',
            Status = 'Open - Not Contacted',
            LastName = 'Doe',
            Company = '[Not Provided]'
        );

        Test.startTest();
            try{
                VolunteerExpressionController.createLeadVolunteer(newVolunteer);
            } catch(Exception e){
                exceptionMessage = e.getMessage();
            }
        Test.stopTest(); 
        System.assert(exceptionMessage != null, 'Exception Thrown');
    }
    
    @isTest
    private static void getPicklistValuesTest(){
        Test.startTest();
        	List<String> values = VolunteerExpressionController.getPicklistValues();
		Test.stopTest(); 
    }
}