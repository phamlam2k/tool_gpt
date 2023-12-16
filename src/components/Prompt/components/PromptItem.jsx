import React from 'react';
import dayjs from 'dayjs';
import { Card } from 'antd';

const PromptItem = ({ data }) => {
  const formattedDate = dayjs(data.timestamp).format('MMMM D, YYYY');

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src="/images/javascript.webp" />}
    >
      <Card.Meta
        title={data.promptText}
        description={
          <div>
            <p>by {data.userIdentifier}</p>
            <p>{formattedDate}</p>
            <p>$0.99</p>
          </div>
        }
      />
    </Card>
  );
};

export default PromptItem;
