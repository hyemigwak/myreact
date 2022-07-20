import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Memo from "./pages/Memo";
import Edit from "./pages/Edit";
import ImageUpload from "./ImageUpload";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import { RecoilRoot } from 'recoil';


function App() {

    const queryClient = new QueryClient();


  return (
      <QueryClientProvider client={queryClient}>
          {/*<RecoilRoot>*/}
              <Suspense fallback={<div>로딩중</div>}>
                  <Routes>
                    <Route exact path="/memo" element={<Memo/>}/>
                    <Route exact path="/edit/:memo_id" element={<Edit/>}/>
                    <Route exact path="/image" element={<ImageUpload/>}/>
                    <Route exact path="/" element={<Login/>}/>
                    <Route exact path="/signup" element={<Signup/>}/>
                  </Routes>
              <ReactQueryDevtools initialIsOpen={false} />
              </Suspense>
          {/*</RecoilRoot>*/}
      </QueryClientProvider>

  );
}

export default App;
