# Volca-to-Barker Feature Map

## Volca Product Patterns Observed

From public research and local screenshots, Volca is a home-services financial intelligence layer built around:
- A live context layer that reads ServiceTitan, payroll/accounting systems, pay plans, vendor invoices, pricebooks, timesheets, GP margins, pay history, and helper split rules.
- Agent training, where operational/payroll rules are encoded into simple cards.
- Agent action, where ServiceTitan jobs and invoices are scanned for the details that drive pay, margin, and exceptions.
- Agent delivery, where clean reports are generated, anomalies are flagged, and exports are prepared for payroll/accounting systems.
- Back-office queues for approvals, pending reviews, disputes, anomalies, grouped teams, and employee reports.
- Pay education reports that explain every dollar, show line items, and let employees approve or dispute.
- AP/job costing workflows that capture vendor invoices, match line items to ServiceTitan jobs, mirror to accounting, and protect margins.
- A visual style with restrained white cards, dark navy headers/panels, orange action accents, green verified states, red exception states, compact tables, grouped status rows, progress/checklist states, and direct approve/dispute actions.

## Barker Translation

### 1. Context Layer

Volca: ServiceTitan, pay plans, invoices, timesheets, pricebook, vendor invoices, GP margins, payroll history.

Barker build:
- ServiceTitan demo context: jobs, invoices, closeout status, photos/videos, tags, business units, estimates, payment state, financing/net terms, and technician/service-manager ownership.
- Slack demo context: notification channel for exception follow-up.
- Broccoli/phone demo context: lead sources and booking path.
- Barker rules: closeout checks, payment rules, manager review rules, payroll-blocking exceptions, financing/net terms routing, and review SLAs.
- Future placeholders: ServiceTitan, Slack, accounting/payroll, Broccoli, CXE/ServiceTitan coaching, Marketing Pro.

### 2. Agent Training

Volca: train the agent on commission, helper splits, GP gates, spiffs, tier bonuses.

Barker build:
- Train the agent on closeout and collection rules:
  - Photos/videos required
  - Invoice and job summaries required
  - Business unit/tags/opportunity checkbox verified
  - Payment collected or payment path confirmed
  - Financing sent to finance
  - Net terms receipt confirmed
  - Estimate total matches invoice total
  - Service-manager review due before payroll cutoff
  - Payroll review blocks unresolved exceptions

### 3. Agent in Action

Volca: scans ServiceTitan invoices/jobs and extracts job, tech, revenue, margin, pricebook, spiffs.

Barker build:
- Scan completed jobs and show the closeout packet:
  - Job number, customer, service line, assigned tech/team
  - Revenue, gross margin, payment state, open balance
  - Closeout checklist status
  - Review owner and aging
  - AI-generated summary quality score
  - Exception severity and recommended next step

### 4. Agent Delivery

Volca: generates reports, flags anomalies, exports to payroll/accounting systems.

Barker build:
- Generate:
  - Executive financial health report
  - Daily closeout exception report
  - Payroll readiness report
  - Service-manager backlog report
  - Collections/open balance risk report
  - Service-line profitability report
- Flag anomalies:
  - Missing payment on completed job
  - Overdue service-manager review
  - Low margin outlier
  - Missing summary/photos
  - Financing/net terms not processed
  - Estimate/invoice mismatch
- Export placeholders:
  - Slack notification
  - ServiceTitan update
  - Payroll handoff
  - Accounting handoff

### 5. Back-Office Approval Queue

Volca: approved/pending/disputed pay reports and employee group readiness.

Barker build:
- Dispatch review queue
- Service-manager review queue
- Finance/payment follow-up queue
- Payroll readiness queue
- Status lanes: verified, pending, escalated, payroll blocker
- Groupings: dispatch, service managers, finance/payroll, drain, camera, plumbing, install

### 6. Pay Reports and Employee Education

Volca: every employee gets a pay report with line-item math and approve/dispute.

Barker build:
- For first version, make this a future/payroll-ready module rather than the only product center.
- Include demo payroll-readiness views that show which jobs will affect payroll, why they are blocked, and what evidence is needed.
- Include approve/dispute interaction patterns for job closeout exceptions and payroll-blocking items.

### 7. AP and Job Costing

Volca: vendor invoices matched to ServiceTitan jobs and accounting.

Barker build:
- Include AP/job-costing as an integration placeholder and optional dashboard tile.
- Since Barker Fathom calls centered on closeout/review rather than vendor AP, do not over-focus the first version here.
- Show future potential: vendor costs tied to jobs, true margin, pricebook cost drift, accounting sync.

## First-Version Screen List

- Login with production auth and roles: admin, executive, finance/ops
- Executive Overview: revenue, cash collected, open balance risk, margin, payroll readiness, completed job exception rate, AI summary
- Service Operations: closeout funnel, team queues, manager backlog, dispatch quality, service-line performance
- Closeout Command Center: job-level exception review with checklist and recommended action
- AI Analyst Chat: real AI answers about mock Barker financial/ops data
- Reports: executive brief, payroll readiness, closeout exceptions, collections risk, service-line profitability
- Alerts: anomalies and operational blockers with severity, owner, age, and action
- Integrations: ServiceTitan, Slack, Broccoli, accounting/payroll, CXE/coaching, Marketing Pro placeholders
- Admin/Settings: users, roles, review rules, demo data reset, AI/provider status
- Onboarding: guided setup showing context layer, rule training, scanning, report delivery

## Design Direction

Use Volca's precise, operational feel without copying it blindly:
- White/near-white surfaces, navy headers, orange primary actions, green verified states, red exception states.
- Dense but readable financial tables and status queues.
- No generic charts without operational explanation.
- Clear labels using Barker language: closeout, collections, ServiceTitan, dispatch, service manager review, payroll readiness, payment follow-up, financing, net terms.
- Desktop-first with clean responsive behavior for mobile/tablet.
