import React from "react";
import { Link } from "react-router-dom";
import {MdSpaceDashboard, MdMedicalServices, MdAnnouncement} from 'react-icons/md'
import { FaNotesMedical } from "react-icons/fa";

export default function Sidebar(){
    return(
        <>
                <div className="sidenav">
                    <ul>
                    <Link to="/admin" className="link-div"><MdSpaceDashboard/>&nbsp;Dashboard</Link>

                    <Link to="/admin/supplies" className="link-div"><MdMedicalServices/>&nbsp;Supplies</Link>

                    <Link to="/admin/records" className="link-div"><FaNotesMedical/>&nbsp;Records</Link>
    
                    <Link to="/admin/announcements" className="link-div" id="announce-link"><MdAnnouncement/>&nbsp;Announcements</Link>
                        
                    </ul>
                </div>
        </>
    )
}