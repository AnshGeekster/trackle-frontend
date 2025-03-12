'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  User,
  Mail,
  Building,
  MapPinned,
  Tag,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

// Define ticket type
const TicketsCard = () => {
  
  

  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [idSearchTerm, setIdSearchTerm] = useState("");
  const [expandedTicketId, setExpandedTicketId] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");


  const router = useRouter();



  // Fetch tickets from API
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/ticket/tickets`, {
        withCredentials: true,
      });
      setTickets(response?.data?.tickets || []);
      setFilteredTickets(response?.data?.tickets || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...tickets];

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter((ticket) => ticket.status.toLowerCase() === filterStatus.toLowerCase());
    }

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter((ticket) => ticket.type.toLowerCase() === filterType.toLowerCase());
    }

    // Apply search
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(lowercasedSearch) ||
          ticket.fault.toLowerCase().includes(lowercasedSearch) ||
          ticket.type.toLowerCase().includes(lowercasedSearch) ||
          ticket.user.name.toLowerCase().includes(lowercasedSearch)
      );
    }

    setFilteredTickets(result);
  }, [tickets, searchTerm, filterStatus, filterType]);

  // Search by ID
  const handleIdSearch = () => {
    if (!idSearchTerm.trim()) {
      setFilteredTickets(tickets);
      return;
    }

    const result = tickets.filter((ticket) => ticket.id.toLowerCase().includes(idSearchTerm.toLowerCase()));
    setFilteredTickets(result);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setIdSearchTerm("");
    setFilterStatus("all");
    setFilterType("all");
    setFilteredTickets(tickets);
  };

  // Toggle expanded ticket view
  const toggleExpandTicket = (id) => {
    setExpandedTicketId(expandedTicketId === id ? null : id);
  };

  // View ticket details
  const viewTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "completed":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  // Get unique ticket types for filter
  const ticketTypes = ["all", ...new Set(tickets.map((ticket) => ticket.type))];

  // Get unique ticket statuses for filter
  const ticketStatuses = ["all", ...new Set(tickets.map((ticket) => ticket.status))];


  const handleUpdateStatus =  (ticketId) => {
    router.push(`/update-status/${ticketId}`);
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Ticket Management</CardTitle>
              <CardDescription>View and manage all support tickets</CardDescription>
            </div>
            <Button onClick={fetchTickets} className="w-full md:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh Tickets
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search and Filter Section */}
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">General Search</TabsTrigger>
              <TabsTrigger value="id">Search by ID</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by title, fault, type or user..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ticketStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ticketTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={resetFilters} className="w-full md:w-auto">
                  <X className="mr-2 h-4 w-4" /> Clear Filters
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="id" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter ticket ID..."
                    className="pl-8"
                    value={idSearchTerm}
                    onChange={(e) => setIdSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={handleIdSearch} className="w-full md:w-auto">
                  Search ID
                </Button>
                <Button variant="outline" onClick={resetFilters} className="w-full md:w-auto">
                  <X className="mr-2 h-4 w-4" /> Clear
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredTickets.length} of {tickets.length} tickets
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {loading ? (
              // Loading skeletons
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-5 w-1/3" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-8 w-24" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : filteredTickets.length === 0 ? (
              <Card className="overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="text-center p-6">
                    <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No tickets found</h3>
                    <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
                    <Button onClick={resetFilters} variant="outline" className="mt-4">
                      Reset Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <AnimatePresence>
                {filteredTickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">{ticket.title}</h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Tag className="h-3 w-3" /> {ticket.id}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" /> {ticket.fault}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {ticket.type}
                                </Badge>
                                <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => viewTicketDetails(ticket)}>
                                    <Eye className="h-4 w-4 mr-1" /> View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>Ticket Details</DialogTitle>
                                    <DialogDescription>
                                      Complete information about this support ticket
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedTicket && (
                                    <div className="space-y-4 mt-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <h3 className="text-lg font-semibold">{selectedTicket.title}</h3>
                                          <Badge className={getStatusColor(selectedTicket.status)}>
                                            {selectedTicket.status}
                                          </Badge>

                                          <div className="mt-4 space-y-2">
                                            <div className="flex items-start gap-2">
                                              <AlertCircle className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                              <div>
                                                <p className="text-sm font-medium">Fault</p>
                                                <p className="text-sm text-muted-foreground">{selectedTicket.fault}</p>
                                              </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                              <Tag className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                              <div>
                                                <p className="text-sm font-medium">Type</p>
                                                <p className="text-sm text-muted-foreground">{selectedTicket.type}</p>
                                              </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                              <Tag className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                              <div>
                                                <p className="text-sm font-medium">ID</p>
                                                <p className="text-sm text-muted-foreground">{selectedTicket.id}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="space-y-4">
                                          <div>
                                            <h4 className="text-sm font-medium mb-2">User Information</h4>
                                            <div className="space-y-2">
                                              <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm">{selectedTicket.user.name}</p>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm">{selectedTicket.user.email}</p>
                                              </div>
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="text-sm font-medium mb-2">Location</h4>
                                            <div className="space-y-2">
                                              <div className="flex items-center gap-2">
                                                <Building className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm">
                                                  {selectedTicket.city}, {selectedTicket.district}
                                                </p>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm">{selectedTicket.address}</p>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <MapPinned className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm">
                                                  Lat: {selectedTicket.latitude}, Long: {selectedTicket.longitude}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex justify-end gap-2 mt-6">
                                        <Button onClick={()=>{handleUpdateStatus(selectedTicket.id)}} variant="outline">Update Status</Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              <Button variant="ghost" size="sm" onClick={() => toggleExpandTicket(ticket.id)}>
                                {expandedTicketId === ticket.id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{ticket.user.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{ticket.user.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {ticket.city}, {ticket.district}
                              </span>
                            </div>
                          </div>

                          {/* Expanded View */}
                          <AnimatePresence>
                            {expandedTicketId === ticket.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Separator className="my-4" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <h4 className="font-medium mb-2">Address</h4>
                                    <p className="text-muted-foreground">{ticket.address}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Exact Location</h4>
                                    <p className="text-muted-foreground">
                                      Latitude: {ticket.latitude}, Longitude: {ticket.longitude}
                                    </p>
                                  </div>
                                </div>
                               
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// RefreshCw icon component
const RefreshCw = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
};

export default TicketsCard;