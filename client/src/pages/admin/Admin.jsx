import { useLayoutEffect, useState } from "react";
import Sidebar from "../../layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Admin.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Admin = () => {
  const navigate = useNavigate();


  const userdata = useSelector(state => state.auth);

  useLayoutEffect(() => {
    if (!userdata.user?.token) {
      navigate("/auth/login")
    }
  }, [userdata])

  return (
    <div className="admin">
      <Sidebar />
      <div className="admin__content">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
