const Row = ({ compoents }) => {
    return (
      <tr>{compoents?.map((component) => component)}</tr>
    );
  };
  
  export default Row;