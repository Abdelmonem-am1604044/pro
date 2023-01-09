import React, { useState } from "react";
import Header from "../components/header";
import TaskTable from "../components/taskTable";
import AddTaskForm from "../components/AddTaskForm";
import UpdateTaskForm from "../components/UpdateTaskForm";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "../redux/reducer";
import Link from "next/link";

export default function teacher() {
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
          <Link href="/parent">
            <h1>Tasks</h1>
          </Link>
          <Link href="/messages">
            <h1>Messages</h1>
          </Link>
        </div>
        <div className="addTask">
          <button onClick={handler} type="submit" className="btn btn-primary">
            Add tasks
          </button>
        </div>
        {visable ? <AddTaskForm /> : <></>}
        {update ? <UpdateTaskForm /> : <></>}
        <TaskTable />
      </div>
    </div>
  );
}
