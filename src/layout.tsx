
import React, { Suspense, useState } from 'react'
import { Header, SideBar } from './components/shared';
import { Navbar } from 'reactstrap';
import NavigationBar from './components/navigation-bar';
import Loading from './features/loading/loading';
import { ToastContainer } from "react-toastify";

const CommonLayOut = ({ children }: { children: React.ReactNode }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <Navbar color="light" className="header" container={false}>
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={isSidebarOpen}
        />
        <NavigationBar />
      </Navbar>
      <div className='main-body d-flex'>
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <Suspense fallback={<Loading />}>
          <div className='main-content'> {children}</div>
        </Suspense>
      </div>
      <ToastContainer position='top-center' />
    </div>
  )
}
export default CommonLayOut
