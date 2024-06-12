import { atom } from "recoil";

export const authState = atom({
    key: 'authState', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
    
  });