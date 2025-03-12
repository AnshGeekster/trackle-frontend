"use client"

import { useAppSelector } from "@/lib/hooks"
import axios from "axios"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Filter, MapPin, RefreshCw, Tag, CheckCircle2, Clock3, HelpCircle, AlertCircle } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const statusIcons = {
  PENDING: <HelpCircle className="h-4 w-4" />,
  IN_PROGRESS: <Clock3 className="h-4 w-4" />,
  COMPLETED: <CheckCircle2 className="h-4 w-4" />,
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  IN_PROGRESS: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  COMPLETED: "bg-green-100 text-green-800 hover:bg-green-200",
}

const UserTickets = () => {
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const user = useAppSelector((state) => state.user)

  const getUserTickets = async () => {
    if (!user?.id) return

    setIsLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/ticket/tickets/${user.id}`)
      setTickets(response?.data?.tickets || [])
    } catch (error) {
      console.error("Error fetching tickets:", error)
      window.alert("Error fetching tickets. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserTickets()
  }, [user.id])

  const filteredTickets = filter === "all" ? tickets : tickets.filter((ticket) => ticket.status === filter)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Tickets</h2>
          <p className="text-muted-foreground text-sm">View and manage all your submitted tickets</p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[160px] h-9">
              <Filter className="h-3.5 w-3.5 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickets</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={getUserTickets}>
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh tickets</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Separator className="my-2" />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/4" />
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-1/3" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredTickets.length > 0 ? (
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <Card
                  className="h-full overflow-hidden hover:shadow-md transition-all border-l-4"
                  style={{
                    borderLeftColor:
                      ticket.status === "PENDING" ? "#fbbf24" : ticket.status === "IN_PROGRESS" ? "#3b82f6" : "#10b981",
                  }}
                >
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base font-medium line-clamp-1">{ticket.title}</CardTitle>
                      <Badge className={`ml-2 ${statusColors[ticket.status]}`}>
                        <span className="flex items-center gap-1">
                          {statusIcons[ticket.status]}
                          {ticket.status.replace("_", " ")}
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 py-2 space-y-2">
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      <AlertCircle className="inline-block h-3.5 w-3.5 mr-1.5 text-red-500" />
                      {ticket.fault}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-1.5" />
                      <span className="truncate">
                        {ticket.address}, {ticket.city}, {ticket.state}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-2 text-xs text-muted-foreground border-t">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      {formatDate(ticket.createdAt)}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Tag className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No tickets found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {filter !== "all" ? "Try changing your filter or" : "You haven't submitted any tickets yet or"} try
            refreshing.
          </p>
        </div>
      )}
    </div>
  )
}

export default UserTickets

