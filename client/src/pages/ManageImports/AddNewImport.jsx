import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { getAllDrugs } from "../../services/drug.services";
import Select from "react-select";
import { Link } from "react-router-dom";

const AddNewImport = () => {
  const { control, handleSubmit, reset } = useForm();

  // Sử dụng useFieldArray để quản lý mảng động các trường dữ liệu trong form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "importDetails",
  });

  // Tạo state để lưu tổng giá trị
  const [totalPrice, setTotalPrice] = useState(0);

  // Theo dõi sự thay đổi danh sách của các mặt hành nhập hàng
  // để tính tổng giá trị totalPrice
  useEffect(() => {
    const newTotalPrice = fields.reduce((total, row) => {
      return total + row.unitPrice * row.quantity;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [fields]);

  // Khi submit form
  const onSubmit = (data) => {
    // Lây ngày hiện tại thêm vào dữ liệu của form (data)
    const currentDate = new Date().toLocaleDateString("en-GB");
    data.date = currentDate;

    // Gán giá trị totalPrice đã tính toán để submit
    data.totalPrice = totalPrice;

    console.log(data);
    reset();
  };

  const [drugs, setDrugs] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const drug = await getAllDrugs();
        setDrugs(drug.data);
      } catch (error) {
        return (
          <>
            <p>Cannot fetch data!</p>
          </>
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-1/3 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/** Handle date */}
          <label className="block mb-2 font-bold">Date</label>
          <input
            className="w-full bg-gray-100 p-2 mb-4"
            type="text"
            value={new Date().toLocaleDateString("en-GB")}
            disabled
          />

          {/**Handle seller */}
          <label className="block mb-2 font-bold">Seller</label>
          <Controller
            control={control}
            name="seller"
            render={({ field }) => (
              <input className="w-full bg-gray-100 p-2 mb-4" {...field} />
            )}
          />

          <label className="block mb-2 font-bold">Total Price</label>
          <input
            className="w-full bg-gray-100 p-2 mb-4"
            type="text"
            value={totalPrice.toFixed(2)}
            readOnly
          />

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md ml-4"
          >
            <Link to="../">Quay lai</Link>
          </button>
        </form>
      </div>

      {/* Right Side */}
      <div className="w-2/3 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th>Order</th>
                <th>Drug</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td>{index + 1}</td>
                  <td className="w-60">
                    <Controller
                      control={control}
                      name={`importDetails[${index}].drug`}
                      render={({ field }) => (
                        // <select className="w-full bg-gray-100 p-2" {...field}>
                        //   <option value="">Select a drug</option>
                        //   {drugs.map((drug, index) => (
                        //     <option key={index} value={drug.id}>
                        //       {drug.name}
                        //     </option>
                        //   ))}
                        //   {/* Add options for drugs here */}
                        // </select>
                        <div>
                          <Controller
                            {...field}
                            control={control}
                            name={`importDetails[${index}].drug`}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={drugs.map((drug) => ({
                                  value: drug.id,
                                  label: drug.name,
                                }))}
                                isSearchable={true}
                                isClearable={true}
                              />
                            )}
                          />
                        </div>
                      )}
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name={`importDetails[${index}].quantity`}
                      render={({ field }) => (
                        <input
                          className="w-full bg-gray-100 p-2"
                          type="number"
                          {...field}
                        />
                      )}
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name={`importDetails[${index}].unitPrice`}
                      render={({ field }) => (
                        <input
                          className="w-full bg-gray-100 p-2"
                          type="number"
                          {...field}
                        />
                      )}
                    />
                  </td>
                  <td>
                    <input
                      className="w-full bg-gray-100 p-2"
                      type="text"
                      value={(field.unitPrice * field.quantity).toFixed(2)}
                      readOnly
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="text-red-500 p-2"
                      onClick={() => remove(index)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded-md mr-2"
            onClick={() => append({ quantity: 0, unitPrice: 0, drug: "" })}
          >
            +
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewImport;
