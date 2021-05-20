({
    doInitHelper: function (component, fieldName) {
        var action = component.get('c.getSourceOfMakingConnections');
        action.setParams({
            "objObject": component.get("v.objInfo"),
            "fieldName": "How_did_you_hear_about_MC__c"
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
                component.set("v.sourceOfMakingConnections", sourceOptions);
            } else {
                alert('Callback Failed...');
            }
        });
        $A.enqueueAction(action);

        var action1 = component.get('c.getCommunicationMethods');
        action1.setParams({
            "objObject": component.get("v.objInfo"),
            "fieldName": "Infrequent_news_or_events_from_MC__c"
        })
        var communicationOptions = [];
        action1.setCallback(this, function (response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                for (var i = 0; i < allValues.length; i++) {
                    communicationOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.communicationMethods", communicationOptions);
            } else {
                alert('Callback Failed...');
            }
        });
        $A.enqueueAction(action1);
    },

    showSpinnerfunction: function (component, event, helper) {
        var spinner = component.find("mySpinner");
        $A.util.removeClass(spinner, "slds-hide");
    },
})