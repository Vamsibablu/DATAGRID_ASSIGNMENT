import "../App.css";
export type rowType = {
  name: string;
  device: string;
  path: string;
  status: string;
};
type GridRowProps = {
  row: rowType;
  handleCheckbox: (row: rowType) => void;
  selectedRows: Set<string>;
};

export default function GridRow({
  row,
  handleCheckbox,
  selectedRows,
}: GridRowProps) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          onChange={() => {
            handleCheckbox(row);
          }}
          checked={selectedRows.has(row.name)}
        />
      </td>
      <td>{row.name}</td>
      <td>{row.device}</td>
      <td>{row.path}</td>
      <td>
        <div className="status-wrapper">
          {row.status === "available" && <div className="success"></div>}
          <div>{row.status}</div>
        </div>
      </td>
    </tr>
  );
}
