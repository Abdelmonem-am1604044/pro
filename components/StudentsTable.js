import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import { updateAction } from "../redux/reducer";
import { useDispatch } from "react-redux";
export default function StudentTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/parents`);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="tableContainer">
      <Table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Qatari Id</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Password</th>
            <th>Enrolment status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{data && data.map((obj, i) => <Tr {...obj} key={i} />)}</tbody>
      </Table>
    </div>
  );
}

function Tr({
  _id,
  qatariId,
  firstName,
  lastName,
  mobileNumber,
  email,
  password,
  status,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useRef();

  const onUpdate = () => {
    dispatch(updateAction());
    localStorage.setItem("_id", _id);
    localStorage.setItem("qatariId", qatariId);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("mobileNumber", mobileNumber);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("status", status);
  };

  const onDelete = async () => {
    console.log(_id);
    try {
      await fetch(`http://localhost:3000/api/parents/${_id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      router.reload();
    }, 0.5 * 1000);
  };
  return (
    <tr>
      <td>
        <span>{firstName || "Unknown"}</span>
      </td>
      <td>
        <span>{lastName || "Unknown"}</span>
      </td>
      <td>
        <span>{qatariId || "Unknown"}</span>
      </td>
      <td>
        <span>{mobileNumber || "Unknown"}</span>
      </td>
      <td>
        <span>{email || "Unknown"}</span>
      </td>
      <td>
        <span>{password || "Unknown"}</span>
      </td>
      {/* <td>Password</td> */}
      <td>
        <button>
          <span className="status">{status || "Unknown"}</span>
        </button>
      </td>
      <td className="tableBtns">
        <button className="tableBtn">
          <BiEdit
            size={25}
            color={"rgba(34,197,94)"}
            onClick={onUpdate}
          ></BiEdit>
        </button>
        <button className="tableBtn">
          <BiTrashAlt
            size={25}
            color={"rgba(244,63,94)"}
            onClick={onDelete}
          ></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
