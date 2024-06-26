import React from "react";
import Bodypart from "./Bodypart";
import Workout from "./Workout";
import Day from "./Day";

const Dashboardhome = () => {
  return (
    <>
      <div>
        <div className="">
          <Bodypart />
        </div>
        <div className="mt-4">
          <Workout />
        </div>
        <div className="mt-4">
          <Day />
        </div>
      </div>
    </>
  );
};

export default Dashboardhome;
