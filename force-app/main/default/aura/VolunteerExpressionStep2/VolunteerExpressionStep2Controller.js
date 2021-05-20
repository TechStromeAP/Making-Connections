({
    doInit: function (component, event, helper) {
        let whatSkills = $A.get("$Label.c.Skills_text");
        component.set("v.whatSkillsLabel", whatSkills);

        let hobbiesInterest = $A.get("$Label.c.Hobbies_and_Interest");
        component.set("v.hobbiesInterestLabel", hobbiesInterest);

        let questionsComments = $A.get("$Label.c.Questions_and_Comments");
        component.set("v.questionsCommentsLabel", questionsComments);

        helper.doInit(component, event, helper);
    },

    handleBackClick: function (component, event, helper) {
        var newLead = component.get("v.lead");
        component.set("v.priorSelectedVolunteerOpportunities", component.get("v.selectedVolunteerOpportunities"));
        var cmpEvent = component.getEvent("previous");
        cmpEvent.setParams({
            "dataForModification": component.get("v.lead"),

        })
        cmpEvent.fire();
        component.set("v.priorSelectedVolunteerOpportunities", component.get("v.selectedVolunteerOpportunities"));
    },

    handleSubmitForm: function (component, event, helper) {
        var action = component.get('c.createLeadVolunteer');

        var allValid = component.find('volunteerInterestForm').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);

        let isSelectedOpp = component.get("v.selectedVolunteerOpportunities").length === 0 ? true : false;
        if (isSelectedOpp) {
            alert("Please select volunteer Opportunities you are interested in.");
            return;
        }

        if (allValid) {
            let newLead = component.get("v.lead");
            helper.showSpinnerfunction(component, event, helper);

            newLead.Volunteer_Opportunities__c = component.get('v.selectedVolunteerOpportunities').join(';');
            newLead.LeadSource = 'Web';
            newLead.Company = 'Individual';
            component.find('submitButton').set('v.disabled', true);
            action.setParams({
                leadRecord: newLead,
            })
            action.setCallback(this, function (response) {
                let state = response.getState();
                console.log(response.getError());
                if (state === "SUCCESS") {
                    window.location.replace('https://makingconnections.ie/form-received-new-volunteer');
                } else {
                    alert('We could not complete your registration. We are redirecting to the company website. Please contact us.');
                    window.location.replace('https://makingconnections.ie/');
                }
            });
            $A.enqueueAction(action);
        } else {
            alert('Please complete all the required fields.');
        }
    },

    handleChange: function (component, event, helper) {
        var selctOtions = [];
        selctOtions.push(event.getParam("value"));
        component.set('v.priorSelectedVolunteerOpportunities', selctOtions);
    }
})