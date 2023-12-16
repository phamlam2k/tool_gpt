import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Select } from 'antd';
import { FaJava, FaPython, FaJsSquare, FaReact, FaCuttlefish } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { HomeContextProvider } from '../../../App';

const { Option } = Select;

// Top-level navigation items
const topNavItems = [
  { name: 'Home', path: '/home' },
  // ... other top-level navigation items
];

// Bottom-level navigation items - list of programming languages
const bottomNavItems = [
  { name: 'JavaScript', queryParam: 'javascript', Icon: FaJsSquare },
  { name: 'Java', queryParam: 'java', Icon: FaJava },
  { name: 'Python', queryParam: 'python', Icon: FaPython },
  { name: 'React', queryParam: 'react', Icon: FaReact },
  { name: 'C', queryParam: 'c', Icon: FaCuttlefish },
  // ... other programming languages
];

const PromptHeader = () => {
  const { accessToken } = useContext(HomeContextProvider);

  const [selectedCategory, setSelectedCategory] = useState();
  const [sortValue, setSortValue] = useState('latest');

  const handleSortChange = value => {
    setSortValue(value);
    // Integrate the actual sorting functionality here
  };

  const userInfo = useMemo(() => {
    if (!accessToken) return null;
    return jwtDecode(accessToken);
  }, [accessToken]);

  return (
    <div className="bg-[#222236] text-white">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">LifesupGPT</h1>
        <div className="flex items-center space-x-4 ml-auto">
          {topNavItems.map(item => (
            <Link key={item.name} to={item.path} className="hover:text-gray-300">
              {item.name}
            </Link>
          ))}
          {userInfo ? (
            <span className="ml-4">{userInfo.firstName} {userInfo.lastName}</span>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login/Sign up</Link>
          )}
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex justify-start space-x-4 p-4 border-t border-gray-600">
        {bottomNavItems.map(item => (
          <div key={item.name} onClick={() => setSelectedCategory(item.name)} className="cursor-pointer hover:text-gray-300 flex items-center">
            <item.Icon className="mr-2" />
            {item.name}
          </div>
        ))}
      </div>
      <div className="max-w-screen-xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-2">
          {selectedCategory ? `${selectedCategory} Prompts` : 'Select a Category'}
        </h2>
        <Breadcrumb className="text-white breadcrumb_header">
          <Breadcrumb.Item>LifesupGPT</Breadcrumb.Item>
          <Breadcrumb.Item>{selectedCategory}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex justify-between items-center mt-4">
          <p>Showing all results</p>
          <Select defaultValue="latest" value={sortValue} onChange={handleSortChange} className="w-32">
            <Option value="latest">Sort by latest</Option>
            <Option value="price">Sort by price</Option>
            {/* ... other sorting options ... */}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PromptHeader;
