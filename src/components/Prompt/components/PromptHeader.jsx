import React, { useState, useMemo, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Select, Popover, Input } from "antd";
import { jwtDecode } from "jwt-decode";
import { HomeContextProvider } from "../../../App";
import { listLanguages } from "../../../utils/common";
import useDataStore from "../../../store/useDataStore";
import useQuestionData from "../../../hooks/useQuestionData";
import { AUTH_TOKEN, SSO_URL } from "../../../config/const";
import useDebounce from "../../../hooks/useDebounce";

const { Option } = Select;

// Top-level navigation items
const topNavItems = [
  { name: "FormGPT", path: "/collect_form" },
  // ... other top-level navigation items
];

const PromptHeader = () => {
  const { accessToken, setAccessToken } = useContext(HomeContextProvider);
  const { questionList } = useQuestionData();

  const { selectedCategory, setSelectedCategory, setKeyword, sortDir, setSortDir, sortBy, setSortBy } = useDataStore();

  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 1000); // 1s debounce

  useEffect(() => {
    setKeyword(debouncedSearchTerm);
  }, [debouncedSearchTerm, setKeyword]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleSortDir = (value) => {
    setSortDir(value);
    // Integrate the actual sorting functionality here
  };

  const handleSortBy = (value) => {
    setSortBy(value);
    // Integrate the actual sorting functionality here
  };

  const userInfo = useMemo(() => {
    if (!accessToken) return null;
    return jwtDecode(accessToken);
  }, [accessToken]);

  const onLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setAccessToken(null);
    window.location.href = window.location.href = SSO_URL;
  };

  return (
    <div className="bg-[#222236] text-white">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">LifesupGPT</h1>
        <div className="flex items-center space-x-4 ml-auto">
          {topNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
          <Popover
            content={<div onClick={onLogout}>Log out</div>}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottomRight"
          >
            {userInfo ? (
              <span className="ml-4 cursor-pointer bg-white py-2 px-3 rounded-md text-[#222236]">
                {userInfo.firstName} {userInfo.lastName}
              </span>
            ) : (
              <Link to="/login" className="hover:text-gray-300">
                Login/Sign up
              </Link>
            )}
          </Popover>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-start gap-4 p-4 border-t border-gray-600">
        {listLanguages.map((item) => (
          <div
            key={item.value}
            onClick={() => setSelectedCategory(item)}
            className="cursor-pointer hover:text-gray-300 flex items-center"
          >
            <item.Icon className="mr-2" />
            {item.label}
          </div>
        ))}
      </div>
      <div className="max-w-screen-xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-2">
          List question for ChatGPT -{" "}
          {selectedCategory
            ? `${selectedCategory.label} Prompts`
            : "Select a Category"}
        </h2>
        <Breadcrumb className="text-white breadcrumb_header">
          <Breadcrumb.Item className="text-white">LifesupGPT</Breadcrumb.Item>
          {selectedCategory && (
            <Breadcrumb.Item className="text-white">
              {selectedCategory.label}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
        <div className="flex justify-between items-center mt-4 ">
          <p>
            Showing {questionList.isSuccess && questionList.data.data.length}{" "}
            results
          </p>

          <Input
            placeholder="Search prompts..."
            onChange={handleInputChange}
            value={inputValue}
            style={{ width: 200, marginRight: "10px" }}
          />

          <div className="flex gap-3">
            <Select
              defaultValue=""
              value={sortBy}
              className="w-32"
              onChange={handleSortBy}
            >
              <Option value="" disabled>Select sort by</Option>
              <Option value="feedback">Feedback</Option>
              <Option value="prompt_text">Prompt Text</Option>
              <Option value="response_text">Response Text</Option>
              <Option value="user_identifier">User Identifier</Option>
            </Select>

            <Select
              defaultValue="desc"
              value={sortDir}
              onChange={handleSortDir}
              className="w-32"
            >
              <Option value="desc">Des</Option>
              <Option value="asc">Asc</Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptHeader;
