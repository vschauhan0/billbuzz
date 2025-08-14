import React from "react";
import "./Ani.css";

function Home() {
  return (
    <>
      <div className="h-[40vh] w-[48vw] relative left-20 top-28">
        <h6 className="text-5xl font-bold mb-4">
          <span className="text-red-600 text-6xl">B</span>ill
          <span className="text-red-600 text-6xl">B</span>uzz
        </h6>
        <div className="h-[12vh] overflow-hidden">
          <p className="text-7xl absolute">Manage your </p>
          <ul
            id="animation"
            className="text-red-600 text-7xl relative left-109 font-bold "
          >
            <li className="mt-2">Business</li>
            <li className="mt-2">Invoices</li>
            <li className="mt-2">Inventory</li>
            <li className="mt-2">Ledger</li>
            <li className="mt-4">Payments</li>
          </ul>
        </div>
        <p className="text-5xl mt-4 ">On your fingertips</p>
      </div>
      

    </>
  );
}

export default Home;
