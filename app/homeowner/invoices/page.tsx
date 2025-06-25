"use client"

import { useState } from "react"
import { HomeownerLayout } from "@/components/layout/homeowner-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, Filter, FileText } from "lucide-react"
import { generateInvoicePDF } from "@/lib/invoice-generator"

// Mock data
const mockInvoices = [
  {
    id: "INV-2025-001",
    amount: 4500,
    issue_date: "2025-01-01",
    due_date: "2025-01-15",
    status: "paid" as const,
    payment_date: "2025-01-10",
  },
  {
    id: "INV-2025-002",
    amount: 4500,
    issue_date: "2025-02-01",
    due_date: "2025-02-15",
    status: "paid" as const,
    payment_date: "2025-02-12",
  },
  {
    id: "INV-2025-003",
    amount: 4500,
    issue_date: "2025-03-01",
    due_date: "2025-03-15",
    status: "pending" as const,
    payment_date: null,
  },
  {
    id: "INV-2025-004",
    amount: 4500,
    issue_date: "2025-04-01",
    due_date: "2025-04-15",
    status: "upcoming" as const,
    payment_date: null,
  },
]

export default function HomeownerInvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDownloadInvoice = (invoice: any) => {
    const invoiceData = {
      id: invoice.id,
      homeowner: {
        name: "John Homeowner",
        address: "123 Community Street, Subdivision Village",
        blockLot: "Block A, Lot 12",
        email: "john@example.com",
        phone: "+63 912 345 6789",
      },
      amount: invoice.amount,
      dueDate: invoice.due_date,
      issueDate: invoice.issue_date,
      description: "Monthly Homeowners Association Dues",
      paymentTerms: "Payment is due within 15 days of invoice date. Late payments may incur additional fees.",
    }

    generateInvoicePDF(invoiceData)
  }

  return (
    <HomeownerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Invoices</h1>
            <p className="text-gray-600 dark:text-gray-400">View and download your invoices</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Invoices</p>
                  <p className="text-2xl font-bold">{mockInvoices.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Paid Invoices</p>
                  <p className="text-2xl font-bold">{mockInvoices.filter((i) => i.status === "paid").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
                  <p className="text-2xl font-bold">{mockInvoices.filter((i) => i.status === "pending").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>View and download your invoices</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search invoices..."
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>₱{invoice.amount.toLocaleString()}</TableCell>
                    <TableCell>{invoice.issue_date}</TableCell>
                    <TableCell>{invoice.due_date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === "paid" ? "default" : invoice.status === "pending" ? "secondary" : "outline"
                        }
                        className={
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {invoice.status === "paid" ? "Paid" : invoice.status === "pending" ? "Pending" : "Upcoming"}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.payment_date || "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownloadInvoice(invoice)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </HomeownerLayout>
  )
}
