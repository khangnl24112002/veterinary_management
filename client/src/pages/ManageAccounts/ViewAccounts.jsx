import { useEffect } from "react";
import Table from "../../components/Table/Table";
import { Link } from "react-router-dom";
import { getAllAccounts } from "../../services/account.services";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../actions/accountActions/acountActions";

const ViewAccounts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAccs = async () => {
      const res = await getAllAccounts();
      dispatch(fetchAccounts(res.data));
    };
    getAccs();
  }, [dispatch]);
  const accounts = useSelector((state) => state.account.accounts);

  return (
    <div>
      <Link
        className="bg-blue-500 text-white px-10 py-2 my-4 rounded hover:bg-blue-600 focus:outline-none"
        to="addNewAccount"
      >
        Add new account
      </Link>
      <Table data={accounts} />
    </div>
  );
};

export default ViewAccounts;
