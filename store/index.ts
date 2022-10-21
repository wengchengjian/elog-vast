import { UserArticleLink } from "@/types/article";
import { UserCommentLink } from "@/types/comment";
import { SysUser } from "@/types/user";
import { atom, AtomOptions } from "recoil";
import { v1 } from "uuid";

function Fname<T>(options: AtomOptions<T>) {
  options.key = `${options.key}/${v1()}`;
  return atom(options);
}

export const curUserState = Fname({
  key: "curUserState",
  default: {} as SysUser,
});

export const userArticleLinksState = Fname({
  key: "userArticleLinks",
  default: new Map<string, number[]>(),
});

export const userCommentLinksState = Fname({
  key: "userCommentLinks",
  default: new Map<string, number[]>(),
});

export const darkMode = Fname({
  key: "darkMode",
  default: false,
});

export const langMode = Fname({
  key: "langMode",
  default: false,
});

export const loginVisible = Fname({
  key: "loginVisible",
  default: false,
});

export const registerVisible = Fname({
  key: "registerVisible",
  default: false,
});

export { Fname };
