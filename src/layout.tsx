import React, { useState } from 'react'
import { Header, SideBar } from './components/header';
import { Navbar } from 'reactstrap';
import NavigationBar from './components/navigation-bar';

 const CommonLayOut = ( { children }: { children: React.ReactNode}) => {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className='main-content'>
   <Navbar color="light" className="formpagenavbar" container={false}>
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavigationBar />
      </Navbar>
  <div className='d-flex'>
  <SideBar isSidebarOpen={!isSidebarOpen}  />
  <div className='w-100'> {children}</div>
  </div>
  
    </div>
  )
}
export default CommonLayOut
