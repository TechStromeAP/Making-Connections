({
    handleNextClick: function (component, event, helper) {
        var cmpEvent = component.getEvent("nextInStep1VolunteerReg");
        var valid_commission = true;
        var allValid = component.find('volunteerRegistrationForm').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);


        if (allValid) {
            var newVolunteer = component.get("v.volunteer");
            newVolunteer.Volunteer_Availability_Morning__c = component.get('v.selectedMorningDays');
            newVolunteer.Volunteer_Availability_Afternoon__c = component.get('v.selectedAfternoonDays');
            newVolunteer.Volunteer_Availability_Evening__c = component.get('v.selectedEveningDays');
            cmpEvent.setParams({
                "dataFromStepOne": newVolunteer,
            })
            cmpEvent.fire();
            return (valid_commission);
        } else {
            alert('Please complete all the required fields');
        }
    },

    doInit: function (component, event, helper) {
        var days = [
            { label: 'Monday', value: 'Monday' },
            { label: 'Tuesday', value: 'Tuesday' },
            { label: 'Wednesday', value: 'Wednesday' },
            { label: 'Thursday', value: 'Thursday' },
            { label: 'Friday', value: 'Friday' },
            { label: 'Saturday', value: 'Saturday' },
            { label: 'Sunday', value: 'Sunday' },
        ];
        component.set("v.days", days);
    }
})