import { Link } from "react-router-dom";

const ViewImports = () => {
  return (
    <div>
      <button className="my-4">
        <Link
          to="addNewImport"
          className="my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500 rounded-lg"
        >
          Add new Import
        </Link>
      </button>
      <table>
        <thead>
          <tr>
            <td>Col1</td>
            <td>Col2</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row1</td>
            <td>Row1</td>
          </tr>
          <tr>
            <td>Row2</td>
            <td>Row2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewImports;
