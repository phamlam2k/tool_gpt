import React from 'react';
import PromptHeader from './components/PromptHeader';
import PromptBody from './components/PromptBody';
import PromptFooter from './components/PromptFooter';

const PromptContent = () => {
  return (
    <div className='bg-[#222236] min-h-screen flex flex-col justify-between'>
      <div>
        <PromptHeader />
        <PromptBody />
      </div>
      <PromptFooter />
    </div>
  )
}

export default PromptContent