import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Nav";
import Home from "./pages/Home";
import { fetchDataItems } from "./services/wixCMS";
import "./App.css";

function App() {
  const [data, setData] = useState({
    staffMembers: [],
    logos: [],
    homePage: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const staffItems = await fetchDataItems("StaffCard");
        const logoItems = await fetchDataItems("Logos");
        const homePageItems = await fetchDataItems("HomePage");

        setData({
          staffMembers: staffItems,
          logos: logoItems,
          homePage: homePageItems,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-teal-500">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-white"></div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar homePageData={data.homePage} /> {/* Pass data to Navbar */}
      <Routes>
        <Route path="/" element={<Home data={data} />} />{" "}
        {/* Pass data to Home */}
      </Routes>
    </Router>
  );
}

export default App;
