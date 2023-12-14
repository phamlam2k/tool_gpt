import React, { useContext, useEffect, useMemo, useState } from "react";
import { Input, Form, Select } from "antd";
import { listLanguages } from "../../utils/common";
import { saveInteractions } from "../../utils/api";
import { HomeContextProvider } from "../../App";
import { jwtDecode } from "jwt-decode";
import { isLogin } from "../../utils";

const { TextArea } = Input;

const HomeScreen = () => {
  const { accessToken } = useContext(HomeContextProvider);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isLogin()) {
      window.location.href =
        "https://dev.sso.lifesup.com.vn/auth?client_id=lifesup_hrm&redirect_uri=http://localhost:4200&scope=read";
    }
  }, []);

  const userInfo = useMemo(() => {
    if (!accessToken) return null;
    return jwtDecode(accessToken);
  }, [accessToken]);

  const [errorMessage, setErrorMessage] = useState({});

  const onFinish = (values) => {
    setErrorMessage({});

    form.resetFields();

    saveInteractions({ ...values });
  };

  const filterOption = (input, option) =>
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <div className="relative w-screen h-screen bg-blue-400">
      {userInfo && (
        <div
          className="absolute top-[30px] right-[20px] bg-white flex"
          style={{
            padding: "10px",
            borderRadius: "8px",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <p>
            {userInfo.firstName} {userInfo.lastName}
          </p>
        </div>
      )}
      <div className="flex flex-col justify-center absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-white px-[30px] py-[20px] rounded-lg">
        <p className="text-center text-[25px] font-bold">
          Thu thập câu hỏi ChatGPT
        </p>

        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          style={{
            width: 600,
            margin: "20px auto",
          }}
        >
          <Form.Item
            label="Nhập câu bạn hỏi ChatGPT"
            name="promptText"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập câu hỏi!",
              },
            ]}
          >
            <TextArea placeholder="Nhập câu hỏi" rows={2} />
          </Form.Item>

          <Form.Item
            label="Nhập câu trả lời của ChatGPT"
            name="responseText"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập câu trả lời!",
              },
            ]}
          >
            <TextArea placeholder="Nhập câu trả lời" rows={4} />
          </Form.Item>

          <Form.Item
            label="Nhập câu trả lời mong muốn của bạn"
            name="feedback"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập câu trả lời!",
              },
            ]}
          >
            <TextArea placeholder="Nhập câu trả lời" rows={4} />
          </Form.Item>

          <Form.Item
            label="Chọn ngôn ngữ"
            name="topic"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngôn ngữ!",
              },
            ]}
          >
            <Select
              placeholder="Chọn ngôn ngữ"
              showSearch
              optionFilterProp="label"
              filterOption={filterOption}
            >
              {listLanguages.map((lang) => (
                <Select.Option value={lang.value} key={lang.value}>
                  {lang.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {errorMessage["conversation"] && (
            <p className="text-red-500 mt-1">{errorMessage["conversation"]}</p>
          )}

          <button type="submit">Gửi</button>
        </Form>
      </div>
    </div>
  );
};

export default HomeScreen;
