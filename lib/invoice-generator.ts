import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface InvoiceData {
  id: string
  homeowner: {
    name: string
    address: string
    blockLot: string
    email: string
    phone: string
  }
  amount: number
  dueDate: string
  issueDate: string
  description: string
  paymentTerms: string
}

export function generateInvoicePDF(invoiceData: InvoiceData): void {
  const doc = new jsPDF()

  // Header
  doc.setFontSize(20)
  doc.setTextColor(40, 116, 166)
  doc.text("HOMEOWNERS ASSOCIATION", 20, 30)

  doc.setFontSize(12)
  doc.setTextColor(100)
  doc.text("Monthly Dues Invoice", 20, 40)

  // Invoice details
  doc.setFontSize(10)
  doc.setTextColor(0)
  doc.text(`Invoice #: ${invoiceData.id}`, 140, 30)
  doc.text(`Issue Date: ${invoiceData.issueDate}`, 140, 40)
  doc.text(`Due Date: ${invoiceData.dueDate}`, 140, 50)

  // Homeowner details
  doc.setFontSize(12)
  doc.setTextColor(40, 116, 166)
  doc.text("Bill To:", 20, 70)

  doc.setFontSize(10)
  doc.setTextColor(0)
  doc.text(invoiceData.homeowner.name, 20, 80)
  doc.text(invoiceData.homeowner.address, 20, 90)
  doc.text(`Block/Lot: ${invoiceData.homeowner.blockLot}`, 20, 100)
  doc.text(invoiceData.homeowner.email, 20, 110)
  doc.text(invoiceData.homeowner.phone, 20, 120)

  // Invoice table
  const tableData = [
    ["Description", "Amount"],
    [invoiceData.description, `₱${invoiceData.amount.toLocaleString()}`],
    ["", ""],
    ["Total Amount Due", `₱${invoiceData.amount.toLocaleString()}`],
  ]

  autoTable(doc, {
    startY: 140,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: "grid",
    headStyles: { fillColor: [40, 116, 166] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 120 },
      1: { cellWidth: 60, halign: "right" },
    },
  })

  // Payment terms
  const finalY = (doc as any).lastAutoTable.finalY + 20
  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text("Payment Terms:", 20, finalY)
  doc.text(invoiceData.paymentTerms, 20, finalY + 10)

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150)
  doc.text("Thank you for your prompt payment!", 20, 280)
  doc.text("For questions, contact us at admin@hoa.com or +63 912 345 6789", 20, 290)

  // Save the PDF
  doc.save(`Invoice-${invoiceData.id}.pdf`)
}

export function generateReceiptPDF(paymentData: any): void {
  const doc = new jsPDF()

  // Header
  doc.setFontSize(20)
  doc.setTextColor(40, 116, 166)
  doc.text("PAYMENT RECEIPT", 20, 30)

  doc.setFontSize(12)
  doc.setTextColor(100)
  doc.text("Homeowners Association", 20, 40)

  // Receipt details
  doc.setFontSize(10)
  doc.setTextColor(0)
  doc.text(`Receipt #: ${paymentData.id}`, 140, 30)
  doc.text(`Payment Date: ${paymentData.paymentDate}`, 140, 40)
  doc.text(`Payment Method: ${paymentData.paymentMethod}`, 140, 50)

  // Payment details table
  const tableData = [
    ["Description", "Amount"],
    ["Monthly Dues Payment", `₱${paymentData.amount.toLocaleString()}`],
    ["Processing Fee", "₱0.00"],
    ["Total Paid", `₱${paymentData.amount.toLocaleString()}`],
  ]

  autoTable(doc, {
    startY: 80,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: "grid",
    headStyles: { fillColor: [34, 197, 94] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 120 },
      1: { cellWidth: 60, halign: "right" },
    },
  })

  // Status
  const finalY = (doc as any).lastAutoTable.finalY + 20
  doc.setFontSize(12)
  doc.setTextColor(34, 197, 94)
  doc.text("PAYMENT CONFIRMED", 20, finalY)

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150)
  doc.text("This is an official receipt for your payment.", 20, 280)
  doc.text("Keep this receipt for your records.", 20, 290)

  // Save the PDF
  doc.save(`Receipt-${paymentData.id}.pdf`)
}
