import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "../redux/reducer";
import Router from "next/router";
import { useRouter } from "next/router";
import { updateAction } from "../redux/reducer";

export default function AnnouncmentsTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/announcements`);
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
            <th>To</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{data && data.map((obj, i) => <Tr {...obj} key={i} />)}</tbody>
      </Table>
    </div>
  );
}

function Tr({ _id, to, title, body }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const onUpdate = () => {
    dispatch(updateAction());
    localStorage.setItem("_id", _id);
    localStorage.setItem("to", to);
    localStorage.setItem("title", title);
    localStorage.setItem("body", body);
  };

  const onDelete = async () => {
    console.log(_id);
    try {
      await fetch(`http://localhost:3000/api/announcements/${_id}`, {
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
        <span>{to || "Unknown"}</span>
      </td>
      <td>
        <span>{title || "Unknown"}</span>
      </td>
      <td>
        <span>{body || "Unknown"}</span>
      </td>
      <td className="tableBtns">
        <button className="tableBtn" onClick={onUpdate}>
          <BiEdit size={25} color={"rgba(34,197,94)"}></BiEdit>
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
