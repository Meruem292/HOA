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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Search, Plus, Edit, Trash2, Eye, FileText } from "lucide-react"

// Mock data
const mockPolicies = [
  {
    id: "1",
    title: "Community Guidelines and Rules",
    content:
      "All residents must follow the established community guidelines including noise restrictions, parking regulations, and common area usage rules. Violations may result in penalties as outlined in the homeowner agreement.",
    created_by: "Admin User",
    is_active: true,
    created_at: "2024-01-15",
    updated_at: "2024-02-20",
  },
  {
    id: "2",
    title: "Pet Policy",
    content:
      "Pets are allowed in the community with the following restrictions: maximum of 2 pets per household, all pets must be registered with the HOA, pets must be leashed in common areas, and owners are responsible for cleaning up after their pets.",
    created_by: "Admin User",
    is_active: true,
    created_at: "2024-01-20",
    updated_at: "2024-01-20",
  },
  {
    id: "3",
    title: "Parking Regulations",
    content:
      "Each household is allocated 2 parking spaces. Guest parking is available on a first-come, first-served basis. Vehicles must be properly registered and display valid parking permits. Unauthorized vehicles will be towed at owner's expense.",
    created_by: "Admin User",
    is_active: true,
    created_at: "2024-02-01",
    updated_at: "2024-02-01",
  },
  {
    id: "4",
    title: "Swimming Pool Hours (Outdated)",
    content:
      "Pool hours are from 6 AM to 10 PM daily. Children under 12 must be accompanied by an adult. No glass containers allowed in pool area.",
    created_by: "Admin User",
    is_active: false,
    created_at: "2024-01-01",
    updated_at: "2024-03-01",
  },
]

export default function PoliciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredPolicies = mockPolicies.filter(
    (policy) =>
      policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activePolicies = mockPolicies.filter((p) => p.is_active).length
  const totalPolicies = mockPolicies.length

  const handleViewPolicy = (policy: any) => {
    setSelectedPolicy(policy)
    setIsViewDialogOpen(true)
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Policies</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage community policies and guidelines</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Policy</DialogTitle>
                <DialogDescription>Create a new community policy or guideline.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Policy Title</Label>
                  <Input id="title" placeholder="Enter policy title..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Policy Content</Label>
                  <Textarea id="content" placeholder="Enter detailed policy content..." className="min-h-[200px]" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="active" defaultChecked />
                  <Label htmlFor="active">Active Policy</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Create Policy
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Policies</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPolicies}</div>
              <p className="text-xs text-muted-foreground">All policies</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activePolicies}</div>
              <p className="text-xs text-muted-foreground">Currently enforced</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{totalPolicies - activePolicies}</div>
              <p className="text-xs text-muted-foreground">Archived or outdated</p>
            </CardContent>
          </Card>
        </div>

        {/* Policies Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Community Policies</CardTitle>
                <CardDescription>Manage all community policies and guidelines</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search policies..."
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
                  <TableHead>Policy Title</TableHead>
                  <TableHead>Content Preview</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolicies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>
                      <div className="font-medium">{policy.title}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600 max-w-xs truncate">{policy.content}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={policy.is_active ? "default" : "secondary"}
                        className={policy.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                      >
                        {policy.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{policy.created_by}</TableCell>
                    <TableCell>{new Date(policy.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewPolicy(policy)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Policy Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedPolicy?.title}</DialogTitle>
              <DialogDescription>Policy details and content</DialogDescription>
            </DialogHeader>
            {selectedPolicy && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="font-medium">Status</Label>
                    <p className="text-gray-600">
                      <Badge
                        variant={selectedPolicy.is_active ? "default" : "secondary"}
                        className={
                          selectedPolicy.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {selectedPolicy.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <Label className="font-medium">Created By</Label>
                    <p className="text-gray-600">{selectedPolicy.created_by}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Created Date</Label>
                    <p className="text-gray-600">{new Date(selectedPolicy.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Last Updated</Label>
                    <p className="text-gray-600">{new Date(selectedPolicy.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-medium">Policy Content</Label>
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm leading-relaxed">{selectedPolicy.content}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">Edit Policy</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
