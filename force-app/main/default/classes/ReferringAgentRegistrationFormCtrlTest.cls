@IsTest
public class ReferringAgentRegistrationFormCtrlTest {
	@isTest
    public static void createReferringAgentTest(){
        Account testAcc = new Account(Name = 'Test');
        insert testAcc;
        
        Contact cont = new Contact(LastName = 'Test', AccountId = testAcc.Id);
        Test.startTest();
			ReferringAgentRegistrationFormController.createReferringAgent(cont);
        Test.stopTest();
        
        Contact con = [SELECT id FROM Contact LIMIT 1];
        System.assert(con!=null, 'Asserting if there is atleast one contact returned');
    }
    
    @isTest
    public static void getOccupationOptionsTest(){
        
        Test.startTest();
        	List<String> values = ReferringAgentRegistrationFormController.getOccupationOptions(new Contact(), 'Reference_Status__c');
        Test.stopTest();
        System.assert(!values.isEmpty());
    }
}