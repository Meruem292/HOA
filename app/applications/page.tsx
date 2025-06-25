"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Check, X, Eye, FileText } from "lucide-react"

// Mock data
const mockApplications = [
  {
    id: "1",
    full_name: "Robert Johnson",
    email: "robert.johnson@email.com",
    phone: "+63 919 123 4567",
    requested_lot: "D-15",
    owner_type: "lessor" as const,
    status: "pending" as const,
    created_at: "2024-03-15",
    documents: ["clean_title", "tax_declaration"],
  },
  {
    id: "2",
    full_name: "Lisa Chen",
    email: "lisa.chen@email.com",
    phone: "+63 920 234 5678",
    requested_lot: "E-08",
    owner_type: "lessee" as const,
    status: "pending" as const,
    created_at: "2024-03-18",
    documents: ["valid_id_lessee", "valid_id_lessor", "lease_contract"],
  },
  {
    id: "3",
    full_name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+63 921 345 6789",
    requested_lot: "F-03",
    owner_type: "lessor" as const,
    status: "approved" as const,
    created_at: "2024-03-10",
    reviewed_at: "2024-03-12",
    admin_notes: "All documents verified and approved.",
  },
]

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  const filteredApplications = mockApplications.filter(
    (app) =>
      app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.requested_lot.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleReview = (application: any) => {
    setSelectedApplication(application)
    setIsReviewDialogOpen(true)
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Registration Applications</h1>
            <p className="text-gray-600 dark:text-gray-400">Review and approve homeowner registration requests</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockApplications.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {mockApplications.filter((app) => app.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockApplications.filter((app) => app.status === "approved").length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {mockApplications.filter((app) => app.status === "rejected").length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Registration Applications</CardTitle>
                <CardDescription>Review homeowner registration requests and supporting documents</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Requested Lot</TableHead>
                  <TableHead>Owner Type</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.full_name}</div>
                        <div className="text-sm text-gray-500">{application.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{application.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{application.requested_lot}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={application.owner_type === "lessor" ? "default" : "secondary"}>
                        {application.owner_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{application.documents?.length || 0} files</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          application.status === "approved"
                            ? "default"
                            : application.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                        className={
                          application.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : application.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-orange-100 text-orange-800"
                        }
                      >
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleReview(application)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {application.status === "pending" && (
                          <>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Review Dialog */}
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Review Application</DialogTitle>
              <DialogDescription>
                Review the homeowner registration application and supporting documents.
              </DialogDescription>
            </DialogHeader>
            {selectedApplication && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Full Name</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.full_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Requested Lot</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.requested_lot}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Owner Type</Label>
                  <p className="text-sm text-gray-600 capitalize">{selectedApplication.owner_type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Submitted Documents</Label>
                  <div className="mt-2 space-y-2">
                    {selectedApplication.documents?.map((doc: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{doc.replace("_", " ").toUpperCase()}</span>
                        <Button size="sm" variant="outline" className="ml-auto">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="admin-notes">Admin Notes</Label>
                  <Textarea
                    id="admin-notes"
                    placeholder="Add notes about this application..."
                    defaultValue={selectedApplication.admin_notes}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive">Reject</Button>
              <Button className="bg-green-600 hover:bg-green-700">Approve</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
