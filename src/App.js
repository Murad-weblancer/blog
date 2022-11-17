import React from "react";
import {ToastContainer} from 'react-toastify'
import { Route,Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { AddEditBlog } from "./pages/AddEditBlog";
import { Navbar } from "./components/Navbar/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <ToastContainer position="top-center"/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<AddEditBlog/>} />
          <Route path="/update/:id" element={<AddEditBlog/>} />
        </Routes>
    </div>
  );
}

export default App;
