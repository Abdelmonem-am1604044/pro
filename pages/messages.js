import React, { useState } from "react";
import Header from "../components/header";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "../redux/reducer";
import MessagesTable from "../components/MessagesTable";
import AddMessages from "../components/Addmessages";
import Link from "next/link";
import UpdateMesage from "../components/UpdateMesage";

export default function messages() {
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
          <Link href="/announcements">
            <h1>Announcments</h1>
          </Link>
          <Link href="/messages">
            <h1>Messages</h1>
          </Link>
        </div>
        <div className="addTask">
          <button onClick={handler} type="submit" className="btn btn-primary">
            Add Message
          </button>
        </div>
        {visable ? <AddMessages /> : <></>}
        {update ? <UpdateMesage /> : <></>}

        <MessagesTable />
      </div>
    </div>
  );
}
