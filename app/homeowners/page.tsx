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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Eye, Mail, Phone } from "lucide-react"

// Mock data
const mockHomeowners = [
  {
    id: "1",
    full_name: "Michael Barber",
    email: "michael.barber@email.com",
    phone: "+63 912 345 6789",
    role: "homeowner" as const,
    is_approved: true,
    block_lot: "A-12",
    owner_type: "lessor" as const,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    full_name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+63 917 234 5678",
    role: "homeowner" as const,
    is_approved: true,
    block_lot: "B-05",
    owner_type: "lessee" as const,
    created_at: "2024-02-20",
  },
  {
    id: "3",
    full_name: "Juan Dela Cruz",
    email: "juan.delacruz@email.com",
    phone: "+63 918 345 6789",
    role: "homeowner" as const,
    is_approved: false,
    block_lot: "C-08",
    owner_type: "lessor" as const,
    created_at: "2024-03-10",
  },
]

export default function HomeownersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedHomeowner, setSelectedHomeowner] = useState<any>(null)

  const filteredHomeowners = mockHomeowners.filter(
    (homeowner) =>
      homeowner.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      homeowner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      homeowner.block_lot.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Homeowners</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage homeowner accounts and information</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Homeowner
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Homeowner</DialogTitle>
                <DialogDescription>
                  Create a new homeowner account. They will receive an email invitation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Full name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="email@example.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" placeholder="+63 912 345 6789" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="block-lot" className="text-right">
                    Block/Lot
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select block and lot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a-01">A-01</SelectItem>
                      <SelectItem value="a-02">A-02</SelectItem>
                      <SelectItem value="b-01">B-01</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="owner-type" className="text-right">
                    Owner Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select owner type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lessor">Lessor</SelectItem>
                      <SelectItem value="lessee">Lessee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Create Homeowner
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Homeowners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHomeowners.length}</div>
              <p className="text-xs text-muted-foreground">Active accounts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockHomeowners.filter((h) => h.is_approved).length}
              </div>
              <p className="text-xs text-muted-foreground">Verified homeowners</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {mockHomeowners.filter((h) => !h.is_approved).length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Homeowners Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Homeowners List</CardTitle>
                <CardDescription>Manage all homeowner accounts and their information</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search homeowners..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Block/Lot</TableHead>
                  <TableHead>Owner Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHomeowners.map((homeowner) => (
                  <TableRow key={homeowner.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{homeowner.full_name}</div>
                        <div className="text-sm text-gray-500">{homeowner.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{homeowner.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{homeowner.block_lot}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={homeowner.owner_type === "lessor" ? "default" : "secondary"}>
                        {homeowner.owner_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={homeowner.is_approved ? "default" : "destructive"}
                        className={
                          homeowner.is_approved ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                        }
                      >
                        {homeowner.is_approved ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(homeowner.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
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
      </div>
    </DashboardLayout>
  )
}
