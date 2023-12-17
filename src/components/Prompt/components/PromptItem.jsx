import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Card, Modal } from 'antd';

const PromptItem = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const formattedDate = dayjs(data.timestamp).format('MMMM D, YYYY');
  const imageSrc = `/images/${data.topic}.webp`;

  return (
    <Card
      hoverable
      onClick={showModal}
      className="rounded overflow-hidden shadow-lg bg-white"
      bodyStyle={{ padding: 0 }} // Remove padding from the antd card body
      style={{ width: '100%' }} // Make the card width 100% of the grid column
    >
      <img alt="Prompt Thumbnail" src={imageSrc} className="w-full h-[200px] object-cover" />
      <div className="p-4">
        <div className="font-bold text-xl mb-2">{data.promptText}</div>
        <p className="text-gray-700 text-base">
          by {data.userIdentifier}
        </p>
        <p className="text-gray-600 text-xs">{formattedDate}</p>
      </div>

      <Modal
        title={data.promptText}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Removes the default footer
      >
        {/* Modal content goes here */}
        <div dangerouslySetInnerHTML={{ __html: data.responseText }} />
        <p>by {data.userIdentifier}</p>
        <p>{formattedDate}</p>
        {/* You can add more content or structure it according to your data */}
      </Modal>
    </Card>
  );
};

export default PromptItem;
