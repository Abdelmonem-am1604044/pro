import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import { updateAction } from "../redux/reducer";
import { useDispatch } from "react-redux";
export default function ChildTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        let user = JSON.parse(localStorage.getItem("loggedUser"));
        setData(user.students);
        setData(user.students);
        console.log(data);
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
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>{data && data.map((res, i) => Tr(res))}</tbody>
      </Table>
    </div>
  );
}
function Tr(res) {
  return (
    <tr>
      <td>
        <span>{res.firstName || "Unknown"}</span>
      </td>
      <td>
        <span>{res.lastName || "Unknown"}</span>
      </td>
      <td>
        <span>{res.dob || "Unknown"}</span>
      </td>
      <td>
        <span>{res.gender || "Unknown"}</span>
      </td>
      <td>
        <span>{res.schoolGrade || "Unknown"}</span>
      </td>
    </tr>
  );
}
