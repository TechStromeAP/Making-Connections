({

    doInit: function (component, event, helper) {
        component.set("v.billingOptionsLabel", $A.get("$Label.c.Billing_Information_Section"));
        component.set("v.reasonForReferralLabel", $A.get("$Label.c.BS_Reason_for_Referral"));
        helper.doInitHelper(component, event, helper);
    },

    handleBackClick: function (component, event, helper) {
        var newClient = component.get("v.client");
        var cmpEvent = component.getEvent("previousInStep2ClientFormViewOnly");
        cmpEvent.setParams({
            "dataForModification": component.get("v.client"),
        })
        cmpEvent.fire();
    },

    handleSubmitForm: function (component, event, helper) {
        var volunteerData = component.get('v.client');
        var allValid = component.find('clientRegistrationForm').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);

        if (allValid) {
            var action = component.get('c.saveClientDetails');

            helper.showSpinnerfunction(component, event, helper);

            component.find('submitButton').set('v.disabled', true);
            action.setParams({
                clientRecord: component.get("v.client"),
                registrationType: component.get("v.volunteerType"),
                referringAgentEmail: component.get("v.referringAgentEmail")
            })
            action.setCallback(this, function (response) {
                if (response.getState() == "SUCCESS") {
                    window.location.replace('https://makingconnections.ie/form-received-referral/');
                } else {
                    console.log(JSON.stringify(response.getError()));
                    alert('There was an error updating the registration details. Please contact us at https://makingconnections.ie');
                }
            });
            $A.enqueueAction(action);
        } else {
            alert("Please complete all the required fields");
        }

    },
})