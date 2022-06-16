import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Memo from "./Memo";
import Edit from "./Edit";
import ImageUpload from "./ImageUpload";

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Memo/>}/>
        <Route exact path="/edit/:memo_id" element={<Edit/>}/>
        <Route exact path="/image" element={<ImageUpload/>}/>
      </Routes>
  );
}

export default App;
