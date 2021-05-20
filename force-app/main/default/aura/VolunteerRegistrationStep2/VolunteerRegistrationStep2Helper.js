({
    doInitHelper: function (component, fieldName) {
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
        var action = component.get('c.getInterestPicklistValues');
        if (component.get("v.volunteerTypes").length > 0) {
            alert('init again');
            component.set("v.selectedVolunteerTypes", component.get("v.volunteerTypes"));
        }
        action.setParams({
            "objObject": component.get("v.objInfo"),
            "fieldName": "Any_special_skills_hobbies_or_interests__c"
        })
        var interestOptions = [];
        action.setCallback(this, function (response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                for (var i = 0; i < allValues.length; i++) {
                    interestOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.interestOptions", interestOptions);
            } else {
                console.log('Callback Failed...');
            }
        });
        $A.enqueueAction(action);

        /*
        var action1 = component.get('c.getInterestTransportationValues');
        action1.setParams({
            "objObject": component.get("v.objInfo"),
            "fieldName": "Mode_of_transport_available_to_you__c"
        })
        var transportationOptions = [];
        action1.setCallback(this, function (response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                for (var i = 0; i < allValues.length; i++) {
                    transportationOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.transportationOptions", transportationOptions);
            } else {
                console.log('Callback Failed...');
            }
        });
        $A.enqueueAction(action1);*/

        var action2 = component.get('c.getDrivingDays');
        action2.setParams({
            "objObject": component.get("v.objInfo"),
            "fieldName": "Driving_Availability__c"
        })
        var drivingDaysOptions = [];
        action2.setCallback(this, function (response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                for (var i = 0; i < allValues.length; i++) {
                    drivingDaysOptions.push({
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v.drivingDays", drivingDaysOptions);
            } else {
                console.log('Callback Failed...');
            }
        });
        $A.enqueueAction(action2);
    },


})