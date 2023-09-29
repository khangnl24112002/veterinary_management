/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const ExamScheduleTable = ({ data, handleDelete, handleConfirm }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto mt-12">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-200">ID</th>
            <th className="px-6 py-3 bg-gray-200">Date</th>
            <th className="px-6 py-3 bg-gray-200">Animal Type</th>
            <th className="px-6 py-3 bg-gray-200">Symptom</th>
            <th className="px-6 py-3 bg-gray-200">Xem chi tiet</th>
            <th className="px-6 py-3 bg-gray-200">Xac nhan hen</th>
            <th className="px-6 py-3 bg-gray-200">Huy</th>
          </tr>
        </thead>
        <tbody>
          {/* Sử dụng vòng lặp để tạo các hàng */}
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-4 pl-14 pr-6 whitespace-nowrap">{item.id}</td>
              <td className="py-4 pl-14 pr-6 whitespace-nowrap">{item.date}</td>
              <td className="py-4 pl-14 pr-6 whitespace-nowrap">
                {item.animalType}
              </td>
              <td className="py-4 pl-14 pr-6 whitespace-nowrap">
                {item.symptom}
              </td>
              <td className="pr-6 pl-16 py-4 whitespace-nowrap">
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
              <td className="py-4 pl-14 pr-6 whitespace-nowrap">
                {item.isOk ? (
                  <button
                    onClick={() => {
                      handleConfirm(item.id, false);
                    }}
                    className="bg-slate-500"
                  >
                    Da xac nhan
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleConfirm(item.id, true);
                    }}
                    className="bg-slate-500"
                  >
                    Xac nhan
                  </button>
                )}
              </td>
              <td className="pr-6 pl-12 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
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
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamScheduleTable;
