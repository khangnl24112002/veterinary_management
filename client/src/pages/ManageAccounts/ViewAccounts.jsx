import Table from "../../components/Table/Table";
import { Link } from "react-router-dom";
const sampleData = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
  { id: 3, name: "Michael Johnson", age: 28 },
];

const ViewAccounts = () => {
  return (
    <div>
      <Table data={sampleData} />
      <Link to="addNewAccount">Add new account...</Link>
    </div>
  );
};

export default ViewAccounts;
