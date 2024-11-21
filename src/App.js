import React, { lazy, Suspense, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpaceSteps from "./components/SpaceSteps/SpaceSteps";
import Board from "./components/Board/Board";
import AboutUs from "./components/AboutUs/Index";
import Inspirations from "./components/Inspirations/Index";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Blog from "./components/Blog/Index";
import BlogDetails from "./components/BlogDetail/Index";
import SeeBoard from "./components/SeeBoard/Index";
import EditProfile from "./components/EditProfile/EditProfile";
import AccountManagement from "./components/AccountManagement/AccountManagement";
import Steps from './components/home/Steps/Steps';
import SelectedProducts from "./components/home/SelectedProducts/SelectedProducts";
import BoardAccording from "./components/Board/BoardAccordion";
import BoardDetail from "./components/Board/BoardDetail";
import Loader from "./components/LoaderOfImage/Loader";
import UserBoard  from  "./components/Board/userBoardDetails.js";

// import SeeBoard from "./components/SeeBoard/SeeBoard";



const Home = lazy(() => import("./components/home/Home"));
const Config = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <header>
      <Router>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route exact path="/about-us" element={<AboutUs />} />
            <Route exact path="/inspirations" element={<Inspirations />} />
            <Route exact path="/seeBoard" element={<SeeBoard />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/blog-details" element={<BlogDetails />} />
            <Route exact path="/get-started" element={<SpaceSteps />} />
            <Route exact path="/board" element={<Board />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            {/* <Route exact path="/edit-edit-profileprofile" element={<EditProfile />} /> */}
            <Route exact path="/edit-profile" element={<EditProfile />} />
            <Route path="/account-management" element={<AccountManagement />} />
            <Route path="/Steps" element={<Steps />} />
            <Route path="/SelectedProducts" element={<SelectedProducts />} />
            <Route path="/BoardAccording" element={<BoardAccording />} />
            <Route path="/BoardDetail" element={<BoardDetail />} />
            <Route path="/Loader" element={<Loader />} />
            <Route path="/UserBoard" element={<UserBoard />} />






          </Routes>
        </Suspense>
      </Router>

    </header>
  );
};

export default Config;


