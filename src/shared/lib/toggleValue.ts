export const toggleValue = <V1, V2>(currentValue: V1 | V2, possibleValue1: V1, possibleValue2: V2) => currentValue === possibleValue1 ? possibleValue2 : possibleValue1;
