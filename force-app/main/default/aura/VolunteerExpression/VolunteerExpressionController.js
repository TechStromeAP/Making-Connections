({
    handleNextInStep1Event : function(component, event, helper) {
        helper.handleNextInStep1Event(component, event, helper);
    },

    doInit : function(component, event, helper) {
        component.set("v.selectedStep", "step1");
    },

    handlePrevious : function(component, event, helper) {
        component.set("v.selectedStep", "step1");
    },
})