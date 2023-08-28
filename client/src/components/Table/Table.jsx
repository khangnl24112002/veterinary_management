/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
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
            <th>View detail</th>
            <th>Delete</th>
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
              <td>
                <Link to={`${item.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Link>
              </td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
