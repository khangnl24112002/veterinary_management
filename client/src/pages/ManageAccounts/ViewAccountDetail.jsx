import { useParams } from "react-router-dom";

const ViewAccountDetail = () => {
  const { id } = useParams();
  return <div>ViewAccountDetail id = {id}</div>;
};

export default ViewAccountDetail;
