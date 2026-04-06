/**
 * HỆ THỐNG QUẢN LÝ ĐƠN HÀNG - CES GLOBAL
 * Database: https://docs.google.com/spreadsheets/d/1RqZbw3Zagrlzk6j7s2Uj3bEJOAadE01xAi__KN9H9o8/
 */

const SS_ID = '1RqZbw3Zagrlzk6j7s2Uj3bEJOAadE01xAi__KN9H9o8';

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Hệ Thống Quản Lý Đơn Hàng - CES')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/** 
 * LẤY DỮ LIỆU TỔNG QUÁT 
 */
function getDataFromSheet(sheetName) {
  try {
    const ss = SpreadsheetApp.openById(SS_ID);
    const sheet = ss.getSheetByName(sheetName);
    const data = sheet.getDataRange().getValues();
    const headers = data.shift();
    
    return data.map(row => {
      let obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });
  } catch(e) {
    console.error("Lỗi lấy dữ liệu " + sheetName + ": " + e.message);
    return [];
  }
}

/** 
 * LƯU/CẬP NHẬT (CRUD)
 */
function saveEntry(sheetName, entry, idField) {
  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  let rowIndex = -1;
  if (entry[idField]) {
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == entry[idField]) {
        rowIndex = i + 1;
        break;
      }
    }
  }

  const row = headers.map(h => entry[h] || '');
  
  if (rowIndex > -1) {
    sheet.getRange(rowIndex, 1, 1, headers.length).setValues([row]);
    return "Cập nhật thành công!";
  } else {
    if (!entry[idField]) row[0] = sheetName.substring(0, 1) + Date.now();
    sheet.appendRow(row);
    return "Thêm mới thành công!";
  }
}

function deleteEntry(sheetName, idValue) {
  const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == idValue) {
      sheet.deleteRow(i + 1);
      return "Đã xóa!";
    }
  }
}

/** 
 * TẠO ĐƠN HÀNG & GỬI EMAIL
 */
function createNewOrder(order) {
  const ss = SpreadsheetApp.openById(SS_ID);
  const orderSheet = ss.getSheetByName('Orders');
  
  // Lấy giá sản phẩm để tính tổng tiền
  const products = getDataFromSheet('Products');
  const product = products.find(p => p.Product_ID == order.Product_ID);
  const totalAmount = product ? product.Price * order.Quantity : 0;
  
  const orderId = 'ORD' + Date.now();
  const createdAt = new Date();
  
  const row = [
    orderId, 
    order.Customer_ID, 
    order.Product_ID, 
    order.Quantity, 
    totalAmount, 
    'Pending', 
    createdAt
  ];
  
  orderSheet.appendRow(row);
  
  // Gửi thông báo Email cho các phòng ban
  try {
    sendOrderNotification(orderId, order, product, totalAmount, createdAt);
  } catch(e) {
    console.error("Lỗi gửi email: " + e.message);
  }
  
  return { success: true, orderId: orderId, total: totalAmount };
}

function sendOrderNotification(orderId, order, product, total, date) {
  const ss = SpreadsheetApp.openById(SS_ID);
  const deptSheet = ss.getSheetByName('Departments');
  const deptData = deptSheet.getDataRange().getValues();
  deptData.shift(); 
  
  // Gom email từ sheet Departments
  let emails = [];
  deptData.forEach(row => { if (row[2]) emails.push(row[2]); });
  if (emails.length === 0) return;
  
  const customers = getDataFromSheet('Customers');
  const customer = customers.find(c => c.Customer_ID == order.Customer_ID);
  
  const subject = `🔔 ĐƠN HÀNG MỚI ĐÃ ĐƯỢC TẠO: ${orderId}`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px; max-width: 600px;">
      <h2 style="color: #4361ee;">CES GLOBAL - THÔNG BÁO ĐƠN HÀNG</h2>
      <p>Hệ thống vừa ghi nhận một đơn hàng mới cần xử lý:</p>
      <table style="width: 100%;">
        <tr><td><strong>Mã đơn hàng:</strong></td><td>${orderId}</td></tr>
        <tr><td><strong>Khách hàng:</strong></td><td>${customer ? customer.Customer_Name : 'Chưa định danh'}</td></tr>
        <tr><td><strong>Số điện thoại:</strong></td><td>${customer ? customer.Phone : 'N/A'}</td></tr>
        <tr><td><strong>Sản phẩm:</strong></td><td>${product ? product.Product_Name : 'N/A'}</td></tr>
        <tr><td><strong>Số lượng:</strong></td><td>${order.Quantity}</td></tr>
        <tr><td><strong>Tổng cộng:</strong></td><td style="color: #ef233c; font-weight: bold;">${total.toLocaleString('vi-VN')} VNĐ</td></tr>
        <tr><td><strong>Ngày tạo:</strong></td><td>${Utilities.formatDate(date, "GMT+7", "dd/MM/yyyy HH:mm")}</td></tr>
      </table>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #888;">Đây là email tự động từ hệ thống quản trị đơn hàng CES.</p>
    </div>
  `;
  
  MailApp.sendEmail({
    to: emails.join(','),
    subject: subject,
    htmlBody: htmlBody
  });
}
