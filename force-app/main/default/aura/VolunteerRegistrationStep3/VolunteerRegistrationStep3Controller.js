({
    doInit: function (component, event, helper) {

        let questionsComments = $A.get("$Label.c.Additional_Comments");
        component.set("v.questionsCommentsLabel", questionsComments);
        helper.doInitHelper(component, event, helper);
    },

    handleBackClickStep3: function (component, event, helper) {
        var newLead = component.get("v.volunteer");
        var cmpEvent = component.getEvent("PreviousVolunteerRegistrationFormStep3");
        cmpEvent.setParams({
            "dataForModificationStep3": component.get("v.volunteer"),
        })
        cmpEvent.fire();
    },

    handleSubmitForm: function (component, event, helper) {
        var action = component.get('c.updateContactRecordDetails');
        var allValid = component.find('volunteerRegistrationForm').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);
        if (allValid) {
            helper.showSpinnerfunction(component, event, helper);
            var volunteer = component.get("v.volunteer");
            volunteer.Subscribed_to_MC_Marketing__c = true;
            component.find('submitButton').set('v.disabled', true);
            action.setParams({
                volunteerTypes : component.get("v.selectedVolunteerTypes"),
                sobjectRecord: volunteer,
                sobjectType: 'Contact'
            })
            action.setCallback(this, function (response) {
                if (response.getState() == "SUCCESS") {
                    window.location.replace('http://makingconnections.ie/form-received-volunteer');
                } else {
                    alert('There was an error updating the registration details. Please contact us at http://makingconnections.ie');
                    window.location.replace('https://makingconnections.ie/contact/');
                }
            });
            $A.enqueueAction(action);
        } else {
            alert('Please complete all the required fields');
        }
    },

})