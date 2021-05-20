({
    handleNextInStep1Event : function(component, event, helper) {
        var leadData = event.getParam('dataFromStepOne');
        component.set("v.lead", leadData);
        component.set("v.selectedStep", 'step2');
    },
})