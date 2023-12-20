import React, { useState } from "react";
import { Upload, Input, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import DOMPurify from "dompurify";

const { TextArea } = Input;

const { Dragger } = Upload;

const MultiConversation = () => {
  const [conversationState, setConversationState] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleFileRead = (e) => {
    const content = e.target.result;
    onChangeText(content);
  };

  const handleFileChange = (info) => {
    setFileList([info.file]);

    let fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(info.file);
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

      const textContentUser = userQus ? userQus.innerHTML : "";
      const textContentChat = chatGptQus ? chatGptQus.innerHTML : "";

      arrConversation.push({
        question: textContentUser.replace("You", ""),
        answer: textContentChat
          .replace("ChatGPT Classic", "")
          .replace("ChatGPTChatGPT", ""),
      });
    }

    setConversationState(arrConversation);
  };

  return (
    <div className="min-w-[300px] w-[600px] multi_qus">
      <Dragger
        fileList={fileList}
        beforeUpload={() => false} // Prevent upload
        onChange={handleFileChange}
        multiple={false}
        accept=".txt"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>

      {conversationState.length > 0 && (
        <div className="mt-[10px]">
          <div className="h-[400px] overflow-y-auto">
            {conversationState.map((conversation, index) => (
              <div
                key={index}
                className="conversation-step py-2 pb-7 mb-2 border-b border-gray-200"
              >
                <p className="user-question-title font-semibold text-lg mb-2">
                  Câu hỏi của người dùng:
                </p>
                <div
                  className="user-question-content bg-gray-100 rounded text-black"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(conversation.question),
                  }}
                />

                <p className="chatgpt-reply-title font-semibold text-lg mt-4 mb-2">
                  Câu trả lời của ChatGPT:
                </p>
                <div
                  className="chatgpt-reply-content bg-gray-100 rounded text-black"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(conversation.answer),
                  }}
                />

                <p className="desired-reply-title font-semibold text-lg mt-4 mb-2">
                  Câu trả lời mong muốn:
                </p>
                <TextArea
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Nhập câu trả lời mong muốn của bạn"
                />
              </div>
            ))}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            style={{
              background: "#222236",
              width: "100%",
              marginTop: "20px",
            }}
          >
            Gửi
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiConversation;
