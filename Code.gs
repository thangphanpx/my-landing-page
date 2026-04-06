// ============================================================
// IMPROVED Google Apps Script Code với Debug Logs
// Copy code này vào Google Apps Script để debug tốt hơn
// ============================================================

function doPost(e) {
  console.log("🚀 doPost function started");

  if (!e || !e.postData) {
    console.error("❌ Missing or invalid request data");
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: 'Missing or invalid request data'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    // Log raw request data
    console.log("📥 Raw request data:");
    console.log("  - postData exists:", !!e.postData);
    console.log("  - postData.contents:", e.postData ? e.postData.contents : "null");
    console.log("  - postData.type:", e.postData ? e.postData.type : "null");
    
    // Parse JSON data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
      console.log("✅ JSON parsed successfully:", data);
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError.toString());
      console.log("Raw contents:", e.postData.contents);
      
      return ContentService.createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: 'Invalid JSON: ' + parseError.toString(),
        received: e.postData.contents
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Open spreadsheet
    const SHEET_ID = 'SHEET_ID';
    console.log("📊 Opening spreadsheet:", SHEET_ID);
    
    let sheet;
    try {
      sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
      console.log("✅ Spreadsheet opened successfully");
    } catch (sheetError) {
      console.error("❌ Spreadsheet error:", sheetError.toString());
      
      return ContentService.createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: 'Spreadsheet access error: ' + sheetError.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Extract data with defaults
    const newTime = data.timestamp || new Date().toLocaleString('vi-VN');
    const newName = data.name || '';
    const newPhone = data.phone || '';
    const newEmail = data.email || '';
    const newSource = data.source || '';
    const newSessionId = data.sessionId || '';
    const newHistory = data.chatHistory || '';
    
    console.log("📝 Extracted data:");
    console.log("  - Time:", newTime);
    console.log("  - Name:", newName);
    console.log("  - Phone:", newPhone);
    console.log("  - Email:", newEmail);
    console.log("  - Source:", newSource);
    console.log("  - SessionId:", newSessionId);
    console.log("  - History length:", newHistory.length);
    
    // Check for existing session
    let dataRange, values, rowIndexToUpdate = -1;
    
    try {
      dataRange = sheet.getDataRange();
      values = dataRange.getValues();
      console.log("📊 Sheet has", values.length, "rows");
      
      if (newSessionId) {
        for (let i = values.length - 1; i > 0; i--) {
          const rowSessionId = values[i][5] ? values[i][5].toString().trim() : '';
          if (rowSessionId === newSessionId) {
            rowIndexToUpdate = i + 1;
            console.log("🔄 Found existing session at row:", rowIndexToUpdate);
            break;
          }
        }
      }
    } catch (dataError) {
      console.error("❌ Error reading sheet data:", dataError.toString());
    }
    
    // Update or insert data
    try {
      if (rowIndexToUpdate > -1) {
        console.log("🔄 Updating existing row:", rowIndexToUpdate);
        const currentRow = values[rowIndexToUpdate - 1];
        
        if (!currentRow[1] && newName) {
          sheet.getRange(rowIndexToUpdate, 2).setValue(newName);
          console.log("  - Updated name");
        }
        if (!currentRow[2] && newPhone) {
          sheet.getRange(rowIndexToUpdate, 3).setValue(newPhone);
          console.log("  - Updated phone");
        }
        if (!currentRow[3] && newEmail) {
          sheet.getRange(rowIndexToUpdate, 4).setValue(newEmail);
          console.log("  - Updated email");
        }
        if (newHistory) {
          sheet.getRange(rowIndexToUpdate, 7).setValue(newHistory);
          console.log("  - Updated chat history");
        }
        sheet.getRange(rowIndexToUpdate, 1).setValue(newTime);
        console.log("  - Updated timestamp");
        
      } else {
        console.log("➕ Adding new row");
        const newRow = [newTime, newName, newPhone, newEmail, newSource, newSessionId, newHistory];
        sheet.appendRow(newRow);
        console.log("✅ New row added:", newRow);
      }
      
      console.log("🎉 Data successfully written to sheet!");
      
      return ContentService.createTextOutput(JSON.stringify({ 
        status: 'success',
        action: rowIndexToUpdate > -1 ? 'updated' : 'inserted',
        rowIndex: rowIndexToUpdate > -1 ? rowIndexToUpdate : 'new',
        data: {
          name: newName,
          phone: newPhone,
          email: newEmail,
          sessionId: newSessionId
        }
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (writeError) {
      console.error("❌ Error writing to sheet:", writeError.toString());
      
      return ContentService.createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: 'Write error: ' + writeError.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error("💥 Unexpected error in doPost:", error.toString());
    console.error("Error stack:", error.stack);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: 'Unexpected error: ' + error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  console.log("📞 doGet called - API health check");
  return ContentService.createTextOutput("🎯 API Chatbot Leads Debug Version Working! ✅ " + new Date().toISOString());
}

// Test function để debug
function testManualInsert() {
  console.log("🧪 Manual test function started");
  
  const testData = {
    timestamp: new Date().toLocaleString('vi-VN'),
    name: "🧪 Manual Test " + new Date().getTime(),
    phone: "0987654321",
    email: "manual.test@debug.com", 
    source: "Manual Test Function",
    sessionId: "manual_test_" + new Date().getTime(),
    chatHistory: "Manual test chat history from Apps Script"
  };
  
  try {
    const sheet = SpreadsheetApp.openById('1I2tupXcxIludCM4e4tqN5Ji--bBxppalK6hkROiGYuQ').getActiveSheet();
    sheet.appendRow([
      testData.timestamp,
      testData.name, 
      testData.phone,
      testData.email,
      testData.source,
      testData.sessionId,
      testData.chatHistory
    ]);
    
    console.log("✅ Manual test completed successfully");
    console.log("📊 Data inserted:", testData);
    
  } catch (error) {
    console.error("❌ Manual test failed:", error.toString());
  }
}