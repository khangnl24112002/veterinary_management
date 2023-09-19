import { Link } from "react-router-dom";
import { deleteDrugAction } from "../../actions/drugActions/drugActions";
import { deleteDrug as deleteDrugService } from "../../services/drug.services";
import { useDispatch } from "react-redux";

/* eslint-disable react/prop-types */
const Card = ({ drug }) => {
  const dispatch = useDispatch();

  const handleDelete = async (drugId) => {
    const response = await deleteDrugService(drugId);
    if (response.success) {
      dispatch(deleteDrugAction(drugId));
    }
  };
  let type;
  if (drug.type == "1") {
    type = "Thuốc tiêm";
  } else if (drug.type == "2") {
    type = "Thuốc bột uống";
  } else if (drug.type == "3") {
    type = "Thuốc bôi ngoài da";
  } else if (drug.type == "4") {
    type = "Thuốc nhỏ mắt, mũi";
  } else {
    type = "";
  }
  return (
    <div className="w-full md:w-64 bg-white rounded-lg flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={drug.imageUrl}
        alt="img"
        title="img"
        className="w-full h-auto object-cover rounded-t-lg"
      />
      <div className="w-full p-4 justify-start flex flex-col">
        <h4 className="border-b-2 text-3xl">{drug.name}</h4>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Thuộc tính</th>
              <th>Giá trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Loại</td>
              <td>{type}</td>
            </tr>
            <tr>
              <td>Số lượng</td>
              <td>{drug.Drug_Warehouse.quantity}</td>
            </tr>
            <tr>
              <td>Đơn giá</td>
              <td>{drug.Drug_Warehouse.unitPrice}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-row gap-4 shrink">
          <button
            value="button"
            className="shrink basis-1/2 my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500 rounded-lg"
          >
            <Link to={`${drug.id}`}>View detail</Link>
          </button>
          <button
            onClick={() => handleDelete(drug.id)}
            className="shrink basis-1/2 my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
