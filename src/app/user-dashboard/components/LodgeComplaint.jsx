"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AlertCircle, ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LodgeComplaint() {
  return (
    <section className="w-full py-12 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6">
        <Card className="border-none shadow-lg bg-background/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-2"
            >
              <AlertCircle className="h-5 w-5 text-destructive" />
              <span className="text-sm font-medium text-muted-foreground">Report an issue</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <CardTitle className="text-2xl md:text-3xl font-bold">Lodge a Complaint</CardTitle>
              <CardDescription className="text-base mt-2">
                We take your concerns seriously. Submit your complaint and our team will address it promptly.
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Average response time: 24 hours</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All complaints are handled with strict confidentiality
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="gap-2 px-6">
                  <Link href="/lodge-complaint">
                    Raise your complaint
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

