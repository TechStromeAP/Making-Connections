({
    handleVerifyEmail: function (component, event, helper) {
        var action = component.get("c.authorizeRegistration");
        var isEmailValid = component.find("emailInput").get("v.value") == undefined ? false : true;

        if (isEmailValid) {

            action.setParams({
                volunteerEmail: component.get("v.email").trim(),
                volunteerType: component.get("v.registrationType")
            })

            action.setCallback(this, function (response) {
                let state = response.getState();
                component.set("v.isRegistred", true);
                if (state === "SUCCESS") {
                    if (response.getReturnValue() == null) {
                        component.set("v.isNotRegistered", false);
                    } else {
                        component.set("v.volunteerDetails", response.getReturnValue());
                        component.set("v.volunteer", response.getReturnValue());
                        component.set("v.recordIdToUpdate", response.getReturnValue().Id);
                        component.set("v.isNotRegistered", false);
                        if (component.get("v.registrationType") == 'Volunteer') {
                            component.set("v.selectedStep", 'step1');
                        }

                        if (component.get("v.registrationType") == 'ReferringAgentforClient') {
                            component.set("v.selectedStepClient", 'step1');
                        }

                        if (response.getReturnValue() != undefined) {
                            component.find('verifyButton').set('v.disabled', true);
                        } else {
                            component.find('verifyButton').set('v.disabled', false);
                        }
                    }
                } else {
                    component.set("v.isNotRegistered", true);
                    component.set("v.volunteerDetails", null);
                }
            });
            $A.enqueueAction(action);
        } else {
            alert('Pleaser enter an email address');
        }
    },

    handleClientVerifyEmail: function (component, event, helper) {
        var action = component.get("c.authorizeClient");
        var isClientInputValid = component.get("v.clientLastName") == undefined || component.get("v.clientDob") == undefined ? false : true;
        if (isClientInputValid) {
            var uniqueString = component.get("v.clientLastName").trim().toLowerCase() + component.get("v.clientDob");
            action.setParams({
                clientLastNameDob: uniqueString,
            })

            action.setCallback(this, function (response) {
                let state = response.getState();
                if (state === "SUCCESS") {
                    if (response.getReturnValue() == null) {
                        component.set("v.isClientRegistred", true);
                        //component.set("v.clientDetails", response.getReturnValue());
                    } else {

                        component.set("v.clientDetails", response.getReturnValue());
                        component.set("v.isClientRegistred", true);
                        if (component.get("v.clientDetails").Is_BS_section_updated__c ||
                            component.get("v.clientDetails").Is_GFD_section_updated__c
                        ) {
                            component.set("v.isClientRegistred", false);
                            component.set("v.clientFormViewMode", true);
                        }

                        if (component.get("v.clientDetails").Is_BS_section_updated__c &&
                            component.get("v.clientDetails").Is_GFD_section_updated__c
                        ) {
                            component.set("v.bothSectionsCompleted", true);
                            component.set("v.isClientRegistred", false);
                            component.set("v.clientFormViewMode", false);
                        }


                        if (response.getReturnValue() != undefined) {
                            component.find('findClientDetailButton').set('v.disabled', true);
                        } else {
                            component.find('findClientDetailButton').set('v.disabled', false);
                        }
                    }
                } else {
                    component.set("v.isClientRegistred", true);
                    //component.set("v.clientDetails", response.getReturnValue());  
                    //component.set("v.clientDetails", null);          

                }
            });
            $A.enqueueAction(action);
        } else {
            alert('Pleaser enter client Last name and DOB');
        }
    },

})