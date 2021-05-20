({
    handleEnrolmentTypeChange: function (component, event, helper) {
        var selectedValues = [];
        selectedValues.push(event.getParam("value"));
        if (event.getParam("value") == 'BefriendingAndSupport') {
            component.set("v.volunteerTypes", ['BefriendingAndSupport']);
            component.set("v.displayBefriendingAndSupport", true);
            component.set("v.displayGoodFoodDelivered", false);
            component.set('v.displayBothsection', false);
        } else {
            component.set("v.volunteerTypes", ['GoodFoodDelivered']);
            component.set("v.displayBefriendingAndSupport", false);
            component.set("v.displayGoodFoodDelivered", true);
            component.set('v.displayBothsection', false);
        }

        if (event.getParam("value").length === 2) {
            component.set("v.volunteerTypes", ['BefriendingAndSupport, GoodFoodDelivered']);
            component.set("v.displayBefriendingAndSupport", true);
            component.set("v.displayGoodFoodDelivered", true);
        }
    },

    doInit: function (component, event, helper) {
        helper.doInitHelper(component, event, helper);
    },

    handleBackClick: function (component, event, helper) {
        var newLead = component.get("v.volunteer");
        var cmpEvent = component.getEvent("PreviousVolunteerRegistrationFormInStep2");
        cmpEvent.setParams({
            "dataForModificationStep2": component.get("v.volunteer"),
        })
        cmpEvent.fire();
    },

    handleNextInStep2: function (component, event, helper) {
        var cmpEvent = component.getEvent("NextInStep2VolunteerReg");
        var volunteerData = component.get('v.volunteer');
        var valid_commission = true;

        var isVoluntaryTypeSelected = component.get('v.selectedVolunteerTypes').length === 0 ? false : true;

        if (isVoluntaryTypeSelected) {
            var allValid = component.find('volunteerRegistrationForm').reduce(function (validFields, inputCmp) {
                inputCmp.showHelpMessageIfInvalid();
                return validFields && inputCmp.get('v.validity').valid;
            }, true);
        } else {
            alert("Please select atleast one option Good Food Delivered or Befriending & Support or both depending upon your interests");
            return;
        }

        if (component.get("v.volunteerTypes").includes('BefriendingAndSupport')) {
            var isAvailabilityNotSelected = component.get("v.selectedMorningDays").length === 0 ||
                component.get("v.selectedAfternoonDays").length === 0
            component.get("v.selectedEveningDays").length === 0 ? true : false;


            if (isAvailabilityNotSelected) {
                alert("Please select the availability times in the Volunteer Availability Section");
                return;
            }

            var isInterestsSelected = component.get("v.selectedInterests").length === 0 ? false : true;

            if (!isInterestsSelected) {
                alert("Please select the Interests in Interests Section");
                return;
            }
        }


        if (component.get("v.volunteerTypes").includes('GoodFoodDelivered')) {
            var isSelectedDrivingDays = component.get("v.selectedDrivingDays").length === 0 ? false : true;

            if (!isSelectedDrivingDays) {
                alert("Please select the Delivery Availability in Delivery Availability Section");
                return;
            }
        }

        if (allValid && isVoluntaryTypeSelected) {

            volunteerData.Selected_Volunteer_Type__c = component.get("v.selectedVolunteerTypes").join(';');

            if (component.get('v.selectedInterests').length > 0) {
                volunteerData.Any_special_skills_hobbies_or_interests__c = component.get('v.selectedInterests');
            }


            if (component.get('v.selectedEveningDays').length > 0) {
                volunteerData.Volunteer_Availability_Evening__c = component.get('v.selectedEveningDays');
            }

            if (component.get('v.selectedAfternoonDays').length > 0) {
                volunteerData.Volunteer_Availability_Afternoon__c = component.get('v.selectedAfternoonDays');
            }

            if (component.get('v.selectedMorningDays').length > 0) {
                volunteerData.Volunteer_Availability_Morning__c = component.get('v.selectedMorningDays');
            }

            if (component.get('v.selectedDrivingDays').length > 0) {
                volunteerData.Driving_Availability__c = component.get('v.selectedDrivingDays');
            }

            component.set("v.volunteer", volunteerData);

            cmpEvent.setParams({
                "dataFromStepTwo": component.get("v.volunteer"),
            })
            cmpEvent.fire();
        } else {
            alert("Please complete all the required fields");
        }

    },
})