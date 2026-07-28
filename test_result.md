#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

user_problem_statement: "Premium cinematic VFX studio website 'The Dark Matter' with animated black-hole hero, portfolio, team, careers with apply modal, and contact form. Backend needs contact + job application endpoints storing to MongoDB."

backend:
  - task: "Health check GET /api"
    implemented: true
    working: "NA"
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Root and /api/health return status ok."

  - task: "POST /api/contact - contact form submission"
    implemented: true
    working: "NA"
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Accepts name, email, phone, company, projectType, budget, message. Validates required (name, email, message). Stores in MongoDB 'contacts' collection with UUID."

  - task: "POST /api/apply - job application submission"
    implemented: true
    working: "NA"
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Accepts name, email, phone, position, experience, portfolio, message. Validates required (name, email, position). Stores in MongoDB 'applications' collection with UUID."

  - task: "GET /api/contacts and /api/applications - list submissions"
    implemented: true
    working: "NA"
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Returns last 100 records sorted by createdAt desc."

frontend:
  - task: "Cinematic single-page site with all sections"
    implemented: true
    working: "NA"
    file: "app/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Hero with animated black hole, navbar, about, services, why us, portfolio with modal + category filter, team, founder, stats counters, careers with apply modal, contact form, footer. Uses framer-motion, canvas starfield, custom cursor."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus:
    - "POST /api/contact - contact form submission"
    - "POST /api/apply - job application submission"
    - "Health check GET /api"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "MVP complete. Only backend endpoints to verify: /api/contact and /api/apply POST endpoints, plus GET /api health check and list endpoints. Validate required-field errors return 400, valid submissions return {success:true, id, message} and are persisted to MongoDB collections 'contacts' and 'applications'."
