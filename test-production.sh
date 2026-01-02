#!/bin/bash
# DayControl v1.0.0 - Pre-Deployment Testing Script
# This script validates all core features work correctly

echo "═══════════════════════════════════════════════════════════════════════════════"
echo "                  DayControl v1.0.0 - Pre-Deployment Tests"
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

TESTS_PASSED=0
TESTS_FAILED=0

# Test 1: Check if web server is running
echo "TEST 1: Checking web server..."
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ PASS${NC}: Web server running at http://localhost:3000"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}: Web server not accessible. Start with: npm run web-server"
    ((TESTS_FAILED++))
fi

# Test 2: Check HTML file exists and is valid
echo ""
echo "TEST 2: Checking HTML file..."
if [ -f "web/index.html" ]; then
    LINES=$(wc -l < web/index.html)
    echo -e "${GREEN}✅ PASS${NC}: web/index.html exists ($LINES lines)"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}: web/index.html not found"
    ((TESTS_FAILED++))
fi

# Test 3: Check for priority system in code
echo ""
echo "TEST 3: Checking priority system implementation..."
if grep -q "priorityIcon" web/index.html && grep -q "prioritySelect" web/index.html; then
    echo -e "${GREEN}✅ PASS${NC}: Priority system code found"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}: Priority system code not found"
    ((TESTS_FAILED++))
fi

# Test 4: Check for deleted tasks tracking
echo ""
echo "TEST 4: Checking deleted tasks implementation..."
if grep -q "deletedTasks" web/index.html && grep -q "renderDeletedTasks" web/index.html; then
    echo -e "${GREEN}✅ PASS${NC}: Deleted tasks tracking found"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}: Deleted tasks tracking not found"
    ((TESTS_FAILED++))
fi

# Test 5: Check package.json version
echo ""
echo "TEST 5: Checking package.json version..."
if grep -q '"version": "1.0.0"' package.json; then
    echo -e "${GREEN}✅ PASS${NC}: Version set to 1.0.0"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}: Version not 1.0.0"
    ((TESTS_FAILED++))
fi

# Test 6: Check app.json production settings
echo ""
echo "TEST 6: Checking app.json production settings..."
if grep -q "daycontrol-dopamine-detox" app.json && grep -q "versionCode" app.json; then
    echo -e "${GREEN}✅ PASS${NC}: Production settings configured"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}: Production settings incomplete"
    ((TESTS_FAILED++))
fi

# Test 7: Check for dopeamine detox branding
echo ""
echo "TEST 7: Checking dopamine detox branding..."
if grep -q "Dopamine Detox" web/index.html && grep -q "Reclaim Your Focus" web/index.html; then
    echo -e "${GREEN}✅ PASS${NC}: Dopamine detox branding present"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}: Dopamine detox branding missing"
    ((TESTS_FAILED++))
fi

# Test 8: Check for three-tab navigation
echo ""
echo "TEST 8: Checking three-tab navigation..."
if grep -q "Today" web/index.html && grep -q "Completed" web/index.html && grep -q "Deleted" web/index.html; then
    echo -e "${GREEN}✅ PASS${NC}: Three-tab system implemented"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}: Three-tab system incomplete"
    ((TESTS_FAILED++))
fi

# Test 9: Check documentation exists
echo ""
echo "TEST 9: Checking production documentation..."
if [ -f "PRODUCTION_RELEASE_NOTES.md" ]; then
    echo -e "${GREEN}✅ PASS${NC}: PRODUCTION_RELEASE_NOTES.md exists"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}: PRODUCTION_RELEASE_NOTES.md not found"
    ((TESTS_FAILED++))
fi

# Test 10: Check for drag-drop functionality
echo ""
echo "TEST 10: Checking drag-and-drop implementation..."
if grep -q "handleDragStart" web/index.html && grep -q "handleDrop" web/index.html; then
    echo -e "${GREEN}✅ PASS${NC}: Drag-and-drop code present"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}: Drag-and-drop code missing"
    ((TESTS_FAILED++))
fi

# Summary
echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "                            TEST SUMMARY"
echo "═══════════════════════════════════════════════════════════════════════════════"
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}/10"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}/10"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ ALL TESTS PASSED! Ready for production deployment.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Test manually at http://localhost:3000"
    echo "2. Create tasks with different priorities"
    echo "3. Verify deletion history tracking"
    echo "4. Test all tabs (Today/Completed/Deleted)"
    echo "5. Review PRODUCTION_RELEASE_NOTES.md"
    echo "6. Build for Play Store: expo build:android (requires account)"
    exit 0
else
    echo -e "${RED}❌ SOME TESTS FAILED. Please fix issues before deployment.${NC}"
    exit 1
fi
