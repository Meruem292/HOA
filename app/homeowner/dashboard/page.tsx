"use client"

import { HomeownerLayout } from "@/components/layout/homeowner-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, AlertTriangle, FileText, Bell, Calendar, ArrowRight, Download, Eye } from "lucide-react"

// Mock data
const mockPayments = [
  {
    id: "INV-2025-001",
    amount: 4500,
    due_date: "2025-02-15",
    status: "paid" as const,
    payment_date: "2025-02-10",
  },
  {
    id: "INV-2025-002",
    amount: 4500,
    due_date: "2025-03-15",
    status: "pending" as const,
    payment_date: null,
  },
  {
    id: "INV-2025-003",
    amount: 4500,
    due_date: "2025-04-15",
    status: "upcoming" as const,
    payment_date: null,
  },
]

const mockNotifications = [
  {
    id: "1",
    title: "Payment Reminder",
    message: "Your monthly dues payment is due in 5 days.",
    date: "2025-03-10",
    read: false,
  },
  {
    id: "2",
    title: "Community Meeting",
    message: "There will be a community meeting on March 20, 2025 at 6:00 PM.",
    date: "2025-03-05",
    read: true,
  },
  {
    id: "3",
    title: "New Policy Added",
    message: "A new policy regarding pet ownership has been added.",
    date: "2025-02-28",
    read: true,
  },
]

const mockPolicies = [
  {
    id: "1",
    title: "Community Guidelines",
    updated_at: "2025-01-15",
  },
  {
    id: "2",
    title: "Pet Policy",
    updated_at: "2025-02-01",
  },
]

export default function HomeownerDashboardPage() {
  return (
    <HomeownerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Homeowner Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, John Homeowner</p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Property Info Card */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Your Property</CardTitle>
                <CardDescription className="text-blue-100">Block A, Lot 12</CardDescription>
              </div>
              <Badge className="bg-white/20 text-white hover:bg-white/30">Lessor</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Property Area</h3>
                <p className="mt-1 text-lg font-semibold">120.5 sqm</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Monthly Dues</h3>
                <p className="mt-1 text-lg font-semibold">₱4,500.00</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
                <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-200">Good Standing</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Your recent and upcoming payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Current Payment Status */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">March 2025 Payment</h3>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    Due in 5 days
                  </Badge>
                </div>
                <Progress value={0} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Amount Due: ₱4,500.00</span>
                  <span className="text-gray-500">Due Date: March 15, 2025</span>
                </div>
                <Button className="mt-2 bg-blue-600 hover:bg-blue-700">Pay Now</Button>
              </div>

              {/* Payment History */}
              <div>
                <h3 className="text-sm font-medium mb-3">Recent Payments</h3>
                <div className="space-y-3">
                  {mockPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            payment.status === "paid"
                              ? "bg-green-100"
                              : payment.status === "pending"
                                ? "bg-yellow-100"
                                : "bg-gray-100"
                          }`}
                        >
                          <CreditCard
                            className={`h-4 w-4 ${
                              payment.status === "paid"
                                ? "text-green-600"
                                : payment.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{payment.id}</p>
                          <p className="text-sm text-gray-500">
                            {payment.status === "paid"
                              ? `Paid on ${payment.payment_date}`
                              : payment.status === "pending"
                                ? `Due on ${payment.due_date}`
                                : `Upcoming: ${payment.due_date}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">₱{payment.amount.toLocaleString()}</span>
                        <Badge
                          variant={
                            payment.status === "paid"
                              ? "default"
                              : payment.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            payment.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {payment.status === "paid" ? "Paid" : payment.status === "pending" ? "Pending" : "Upcoming"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-3 w-full">
                  View All Payments
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Notifications and Policies */}
        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="policies">
              <FileText className="h-4 w-4 mr-2" />
              Policies
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar className="h-4 w-4 mr-2" />
              Community Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Stay updated with community announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? "bg-white" : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {new Date(notification.date).toLocaleDateString()}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Notifications
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Community Policies</CardTitle>
                <CardDescription>Important guidelines for all homeowners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPolicies.map((policy) => (
                    <div key={policy.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{policy.title}</p>
                          <p className="text-sm text-gray-500">
                            Last updated: {new Date(policy.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Policies
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Community Calendar</CardTitle>
                <CardDescription>Upcoming events and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 text-white p-2 rounded-lg text-center min-w-[60px]">
                        <div className="text-xs">MAR</div>
                        <div className="text-xl font-bold">20</div>
                      </div>
                      <div>
                        <h3 className="font-medium">Community General Meeting</h3>
                        <p className="text-sm text-gray-600">6:00 PM - Community Hall</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Annual meeting to discuss community improvements and budget allocation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-200 text-gray-800 p-2 rounded-lg text-center min-w-[60px]">
                        <div className="text-xs">APR</div>
                        <div className="text-xl font-bold">15</div>
                      </div>
                      <div>
                        <h3 className="font-medium">Community Clean-up Day</h3>
                        <p className="text-sm text-gray-600">8:00 AM - Main Park</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Join us for our quarterly community clean-up and beautification project.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Full Calendar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Support Card */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-white">Need Help?</CardTitle>
            <CardDescription className="text-blue-100">Our support team is ready to assist you</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Report an Issue</h3>
                  <p className="text-sm text-gray-600">Submit maintenance requests or report community issues</p>
                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    Submit Request
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Emergency Contact</h3>
                  <p className="text-sm text-gray-600">Call our 24/7 emergency hotline</p>
                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    +63 912 345 6789
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeownerLayout>
  )
}
