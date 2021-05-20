({
    doInitHelper : function(component, event, helper) {
        var action5 = component.get('c.getOtherBefriendingAgencies');
        action5.setParams({
            "objObject" : component.get("v.objInfo"),
            "fieldName": "Referred_to_another_befriending_agency__c"
        })
        var befriendingOtherOptions = [];
        action5.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                let allValues = response.getReturnValue();
                for (let i = 0; i < allValues.length; i++) {
                    befriendingOtherOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.befriendingAgencyOptions", befriendingOtherOptions);
            }else{
                console.log('Callback Failed...');
            }
        });
        $A.enqueueAction(action5);

        var action1 = component.get('c.getBAndSReferenceStatus');
        action1.setParams({
            "objObject" : component.get("v.objInfo"),
            "fieldName": "Source_of_referral__c"
        })
        var referenceStatusOptions = [];
        action1.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                let allValues = response.getReturnValue();
                for (let i = 0; i < allValues.length; i++) {
                    referenceStatusOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.referralSourceOptions", referenceStatusOptions);
            }else{
                console.log('Callback Failed...');
            }
        });
        $A.enqueueAction(action1);

        var action6 = component.get('c.getServiceSelections');
        action6.setParams({
            "objObject" : component.get("v.objInfo"),
            "fieldName": "Service_Selection__c"
        })
        var befriendingOtherOptions = [];
        action6.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                let allValues = response.getReturnValue();
                for (let i = 0; i < allValues.length; i++) {
                    befriendingOtherOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.serviceSelectionOptions", befriendingOtherOptions);
            }else{
                console.log('Callback Failed...');
            }
        });
        $A.enqueueAction(action6);

    }
})