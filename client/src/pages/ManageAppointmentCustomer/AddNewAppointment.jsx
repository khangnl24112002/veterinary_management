import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addNewAppointment } from "../../services/appointment.services";

const AddNewAppointment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const customerId = useSelector((state) =>
    parseInt(state.user.accountInfo.id)
  );
  const onSubmit = async (appointment) => {
    // gọi API
    // const result = await addNewDrugs(drug);
    // add some info
    appointment.customerId = customerId;
    appointment.isOk = false;
    console.log(appointment);
    const result = await addNewAppointment(appointment);
    if (result.success) {
      setError("Thêm yeu cau hen thành công");
    } else {
      setError(
        "Máy chủ bị lỗi không thể tạo được thuốc mới. Vui lòng thử lại sau."
      );
    }
  };
  return (
    <div className="container mx-auto px-6 py-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="block font-medium mb-1" htmlFor="inputDate">
            Ngày hen gap:
          </label>
          <input
            type="date"
            id="inputDate"
            name="inputDate"
            min={new Date().toISOString().split("T")[0]}
            className="border rounded py-2 px-3 w-full"
            {...register("appointmentDate", {
              required: "Ngay hen không được để trống",
            })}
          />
          {errors.appointmentDate && (
            <p className="text-red-500">{errors.appointmentDate.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="block font-medium mb-1">Loai vat nuoi:</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            {...register("animalType", {
              required: "Loai vat nuoi không được để trống",
            })}
          />
          {errors.animalType && (
            <p className="text-red-500">{errors.animalType.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="block font-medium mb-1">Trieu chung benh:</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            {...register("symptom", {
              required: "Trieu chung benh không được để trống",
            })}
          />
          {errors.symptom && (
            <p className="text-red-500">{errors.symptom.message}</p>
          )}
        </div>
        {/* Bottom Buttons */}
        <div className="col-span-2 flex flex-col items-center">
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-4"
          >
            Tạo lich hen
          </button>
          <Link to="../" className="text-blue-500 hover:underline">
            Quay lại
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddNewAppointment;
