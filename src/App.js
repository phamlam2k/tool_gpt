import React, { useState } from "react";
import { Input, Form, Select } from "antd";
import SupportModal from "./modals/SupportModal";

function App() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conversationState, setConversationState] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFileRead = (e) => {
    const content = e.target.result;
    onChangeText(content);
  };

  const handleFileChosen = (file) => {
    let fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const onChangeText = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const selectedItem = doc.querySelectorAll("div[data-testid]");

    let arrConversation = [];

    // Thu thập data-testid
    const testDataIds = Array.from(selectedItem).map((div) =>
      div.getAttribute("data-testid")
    );

    for (let i = 0; i < testDataIds.length - 1; i += 2) {
      const userQus = doc.querySelector(`div[data-testid="${testDataIds[i]}"]`);
      const chatGptQus = doc.querySelector(
        `div[data-testid="${testDataIds[i + 1]}"]`
      );

      const textContentUser = userQus ? userQus.textContent : "";
      const textContentChat = chatGptQus ? chatGptQus.textContent : "";

      arrConversation.push({
        question: textContentUser.replace("You", ""),
        answer: textContentChat.replace("ChatGPT Classic", ""),
      });
    }

    setErrorMessage({});
    setConversationState(arrConversation);
  };

  const onFinish = (values) => {
    if (conversationState.length === 0) {
      return;
    }

    setErrorMessage({});

    form.resetFields();
    setConversationState([]);
    console.log("Success:", {
      ...values,
      conversationState,
    });
  };

  const onFinishFailed = () => {
    if (conversationState.length === 0) {
      setErrorMessage({
        conversation: "Please input conversation",
      });
    }
  };

  const filterOption = (input, option) =>
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <div className="relative w-screen h-screen bg-blue-400">
      <div className="flex flex-col justify-center absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-white px-[30px] py-[20px] rounded-lg">
        <p
          className="absolute top-[30px] right-[20px] cursor-pointer underline"
          onClick={showModal}
        >
          Hướng dẫn
        </p>
        <p className="text-center text-[25px] font-bold">
          Thu thập câu hỏi ChatGPT
        </p>

        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          style={{
            width: 600,
            margin: "20px auto",
          }}
        >
          <Form.Item
            label="Nhập tiêu đề của chat"
            name="prompt"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tiêu đề!",
              },
            ]}
          >
            <Input placeholder="Nhập tiêu đề của chat" />
          </Form.Item>

          <Form.Item
            label="Chọn ngôn ngữ sử dụng trong chat"
            name="lang"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngôn ngữ!",
              },
            ]}
          >
            <Select
              placeholder="Chọn ngôn ngữ sử dụng trong chat"
              showSearch
              optionFilterProp="label"
              filterOption={filterOption}
            >
              <Select.Option value="en">Tiếng Anh</Select.Option>
              <Select.Option value="vi">Tiếng Việt</Select.Option>
            </Select>
          </Form.Item>

          <p>
            <span className="text-red-600">*</span> Conversation (Chọn file
            txt):
          </p>
          <input
            className="mt-2"
            type="file"
            accept=".txt"
            onChange={(e) => handleFileChosen(e.target.files[0])}
          />
          {errorMessage["conversation"] && (
            <p className="text-red-500 mt-1">{errorMessage["conversation"]}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-400 mt-5 rounded-md py-2 text-white"
          >
            Gửi
          </button>
        </Form>
      </div>
      <SupportModal
        isModalOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
