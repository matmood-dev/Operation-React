import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import logo from '../../assets/logo.png'; // Import the logo

export const exportTasksToPDF = (groupedTasks) => {
  const doc = new jsPDF();
  const currentDate = new Date();
  const currentDateStr = format(currentDate, 'yyyy-MM-dd');
  const dayOfWeek = format(currentDate, 'EEEE');

  Object.keys(groupedTasks).forEach((date, index) => {
    if (index !== 0) {
      doc.addPage();
    }

    const tasks = groupedTasks[date];
    if (!tasks) {
      return; // Skip if tasks are undefined
    }

    const logoWidth = 50; // Set desired width
    const logoHeight = 25; // Set desired height

    // Add the logo in the center
    doc.addImage(logo, 'PNG', (doc.internal.pageSize.getWidth() - logoWidth) / 2, 10, logoWidth, logoHeight); // Adjust the coordinates and size as needed

    // Add the title in the center
    doc.setFontSize(18);
    doc.text('Installation Report', doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });

    const tableColumn = ["Installer Name", "Invoice No.", "Amount", "Customer Name", "Mobile Number", "Area", "Driver", "Fixing Time", "Status", "Type", "Status Detail"];
    const tableRows = [];

    tasks.forEach(task => {
      const taskData = [
        task.installerName,
        task.invoiceNo,
        task.amount,
        task.customerName,
        task.mobileNumber,
        task.area,
        task.driver,
        task.fixingTime,
        task.status,
        task.type,
        task.statusDetail
      ];
      tableRows.push(taskData);
    });

    const dateStr = `${format(new Date(date), 'yyyy-MM-dd')} (${format(new Date(date), 'EEEE')})`;
    doc.text(dateStr, 14, 60);
    doc.autoTable(tableColumn, tableRows, { startY: 65 });

    // Add the footer at the bottom of each page
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text(`This page was generated automatically by Operation System on ${currentDateStr} (${dayOfWeek}) - The Closets International.`, 14, pageHeight - 10);
  });

  doc.save(`tasks_report_${currentDateStr}.pdf`);
};
