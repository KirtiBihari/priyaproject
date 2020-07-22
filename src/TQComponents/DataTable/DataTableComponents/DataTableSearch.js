import React from "react";
import PropTypes from "prop-types";
let DataTableInput;
try {
  DataTableInput = require("./DataTableInput").default;
} catch (err) {
  DataTableInput = require("./DataTableInput").default;
}

const DataTableSearch = props => {
  const { handleSearchChange, search, searching, label } = props;

  return (
    <div className="col-md-6">
      
      {searching && (
        <DataTableInput
          value={search}
          onChange={handleSearchChange}
          label={label}
          
        />
       
      )
      }
      {props.children}
    </div>
  );
};

DataTableSearch.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
  label: PropTypes.string
};

export default DataTableSearch;
export { DataTableSearch as MDBDataTableSearch };
