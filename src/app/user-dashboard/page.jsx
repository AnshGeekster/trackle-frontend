'use client'

import Navbar from "./components/Navbar";
import LodgeComplaint from "./components/LodgeComplaint";
import ProfileCard from "./components/ProfileCard";
import UserTickets from "./components/UserTickets";



const UserDashboard = () => {  
    
    
    return (
        <div>
            <Navbar />
        <div className="flex flex-col p-2 m-2">
            

            <div className="flex justify-end">
               
            <ProfileCard />
            </div> 
            <LodgeComplaint/>
            <UserTickets/>
            

        </div>
        </div>
    )

}



export default UserDashboard;