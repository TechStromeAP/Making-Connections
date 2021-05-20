({
    doInit : function(component, event, helper){
        var action = component.get('c.getOccupationOptions');
        action.setParams({
            "objObject" : component.get("v.objInfo"),
            "fieldName": "Occupation1__c"
        })
        var occupationOptions = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                let allValues = response.getReturnValue();
                for (let i = 0; i < allValues.length; i++) {
                    occupationOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.occupationOptions", occupationOptions);
            }else{
                console.log('Callback Failed...');
            }
        });
        $A.enqueueAction(action);
    },
    
	handleSubmitForm : function(component, event, helper){
        var referringAgent = component.get("v.referringAgent");
        var action = component.get('c.createReferringAgent');
        referringAgent.Subscribed_to_MC_Marketing__c = true;
        var allValid = component.find('referringAgentForm').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);        
        if(referringAgent.Email !== component.get("v.confirmEmail")){
            alert("Entered Emails does not match");
            return;
        }
        
        if(allValid){
            
			component.find('submitButton').set('v.disabled',true);
			helper.showSpinnerfunction(component, event, helper);

            action.setParams({
                referringAgentDetails : referringAgent,
            })
            action.setCallback(this, function(response) {
                let state = response.getState();
                console.log(response.getError());
                if (state === "SUCCESS") {
                    alert('Volunteer Registration created. We are now redirecting you to the client Registration page');
                    window.location.replace('https://devmc-makingconnectionsdevsb.cs105.force.com/');
                } else{
                    alert('We could not complete your registration. We are redirecting to the company website. Please contact us.');
                    window.location.replace('https://makingconnections.ie/');
                }
            });
            $A.enqueueAction(action);
        } else{
            alert('Please complete all the fields');
        }
    },
    
})