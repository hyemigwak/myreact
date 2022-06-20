import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Memo from "./Memo";
import Edit from "./Edit";
import ImageUpload from "./ImageUpload";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Memo/>}/>
        <Route exact path="/edit/:memo_id" element={<Edit/>}/>
        <Route exact path="/image" element={<ImageUpload/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
      </Routes>
  );
}

export default App;
