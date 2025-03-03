import React from 'react'
import SideBar from '../../pages/SideBar'
import Navbar from '../../pages/navbar'
import { Link } from 'react-router-dom'
import { useAllProjects } from '../../hooks/useAllProjects'
import { Spin } from 'antd'
import ProgressiveCards from '../ProgressiveCards'
const ViewProjects = () => {
  const currentDate = new Date();
  const {loading, error, projects} = useAllProjects();
  const inprogressProjects = projects.filter(
    (project) => project.status === "In Progress"
  );
  const onHoldProjects = projects.filter(
    (project) => project.status === "On Hold"
  );

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  );
  
   if(loading){
    return(
      <div className="admin-dashboard flex-row">
      <div className="side-bar-con">
        <SideBar />
      </div>
      <div className="navbar-and-admin-panel">
        <Navbar />
        <div className="admin-panel">
          <Spin className='loader' />
          </div>
          </div>
          </div>
    )
   }

  return (
    <>
    <div className="admin-dashboard flex-row">
        <div className="side-bar-con">
          <SideBar />
        </div>
        <div className="navbar-and-admin-panel">
          <Navbar />
          <div className="admin-panel">
            <div className="heading-and-addemployee-btn flex-row">
              <div className="date-and-heading">
                <h2 className="dash-heading">Projects</h2>
                <p className="date">{currentDate.toDateString()}</p>
              </div>
              <div className="add-user-card">
                <Link to="/projects/add-projects">
                  <i className="ri-add-line ri-xl"></i> Add Projects
                </Link>
              </div>
            </div>
             
            
              <div className="project-cards-grid">
              <ProgressiveCards Map={inprogressProjects} heading={"In Progress"} bgColor={"#9919F7"} />
              <ProgressiveCards Map={onHoldProjects} heading={"On Hold"} bgColor={"orange"}/>
              <ProgressiveCards Map={completedProjects} heading={"Completed"} bgColor={"#E09396"}/>
              </div>

           
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProjects
