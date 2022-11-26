import {
  DeviceObjectType,
  ConnectionObjectType,
  LocationObjectType,
} from "../contexts/Types";

export const checkObject = (
  object: DeviceObjectType | ConnectionObjectType | LocationObjectType,
  filterValue: string
): boolean => {
  let flag = false;
  Object.entries(object).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      if (checkObject(value, filterValue) === true) flag = true;
    }
    if (
      key !== "id" && //do not search in id's
      key !== "weight" && //do not search in weights
      key !== "details" && //do not search in details
      key !== "length" && //do not search in details
      value !== "object" && // objects are ommited
      value?.toString().toLowerCase().match(filterValue.toLowerCase()) //check if value contains filterValue
    )
      flag = true;
  });
  return flag;
};
