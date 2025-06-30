"use client";

import React, { useState } from 'react';
import Navigation from "../../components/Navigation";

export default function Home(){
  return (
    <>
      <Navigation />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">Sustainability Report</h1>
          <div className="w-full">
            <h1>홈</h1>
          </div>
        </div>
      </div>
    </>
  );
};



