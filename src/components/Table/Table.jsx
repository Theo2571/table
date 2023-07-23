import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import { Find } from "../Find/Find";
import { Pagination } from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getTable } from "../../redux/TableSlice";
const itemsPerPage = 10;
export const Table = () => {
  const dispatch = useDispatch();
  const table = useSelector((store) => store.userReducer.table);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLetter, setFilterLetter] = useState("");
  const [extendedFilter, setExtendedFilter] = useState(true);
  const [filterBody, setFilterBody] = useState("");
  const [extendedFilterBody, setExtendedFilterBody] = useState(true);
  const [filterId, setFilterId] = useState("");
  const [idFilterAscending, setIdFilterAscending] = useState(true);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setFilterLetter("");
    setFilterBody("");
    setFilterId("");
  };
  const filteredData = table.filter((item) => {
    return (
      (item.id.toString().includes(searchQuery) ||
        item.id.toString() === filterId ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!filterLetter ||
        (extendedFilter &&
          item.title.toLowerCase().endsWith(filterLetter.toLowerCase())) ||
        (!extendedFilter &&
          item.title.toLowerCase().startsWith(filterLetter.toLowerCase()))) &&
      (!filterBody ||
        (extendedFilterBody &&
          item.body.toLowerCase().endsWith(filterBody.toLowerCase())) ||
        (!extendedFilterBody &&
          item.body.toLowerCase().startsWith(filterBody.toLowerCase()))) &&
      (!filterId || item.id === parseInt(filterId))
    );
  });
  const sortedData = idFilterAscending
    ? filteredData.sort((a, b) => a.id - b.id)
    : filteredData.sort((a, b) => b.id - a.id);
  const toggleFilterMode = () => {
    setExtendedFilter(!extendedFilter);
    setExtendedFilterBody(!extendedFilterBody);
    setCurrentPage(1);
    setSearchQuery("");
    setFilterId("");
  };
  const onFilterChange = () => {
    if (filterLetter === "") {
      setFilterLetter("A");
    } else if (!extendedFilter) {
      toggleFilterMode();
    } else {
      setFilterLetter("");
    }

    setCurrentPage(1);
    setSearchQuery("");
    setFilterId("");
    setIdFilterAscending(true);
  };
  const onFilterChangeBody = () => {
    if (filterBody === "") {
      setFilterBody("A");
    } else if (!extendedFilterBody) {
      toggleFilterMode();
    } else {
      setFilterBody("");
    }

    setCurrentPage(1);
    setSearchQuery("");
    setFilterId("");
    setIdFilterAscending(true);
  };

  const onStartIdFilterChange = () => {
    setFilterId("");
    setCurrentPage(1);
    setSearchQuery("");
    setFilterLetter("");
    setFilterBody("");
    setIdFilterAscending(!idFilterAscending);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(getTable());
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Find onSearch={handleSearch} />

      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.colspan3}>
                ID
                <span
                  style={{ cursor: "pointer" }}
                  onClick={onStartIdFilterChange}
                >
                  {extendedFilter ? <span>&#9660;</span> : <span>&#9650;</span>}{" "}
                </span>
              </th>
              <th className={styles.colspan3}>
                Заголовок
                <span style={{ cursor: "pointer" }} onClick={onFilterChange}>
                  {extendedFilter ? <span>&#9660;</span> : <span>&#9650;</span>}{" "}
                </span>
              </th>
              <th className={styles.colspan3}>
                Описание
                <span
                  style={{ cursor: "pointer" }}
                  onClick={onFilterChangeBody}
                >
                  {extendedFilter ? <span>&#9660;</span> : <span>&#9650;</span>}{" "}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => {
              return (
                <tr>
                  <th className={styles.th}>{item?.id}</th>
                  <th className={styles.th}>{item?.title}</th>
                  <th className={styles.thBody}>{item?.body}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
