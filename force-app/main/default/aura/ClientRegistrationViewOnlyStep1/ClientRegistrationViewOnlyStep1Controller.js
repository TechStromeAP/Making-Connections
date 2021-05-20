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
        var cmpEvent = component.getEvent("nextInStep1ClientFormViewOnly");
        var newClient = component.get("v.client");
        cmpEvent.setParams({
            "dataFromStepOne": newClient,
        })
        cmpEvent.fire();
    }
})