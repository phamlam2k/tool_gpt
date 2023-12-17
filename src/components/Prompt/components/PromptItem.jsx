import React from 'react';
import dayjs from 'dayjs';
import { Card, Skeleton } from 'antd';
import useCommonStore from '../../../store/useCommonStore';

export const PromptItemSkeleton = () => (
  <Card className="rounded overflow-hidden shadow-lg bg-white skeleton_card" style={{ width: '100%' }}>
    <Skeleton.Image style={{ width: '100%', height: '200px' }} />
    <Card.Meta
      title={<Skeleton.Input style={{ width: '100%', marginTop: '10px' }} active size='small' />}
    />
    <Card.Meta
      title={<Skeleton.Input style={{ width: '60%', marginTop: '10px' }} active size='small' />}
      description={<Skeleton.Input style={{ width: '80%' }} active size='small' />}
    />
  </Card>
);

const PromptItem = ({ data }) => {
  const { setSelectedPrompt } = useCommonStore()

  const formattedDate = dayjs(data.timestamp).format('MMMM D, YYYY');
  const imageSrc = `/images/${data.topic}.webp`;

  return (
    <Card
      hoverable
      onClick={() => {
        setSelectedPrompt(data)
      }}
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

    </Card>
  );
};

export default PromptItem;
