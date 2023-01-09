import React, { useState } from "react";
import Header from "../components/header";
import StudentTable from "../components/StudentsTable";
import AddStudent from "../components/AddStudent";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "../redux/reducer";
import Link from "next/link";
import UpdateStudent from "../components/UpdateStudent";

export default function coordinator() {
  const visable = useSelector((state) => state.app.client.toggleForm);
  const update = useSelector((state) => state.app.update.toggleForm);

  const dispatch = useDispatch();

  const handler = () => {
    dispatch(toggleChangeAction());
  };

  return (
    <div>
      <Header />
      <div className="taskContainer">
        <div className="options">
          <Link href="/coordinator">
            <h1>Students</h1>
          </Link>

          <Link href="/announcements">
            <h1>Announcments</h1>
          </Link>

          <Link href="/messages">
            <h1>Messages</h1>
          </Link>
        </div>
        <div className="addTask">
          <button onClick={handler} type="submit" className="btn btn-primary">
            Add Students
          </button>
        </div>

        {visable ? <AddStudent /> : <></>}
        {update ? <UpdateStudent /> : <></>}
        <StudentTable />
      </div>
    </div>
  );
}
