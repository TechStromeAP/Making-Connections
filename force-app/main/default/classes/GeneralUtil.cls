public class GeneralUtil {
    
    @AuraEnabled
    public static List <String> getSelectOptions(sObject sObjType, string fieldName) {
        List <String> allOptions = new list <String>();
        Schema.sObjectType objType = sObjType.getSObjectType();
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        Map<String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
        list <Schema.PicklistEntry> values = fieldMap.get(fieldName).getDescribe().getPickListValues();
        for (Schema.PicklistEntry pe: values) {
            allOptions.add(pe.getValue());
        }
        allOptions.sort();
        return allOptions;
    }
    
}