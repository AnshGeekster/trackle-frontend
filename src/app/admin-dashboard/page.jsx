'use client'
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";
import TicketsCard from "./components/TicketsCard";
import UserManagement from "./components/UserManagement";





const AdminPage = ()=>{

    return (


        <div className="flex flex-col">
            <Navbar />

        <div className="flex p-2 m-2">
            <ProfileCard/>
            <TicketsCard/>
         </div>
            <UserManagement />
        </div>
    )
}

export default AdminPage;