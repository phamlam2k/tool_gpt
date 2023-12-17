import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Select, Popover } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { HomeContextProvider } from '../../../App';
import { listLanguages } from '../../../utils/common';
import useDataStore from '../../../store/useDataStore';
import useQuestionData from '../../../hooks/useQuestionData';
import { AUTH_TOKEN, SSO_URL } from '../../../config/const';

const { Option } = Select;

// Top-level navigation items
const topNavItems = [
  { name: 'Home', path: '/home' },
  // ... other top-level navigation items
];

const PromptHeader = () => {
  const { accessToken, setAccessToken } = useContext(HomeContextProvider);
  const { questionList } = useQuestionData()

  const { selectedCategory, setSelectedCategory } = useDataStore();
  const [sortValue, setSortValue] = useState('latest');

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleSortChange = value => {
    setSortValue(value);
    // Integrate the actual sorting functionality here
  };

  const userInfo = useMemo(() => {
    if (!accessToken) return null;
    return jwtDecode(accessToken);
  }, [accessToken]);

  const onLogout = () => {
    localStorage.removeItem(AUTH_TOKEN)
    setAccessToken(null)
    window.location.href = window.location.href = SSO_URL;
  }

  return (
    <div className="bg-[#222236] text-white">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">LifesupGPT</h1>
        <div className="flex items-center space-x-4 ml-auto">
          {topNavItems.map(item => (
            <Link key={item.name} to={item.path} className="hover:text-gray-300">
              {item.name}
            </Link>
          ))}
          <Popover
            content={<div onClick={onLogout}>Log out</div>}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement='bottomRight'
          >
            {userInfo ? (
              <span className="ml-4 cursor-pointer bg-white py-2 px-3 rounded-md text-[#222236]">{userInfo.firstName} {userInfo.lastName}</span>
            ) : (
              <Link to="/login" className="hover:text-gray-300">Login/Sign up</Link>
            )}
          </Popover>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-start gap-4 p-4 border-t border-gray-600">
        {listLanguages.map(item => (
          <div key={item.value} onClick={() => setSelectedCategory(item)} className="cursor-pointer hover:text-gray-300 flex items-center">
            <item.Icon className="mr-2" />
            {item.label}
          </div>
        ))}
      </div>
      <div className="max-w-screen-xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-2">
          List question for ChatGPT - {selectedCategory ? `${selectedCategory.label} Prompts` : 'Select a Category'}
        </h2>
        <Breadcrumb className="text-white breadcrumb_header">
          <Breadcrumb.Item className='text-white'>LifesupGPT</Breadcrumb.Item>
          {selectedCategory && <Breadcrumb.Item className='text-white'>{selectedCategory.label}</Breadcrumb.Item>}
        </Breadcrumb>
        <div className="flex justify-between items-center mt-4">
          <p>Showing {questionList.isSuccess && questionList.data.data.length} results</p>
          <Select defaultValue="latest" value={sortValue} onChange={handleSortChange} className="w-32">
            <Option value="latest">Sort by name</Option>
            <Option value="price">Sort by order</Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PromptHeader;
