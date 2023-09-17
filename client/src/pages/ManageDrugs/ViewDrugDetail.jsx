/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateDrug } from "../../services/drug.services";
import { updateDrug as updateDrugAction } from "../../actions/drugActions/drugActions";
const ViewDrugDetail = () => {
  const { id } = useParams();
  const [drug, setDrug] = useState({});
  // Su dung react-hook-form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // luu trang thai error
  const [error, setIsError] = useState("");

  // luu trang thai edit
  const [editing, setEditing] = useState(false);

  // Xu li de lay du lieu ban dau
  const drugList = useSelector((state) => state.drug.drug);

  // Dung de dispatch du lieu len redux
  const dispatch = useDispatch();

  useEffect(() => {
    // find Drug
    const drugItem = drugList.find((drug) => drug.id == id);
    // sua lai gia tri cua type
    drugItem.type = "";
    drugItem["quantity"] = drugItem.Drug_Warehouse.quantity;
    drugItem["unitPrice"] = drugItem.Drug_Warehouse.unitPrice;
    // Gan gia tri vao state
    setDrug(drugItem);
    reset({ ...drug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drug]);

  const handleEdit = () => {
    setEditing(!editing);
  };

  const onSubmit = async (data) => {
    data.imageUrl = data.imageUrl[0];
    const response = await updateDrug(id, data);
    if (response.success === false) {
      setIsError(response.message);
    } else {
      setIsError("Update successfully");
      // dispatch du lieu len tren server
      dispatch(updateDrugAction(response.data));
    }
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
          <div className="mb-3">
            <label className="block font-medium mb-1">
              Số lượng trong kho:
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              {...register("quantity", {
                required: "Số lượng trong kho không được để trống",
              })}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Đơn giá</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              {...register("unitPrice", {
                required: "Đơn giá không được để trống",
              })}
            />
            {errors.unitPrice && (
              <p className="text-red-500">{errors.unitPrice.message}</p>
            )}
          </div>
        </div>
        {/**Right section */}
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
            Lưu
          </button>
          <Link to="../" className="text-blue-500 hover:underline">
            Quay lại
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ViewDrugDetail;
