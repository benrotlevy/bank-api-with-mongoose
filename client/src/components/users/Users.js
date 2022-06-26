import React, { useEffect, useState } from "react";
import { api } from "../../api/bankAPI.js";
import "./users.css";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/users");
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.massege);
      }
    };
    getUsers();
    setLoading(true);
  }, []);

  const insertUsers = users.map((user) => {
    return (
      <div key={user.passportId} className="user">
        <p>name: {user.name}</p>
        <p>passport: {user.passportId}</p>
        <p>cash: {user.cash}</p>
        <p>credit: {user.credit}</p>
      </div>
    );
  });

  if (error) return <div>{error}</div>;

  if (loading) return <div>{"loading..."}</div>;

  return <div className="users">{insertUsers}</div>;
};
