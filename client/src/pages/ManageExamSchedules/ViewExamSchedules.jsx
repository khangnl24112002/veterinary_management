import ExamScheduleTable from "../../components/ExamScheduleTable/ExamScheduleTable";
import { useEffect, useState } from "react";
import {
  getAllExamSchedules,
  deleteExamSchedules,
  updateExamSchedules,
} from "../../services/examSchedule.services";

const ViewExports = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchAllData = async () => {
      const response = await getAllExamSchedules();
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
    await deleteExamSchedules(id);
    const newData = data.filter((record) => record.id !== id);
    setData(newData);
  };
  const handleConfirm = async (id, confirm) => {
    const response = await updateExamSchedules(id, confirm);
    if (response.success) {
      const newData = data.map((item) => {
        if (item.id === id) {
          return { ...item, isOk: confirm };
        } else {
          return { ...item };
        }
      });
      setData(newData);
      setError("Cap nhat du lieu thanh cong");
      setInterval(setError(""), 2000);
    } else {
      setError("Khong the cap nhat du lieu. Vui long thu lai sau.");
    }
  };
  return (
    <div>
      {data ? (
        <div>
          <div>{error}</div>
          <ExamScheduleTable
            data={data}
            handleConfirm={handleConfirm}
            handleDelete={handleDelete}
          />
        </div>
      ) : (
        <div>Không thể lấy được dữ liệu.</div>
      )}
    </div>
  );
};

export default ViewExports;
