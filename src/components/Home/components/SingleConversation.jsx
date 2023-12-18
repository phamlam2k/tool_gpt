import { useContext, useMemo, useState } from "react";
import { listLanguages } from "../../../utils/common";
import useQuestionAction from "../../../hooks/useQuestionAction";
import { Button, Form, Input, Modal, Select } from "antd";
import { HomeContextProvider } from "../../../App";
import { jwtDecode } from "jwt-decode";
import ReactQuill from "react-quill";
import { modules } from "../../../config/quill";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const SingleConversation = () => {
  const { accessToken } = useContext(HomeContextProvider);
  const [form] = Form.useForm();
  const { saveInteractions } = useQuestionAction();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState([...listLanguages]);

  const userInfo = useMemo(() => {
    if (!accessToken) return null;
    return jwtDecode(accessToken);
  }, [accessToken]);

  const [errorMessage, setErrorMessage] = useState({});

  const onFinish = (values) => {
    setErrorMessage({});

    form.resetFields();

    saveInteractions.mutate({
      ...values,
      userIdentifier: `${userInfo.firstName} ${userInfo.lastName}`,
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddOption = () => {
    if (newOption) {
      // Add the new option to the options state
      const newOptions = [
        ...options,
        { label: newOption, value: newOption.toLowerCase() },
      ];
      setOptions(newOptions);
      // Optionally, you can reset the input or close the modal here
      setNewOption("");
      setIsModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      style={{
        minWidth: 300,
        width: 600,
        margin: "20px auto",
      }}
    >
      {/* Existing form fields for single input */}
      {/* ... */}
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
        <ReactQuill
          theme="snow"
          modules={modules}
          style={{
            maxHeight: "200px",
            height: "200px",
          }}
          className="xl:mb-[60px] max-sm:mb-[100px]"
        />
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
          dropdownRender={(menu) => (
            <>
              {menu}
              <div
                onClick={showModal}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: 8,
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <PlusOutlined /> Add option
              </div>
            </>
          )}
        >
          {options.map((lang) => (
            <Select.Option value={lang.value} key={lang.value}>
              {lang.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {errorMessage["conversation"] && (
        <p className="text-red-500 mt-1">{errorMessage["conversation"]}</p>
      )}

      <Button
        type="primary"
        loading={saveInteractions.isPending}
        htmlType="submit"
        style={{
          background: "#222236",
          width: "100%",
        }}
      >
        Gửi
      </Button>

      <Modal
        title="Add New Option"
        visible={isModalVisible}
        onOk={handleAddOption}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddOption}>
            Add
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter new option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          onPressEnter={handleAddOption} // Allow pressing Enter to submit
        />
      </Modal>
    </Form>
  );
};

export default SingleConversation;
