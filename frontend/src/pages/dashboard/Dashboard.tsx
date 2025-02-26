import React from "react";
import UserCount from "./UserCount";
import GenderChart from "./GenderChart";

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <UserCount />
      <GenderChart />
    </div>
  );
};

export default Dashboard;
