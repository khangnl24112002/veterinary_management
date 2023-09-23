/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getImportDetail } from "../../services/import.services";

const ViewImportDetail = () => {
  const importId = useParams().id;
  const [importDetail, setImportDetail] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getImportDetail(importId);
      if (response.success) {
        setImportDetail(response.data);
      } else {
        return <p>Lấy dữ liệu thất bại</p>;
      }
    };
    fetchData();
  }, []);
  console.log(importDetail);
  return (
    <>
      {importDetail ? (
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
                  value={importDetail.id}
                  disabled
                />

                {/** Handle date */}
                <label className="block mb-2 font-bold">Date</label>
                <input
                  className="w-full bg-gray-100 p-2 mb-4"
                  type="text"
                  value={importDetail.date}
                  disabled
                />

                {/**Handle seller */}
                <label className="block mb-2 font-bold">Seller</label>
                <input
                  className="w-full bg-gray-100 p-2 mb-4"
                  value={importDetail.seller}
                  disabled
                />

                {/**Handle total price */}
                <label className="block mb-2 font-bold">Total Price</label>
                <input
                  className="w-full bg-gray-100 p-2 mb-4"
                  type="text"
                  value={importDetail.totalPrice}
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
                  {importDetail.Import_Report_Details.map((record, index) => (
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
                          value={record.unitPrice * record.quantity}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded-md mr-2"
            >
              <Link to="../">Back</Link>
            </button>
          </div>
        </div>
      ) : (
        <div>asfdaf</div>
      )}
    </>
  );
};

export default ViewImportDetail;
