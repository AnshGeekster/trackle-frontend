
import { LogOut} from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { useAppDispatch } from "@/lib/hooks"
import { clearUser } from "@/lib/features/user/userSlice"



const Logout = ()=>{

    const dispatch = useAppDispatch()
    const router = useRouter()


    const handleLogout = ()=>{
        router.push('/')
        Cookies.remove('jwt');
        dispatch(clearUser())
    }



    return (
        <Button onClick={handleLogout} variant="ghost" size="sm" className="text-black hover:bg-orange-600 hover:text-white m-1">
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
   
    )


}

export default Logout