import { useEffect, useMemo, useRef } from "react";
import "../App.css";
import gridData from "../utils/mockData";
type SelectAllProps = {
  selectedRows: Set<string>;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SelectAll({
  selectedRows,
  handleSelectAll,
}: SelectAllProps) {
  const checkboxLabel = selectedRows.size ? selectedRows.size : "None";
  const selectAllRef = useRef<HTMLInputElement>(null);
  const canDownload = useMemo(() => {
    if (selectedRows.size === 0) {
      return false;
    } else {
      let isValid = true;
      gridData.forEach((row) => {
        if (selectedRows.has(row.name)) {
          if (row.status !== "available") {
            isValid = false;
          }
        }
      });
      return isValid;
    }
  }, [selectedRows]);

  const handleDownload = () => {
    const alertMsg = gridData
      .filter((row) => selectedRows.has(row.name))
      .map((row) => {
        return `Name: ${row.name}, Device: ${row.device}, Path: ${row.path}, Status: ${row.status}`;
      })
      .join("\n");
    alert("Selected Items" + "\n" + alertMsg);
  };
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        selectedRows.size > 0 && selectedRows.size < 5;
    }
  }, [selectedRows]);
  return (
    <tr>
      <td colSpan={3}>
        <input
          type="checkbox"
          checked={selectedRows.size == 5}
          onChange={handleSelectAll}
          ref={selectAllRef}
        />
        <span>{checkboxLabel} Selected</span>
      </td>
      <td colSpan={2}>
        <button
          disabled={!canDownload}
          onClick={handleDownload}
          className="download-button"
        >
          Download
        </button>
      </td>
    </tr>
  );
}
