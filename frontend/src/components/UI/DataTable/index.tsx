import Row from "./Row";

const DataTable = ({ theadItems, tbodyItems, noItemMsg, colSpan }) => {
  return (
    <table>
      <thead className="table__head">
        <Row compoents={theadItems} />
      </thead>
      <tbody className="table__body" style={{textAlign: "center"}}>
        {tbodyItems?.length <= 0 ? (
          <tr>
            <td colSpan={colSpan} className="text-center py-5 font-size__1">
              {noItemMsg}
            </td>
          </tr>
        ) : (
          tbodyItems?.map((items, index) => (
            <Row key={index + 1} compoents={items} />
          ))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;