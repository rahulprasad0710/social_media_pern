import { object } from 'joi';
import { PermissionEnum } from '../constants/Enums.js'

getPersimmionNameByValue(value) { 
    const PermissionArray = [];
Object.values(PermissionEnum).forEach((field) => {
    PermissionArray.push(field);
})
    console.log(PermissionArray)
    return PermissionArray;
}


getArrayFromObject(objectEnum) {
    const arrayEnum = [];
    Object.values(objectEnum).forEach((field) => { 
        arrayEnum.push(field);
    })
    return arrayEnum;
 }

export default {getPersimmionNameByValue ,getArrayFromObject};