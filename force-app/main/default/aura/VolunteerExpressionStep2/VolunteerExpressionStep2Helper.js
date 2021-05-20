({
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

        var action = component.get('c.getPicklistValues');
        var voluntaryOpts = [];
        action.setCallback(this, function (response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                for (var i = 0; i < allValues.length; i++) {
                    voluntaryOpts.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.volunteerOpportunities", voluntaryOpts);
            } else {
                alert('Callback Failed...');
            }
        });
        $A.enqueueAction(action);
        component.set("v.selectedVolunteerOpportunities", component.get("v.priorSelectedVolunteerOpportunities"));
    },


    showSpinnerfunction: function (component, event, helper) {
        var spinner = component.find("mySpinner");
        $A.util.removeClass(spinner, "slds-hide");
    },
})