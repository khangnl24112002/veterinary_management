import { Link } from "react-router-dom";
import ImportTable from "../../components/ImportTable/ImportTable";
import { useEffect, useState } from "react";
import { deleteExport, getAllExports } from "../../services/export.services";

const ViewExports = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchAllData = async () => {
      const response = await getAllExports();
      if (response.success) {
        const responseData = response.data;
        responseData.map((data) => {
          Reflect.deleteProperty(data, "createdAt");
          Reflect.deleteProperty(data, "updatedAt");
        });
        setData(responseData);
      } else {
        return <p>Lấy dữ liệu thất bại</p>;
      }
    };
    fetchAllData();
  }, []);
  const handleDelete = async (id) => {
    await deleteExport(id);
    const newData = data.filter((record) => record.id !== id);
    setData(newData);
  };
  return (
    <div>
      {data ? (
        <div>
          <button className="my-4">
            <Link
              to="addNewExport"
              className="my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500 rounded-lg"
            >
              Add new Export
            </Link>
          </button>
          <ImportTable data={data} handleDelete={handleDelete} />
        </div>
      ) : (
        <div>Không thể lấy được dữ liệu.</div>
      )}
    </div>
  );
};

export default ViewExports;
