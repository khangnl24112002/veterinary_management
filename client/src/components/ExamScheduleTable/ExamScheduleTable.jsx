/* eslint-disable react/prop-types */

const AppointmentTable = ({ data, handleDelete, handleConfirm }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto mt-12">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-200">ID</th>
            <th className="px-6 py-3 bg-gray-200">Date</th>
            <th className="px-6 py-3 bg-gray-200">Animal Type</th>
            <th className="px-6 py-3 bg-gray-200">Symptom</th>
            <th className="px-6 py-3 bg-gray-200">Ma khach hang</th>
            <th className="px-6 py-3 bg-gray-200">Ten khach hang</th>
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
              <td className="py-4 pl-14 pr-6 whitespace-nowrap">
                {item.Customer.id}
              </td>
              <td className="py-4 pl-14 pr-6 whitespace-nowrap">
                {item.Customer.name}
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

export default AppointmentTable;
