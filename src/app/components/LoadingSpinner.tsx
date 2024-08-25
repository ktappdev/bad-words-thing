"use client";
import React from "react";
import { Radio } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <Radio
        height="100"
        width="100"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
      />
    </div>
  );
};

export default LoadingSpinner;
