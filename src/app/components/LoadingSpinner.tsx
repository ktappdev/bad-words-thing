import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <ThreeCircles
        height="100"
        width="100"
        color="#1976d2"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

export default LoadingSpinner;
