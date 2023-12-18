import React, { useState } from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import SingleConversation from "./components/SingleConversation";
import MultiConversation from "./components/MultiConverstaion";
import SupportModal from "../../modals/SupportModal";

const { TabPane } = Tabs;

const HomeContent = () => {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleOpenSupportModal = () => {
    setIsSupportModalOpen(true);
  };

  const handleCloseSupportModal = () => {
    setIsSupportModalOpen(false);
  };

  return (
    <div className="relative w-screen h-screen bg-[#222236]">
      <Link
        to={"/prompt"}
        className="absolute z-[100] top-[10px] left-[10px] bg-white p-[10px] rounded-md text-[#222236]"
      >
        Quay lại trang Prompt
      </Link>
      <div className="flex flex-col justify-center absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-white px-[30px] py-[20px] rounded-lg">
        <p className="text-center text-[25px] font-bold">
          Thu thập câu hỏi ChatGPT
        </p>

        <p
          onClick={handleOpenSupportModal}
          className="absolute top-[15px] right-[20px] cursor-pointer underline"
        >
          Hướng dẫn
        </p>

        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Single" key="1">
            <SingleConversation />
          </TabPane>
          <TabPane tab="Multi" key="2">
            <MultiConversation />
          </TabPane>
        </Tabs>
      </div>

      <SupportModal
        isModalOpen={isSupportModalOpen}
        handleCancel={handleCloseSupportModal}
      />
    </div>
  );
};

export default HomeContent;
