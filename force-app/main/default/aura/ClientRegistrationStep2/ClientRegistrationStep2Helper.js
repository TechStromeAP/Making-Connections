({
    doInitHelper : function(component, fieldName) {
        
        var action1 = component.get('c.getBAndSReferenceStatus');
        action1.setParams({
            "objObject" : component.get("v.objInfo"),
            "fieldName" : "BS_Source_of_referral__c"
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
                console.log(referenceStatusOptions);
                component.set("v.referralSourceOptions", referenceStatusOptions);
            }else{
                console.log('action1 '+ response.getError());
            }
        });
        $A.enqueueAction(action1);

        var action2 = component.get('c.getGfdReferenceStatus');
        action2.setParams({
            "objObject" : component.get("v.objInfo"),
            "fieldName": "GFD_Source_of_referral__c"
        })
        var gfdReferenceStatusOptions = [];
        action2.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                let allValues = response.getReturnValue();
                for (let i = 0; i < allValues.length; i++) {
                    gfdReferenceStatusOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.gfdReferralSourceOptions", gfdReferenceStatusOptions);
            }else{
                console.log('Callback Failed...');
            }
        });
        $A.enqueueAction(action2);

        var action3 = component.get('c.getConsentBy');
        action3.setParams({
            "objObject" : component.get("v.objInfo"),
            "fieldName": "Consent_given_by__c"
        })
        var gfdConsentedByOptions = [];
        action3.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                let allValues = response.getReturnValue();
                for (let i = 0; i < allValues.length; i++) {
                    gfdConsentedByOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.consentedByOptions", gfdConsentedByOptions);
            }else{
                console.log('Callback Failed...');
            }
        });
        $A.enqueueAction(action3);

        
        var action4 = component.get('c.getMethodOfInvoicing');
        action4.setParams({
            "objObject" : component.get("v.objInfo"),
            "fieldName": "Method_of_invoicing__c"
        })
        var invoiceOptions = [];
        action4.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                let allValues = response.getReturnValue();
                for (let i = 0; i < allValues.length; i++) {
                    invoiceOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.invoiceOptions", invoiceOptions);
            }else{
                console.log('Callback Failed...');
            }
        });
        $A.enqueueAction(action4);

        
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
        
        
        var action7 = component.get('c.getHseAreas');
        action7.setParams({
            "objObject" : component.get("v.objInfo"),
            "fieldName": "Client_s_HSE_Area__c"
        })
        var sourceOptions = [];
        action7.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                for (var i = 0; i < allValues.length; i++) {
                    sourceOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.hseAreas", sourceOptions);
            }else{
                alert('Callback Failed...');
            }
        });
        $A.enqueueAction(action7);
    },
    
    showSpinnerfunction: function (component, event, helper) {
        var spinner = component.find("mySpinner");
        $A.util.removeClass(spinner, "slds-hide");
    },
})