import gridData from "../utils/mockData";
import React, { useState } from "react";
import "../App.css";
import GridRow, { rowType } from "./GridRow";
import SelectAll from "./SelectAllCheckbox";
export default function DataGrid() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const handleCheckbox = (row: rowType) => {
    const { name } = row;
    const tempSelectedRows = new Set(selectedRows);
    if (tempSelectedRows.has(name)) {
      tempSelectedRows.delete(name);
    } else {
      tempSelectedRows.add(name);
    }
    setSelectedRows(tempSelectedRows);
  };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const tempSelectedRows = new Set(selectedRows);
    if (checked) {
      gridData.forEach((row) => {
        if (!tempSelectedRows.has(row.name)) {
          tempSelectedRows.add(row.name);
        }
      });
      setSelectedRows(tempSelectedRows);
    } else {
      setSelectedRows(new Set());
    }
  };
  return (
    <div>
      <table>
        <thead>
          <SelectAll
            selectedRows={selectedRows}
            handleSelectAll={handleSelectAll}
          />
          <tr>
            <td />
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {gridData.map((row, index) => (
            <GridRow
              row={row}
              key={index}
              handleCheckbox={handleCheckbox}
              selectedRows={selectedRows}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
