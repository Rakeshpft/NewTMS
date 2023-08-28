import React from "react";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { Link } from "react-router-dom";

const TableSortIcon = () => {
  const [sort, setSort] = React.useState(false);
  return (
    <>
      <Link to={"#!"} onClick={() => setSort(!sort)} className="text-dark ps-1">
        {sort ? <BsSortUp /> : <BsSortDown />}
      </Link>
    </>
  );
};

export default TableSortIcon;
