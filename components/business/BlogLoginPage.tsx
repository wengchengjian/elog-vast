import {
  curUserState,
  loginVisible,
  registerVisible,
  userArticleLinksState,
  userCommentLinksState,
} from "@/store";
import { Button, Modal, Space } from "@douyinfe/semi-ui";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Input } from "@douyinfe/semi-ui";
import { useCallback, useState } from "react";
import { sxios } from "@/request/server";
import { GOSSIP_BLOG_TOKEN_KEY } from "@/constants";
import { initUser } from "@/utils";
import { SysUser } from "@/types/user";

export type BlogLoginPageProps = {};

export default function BlogLoginPage() {
  const [visible, setVisible] = useRecoilState(loginVisible);
  const setRegisterVisible = useSetRecoilState(registerVisible);

  const setCurUser = useSetRecoilState(curUserState);
  const setUserArticleLinks = useSetRecoilState(userArticleLinksState);
  const setUserCommentLinks = useSetRecoilState(userCommentLinksState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = useCallback(async () => {
    const res = (await sxios.post(
      "/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )) as string;
    // 设置登录后的token
    localStorage.setItem(GOSSIP_BLOG_TOKEN_KEY, res);

    const { curUser, userArticleLinks, userCommentLinks } =
      (await initUser()) ?? {};
    setCurUser(curUser ?? ({} as SysUser));
    setUserArticleLinks(
      new Map(Object.entries(userArticleLinks ?? new Object()))
    );
    setUserCommentLinks(
      new Map(Object.entries(userCommentLinks ?? new Object()))
    );
    setVisible(false);
  }, [
    setVisible,
    username,
    password,
    setCurUser,
    setUserArticleLinks,
    setUserCommentLinks,
  ]);
  const handleCancel = () => {
    setVisible(false);
  };
  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };

  const checkModal = () => {
    handleCancel();

    setRegisterVisible(true);
  };
  return (
    <>
      <Modal
        title="登录"
        visible={visible}
        onOk={handleOk}
        afterClose={handleAfterClose}
        onCancel={handleCancel}
        closeOnEsc={true}
        cancelText="取消"
      >
        <Input
          className="login_page_input_style"
          prefix="账号"
          showClear
          size="large"
          placeholder={"请输入账号"}
          value={username}
          onChange={setUsername}
        ></Input>

        <Input
          prefix="密码"
          className="login_page_input_style"
          showClear
          value={password}
          placeholder={"请输入密码"}
          size="large"
          onChange={setPassword}
          mode="password"
        ></Input>
        <Button className="login_page_input_style" onClick={checkModal}>
          去注册
        </Button>
      </Modal>
    </>
  );
}
