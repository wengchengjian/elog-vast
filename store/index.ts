import { atom, AtomOptions } from "recoil";
import { v1 } from "uuid";

function Fname<T>(options: AtomOptions<T>) {
  options.key = `${options.key}/${v1()}`;
  return atom(options);
}

export const darkMode = Fname({
  key: "darkMode",
  default: false,
});

export const langMode = Fname({
  key: "langMode",
  default: false,
});

export { Fname };
