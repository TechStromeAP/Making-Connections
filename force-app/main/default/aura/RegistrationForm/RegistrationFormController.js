({
    doInit: function (component, event, helper) {
        let baseUrl = $A.get("$Label.c.MakingConnectionBaseURL") + "/VolunteerExpression";
        component.set("v.baseUrl", baseUrl);

        let referringAgentFormUrl = $A.get("$Label.c.MakingConnectionBaseURL") + "/ReferringAgent";
        component.set("v.referringAgentFormUrl", referringAgentFormUrl);
    },

    handleRegistrationChange: function (component, event, helper) {
        var isRegistered = event.getParam("value") == 'Yes' ? true : false;
        if (isRegistered) {
            component.set("v.isRegistred", true);
            component.set("v.isNotRegistered", false);
        } else {
            component.set("v.volunteerDetails", null);
            component.set("v.isNotRegistered", true);
            component.set("v.isRegistred", false);
            component.set("v.selectedStep", 'noStep');
        }
        component.find("registeredBefore").set("v.disabled", true);
    },

    handleVolunteerTypeChange: function (component, event, helper) {
        component.find("registType").set("v.disabled", true);
        var volunteerType = component.get("v.registrationType");
        component.set("v.selectedVolunteerType", volunteerType);
    },

    handleVerifyEmail: function (component, event, helper) {
        helper.handleVerifyEmail(component, event, helper);
    },

    handleClientVerifyEmail: function (component, event, helper) {
        helper.handleClientVerifyEmail(component, event, helper);
    },

    handlePreviousStep2: function (component, event, helper) {
        component.set("v.selectedStep", "step1");
    },

    handleNextInStep1: function (component, event, helper) {
        var volunteerData = event.getParam('dataFromStepOne');
        volunteerData.Id = component.get("v.recordIdToUpdate");
        component.set("v.volunteer", volunteerData);
        component.set("v.selectedStep", "step2");
    },

    handleNextInStep2: function (component, event, helper) {
        var volunteerData = event.getParam('dataFromStepTwo');
        component.set("v.volunteer", volunteerData);
        component.set("v.selectedStep", "step3");
    },

    handlePreviousStep3: function (component, event, helper) {
        var volunteerData = event.getParam('dataForModificationStep3');
        component.set("v.volunteer", volunteerData);
        component.set("v.selectedStep", "step2");
    },

    handleNextInStep1ClientReg: function (component, event, helper) {
        var volunteerData = event.getParam('dataFromStepOne');
        component.set("v.clientDetails", volunteerData);
        component.set("v.selectedStepClient", "step2");
    },

    handlePreviousInStep2ClientReg: function (component, event, helper) {
        var volunteerData = event.getParam('dataForModification');
        component.set("v.clientDetails", volunteerData);
        component.set("v.selectedStepClient", "step1");
    },

    handleNextInStep1ClientRegViewOnly: function (component, event, helper) {
        var volunteerData = event.getParam('dataFromStepOne');
        component.set("v.clientDetails", volunteerData);
        component.set("v.selectedStepClient", "step2");
    },

    handlePreviousInStep2ClientRegViewOnly: function (component, event, helper) {
        var volunteerData = event.getParam('dataForModification');
        component.set("v.clientDetails", volunteerData);
        component.set("v.selectedStepClient", "step1");
    },
})