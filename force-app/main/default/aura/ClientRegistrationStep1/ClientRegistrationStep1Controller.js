({
    doInit: function (component, event, helper) {
        var action = component.get('c.getHseAreas');
        action.setParams({
            "objObject": component.get("v.objInfo"),
            "fieldName": "Client_s_HSE_Area__c"
        })
        var sourceOptions = [];
        action.setCallback(this, function (response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                for (var i = 0; i < allValues.length; i++) {
                    sourceOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.hseAreas", sourceOptions);
            } else {
                alert('Callback Failed...');
            }
        });
        $A.enqueueAction(action);
    },

    handleNextClick: function (component, event, helper) {
        var cmpEvent = component.getEvent("nextInStep1ClientForm");
        var valid_commission = true;
        var allValid = component.find('clientRegistrationForm').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);

        var dob = component.find("clientDob").get("v.value");

        var addressValid = component.find('clientAddress').checkValidity();

        if (allValid && addressValid) {
            var newClient = component.get("v.client");
            newClient.D_O_B__c = dob;
            newClient.Name = component.get("v.client").Client_Name__c + ' ' + component.get("v.client").Client_Surname__c;
            cmpEvent.setParams({
                "dataFromStepOne": newClient,
            })
            cmpEvent.fire();
            return (valid_commission);
        } else {
            alert('Please complete all the required fields');
        }
    }
})