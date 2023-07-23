import React, { useState } from "react";
import cl from "./Find.module.css";
import search from "../../assets/icon/search.svg";
export const Find = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchClick = () => {
    onSearch(searchQuery);
  };
  return (
    <div className={cl.find}>
      <input
        className={cl.search}
        type="text"
        placeholder="Поиск"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <img
        className={cl.searchImg}
        src={search}
        alt=""
        onClick={handleSearchClick}
      />
    </div>
  );
};
