"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { motion } from "framer-motion"
import { useAppSelector } from "@/lib/hooks"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  AlertCircle,
  Send,
  Loader2,
  Home,
  Building,
  MapPinned,
  FileText,
  Zap,
  RouteIcon as Road,
  Droplets,
  Flame,
  Wifi,
  HelpCircle,
} from "lucide-react"

const complaintTypes = [
  { value: "ELECTRICITY", label: "Electricity", icon: Zap },
  { value: "ROAD", label: "Road", icon: Road },
  { value: "WATER", label: "Water", icon: Droplets },
  { value: "GAS", label: "Gas", icon: Flame },
  { value: "INTERNET", label: "Internet", icon: Wifi },
  { value: "OTHER", label: "Other", icon: HelpCircle },
]

export default function LodgeComplaint() {
  const user = useAppSelector((state) => state.user)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLocating, setIsLocating] = useState(false)

  const [complaint, setComplaint] = useState({
    title: "",
    fault: "",
    type: "",
    address: "",
    city: "",
    district: "",
    state: "",
    latitude: "",
    longitude: "",
  })

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value) => {
    setComplaint({ ...complaint, type: value })
  }

  const fetchLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setComplaint({
            ...complaint,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          })
          setIsLocating(false)
        },
        (error) => {
          setIsLocating(false)
        },
      )
    } else {
        window.alert("Geolocation is not supported by this browser.")
    }
  }

  const handleSubmit = async () => {
    // Basic validation
    if (!complaint.title || !complaint.fault || !complaint.type) {
        window.alert("Please fill in all required fields.")
      
      return
    }

    setIsSubmitting(true)

    try {
      const ticketData = {
        title: complaint.title,
        userId: user.id,
        fault: complaint.fault,
        type: complaint.type,
        address: complaint.address,
        city: complaint.city,
        district: complaint.district,
        state: complaint.state,
        latitude: Number(complaint.latitude),
        longitude: Number(complaint.longitude),
        status: "PENDING",
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/ticket/create`, ticketData, {
        withCredentials: true,
      })
      
      window.alert(response.data.message || "Complaint submitted successfully.")

      router.push("/user-dashboard")
    } catch (error) {
      console.error("Error in creating ticket:", error)
        window.alert("There was a problem submitting your complaint. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="container max-w-2xl py-10 px-4 mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="shadow-lg">
          <CardHeader className="bg-primary/5 rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Lodge a Complaint
            </CardTitle>
            <CardDescription>Fill in the details below to submit your complaint</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <motion.div variants={formVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Label htmlFor="title" className="text-base">
                  Complaint Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={complaint.title}
                  onChange={handleChange}
                  placeholder="Brief title of your complaint"
                  className="mt-1.5"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="type" className="text-base">
                  Complaint Type <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={handleSelectChange} value={complaint.type}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent>
                    {complaintTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="fault" className="text-base">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="fault"
                  name="fault"
                  value={complaint.fault}
                  onChange={handleChange}
                  placeholder="Describe the issue in detail"
                  className="mt-1.5 min-h-24"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex items-center mb-2">
                  <h3 className="text-base font-medium">Location Details</h3>
                  <Separator className="flex-1 ml-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">
                      <Home className="h-3.5 w-3.5 inline mr-1.5" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={complaint.address}
                      onChange={handleChange}
                      placeholder="Street address"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">
                      <Building className="h-3.5 w-3.5 inline mr-1.5" />
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={complaint.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      name="district"
                      value={complaint.district}
                      onChange={handleChange}
                      placeholder="District"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={complaint.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <MapPinned className="h-5 w-5 text-primary" />
                    <span className="font-medium">GPS Coordinates</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchLocation} disabled={isLocating}>
                    {isLocating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Locating...
                      </>
                    ) : (
                      <>
                        <MapPin className="mr-2 h-4 w-4" />
                        Get Current Location
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      value={complaint.latitude}
                      onChange={handleChange}
                      placeholder="Latitude"
                      className="mt-1.5"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      value={complaint.longitude}
                      onChange={handleChange}
                      placeholder="Longitude"
                      className="mt-1.5"
                      readOnly
                    />
                  </div>
                </div>

                {!complaint.latitude && !complaint.longitude && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>Click the button above to automatically capture your location</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-2">
            <div className="text-sm text-muted-foreground">
              <span className="text-destructive">*</span> Required fields
            </div>

            <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full" size="lg" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Complaint
                  </>
                )}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

