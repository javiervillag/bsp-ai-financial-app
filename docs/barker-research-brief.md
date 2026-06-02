# Barker and Sons Research Brief

Sources used:
- Fathom: AI Discovery Workshop, March 13, 2026
- Fathom: AI Roadmap Review, March 27, 2026
- Volca public product pages
- Barker and Sons public website
- Local Volca screenshots in this folder

## Business Context

Barker and Sons is an Orange County plumbing, drain, sewer, and emergency-service business. Public positioning emphasizes same-day service, 24/7 availability, family ownership, more than 35 years of experience, high review volume, financing options, and a broad service mix including drains, sewer, leak repair, water heaters, water treatment, gas, fixture repair, and commercial plumbing.

The Fathom calls frame Barker as a growing ServiceTitan-based home-services operation aiming to scale toward roughly $15M+ while avoiding back-office headcount bloat. Leadership and operations care about speed, customer experience, technician enablement, payment discipline, and reducing manual work around closeout, collections, invoice review, and payroll prep.

## Current Stack and Operating Systems

- ServiceTitan is the core system of record for jobs, invoices, photos/videos, tags, business units, estimates, payments, financing/net terms, dispatch, and completion data.
- Slack is the main notification channel for dispatch and operational follow-up.
- Broccoli and phone calls are intake/lead sources before booking in ServiceTitan.
- ServiceTitan Marketing Pro is used or available for nurturing non-qualified leads.
- CXE is used for technician coaching/call intelligence, but adoption with field teams has been weak.
- ServiceTitan has native features Barker is exploring to replace or improve current coaching workflows.
- Playbooks are being rolled out from admin ownership to department leads.
- Miro was used for process mapping during the workshop.

No confirmed first-version accounting integration was found in the Fathom calls. Volca research suggests QuickBooks/accounting and payroll-provider exports as common future targets, but the Barker-first build should avoid claiming a live integration until verified.

## Key Process Map

Lead to booked job:
- Leads come through Broccoli or phone.
- CSRs answer, verify lead source, identify request type, and book calls in ServiceTitan.
- CSRs tag jobs into buckets such as same-day appointment, future service appointment, or live emergency request.
- Dispatch qualifies booked jobs based on decision-maker/responsible party, scope fit, urgency, and operational capacity.
- Qualified jobs move forward; unqualified/out-of-scope leads can be referred and nurtured through ServiceTitan/Marketing Pro.

Dispatch to completed job:
- Drain calls split into mainline and secondary drain flows.
- Mainline calls are urgent; drain tech should arrive fast and camera tech follows soon after.
- Plumbing jobs may involve service-manager pre-call coaching for high-priority opportunities.
- Dispatch/customer liaison updates customers during the day rather than promising fixed timeframes.
- Technicians perform evaluations, build rapport, create options, complete work, and close the job in ServiceTitan.

Completed job to collections/payroll:
- This is the primary bottleneck.
- Dispatch performs a preliminary closeout review.
- Service managers perform a second review.
- Payroll performs a third review.
- The process is manual in ServiceTitan and creates delays, missed items, and burnout.

## Closeout Review Requirements

Closeout review checks include:
- Job status and completion date
- Business unit
- Tags and opportunity checkbox
- Photos/videos
- Invoice summary and job summary
- Payment collected or payment path confirmed
- Financing or net terms correctly handled
- Estimate matching invoice total
- Labor/material/time review
- Happy call/customer feedback/review request path
- Call-by-call management if the technician did not sell

If payment is missing, dispatch/service managers follow up with the technician. Financing requires finance notification and processing. Net terms require invoice receipt confirmation and posting. Multi-day jobs may involve camera techs collecting progress payments.

## Highest-Value Pain

The highest-voted pain was the service-manager second review, followed by dispatch closeout and payroll review. Service managers are field-oriented leaders, not admin specialists, so review work is delayed, skipped, rushed, or escalated. When the first review is incomplete, service managers and payroll inherit the mess.

The roadmap call framed the biggest opportunity as AI-powered invoice review and collections:
- About 400 invoices per week
- Roughly 100 hours per two-week payroll cycle estimated across manual invoice review work
- More than 90% of invoices reportedly completed near deadline rather than early
- Five key groups/people pulled into admin: service managers, Rick, Cat, warehouse, payroll
- Key metric: completed job exception rate after closeout, meaning how many completed jobs still need manual follow-up after closeout

## Product Implications

The Barker financial intelligence app should make closeout-to-payroll visibility the spine of the product. Executive financial views should not be generic finance charts; they should connect revenue, cash, margin, payroll readiness, collection risk, and growth capacity to the operational constraint Barker already identified.

Core intelligence areas:
- Executive financial health: revenue, cash collected, open balance risk, margin, payroll readiness, exception trends, forecasted risk.
- Service operations: closeout exceptions, service-manager review queue, dispatch quality, job profitability, tech/team performance, payment path, drain/plumbing/camera flows, and bottlenecks.
- AI analyst: explain what changed, why it matters, which jobs or teams are causing financial risk, and what should be reviewed next.

## Demo Data Guidance

Use realistic Barker-style mock data:
- Service lines: mainline drain, secondary drain, plumbing, sewer repair, leak repair, water heater, water treatment, install, emergency.
- Roles: executive/admin, finance/ops, dispatch, service manager, payroll, drain tech, camera tech, plumbing tech, CSR.
- Job states: booked, dispatched, completed, closeout pending, manager review, payroll review, payment follow-up, posted.
- Exceptions: missing photos, weak invoice summary, uncollected payment, financing not processed, net-terms receipt not confirmed, business unit mismatch, estimate/invoice mismatch, overdue manager review, high-margin/low-margin outlier.
- Metrics: completed job exception rate, closeout aging, open balance exposure, payroll-blocking jobs, service-manager backlog, same-day collection rate, average ticket, job margin, revenue by service line, and review-cycle time.
