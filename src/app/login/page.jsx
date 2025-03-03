"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/userSlice";



const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});



const Login = () => {

    const dispatch = useAppDispatch();
    


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", data);

     
     

      dispatch(setUser({
         userId: response?.data?.data?.user?.id, userRole: response?.data?.data?.user?.role
    }));




      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl"
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Login</h2>
        </motion.div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-800" size={18} />
            <Input
              {...register("email")}
              placeholder="Email"
              className="w-full pl-10 bg-gray-700 text-white border border-gray-700 focus:ring-orange-800 focus:border-orange-800"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-800" size={18} />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full pl-10 bg-gray-700 text-white border border-gray-700 focus:ring-orange-800 focus:border-orange-800"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-orange-800 hover:bg-orange-800 text-white py-2 px-4 rounded-md">
            Login
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
