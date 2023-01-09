import React, { useState } from "react";
import Header from "../components/header";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "../redux/reducer";
import Link from "next/link";
import ChildTable from "../components/Child";
import AddChild from "../components/AddChild";

export default function parent() {
  const visable = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const handler = () => {
    dispatch(toggleChangeAction());
  };

  return (
    <div>
      <Header />
      <div className="taskContainer">
        <div className="options">
          <Link href="/parent">
            <h1>Children</h1>
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
            Add child
          </button>
        </div>

        {visable ? <AddChild /> : <></>}

        <ChildTable />
      </div>
    </div>
  );
}
