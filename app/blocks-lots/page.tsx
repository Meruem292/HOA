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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Building2, Home } from "lucide-react"

// Mock data
const mockBlocks = [
  {
    id: "1",
    block_number: "A",
    description: "Main residential area near the entrance",
    lot_count: 15,
    occupied_lots: 12,
    created_at: "2024-01-01",
  },
  {
    id: "2",
    block_number: "B",
    description: "Secondary residential area with garden view",
    lot_count: 12,
    occupied_lots: 10,
    created_at: "2024-01-01",
  },
  {
    id: "3",
    block_number: "C",
    description: "Premium lots with larger area",
    lot_count: 8,
    occupied_lots: 6,
    created_at: "2024-01-01",
  },
]

const mockLots = [
  {
    id: "1",
    block_number: "A",
    lot_number: "01",
    area: 120.5,
    owner_name: "Michael Barber",
    owner_type: "lessor" as const,
    status: "occupied" as const,
  },
  {
    id: "2",
    block_number: "A",
    lot_number: "02",
    area: 115.0,
    owner_name: null,
    owner_type: null,
    status: "vacant" as const,
  },
  {
    id: "3",
    block_number: "B",
    lot_number: "01",
    area: 110.0,
    owner_name: "Maria Santos",
    owner_type: "lessee" as const,
    status: "occupied" as const,
  },
  {
    id: "4",
    block_number: "C",
    lot_number: "01",
    area: 150.0,
    owner_name: "Juan Dela Cruz",
    owner_type: "lessor" as const,
    status: "occupied" as const,
  },
]

export default function BlocksLotsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddBlockDialogOpen, setIsAddBlockDialogOpen] = useState(false)
  const [isAddLotDialogOpen, setIsAddLotDialogOpen] = useState(false)

  const filteredBlocks = mockBlocks.filter(
    (block) =>
      block.block_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredLots = mockLots.filter(
    (lot) =>
      lot.block_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.lot_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lot.owner_name && lot.owner_name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalLots = mockLots.length
  const occupiedLots = mockLots.filter((lot) => lot.status === "occupied").length
  const vacantLots = totalLots - occupiedLots

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blocks & Lots</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage property blocks and individual lots</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddBlockDialogOpen} onOpenChange={setIsAddBlockDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Building2 className="h-4 w-4 mr-2" />
                  Add Block
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Block</DialogTitle>
                  <DialogDescription>Create a new residential block in the community.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="block-number" className="text-right">
                      Block Number
                    </Label>
                    <Input id="block-number" placeholder="e.g., D" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" placeholder="Block description..." className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Create Block
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddLotDialogOpen} onOpenChange={setIsAddLotDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lot
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Lot</DialogTitle>
                  <DialogDescription>Create a new lot within a block.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="block" className="text-right">
                      Block
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select block" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockBlocks.map((block) => (
                          <SelectItem key={block.id} value={block.block_number}>
                            Block {block.block_number}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lot-number" className="text-right">
                      Lot Number
                    </Label>
                    <Input id="lot-number" placeholder="e.g., 01" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="area" className="text-right">
                      Area (sqm)
                    </Label>
                    <Input id="area" type="number" placeholder="120.5" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Create Lot
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blocks</CardTitle>
              <Building2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBlocks.length}</div>
              <p className="text-xs text-muted-foreground">Residential areas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lots</CardTitle>
              <Home className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLots}</div>
              <p className="text-xs text-muted-foreground">Available properties</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{occupiedLots}</div>
              <p className="text-xs text-muted-foreground">
                {((occupiedLots / totalLots) * 100).toFixed(1)}% occupancy
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{vacantLots}</div>
              <p className="text-xs text-muted-foreground">Available for sale</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Blocks and Lots */}
        <Tabs defaultValue="lots" className="space-y-4">
          <TabsList>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="lots">Lots</TabsTrigger>
          </TabsList>

          <TabsContent value="blocks" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blocks Management</CardTitle>
                    <CardDescription>Manage residential blocks in the community</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search blocks..."
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
                      <TableHead>Block Number</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Total Lots</TableHead>
                      <TableHead>Occupied</TableHead>
                      <TableHead>Occupancy Rate</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBlocks.map((block) => (
                      <TableRow key={block.id}>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            Block {block.block_number}
                          </Badge>
                        </TableCell>
                        <TableCell>{block.description}</TableCell>
                        <TableCell>{block.lot_count}</TableCell>
                        <TableCell>{block.occupied_lots}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{
                                  width: `${(block.occupied_lots / block.lot_count) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm">
                              {((block.occupied_lots / block.lot_count) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(block.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
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
          </TabsContent>

          <TabsContent value="lots" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Lots Management</CardTitle>
                    <CardDescription>Manage individual lots and their ownership</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search lots..."
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
                      <TableHead>Block/Lot</TableHead>
                      <TableHead>Area (sqm)</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Owner Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLots.map((lot) => (
                      <TableRow key={lot.id}>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {lot.block_number}-{lot.lot_number}
                          </Badge>
                        </TableCell>
                        <TableCell>{lot.area} sqm</TableCell>
                        <TableCell>{lot.owner_name || "-"}</TableCell>
                        <TableCell>
                          {lot.owner_type ? (
                            <Badge variant={lot.owner_type === "lessor" ? "default" : "secondary"}>
                              {lot.owner_type}
                            </Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={lot.status === "occupied" ? "default" : "secondary"}
                            className={
                              lot.status === "occupied" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {lot.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
