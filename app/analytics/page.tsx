"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import {
  CalendarIcon,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  AlertTriangle,
} from "lucide-react"

// Mock data for charts
const monthlyRevenue = [
  { month: "Jan", revenue: 685420, payments: 142 },
  { month: "Feb", revenue: 721350, payments: 156 },
  { month: "Mar", revenue: 698750, payments: 148 },
  { month: "Apr", revenue: 756200, payments: 162 },
  { month: "May", revenue: 689300, payments: 145 },
  { month: "Jun", revenue: 734800, payments: 158 },
]

const paymentStatusData = [
  { status: "Paid", count: 142, percentage: 87.5 },
  { status: "Pending", count: 15, percentage: 9.3 },
  { status: "Overdue", count: 5, percentage: 3.2 },
]

const blockPerformance = [
  { block: "A", total_lots: 15, occupied: 13, collection_rate: 92.3, revenue: 156780 },
  { block: "B", total_lots: 12, occupied: 11, collection_rate: 90.9, revenue: 132450 },
  { block: "C", total_lots: 8, occupied: 7, collection_rate: 85.7, revenue: 89600 },
  { block: "D", total_lots: 10, occupied: 8, collection_rate: 87.5, revenue: 102340 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0)
  const totalPayments = monthlyRevenue.reduce((sum, month) => sum + month.payments, 0)
  const avgMonthlyRevenue = totalRevenue / monthlyRevenue.length

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Revenue insights and payment analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-60 justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Pick a date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱{totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱{avgMonthlyRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-blue-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2% from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPayments}</div>
              <div className="flex items-center text-xs text-purple-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.1% from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              <Users className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.5%</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1% from last period
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Monthly Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <CardDescription>Revenue collection over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRevenue.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 text-sm font-medium">{month.month}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${(month.revenue / Math.max(...monthlyRevenue.map((m) => m.revenue))) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">₱{month.revenue.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{month.payments} payments</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Status Distribution</CardTitle>
              <CardDescription>Current payment status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentStatusData.map((status) => (
                  <div key={status.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          status.status === "Paid"
                            ? "default"
                            : status.status === "Overdue"
                              ? "destructive"
                              : "secondary"
                        }
                        className={
                          status.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : status.status === "Overdue"
                              ? "bg-red-100 text-red-800"
                              : "bg-orange-100 text-orange-800"
                        }
                      >
                        {status.status}
                      </Badge>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                        <div
                          className={`h-2 rounded-full ${
                            status.status === "Paid"
                              ? "bg-green-600"
                              : status.status === "Overdue"
                                ? "bg-red-600"
                                : "bg-orange-600"
                          }`}
                          style={{ width: `${status.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{status.count}</div>
                      <div className="text-xs text-gray-500">{status.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Block Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Block Performance Analysis</CardTitle>
            <CardDescription>Revenue and collection performance by block</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {blockPerformance.map((block) => (
                <Card key={block.block} className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Block {block.block}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Occupancy:</span>
                      <span className="font-medium">
                        {block.occupied}/{block.total_lots}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Collection Rate:</span>
                      <span
                        className={`font-medium ${block.collection_rate >= 90 ? "text-green-600" : "text-orange-600"}`}
                      >
                        {block.collection_rate}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Revenue:</span>
                      <span className="font-medium">₱{block.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${block.collection_rate}%` }} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Important trends and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200">Revenue Growth</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Monthly revenue has increased by 12.5% compared to the previous period, indicating strong community
                    growth.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-800 dark:text-orange-200">Collection Rate Decline</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Collection rate has decreased by 2.1%. Consider implementing reminder systems for overdue payments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Block C Performance</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Block C has the lowest collection rate at 85.7%. Focus on improving payment processes for this area.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
