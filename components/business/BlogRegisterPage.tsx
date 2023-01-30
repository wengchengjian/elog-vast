import { loginVisible, registerVisible } from "@/store";
import { Button, Modal, Space } from "@douyinfe/semi-ui";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Input } from "@douyinfe/semi-ui";
import { useState } from "react";

export type BlogRegisterPageProps = {};

export default function BlogRegisterPage() {
  const [visible, setVisible] = useRecoilState(registerVisible);
  const setLoginVisible = useSetRecoilState(loginVisible);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleAfterClose = () => {};
  const checkModal = () => {
    handleCancel();

    setLoginVisible(true);
  };
  return (
    <>
      <Modal
        title="注册"
        visible={visible}
        onOk={handleOk}
        afterClose={handleAfterClose}
        onCancel={handleCancel}
        closeOnEsc={true}
        cancelText="取消"
      >
        <Input
          className="login_page_input_style"
          prefix="昵称"
          showClear
          size="large"
          placeholder={"请输入昵称"}
          value={nickname}
          onChange={setNickname}
        ></Input>

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
        <Input
          className="login_page_input_style"
          prefix="手机号"
          showClear
          size="large"
          placeholder={"请输入手机号"}
          value={phone}
          onChange={setPhone}
        ></Input>
        <Input
          className="login_page_input_style"
          prefix="邮箱"
          showClear
          size="large"
          placeholder={"请输入邮箱"}
          value={email}
          onChange={setEmail}
        ></Input>
        
        <Button className="login_page_input_style" onClick={checkModal}>
          去登录
        </Button>
      </Modal>
    </>
  );
}
