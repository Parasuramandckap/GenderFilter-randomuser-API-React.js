import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Allusers from './Allusers';
import Details from './Details';
export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Allusers />}></Route>
        <Route path="/details/:email" element={<Details/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}
