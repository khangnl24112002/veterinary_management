/* eslint-disable react/prop-types */

const Table = ({ data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {/* Voi moi key trong truong du lieu dau tien, se render ra attributes
            lam thead */}
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {/*Voi moi record, ta se lay danh sach values
            voi moi value trong danh sach value, ta se render ra gia tri value */}
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, subIndex) => (
                <td key={subIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
