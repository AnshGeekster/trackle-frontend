"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import { motion } from "framer-motion"
import { User, Mail, Lock, Phone, MapPin, Building, UserCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
    state: z.string().min(2, "State must be at least 2 characters long"),
    role: z.enum(["USER", "ADMIN"]),
    city: z.string().min(2, "City must be at least 2 characters long"),
    district: z.string().min(2, "District must be at least 2 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const Register = () => {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/register", data)
      alert(response.data.message)
      router.push('/login')
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl"
      >
        <h2 className="text-center text-3xl font-extrabold text-white">Create Account</h2>
        <p className="text-center text-sm text-gray-400">Join us and start your journey</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {["name", "email", "password", "confirmPassword", "phone", "state", "city", "district"].map((field, index) => (
            <div key={field} className="relative">
              <Input {...register(field)} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="w-full p-2 rounded-md bg-gray-700 text-white" />
              {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field].message}</p>}
            </div>
          ))}
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-800" size={18} />
            <Select onValueChange={(value) => setValue("role", value)}>
              <SelectTrigger className="w-full pl-10 bg-gray-700 text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-white">
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-orange-800 text-white p-2 rounded-md hover:bg-orange-900">Create Account</Button>
        </form>
      </motion.div>
    </div>
  )
}

export default Register
