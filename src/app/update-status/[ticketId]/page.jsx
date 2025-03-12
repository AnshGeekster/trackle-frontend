"use client"

import { useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Loader2, RotateCw, Ticket, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const statusOptions = [
  {
    value: "PENDING",
    label: "Pending",
    icon: Clock,
    description: "Ticket is waiting to be processed",
    color: "text-amber-500",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: RotateCw,
    description: "Ticket is currently being worked on",
    color: "text-blue-500",
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: CheckCircle,
    description: "Ticket has been resolved",
    color: "text-green-500",
  },
]

const UpdateTicketStatus = () => {
  const { ticketId } = useParams()
  const [status, setStatus] = useState("PENDING")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleStatusChange = async () => {
    try {
      setIsLoading(true)
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/ticket/update/${ticketId}`,
        {
          status,
        },
        { withCredentials: true },
      )

      window.alert(response.data.message || "Ticket status has been successfully updated.")

      // Redirect after a short delay to show the success state
      setTimeout(() => {
        router.push("/admin-dashboard")
      }, 1000)
    } catch (error) {
      console.error("Error in updating ticket status:", error)
      window.alert("There was a problem updating the ticket status. Please try again.")
      setIsLoading(false)
    }
  }

  const selectedStatus = statusOptions.find((option) => option.value === status)
  const StatusIcon = selectedStatus?.icon || Clock

  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Ticket className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Update Ticket Status</CardTitle>
            </div>
            <CardDescription>
              Ticket ID: <span className="font-mono font-medium">{ticketId}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Select Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className={`h-4 w-4 ${option.color}`} />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-muted/50 p-4 rounded-lg flex items-start gap-3"
            >
              <StatusIcon className={`h-5 w-5 mt-0.5 ${selectedStatus?.color}`} />
              <div>
                <h4 className="font-medium">{selectedStatus?.label}</h4>
                <p className="text-sm text-muted-foreground">{selectedStatus?.description}</p>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/admin-dashboard")} disabled={isLoading}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleStatusChange} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Update Status
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default UpdateTicketStatus