import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteSchedule,
  getScheduleByCustomerId,
} from "../../services/schedule.services";
import { useSelector } from "react-redux";
import ScheduleTable from "../../components/ScheduleTable/ScheduleTable";

const ViewSchedules = () => {
  const [data, setData] = useState();
  const customerId = useSelector((state) =>
    parseInt(state.user.accountInfo.id)
  );
  useEffect(() => {
    const fetchAllData = async () => {
      const response = await getScheduleByCustomerId(customerId);
      if (response.success) {
        const responseData = response.data;
        const modifiedData = responseData.map((item) => {
          // Xóa các thuộc tính không cần thiết
          delete item.createdAt;
          delete item.updatedAt;
          delete item.customerId;
          // Đổi tên các trường
          return {
            id: item.id,
            "Ngày hẹn": item.date,
            "Loại vật nuôi": item.animalType,
            "Triệu chứng": item.symptom,
            "Đã xác nhận": item.isOk ? "Đã xác nhận" : "Chưa xác nhận",
          };
        });
        setData(modifiedData);
      } else {
        return <p>Lấy dữ liệu thất bại</p>;
      }
    };
    fetchAllData();
  }, []);
  const handleDelete = async (id) => {
    await deleteSchedule(id);
    const newData = data.filter((record) => record.id !== id);
    setData(newData);
  };
  console.log(data);
  return (
    <div>
      <button className="my-4">
        <Link
          to="addNewSchedule"
          className="my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500 rounded-lg"
        >
          Add new Schedule
        </Link>
      </button>
      {data && data.length ? (
        <div>
          <ScheduleTable data={data} handleDelete={handleDelete} />
        </div>
      ) : (
        <div>Không có dữ liệu.</div>
      )}
    </div>
  );
};

export default ViewSchedules;
