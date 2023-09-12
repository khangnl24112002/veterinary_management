import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { addNewDrugs } from "../../services/drug.services";

const AddNewDrug = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const onSubmit = async (drug) => {
    // Xử lí dữ liệu trước khi submit
    // Xử lý loại thuốc
    if (drug.type == 1) {
      drug.type === "Thuốc tiêm";
    } else if (drug.type == 2) {
      drug.type = "Thuốc bột uống";
    } else if (drug.type == 3) {
      drug.type = "Thuốc bôi ngoài da";
    } else {
      drug.type = "Thuốc nhỏ mắt, mũi";
    }
    // Xử lí ảnh
    drug.imageUrl = drug.imageUrl[0];
    // gọi API
    const result = await addNewDrugs(drug);
    setError(result.message);
  };
  return (
    <div className="container mx-auto px-6 py-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-8"
      >
        {/* Left Section: Account Setup */}
        <div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Tên thuốc:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              {...register("name", {
                required: "Tên thuốc không được để trống",
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Loại thuốc:</label>
            <select
              {...register("type", {
                required: "Loại thuốc không được để trống",
              })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Chọn loại thuốc</option>
              <option value="1">Thuốc tiêm</option>
              <option value="2">Thuốc bột uống</option>
              <option value="3">Thuốc bôi ngoài da</option>
              <option value="4">Thuốc nhỏ mắt, mũi</option>
            </select>
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Ảnh thuốc:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded px-3 py-2"
              {...register("imageUrl", {
                required: "Ảnh thuốc không được để trống",
              })}
            />
            {errors.imageUrl && (
              <p className="text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>
        </div>
        <div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Công dụng:</label>
            <textarea
              className="w-full border rounded px-3 py-2 h-40"
              {...register("usage", {
                required: "Công dụng không được để trống",
              })}
            />
            {errors.usage && (
              <p className="text-red-500">{errors.usage.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Liều dùng:</label>
            <textarea
              className="w-full border rounded px-3 py-2 h-40"
              {...register("dosage", {
                required: "Liều dùng không được để trống",
              })}
            />
            {errors.dosage && (
              <p className="text-red-500">{errors.dosage.message}</p>
            )}
          </div>
        </div>
        {/* Bottom Buttons */}
        <div className="col-span-2 flex flex-col items-center">
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-4"
          >
            Create Account
          </button>
          <Link to="../" className="text-blue-500 hover:underline">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddNewDrug;
