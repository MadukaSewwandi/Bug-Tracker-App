
Test Plan

1. Introduction
This document describes the testing strategy for the Bug Tracker App.  
The goal is to ensure the app allows users to report, view, edit, and delete bugs accurately while maintaining data consistency.

2. Scope
In Scope
  ✅ Login & Registration  
  ✅ Bug Creation  
  ✅ Bug Listing & Filtering  
  ✅ Bug Status Update  
  ✅ Bug Deletion  
  ✅ API Testing with Postman

Out of Scope 
  ❌ Performance testing  
  ❌ Security penetration testing  
  ❌ Multi-language support

3. Test Approach
We use manual functional testing combined with API testing via Postman.
Functional Testing – Verify UI components, form validation, and user flow.  
API Testing – Verify all REST endpoints (`GET`, `POST`, `PATCH`, `DELETE`) return correct responses.  
Regression Testing– After any bug fixes or code changes.

4. Test Environment
Frontend: React (client folder)  
Backend: Node.js/Express (server folder)  
Database: MongoDB  
Tools: Postman, GitHub Issues (for bug tracking)

5. Roles & Responsibilities
Tester: Write and execute test cases, log defects.  
Developer: Fix defects and redeploy.

6. Entry Criteria
- Application should be running locally with seeded test data.
- All routes should be accessible without server errors.

7. Exit Criteria
- 100% of critical test cases must pass.  
- All major bugs must be resolved or deferred with approval.

8. Deliverables
- Test Cases (`test-cases.md`)  
- Bug Reports (`docs/bug-reports/`)  
- Postman Collection (`postman/`)  
- Test Summary Report (optional)

9. Risks
- Internet connectivity issues may block testing.
- Lack of performance testing may hide scalability issues.

