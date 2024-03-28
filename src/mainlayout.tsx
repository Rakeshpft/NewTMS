// import React, { useState } from "react";
// import { Header, SideBar } from "./components/shared";
// import { Navbar } from "reactstrap";
// import NavigationBar from "./components/navigation-bar";
// import Mainbody from "./mainbody";
// import { DashboardPage } from "./components/dashboard";
// const Mainlayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   return (
//     <div className="main-content">
//       <Navbar color="light" className="formpagenavbar" container={false}>
//         <Header
//           sidebarToggle={() => {
//             setIsSidebarOpen(!isSidebarOpen);
//           }}
//         />
//         <NavigationBar />
//       </Navbar>
//       <div className='d-flex'>
//        <Mainbody />
//        <SideBar isSidebarOpen={!isSidebarOpen}  />
//          <DashboardPage />    

//       </div>
//     </div>
//   );
// };

// export default Mainlayout;
