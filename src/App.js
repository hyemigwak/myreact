import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Memo from "./Memo";
import Edit from "./Edit";
import ImageUpload from "./ImageUpload";
import Login from "./Login";
import Signup from "./Signup";
import { QueryClientProvider, QueryClient } from 'react-query';


function App() {

    const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
          <Routes>
            <Route exact path="/memo" element={<Memo/>}/>
            <Route exact path="/edit/:memo_id" element={<Edit/>}/>
            <Route exact path="/image" element={<ImageUpload/>}/>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
          </Routes>
      </QueryClientProvider>

  );
}

export default App;
