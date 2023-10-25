// Sidebar.js
import React from "react";

const Sidebar = ({ sideBarResponse }) => {
  return (
    <div style={{ height: "70vh", width: "20vw", backgroundColor: "white", borderRadius: "10px", display: "flex", flexDirection: "column" }}>
      {sideBarResponse.length > 0 && sideBarResponse[0].name ? (
        sideBarResponse.map((item, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
            <img src={item.image} alt="..." height="200px" width="200px" loading="lazy" />
            <p>{item.name}</p>
          </div>
        ))
      ) : (
        <p style={{ color: "black", fontFamily: "inherit" }}>No Item Suggestions</p>
      )}
    </div>
  );
};

export default Sidebar;
