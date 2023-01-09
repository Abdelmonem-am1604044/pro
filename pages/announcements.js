import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "../redux/reducer";
import AnnouncmentsTable from "../components/announcmentsTable";
import AddAnnouncement from "../components/AddAnnouncement";
import Link from "next/link";
import UpdateAnnouncement from "../components/UpdateAnnouncement";

export default function announcements() {
  const [data, setData] = useState(null);
  const visable = useSelector((state) => state.app.client.toggleForm);
  const update = useSelector((state) => state.app.update.toggleForm);

  const dispatch = useDispatch();
  // let isCoordinator;
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       let user = JSON.parse(localStorage.getItem("loggedUser"));
  //       console.log(user.isCoordinator);
  //       if (user.isCoordinator == true) {
  //         return isCoordinator == true;
  //       } else {
  //         return isCoordinator == false;
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, []);

  const handler = () => {
    dispatch(toggleChangeAction());
  };

  return (
    <div>
      <Header />
      <div className="taskContainer">
        <div className="addTask">
          <div className="options">
            {/* {data.isCoordinator == true ? (
              <Link href="/coordinator">
                <h1>Students</h1>
              </Link>
            ) : (
              <></>
            )} */}

            <Link href="/announcements">
              <h1>Announcments</h1>
            </Link>

            <Link href="/messages">
              <h1>Messages</h1>
            </Link>
          </div>
          <button onClick={handler} type="submit" className="btn btn-primary">
            Add announcement
          </button>
        </div>
        {visable ? <AddAnnouncement /> : <></>}
        {update ? <UpdateAnnouncement /> : <></>}
        <AnnouncmentsTable />
      </div>
    </div>
  );
}
