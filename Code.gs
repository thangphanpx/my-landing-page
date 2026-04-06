/**
 * HỆ THỐNG QUẢN TRỊ LEADS & ĐƠN HÀNG (CES GLOBAL) - PHIÊN BẢN CHUẨN HÓA THEO TAB
 * Database: 1RqZbw3Zagrlzk6j7s2Uj3bEJOAadE01xAi__KN9H9o8
 */

const SHEET_ID = '1_mxyrfzhLjhOiiMXXhP676alhQXJWGPyFH1G5Z7T9gM';

function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Hệ Thống Quản Lý CES Global')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/** 
 * API NHẬN DỮ LIỆU ĐA KÊNH
 */
function doPost(e) {
  if (!e || !e.postData) return createJsonResponse('error', 'Missing request data');
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type || 'lead';
    
    if (type === 'order') {
      const orderResult = createNewOrder({
        Customer_ID: data.customerId || 'GUEST',
        Product_ID: data.productId,
        Quantity: Number(data.quantity) || 1,
        Name: data.name,
        Phone: data.phone
      });
      return createJsonResponse('success', 'Order created', orderResult);
    } else {
      // LƯU LEAD VÀO TAB CUSTOMERS (Vì chưa có tab Leads)
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName('Customers');
      
      // Cấu trúc map theo Customers: [Customer_ID, Customer_Name, Phone, Member_Level]
      const newCustomerId = 'LEAD' + Date.now();
      const newRow = [newCustomerId, data.name || 'Khách vãng lai', data.phone || '', 'New'];
      sheet.appendRow(newRow);
      
      return createJsonResponse('success', 'Lead stored in Customers tab');
    }
  } catch (error) {
    return createJsonResponse('error', error.toString());
  }
}

/** 
 * LOGIC TẠO ĐƠN HÀNG
 */
function createNewOrder(order) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const orderSheet = ss.getSheetByName('Orders');
  
  const products = getDataFromSheet('Products');
  const product = products.find(p => p.Product_ID == order.Product_ID);
  const totalAmount = product ? Number(product.Price) * order.Quantity : 0;
  
  const orderId = 'ORD' + Date.now();
  const createdAt = new Date();
  
  // Map theo tab Orders: [Order_ID, Customer_ID, Product_ID, Quantity, Total_Amount, Status, Created_At]
  orderSheet.appendRow([
    orderId, 
    order.Customer_ID, 
    product ? product.Product_ID : order.Product_ID, 
    order.Quantity, 
    totalAmount, 
    'Pending', 
    createdAt
  ]);
  
  sendOrderNotification(orderId, order, product, totalAmount, createdAt);
  
  return { orderId, total: totalAmount };
}

function sendOrderNotification(orderId, order, product, total, date) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const emails = ss.getSheetByName('Departments').getDataRange().getValues()
    .slice(1).map(r => r[2]).filter(e => e);
    
  if (emails.length === 0) return;
  
  const customers = getDataFromSheet('Customers');
  const customer = customers.find(c => c.Customer_ID == order.Customer_ID);
  const customerName = customer ? customer.Customer_Name : (order.Name || "Khách chưa định danh");

  const subject = `🔔 [CES GLOBAL] - ĐƠN HÀNG MỚI: ${orderId}`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #4361ee;">CES GLOBAL - ĐƠN HÀNG MỚI</h2>
      <p>Chi tiết đơn hàng vừa được tạo:</p>
      <table style="width: 100%;">
        <tr><td><b>Mã đơn:</b></td><td>${orderId}</td></tr>
        <tr><td><b>Khách hàng:</b></td><td>${customerName}</td></tr>
        <tr><td><b>Sản phẩm:</b></td><td>${product ? product.Product_Name : 'N/A'}</td></tr>
        <tr><td><b>Số lượng:</b></td><td>${order.Quantity}</td></tr>
        <tr><td><b>Tổng tiền:</b></td><td style="color: #ef233c; font-weight: bold;">${total.toLocaleString('vi-VN')} VNĐ</td></tr>
        <tr><td><b>Thời gian:</b></td><td>${Utilities.formatDate(date, "GMT+7", "dd/MM/yyyy HH:mm")}</td></tr>
      </table>
    </div>
  `;
  
  MailApp.sendEmail({ to: emails.join(','), subject: subject, htmlBody: htmlBody });
}

function getDataFromSheet(sheetName) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(sheetName);
    const data = sheet.getDataRange().getValues();
    const headers = data.shift();
    return data.map(row => {
      let obj = {};
      headers.forEach((h, i) => { obj[h] = row[i]; });
      return obj;
    });
  } catch(e) { return []; }
}

function createJsonResponse(status, message, extra = {}) {
  return ContentService.createTextOutput(JSON.stringify({ status, message, ...extra }))
    .setMimeType(ContentService.MimeType.JSON);
}
