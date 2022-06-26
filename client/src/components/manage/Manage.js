import { useEffect, useState } from "react";
import { api } from "../../api/bankAPI.js";

export const Manage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (users.length > 0) {
      setTimeout(() => {
        setUsers([]);
      }, 5000);
    }
  }, [users]);

  useEffect(() => {
    if (error.length > 0) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  const deposit = async () => {
    try {
      setLoading(true);
      const { data } = await api.patch(`/manage/deposit/${to}`, { amount });
      setLoading(false);
      setUsers([data]);
      console.log(data);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.error);
      console.log(e);
    }
  };

  const withdraw = async () => {
    try {
      setLoading(true);
      const { data } = await api.patch(`/manage/withdraw/${from}`, { amount });
      setLoading(false);
      setUsers([data]);
      console.log(data);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.error);
      console.log(e);
    }
  };
  const transfer = async () => {
    try {
      setLoading(true);
      const { data } = await api.patch(`/manage/transfer/`, {
        amount,
        to,
        from,
      });
      setLoading(false);
      setUsers([data.from, data.to]);
      console.log(data);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.error);
      console.log(e);
    }
  };

  const insertUsers = () => {
    return users.map((user) => {
      return (
        <div key={user.passportId} className="user">
          <p>name: {user.name}</p>
          <p>passport: {user.passportId}</p>
          <p>cash: {user.cash}</p>
          <p>credit: {user.credit}</p>
        </div>
      );
    });
  };

  return (
    <div className="manage">
      <input
        value={from}
        onChange={({ target }) => {
          setFrom(target.value);
        }}
      />
      <input
        value={to}
        onChange={({ target }) => {
          setTo(target.value);
        }}
      />
      <input
        type="number"
        value={amount}
        onChange={({ target }) => {
          setAmount(target.value);
        }}
      />
      <button onClick={deposit}>Deposit</button>
      <button onClick={withdraw}>Withdraw</button>
      <button onClick={transfer}>Transfer</button>
      <br></br>
      {loading && "loading..."}
      {error}
      {insertUsers()}
    </div>
  );
};
