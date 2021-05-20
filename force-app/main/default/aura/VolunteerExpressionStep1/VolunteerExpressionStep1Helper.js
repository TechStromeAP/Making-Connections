({
    handleNextClick: function (component, event, helper) {
        var cmpEvent = component.getEvent("nextInStep1");
        var valid_commission = true;
        var allValid = component.find('volunteerInterestForm').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);

        var addressValid = component.find('leadAddress').checkValidity();

        if (allValid && addressValid) {
            var newLead = component.get("v.lead");
            cmpEvent.setParams({
                "dataFromStepOne": newLead,
            })
            cmpEvent.fire();
            return (valid_commission);
        } else {
            alert('Please complete all the fields');
        }
    }
})