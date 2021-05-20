@isTest(seeAllData = false)
public class ClientRegistrationControllerTest {
    @testSetup
    static void setupData(){
        Account testAccount = new Account(Name = 'test Account', RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('HH_Account').getRecordTypeId());
        insert testAccount;
        
        Contact testContact = new Contact(
            LastName = 'testContact',
            Email = 'test@test.com',
            RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Referring Agent').getRecordTypeId()
        );
        insert testContact;
    }
    
    
    @isTest
    private static void getHseAreasTest(){
        test.startTest();
            List<String> values = ClientRegistrationController.getHseAreas(new Account(), 'Client_s_HSE_Area__c');
        test.stopTest();
        System.assert(!values.isEmpty());
    }
    
    @isTest
    private static void getGfdReferenceStatusTest(){
        test.startTest();
            List<String> values = ClientRegistrationController.getGfdReferenceStatus(new Account(), 'GFD_Source_of_referral__c');
        test.stopTest();
        System.assert(!values.isEmpty());
    }
    
    @isTest
    private static void getBAndSReferenceStatusTest(){
        test.startTest();
            List<String> values = ClientRegistrationController.getBAndSReferenceStatus(new Account(), 'BS_Source_of_referral__c');
        test.stopTest();
        System.assert(!values.isEmpty());
    }
    
    @isTest
    private static void getConsentByTest(){
        test.startTest();
            List<String> values = ClientRegistrationController.getConsentBy(new Account(), 'Consent_given_by__c');
        test.stopTest();
        System.assert(!values.isEmpty());
    }
    
    @isTest
    private static void getServiceSelectionsTest(){
        test.startTest();
            List<String> values = ClientRegistrationController.getServiceSelections(new Account(), 'Service_Selection__c');
        test.stopTest();
        System.assert(!values.isEmpty());
    }
    
       
    @isTest
    private static void getMethodOfInvoicingTest(){
        test.startTest();
            List<String> values = ClientRegistrationController.getMethodOfInvoicing(new Account(), 'Method_of_invoicing__c');
        test.stopTest();
        System.assert(!values.isEmpty());
    }
    
    @isTest
    private static void saveClientDetailsBSTest(){
        Account testAcc = [SELECT Id, Is_BS_section_updated__c, Is_GFD_section_updated__c FROM Account LIMIT 1];
        Contact testContact  = [SELECT Id, Email FROM Contact LIMIT 1];
        test.startTest();
            try{
                ClientRegistrationController.saveClientDetails(testAcc, 'BefriendingAndSupport', testContact.Email);
            } catch(Exception e){
                system.debug('exception');
            }
        test.stopTest();
    }
    
    @isTest
    private static void saveClientDetailsGFDTest(){
        Account testAcc = [SELECT Id, Is_BS_section_updated__c, Is_GFD_section_updated__c FROM Account LIMIT 1];
        Contact testContact  = [SELECT Id, Email FROM Contact LIMIT 1];
        test.startTest();
            try{
                ClientRegistrationController.saveClientDetails(testAcc, 'GoodFoodDelivered', testContact.Email);
            } catch(Exception e){
                system.debug('exception');
            }
        test.stopTest();
    }
}