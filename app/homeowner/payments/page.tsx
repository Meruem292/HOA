"use client"

import { useState } from "react"
import { HomeownerLayout } from "@/components/layout/homeowner-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, CreditCard, Download, Eye, Filter, Calendar, CheckCircle } from "lucide-react"

// Mock data
const mockPayments = [
  {
    id: "INV-2025-001",
    amount: 4500,
    due_date: "2025-01-15",
    status: "paid" as const,
    payment_date: "2025-01-10",
    payment_method: "Credit Card",
    reference: "REF-001-2025",
  },
  {
    id: "INV-2025-002",
    amount: 4500,
    due_date: "2025-02-15",
    status: "paid" as const,
    payment_date: "2025-02-12",
    payment_method: "Bank Transfer",
    reference: "REF-002-2025",
  },
  {
    id: "INV-2025-003",
    amount: 4500,
    due_date: "2025-03-15",
    status: "pending" as const,
    payment_date: null,
    payment_method: null,
    reference: null,
  },
  {
    id: "INV-2025-004",
    amount: 4500,
    due_date: "2025-04-15",
    status: "upcoming" as const,
    payment_date: null,
    payment_method: null,
    reference: null,
  },
]

export default function HomeownerPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [referenceNumber, setReferenceNumber] = useState("")
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.reference && payment.reference.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handlePayNow = (payment: any) => {
    setSelectedPayment(payment)
    setIsPaymentDialogOpen(true)
  }

  const handleSubmitPayment = () => {
    // In a real app, this would submit to the backend
    setIsPaymentSuccess(true)
    setTimeout(() => {
      setIsPaymentSuccess(false)
      setIsPaymentDialogOpen(false)
      setPaymentMethod(null)
      setReferenceNumber("")
    }, 2000)
  }

  return (
    <HomeownerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Payments</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage and track your monthly dues</p>
          </div>
        </div>

        {/* Payment Summary Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium text-blue-100">Current Due</h3>
                <p className="mt-1 text-2xl font-bold">₱4,500.00</p>
                <p className="text-sm text-blue-100">Due on March 15, 2025</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-100">Payment Status</h3>
                <Badge className="mt-1 bg-yellow-100 text-yellow-800">Pending</Badge>
                <p className="text-sm text-blue-100 mt-1">5 days remaining</p>
              </div>
              <div className="flex items-end">
                <Button
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  onClick={() => handlePayNow(mockPayments.find((p) => p.status === "pending"))}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View and manage your payment records</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Payments</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{payment.due_date}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>{payment.payment_date || "-"}</TableCell>
                        <TableCell>{payment.payment_method || "-"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {payment.status === "paid" && (
                              <>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {payment.status === "pending" && (
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => handlePayNow(payment)}
                              >
                                Pay Now
                              </Button>
                            )}
                            {payment.status === "upcoming" && (
                              <Badge variant="outline" className="text-gray-500">
                                Not Yet Due
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="paid">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayments
                      .filter((p) => p.status === "paid")
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{payment.due_date}</TableCell>
                          <TableCell>{payment.payment_date}</TableCell>
                          <TableCell>{payment.payment_method}</TableCell>
                          <TableCell>{payment.reference}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="pending">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Days Remaining</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayments
                      .filter((p) => p.status === "pending")
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{payment.due_date}</TableCell>
                          <TableCell>5 days</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => handlePayNow(payment)}
                            >
                              Pay Now
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="upcoming">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayments
                      .filter((p) => p.status === "upcoming")
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{payment.due_date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-gray-500">
                              Not Yet Due
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Methods Card */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Available payment options for your convenience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium">Credit/Debit Card</h3>
                </div>
                <p className="text-sm text-gray-600">Pay securely using your credit or debit card.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium">Bank Transfer</h3>
                </div>
                <p className="text-sm text-gray-600">Transfer directly to our bank account.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Download className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium">Mobile Payment</h3>
                </div>
                <p className="text-sm text-gray-600">Pay using GCash, Maya, or other mobile wallets.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            {isPaymentSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Payment Successful!</h2>
                <p className="text-gray-600 text-center mb-6">
                  Your payment has been processed successfully. A receipt has been sent to your email.
                </p>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setIsPaymentSuccess(false)
                    setIsPaymentDialogOpen(false)
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Make a Payment</DialogTitle>
                  <DialogDescription>Complete your payment for {selectedPayment?.id}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Invoice ID</Label>
                    <div className="font-medium">{selectedPayment?.id}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Amount</Label>
                    <div className="font-medium">₱{selectedPayment?.amount.toLocaleString()}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Due Date</Label>
                    <div className="font-medium">{selectedPayment?.due_date}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select value={paymentMethod || ""} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit/Debit Card</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="gcash">GCash</SelectItem>
                        <SelectItem value="maya">Maya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reference">Reference Number (Optional)</Label>
                    <Input
                      id="reference"
                      placeholder="Enter reference number"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleSubmitPayment}
                    disabled={!paymentMethod}
                  >
                    Submit Payment
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </HomeownerLayout>
  )
}
