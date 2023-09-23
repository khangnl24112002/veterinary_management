import { Link } from "react-router-dom";

const ViewExports = () => {
  return (
    <div>
      <div>
        <button className="my-4">
          <Link
            to="addNewExport"
            className="my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500 rounded-lg"
          >
            Add new Export
          </Link>
        </button>
        <div>Data</div>
      </div>
    </div>
  );
};

export default ViewExports;
