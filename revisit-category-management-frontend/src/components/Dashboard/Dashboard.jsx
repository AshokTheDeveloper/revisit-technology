import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import Header from "../Header/Header";
import { GoHomeFill } from "react-icons/go";
import { TfiMenuAlt } from "react-icons/tfi";
import { CiFolderOn } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { VscGraph } from "react-icons/vsc";
import { FaRegStar } from "react-icons/fa6";
import { LuMessageSquareText } from "react-icons/lu";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoIosRibbon } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import Form from "../Form/Form";

const sidebarItems = [
  { id: 1, icon: GoHomeFill, name: "Dashboard" },
  { id: 2, icon: TfiMenuAlt, name: "Orders" },
  {
    id: 3,
    icon: IoPricetagOutline,
    name: "Products",
  },
  { id: 4, icon: CiFolderOn, name: "Categories" },
  { id: 5, icon: HiUsers, name: "Customers" },
  { id: 6, icon: VscGraph, name: "Reports" },
  { id: 7, icon: FaRegStar, name: "Coupons" },
  {
    id: 8,
    icon: LuMessageSquareText,
    name: "Inbox",
  },
];

const Dashboard = () => {
  const [tab, setTab] = useState("Categories");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);

  console.log(categories);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const jwtToken = Cookies.get("jwtToken");
    const apiUrl = "http://localhost:3000/category";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log("Error creating category:", error);
    }
  };

  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitForm = async (category) => {
    const jwtToken = Cookies.get("jwtToken");
    const apiUrl = "http://localhost:3000/category";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(category),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log("Error creating category:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="sidebar">
          {sidebarItems.map((item) => {
            const isActive = tab === item.name;
            const IconComponent = item.icon;
            return (
              <div
                className={`tab-items ${isActive ? "tab-status" : ""}`}
                key={item.id}
                onClick={() => setTab(item.name)}
              >
                <IconComponent
                  className={`${isActive ? "active-icon" : "tab-icons"}`}
                />

                <p className={isActive ? "active-tab" : "tab-name"}>
                  {item.name}
                </p>
              </div>
            );
          })}

          <div className="sidebar-other-information-section">
            <p>Other Information</p>
            <div className="information">
              <div className="info-wrappers knowledge">
                <FaRegCircleQuestion className="info-icons" />
                <p>Knowledge Base</p>
              </div>
              <div className="info-wrappers">
                <IoIosRibbon className="info-icons" />
                <p>Product Updates</p>
              </div>
            </div>
          </div>

          <div className="sidebar-settings-section">
            <p>Settings</p>
            <div className="settings">
              <div className="setting-wrappers personal">
                <IoPersonOutline className="setting-icons" />
                <p>Personal Settings</p>
              </div>
              <div className="setting-wrappers">
                <CiSettings className="setting-icons" />
                <p>Global Settings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-home">
          <div className="header-add-button-container">
            <h2>Categories</h2>
            <button onClick={() => setShowForm(true)}>
              <GoPlus className="add-plus-icon" />
              Add category
            </button>
          </div>
          <div className="category-wrapper">
            {categories.map((item) => (
              <div className="category-card">
                <img src={item.image} />
                <p>{item.name}</p>
                <p>{item.itemCount}</p>
              </div>
            ))}
          </div>
          {showForm && (
            <Form submit={handleSubmitForm} close={handleCloseForm} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
