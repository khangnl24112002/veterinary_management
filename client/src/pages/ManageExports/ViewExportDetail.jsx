/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getExportDetail } from "../../services/export.services";

const ViewExportDetail = () => {
  const importId = useParams().id;
  const [exportDetail, setExportDetail] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getExportDetail(importId);
      if (response.success) {
        setExportDetail(response.data);
      } else {
        return <p>Lấy dữ liệu thất bại</p>;
      }
    };
    fetchData();
  }, []);
  console.log(exportDetail);
  return (
    <>
      {exportDetail ? (
        <div>
          <div className="flex">
            {/* Left Side */}
            <div className="w-1/3 p-4">
              <div>
                {/** Handle id */}
                <label className="block mb-2 font-bold">ID</label>
                <input
                  className="w-full bg-gray-100 p-2 mb-4"
                  type="text"
                  value={exportDetail.id}
                  disabled
                />

                {/** Handle date */}
                <label className="block mb-2 font-bold">Date</label>
                <input
                  className="w-full bg-gray-100 p-2 mb-4"
                  type="text"
                  value={exportDetail.date}
                  disabled
                />

                {/**Handle customer name */}
                <label className="block mb-2 font-bold">Customer Name</label>
                <input
                  className="w-full bg-gray-100 p-2 mb-4"
                  value={exportDetail.customerName}
                  disabled
                />

                {/**Handle total price */}
                <label className="block mb-2 font-bold">Total Price</label>
                <input
                  className="w-full bg-gray-100 p-2 mb-4"
                  type="text"
                  value={exportDetail.totalPrice}
                  disabled
                />
              </div>
            </div>
            {/* Right Side */}
            <div className="w-2/3 p-4">
              <table className="w-full mb-4">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Drug</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {exportDetail.Prescription_Details.map((record, index) => (
                    <tr key={record.id}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          className="w-full bg-gray-100 p-2"
                          type="text"
                          disabled
                          value={record.Drug.name}
                        />
                      </td>
                      <td>
                        <input
                          className="w-full bg-gray-100 p-2"
                          type="text"
                          disabled
                          value={record.quantity}
                        />
                      </td>
                      <td>
                        <input
                          className="w-full bg-gray-100 p-2"
                          type="text"
                          disabled
                          value={record.unitPrice}
                        />
                      </td>
                      <td>
                        <input
                          className="w-full bg-gray-100 p-2"
                          type="text"
                          disabled
                          value={record.price}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <Link
              className="bg-blue-500 text-white p-2 rounded-md mr-2"
              to="../"
            >
              Back
            </Link>
          </div>
        </div>
      ) : (
        <div>
          Cannot get data. Please go back!
          <Link className="bg-blue-500 text-white p-2 rounded-md mr-2" to="../">
            Back
          </Link>
        </div>
      )}
    </>
  );
};

export default ViewExportDetail;
