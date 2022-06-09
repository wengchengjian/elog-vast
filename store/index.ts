import {atom} from "recoil";

export const darkMode = atom({
    key: "darkMode",
    default: false,
});

export const langMode = atom({
    key: "langMode",
    default: false,
});