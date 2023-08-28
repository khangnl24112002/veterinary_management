/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccountById } from "../../services/account.services";

const ViewAccountDetail = () => {
  const { id } = useParams();
  const [account, setAccount] = useState("");
  useEffect(() => {
    const getInfo = async () => {
      const res = await getAccountById(id);
      return res;
    };
    setAccount(getInfo(id));
  }, [id]);
  return (
    <div>
      <p>Id: {account.id}</p>
      <p>Name: {account.name}</p>
    </div>
  );
};

export default ViewAccountDetail;
