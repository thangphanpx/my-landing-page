/**
 * 🧪 Test Runner - Lead Data Extraction
 * 
 * Script để test thử hệ thống bóc tách lead data
 * Chạy trong browser console hoặc Node.js
 * 
 * @author AI Expert Assistant
 * @version 1.0.0
 */

import { processAIResponse } from './leadDataExtractor';
import { LEAD_EXTRACTION_DEMO, runLeadExtractionDemo, demonstrateFullWorkflow } from './leadExtractionDemo';

// ============================================================
// SIMPLE TEST RUNNER
// ============================================================

/**
 * Run all tests và show kết quả
 */
export function runAllTests() {
  console.clear();
  console.log("🧪 TESTING LEAD DATA EXTRACTION SYSTEM");
  console.log("=".repeat(60));
  
  let passed = 0;
  let failed = 0;
  
  // Test từng case
  Object.entries(LEAD_EXTRACTION_DEMO).forEach(([caseName, testCase], index) => {
    console.log(`\n🔍 TEST ${index + 1}: ${caseName.toUpperCase()}`);
    console.log("-".repeat(40));
    
    try {
      const result = runLeadExtractionDemo(testCase);
      
      // Check results
      const responseMatch = result.matchesExpected.response;
      const leadDataMatch = result.matchesExpected.leadData;
      const overallPass = responseMatch && leadDataMatch;
      
      if (overallPass) {
        console.log("✅ PASSED");
        passed++;
      } else {
        console.log("❌ FAILED");
        if (!responseMatch) console.log("   - Response mismatch");
        if (!leadDataMatch) console.log("   - Lead data mismatch");
        failed++;
      }
      
    } catch (error) {
      console.log("❌ FAILED - Error:", error);
      failed++;
    }
  });
  
  // Summary
  console.log("\n📊 TEST SUMMARY");
  console.log("=".repeat(60));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📋 Total: ${passed + failed}`);
  
  if (failed === 0) {
    console.log("🎉 ALL TESTS PASSED! System working correctly.");
  } else {
    console.log("⚠️  Some tests failed. Check implementation.");
  }
  
  return { passed, failed, total: passed + failed };
}

/**
 * Test thử một response cụ thể
 */
export function testSpecificResponse(aiResponse: string) {
  console.log("🧪 TESTING SPECIFIC RESPONSE");
  console.log("=".repeat(50));
  console.log("Input AI Response:", aiResponse);
  
  const processed = processAIResponse(aiResponse);
  
  console.log("\n📋 Results:");
  console.log("- Clean Response:", processed.cleanResponse);
  console.log("- Has Lead Data:", processed.hasLeadData);
  console.log("- Lead Data:", processed.leadData);
  
  return processed;
}

/**
 * Interactive test với custom input
 */
export function interactiveTest() {
  console.log("🎯 INTERACTIVE TEST MODE");
  console.log("Copy và paste test cases sau vào console:\n");
  
  const testCases = [
    'testSpecificResponse("Chào bạn! Cảm ơn thông tin. ||LEAD_DATA: {\\"name\\": \\"Test\\", \\"phone\\": \\"0123456789\\", \\"email\\": null}||")',
    'testSpecificResponse("Xin chào! Không có lead data trong response này.")',
    'testSpecificResponse("Email của tôi là test@example.com ||LEAD_DATA: {\\"name\\": null, \\"phone\\": null, \\"email\\": \\"test@example.com\\"}||")'
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`${index + 1}. ${testCase}`);
  });
  
  console.log("\nHoặc test với format custom:");
  console.log('testSpecificResponse("Your AI response here ||LEAD_DATA: {...}||")');
}

// ============================================================
// BROWSER CONSOLE HELPERS
// ============================================================

/**
 * Expose functions cho browser console
 */
if (typeof window !== 'undefined') {
  // Browser environment
  (window as any).testLeadExtraction = {
    runAllTests,
    testSpecificResponse,
    interactiveTest,
    demonstrateFullWorkflow,
    
    // Quick tests
    quickTest1: () => testSpecificResponse('Xin chào! ||LEAD_DATA: {"name": "Test", "phone": "0123456789", "email": null}||'),
    quickTest2: () => testSpecificResponse('Hello world! No lead data here.'),
    quickTest3: () => testSpecificResponse('Email: test@example.com ||LEAD_DATA: {"name": null, "phone": null, "email": "test@example.com"}||'),
  };
  
  console.log("🎯 Lead Data Test functions available:");
  console.log("- testLeadExtraction.runAllTests()");
  console.log("- testLeadExtraction.testSpecificResponse('your response')");
  console.log("- testLeadExtraction.interactiveTest()");
  console.log("- testLeadExtraction.quickTest1/2/3()");
}

// ============================================================
// NODE.JS RUNNER
// ============================================================

/**
 * Node.js test runner
 */
export function nodeTestRunner() {
  if (typeof window === 'undefined') {
    // Node.js environment
    console.log("🖥️  Running in Node.js environment");
    runAllTests();
    
    console.log("\n🎯 Testing specific cases:");
    
    // Test case 1
    testSpecificResponse('Chào bạn Minh! ||LEAD_DATA: {"name": "Minh", "phone": "0901234567", "email": null}||');
    
    console.log("\n" + "-".repeat(50));
    
    // Test case 2  
    testSpecificResponse('Không có lead data trong response này.');
  }
}

// Auto-run nếu import trong browser
if (typeof window !== 'undefined') {
  console.log("🚀 Lead Data Extraction Test System Ready!");
  console.log("Type 'testLeadExtraction.runAllTests()' to run all tests");
} else {
  // Auto-run trong Node.js nếu chạy trực tiếp
  nodeTestRunner();
}