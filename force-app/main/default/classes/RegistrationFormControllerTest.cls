@isTest(seeAllData = false)
public class RegistrationFormControllerTest {
	@TestSetup
    public static void setup(){
        Account testAccount = new Account(Name='Test Account', D_O_B__c=Date.today(), Client_Surname__c = 'Test');
        insert testAccount;
        
        Contact testContact = new Contact(
        	LastName = 'Test',
            Email = 'Test@test.com',
            AccountId = testAccount.Id
        );
        insert testContact;
        
        Contact reffAgentContact = new Contact(
        	LastName = 'Test',
            Email = 'Test@test1.com',
            AccountId = testAccount.Id,
            RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Referring Agent').getRecordTypeId()
        );
        insert reffAgentContact;
    }
    
    @isTest
    public static void authorizeRegistrationVolunteerTest(){
        Contact testContact = [SELECT Id, Email FROM Contact WHERE Email = 'Test@test.com' LIMIT 1];
        List<Contact> con = new List<Contact>();
        Test.startTest();
        	con.add((Contact)RegistrationFormController.authorizeRegistration(testContact.Email, 'Volunteer'));
        Test.stopTest();
    }
    
    
    @isTest
    public static void authorizeRegistrationReferringAgentForClientTest(){
        Contact reffAgentContact = [SELECT Id, Email FROM Contact WHERE Email = 'Test@test1.com' LIMIT 1];
        List<Contact> con = new List<Contact>();
        Test.startTest();
        	con.add((Contact)RegistrationFormController.authorizeRegistration(reffAgentContact.Email, 'ReferringAgentforClient'));
        Test.stopTest();
    }
    
    @isTest
    public static void getInterestPicklistValuesTest(){
        Test.startTest();
        	List<String> values = RegistrationFormController.getInterestPicklistValues(new Contact(), 'Any_special_skills_hobbies_or_interests__c');
        Test.stopTest();
        System.assert(!values.isEmpty());
    }
    
    @isTest
    public static void getReferenceStatusValuesTest(){
        Test.startTest();
        	List<String> values = RegistrationFormController.getReferenceStatusValues(new Contact(), 'Reference_Status__c');
        Test.stopTest();
        System.assert(!values.isEmpty());
    }
    
    @isTest
    public static void getSourceOfMakingConnectionsTest(){
        Test.startTest();
        	List<String> values = RegistrationFormController.getSourceOfMakingConnections(new Contact(), 'How_did_you_hear_about_MC__c');
        Test.stopTest();
		System.assert(!values.isEmpty());
    }
    
    @isTest
    public static void getCommunicationMethodsTest(){
        Test.startTest();
        	List<String> values = RegistrationFormController.getDrivingDays(new Contact(), 'Infrequent_news_or_events_from_MC__c');
        Test.stopTest();
        System.assert(!values.isEmpty());
    }
    
    
    @isTest
    public static void getDrivingDaysTest(){
        Test.startTest();
        	List<String> values = RegistrationFormController.getCommunicationMethods(new Contact(), 'Driving_Availability__c');
        Test.stopTest();
        System.assert(!values.isEmpty());
    }
    
    @isTest
    public static void updateContactRecordDetailsGFDTest(){
		Contact testContact = [SELECT Id, Email, Registration_Form_submitted__c FROM Contact LIMIT 1];
        Test.startTest();
        RegistrationFormController.updateContactRecordDetails(testContact, 'Contact', new List<String>{'GoodFoodDelivered'});
        Test.stopTest();
        Contact updatedContact = [SELECT Id, Email, Registration_Form_submitted__c FROM Contact WHERE Id =: testContact.Id];
        System.assertEquals(true, updatedContact.Registration_Form_submitted__c, 'Asert if value is updated');
    }
    
    @isTest
    public static void updateContactRecordDetailsBFTest(){
		Contact testContact = [SELECT Id, Email, Registration_Form_submitted__c FROM Contact LIMIT 1];
        Test.startTest();
        RegistrationFormController.updateContactRecordDetails(testContact, 'Contact', new List<String>{'BefriendingAndSupport'});
        Test.stopTest();
        Contact updatedContact = [SELECT Id, Email, Registration_Form_submitted__c FROM Contact WHERE Id =: testContact.Id];
        System.assertEquals(true, updatedContact.Registration_Form_submitted__c, 'Asert if value is updated');
    }
    
    @isTest
    public static void updateContactRecordDetailsBFAndGfdTest(){
		Contact testContact = [SELECT Id, Email, Registration_Form_submitted__c FROM Contact LIMIT 1];
        Test.startTest();
        RegistrationFormController.updateContactRecordDetails(testContact, 'Contact', new List<String>{'BefriendingAndSupport', 'GoodFoodDelivered'});
        Test.stopTest();
        Contact updatedContact = [SELECT Id, Email, Registration_Form_submitted__c FROM Contact WHERE Id =: testContact.Id];
        System.assertEquals(true, updatedContact.Registration_Form_submitted__c, 'Asert if value is updated');
    }
    
}