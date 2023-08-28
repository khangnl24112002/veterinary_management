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
      dispatch(fetchAccounts(res.data.data));
    };
    getAccs();
  }, [dispatch]);
  const accounts = useSelector((state) => state.account.accounts);

  return (
    <div>
      <Table data={accounts} />
      <Link to="addNewAccount">Add new account...</Link>
    </div>
  );
};

export default ViewAccounts;
