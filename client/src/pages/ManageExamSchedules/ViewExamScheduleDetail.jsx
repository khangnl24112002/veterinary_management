import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExamScheduleDetail } from "../../services/examSchedule.services";

const ViewExamScheduleDetail = () => {
  const id = useParams().id;
  const [data, setData] = useState();
  useEffect(() => {
    const fetchAllData = async () => {
      const response = await getExamScheduleDetail(parseInt(id));
      if (response.success) {
        const responseData = response.data;
        setData(responseData);
      } else {
        return <p>Lấy dữ liệu thất bại</p>;
      }
    };
    fetchAllData();
  }, []);
  return (
    <div>
      {data ? (
        <div className="container mx-auto px-6 py-2">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Section: Account Setup */}
            <div>
              <div className="mb-3">
                <label className="block font-medium mb-1">Ngay hen:</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={data.date}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1">Loai vat nuoi:</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={data.animalType}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1">Trieu chung:</label>
                <textarea
                  className="w-full border rounded px-3 py-2 h-40"
                  value={data.symptom}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1">Xac nhan hen:</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={data.isOk ? "Da xac nhan" : "Chua xac nhan"}
                  disabled
                />
              </div>
            </div>
            <div>
              <div className="mb-3">
                <label className="block font-medium mb-1">
                  Ten khach hang:
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={data.Customer.name}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1">Dia chi:</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={data.Customer.address}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1">Dien thoai:</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={data.Customer.phoneNumber}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1">Anh dai dien:</label>
                <img src={data.Customer.avatar} className="w-40 h-40" />
              </div>
            </div>
            {/* Bottom Buttons */}
            <div className="col-span-2 flex flex-col items-center">
              <Link
                to="../addExamHistory"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-4"
              >
                Tạo đơn khám bệnh
              </Link>
              <Link to="../" className="text-blue-500 hover:underline">
                Quay lại
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>Không thể lấy được dữ liệu.</div>
      )}
    </div>
  );
};

export default ViewExamScheduleDetail;
