# ECO Portal Brief

## Purpose

Build a front-end ECO portal that can be connected to real backend data. The original `xs76xiNk.html` prototype has been retired and now redirects to the application; its embedded payload has been removed. The useful behavior and data model from that prototype should be retained without retaining its business data.

The repository's local/demo adapter must use wholly synthetic records suitable for public deployment. Demo data must not contain real people, customers, suppliers, products, facilities, project details, or production information. Fictional Northstar Engineering names and copy are placeholders only and must remain replaceable by backend API responses.

## Core Users

- Engineering, design, BOM, manufacturing, and product stakeholders who need to track ECO progress.
- ECO owners who triage and move ECOs through workflow stages.
- Users who need to create ECOs, save drafts, attach supporting files, and respond to approval gates.
- Admin or superuser roles that can correct ECO metadata when required.

## Required Features

- Responsive UI that works on desktop and smaller screens. Below the `md` breakpoint (portrait tablet and smaller), header actions use labelled icon controls, the header subtitle can wrap to two lines, and search and filters move into a full-screen dialog launched by a compact Filters control with an applied-filter count.
- Light and dark mode, with the selected theme persisted locally.
- Dashboard metrics grouped by workflow stage, owner, category, priority, status, and assignment state.
- ECO-derived counts, metrics, filter results, and table rows must use loading placeholders until the initial dataset is available; do not display temporary zero values while fetching.
- Replace manual refresh with a header sync indicator derived from the ECO query state: orange and pulsing while fetching, steady green when latest, and steady red when not connected.
- Clickable dashboard metrics, graphs, and filter chips that update the ECO list and show result counts.
- Search across ECO content.
- Filters for category, owner, assigned user, priority, workflow stage, status, and action required.
- Clear filters action and visible active-filter chips.
- ECO table with sortable columns and row click behavior. The table uses page scrolling rather than an internal vertical scrollbar and provides horizontal overflow for narrow viewports. Its synchronized header becomes sticky below the app header, full-width view tabs, and full-width filter controls.
- Table columns should include ECO number, category, status, stage, action required, owner, assigned user, age, priority, and description.
- ECO detail modal or drawer with an Overview that keeps the full record and workflow actions together, plus separate Attachments and Audit history tabs. Assigned user and priority are displayed as detail rows with focused Change actions that open small Save/Cancel dialogs.
- Workflow actions must show contextual success or error toasts based on the ECO returned by the operation, including the resulting stage or status.
- Approval workflow actions: approve, reject, and request changes. The approval command must name its outcome, such as `Move to Review` or `Move to Complete`, rather than use a generic `Approve` label.
- Stage progression when approved: request, review, drawing, BOM, confirm, then complete.
- Rejection should hold the ECO and record rejection details.
- Request changes should record the requested-change state and audit entry.
- Completed ECOs cannot run stage-gate actions, and an ECO that is currently rejected cannot be rejected again. These rules must be enforced in both the controls and workflow logic.
- Assign or clear the user currently working on an ECO.
- Edit ECO priority after creation.
- Attach/upload files to an existing ECO.
- Create a new ECO with validation for required fields.
- Save a new ECO as a draft, resume draft editing, submit/publish a draft, delete a draft, or discard unsaved form entry.
- Priority assessment calculator in the create flow.

## Functionality Present In The Prototype That Was Not In The Initial List

- A single mutually exclusive view tab strip, defaulting to Active ECOs, with counts for active ECOs, drafts, high priority, awaiting signoff, new requests, open ECOs older than 90 days, critical high-priority ECOs older than 180 days, and unassigned open ECOs.
- Backlog health summary with open and overdue counts, average age, and oldest open age.
- Backlog health score labelled Healthy, Watch, or At Risk, based on overdue, unassigned, awaiting-signoff, and critical ECO counts.
- Workflow bottleneck bar chart by stage.
- Owner workload bar chart for top owners.
- Priority-by-category heat table, including completed ECOs in the last 30 days.
- Age calculation from `DateRaised`, with age badges and overdue row styling.
- Open/completed record separation, with old completed ECOs excluded from "active" views.
- Selected-state highlighting for the active view and filters.
- Keyboard activation support for sortable headers and dashboard analytics controls.
- Local persistence for drafts via `localStorage`.
- Local persistence for theme preference via `localStorage`.
- Signoff/audit history for approvals, rejections, changes requested, assignment changes, priority updates, draft save, ECO submission, and superuser edits.
- Audit history is displayed as a newest-first timeline with relative times such as `45 minutes ago`; the full local date and time is available in a tooltip. Relative labels are recalculated once per second through one lazy global ticker, but an audit item rerenders only when its formatted label changes. The interval stops when its final subscriber unregisters and is destroyed with the provider.
- Create ECO modal title is draggable.
- Unsaved create-form discard confirmation.
- Superuser login mode that unlocks all ECO fields for editing.
- File attachment UI supports click-to-browse and drag-and-drop for PDF, TXT, DOC/DOCX, XLS/XLSX, PNG, and JPG/JPEG.

## Current ECO Data Model

Fields present in the embedded backend-like payload:

- `ChangeOrder`: ECO identifier.
- `Description`: short summary.
- `Category`: product or business category.
- `CategoryState`: manufacturing source or site.
- `Originator`: source system or originator.
- `EccUser`: owner.
- `StatusCode`: workflow stage.
- `ActionReqd`: current required action.
- `EccStatus`: high-level status.
- `Priority`: `1-High`, `2-Medium`, or `3-Low`.
- `DateRaised`: date the ECO was created.
- `BomMaintAllow`: BOM maintenance flag.
- `AuditSequence`: workflow/audit sequence indicator.
- `FullDescription`: detailed ECO description.
- `Reason`: reason for change.
- `Notes`: notes.

Fields added or expected by the prototype UI:

- `ClaimedBy`: assigned/currently-working user.
- `AgeDays`: derived age in days.
- `Attachments`: list of uploaded/attached files with at least `Name` and `URL`.
- `SignoffHistory`: list of audit entries with `User`, `Action`, `Date`, and `Comment`.
- `ApprovedBy`, `ApprovedDate`, `RejectedBy`, `RejectedDate`, `CompletedDate`: approval lifecycle metadata.
- `PriorityScore`: calculated numeric priority score.
- `PriorityAssessment`: scored inputs for product impact, customer impact, cost impact, regulatory compliance, implementation effort, and schedule impact.

## Create ECO Fields

- ECO number is not an input field. `ChangeOrder` is a unique identifier assigned and returned by the backend when a new ECO or draft is created.
- Description, required.
- Category.
- Manufacturing source.
- Originator, required.
- Owner, required.
- Priority assessment sliders:
  - Product impact, 30%.
  - Customer impact, 20%.
  - Cost impact, 15%.
  - Regulatory compliance, 15%.
  - Implementation effort, 10%.
  - Schedule impact, 10%.
- Calculated priority score and editable priority label.
- Reason, required.
- Full description, required.
- Attachments.
- Notes.

## Priority Calculation

Priority can be manually selected by the user. The priority assessment sliders are optional assistance for users who are unsure which priority to choose.

Each assessment input is scored from 1 to 5. Weighted score:

`product * 0.30 + customer * 0.20 + cost * 0.15 + compliance * 0.15 + effort * 0.10 + schedule * 0.10`

Priority thresholds in the prototype:

- `1-High`: score >= 4.
- `2-Medium`: score >= 2 and < 4.
- `3-Low`: score < 2.

## Workflow Rules From Prototype

- Draft ECOs use `EccStatus = DRAFT`, `StatusCode = 00 - DRAFT`, and `ActionReqd = Continue Draft`.
- Submitted ECOs use `EccStatus = NEW`, `StatusCode = 01 - REQUEST`, and `ActionReqd = Sign On Required`.
- Approving moves the ECO to the next stage:
  - `01 - REQUEST`
  - `02 - REVIEW`
  - `03 - DWG`
  - `04 - BOM`
  - `05 - CONFIRM`
  - `CLOSED` / `COMPLETE`
- Rejecting sets `EccStatus = ON HOLD` and `ActionReqd = Rejected`.
- Requesting changes sets `ActionReqd = Changes Requested`.
- Every lifecycle action should append an audit entry.

## Backend/API Expectations

- Replace the embedded `data` array with backend-provided ECO records.
- Treat the ECO list as the only definitive data contract currently known.
- ECO records will be retrieved from a MySQL database by the internal IT team's backend. The source system may ultimately be K2, but the frontend should only know that it is talking to the backend API.
- The backend stack is Microsoft-based, and user identity, permissions, roles, and access should be controlled through Active Directory.
- Uploaded files should ultimately be stored in SharePoint, but SharePoint library paths, metadata, retention, and scanning should be handled behind the backend API.
- Persist created ECOs, drafts, assignments, priority changes, approvals, rejections, comments, audit history, and attachments server-side.
- Provide filterable/sortable list endpoints or enough payload data for client-side filtering.
- Provide attachment upload and retrieval endpoints.
- Provide role-aware permissions for normal users and superusers.
- Preserve derived metrics either server-side or client-side, but keep the definitions consistent.
- The frontend should fetch open ECOs plus completed ECOs from the last 31 days. No separate archive view is required.
- Owner and assigned user are distinct concepts: owner oversees the ECO, while assigned user is the person expected to action the ECO at its current stage.

## Frontend Integration Requirements

- Keep backend integration pluggable and easy for internal IT to wire up.
- Centralise the backend API base URL, endpoint paths, allowed upload MIME types, polling interval, and feature flags in configuration rather than scattering literals through UI code.
- Centralise permission and role names in configuration, because final Active Directory group/role names are not yet known.
- Do not hard-code the current prototype's `Current User` or `superuser` password behavior into the real implementation.
- Design the frontend around replaceable service adapters for:
  - ECO list retrieval.
  - ECO create/update/draft actions.
  - Workflow approval/reject/request-changes actions.
  - Assignment and priority updates.
  - Attachment upload/list/download.
  - Current-user profile and permissions.
- Make mock/demo data swappable with real API responses without changing component logic.
- Assume backend endpoints and permission names may change while IT integrates the system.
- Keep data synchronization replaceable: configurable polling can refresh the ECO query when enabled, while a future WebSocket connection can invalidate the same query cache when updates are announced. Polling remains disabled for the local mock adapter unless `VITE_ECC_POLL_INTERVAL_MS` is set to a positive interval.

## Recommended Frontend Stack

- Use Vite as the build tool and development server.
- Use React with TypeScript in strict mode.
- Use Material UI as the UI component framework.
- Use MUI theming for light/dark mode and shared design tokens.
- Use MUI components for layout, buttons, inputs, selects, chips, dialogs, drawers, tabs, tooltips, badges, and base tables.
- Use TanStack Query for API requests, loading states, errors, retries, caching, and invalidation.
- Use React Hook Form for create/edit ECO forms.
- Use Zod for form validation and runtime validation of API payloads where useful.
- Use TanStack Table if the ECO table needs more advanced sorting, filtering, column control, or future pagination beyond MUI's base table behavior.
- Use Recharts for dashboard charts and metric visualisations.
- Use Vitest and Testing Library for unit and component tests.
- Use ESLint and Prettier for linting and formatting.

Recommended shape:

`Vite + React + TypeScript + Material UI + TanStack Query + React Hook Form + Zod + Recharts`

Keep the implementation as a static single-page app that talks to the backend API. Do not introduce Next.js or server-side rendering unless a future backend/deployment constraint requires it.

## Proposed REST Endpoints

The exact paths should be configurable, but the frontend should be designed around one backend base URL and a logical REST-style API.

Suggested default shape:

- `GET /api/ecos?scope=active`: fetch open ECOs plus completed ECOs from the last 31 days.
- `GET /api/ecos/{ecoId}`: fetch one ECO with full details, audit history, and attachment metadata.
- `POST /api/ecos`: create a new ECO and return its backend-assigned identifier.
- `PUT /api/ecos/{ecoId}` or `PATCH /api/ecos/{ecoId}`: update editable ECO fields.
- `POST /api/ecos/drafts`: create a draft and return its backend-assigned identifier.
- `PATCH /api/ecos/{ecoId}/draft`: update an existing draft ECO.
- `DELETE /api/ecos/{ecoId}/draft`: delete a draft ECO.
- `POST /api/ecos/{ecoId}/submit`: submit or publish a draft ECO.
- `POST /api/ecos/{ecoId}/approve`: approve and progress the ECO.
- `POST /api/ecos/{ecoId}/reject`: reject or hold the ECO.
- `POST /api/ecos/{ecoId}/request-changes`: request changes.
- `PATCH /api/ecos/{ecoId}/assignment`: assign or clear the assigned user.
- `PATCH /api/ecos/{ecoId}/priority`: update priority and optional priority assessment.
- `GET /api/ecos/{ecoId}/attachments`: list attachment metadata.
- `POST /api/ecos/{ecoId}/attachments`: upload one or more files.
- `GET /api/ecos/{ecoId}/attachments/{attachmentId}`: download or redirect to an attachment.
- `DELETE /api/ecos/{ecoId}/attachments/{attachmentId}`: remove an attachment, if permissions allow.
- `GET /api/me`: fetch the current authenticated user.
- `GET /api/me/permissions`: fetch effective permissions/roles resolved from Active Directory.
- `GET /api/config`: optionally fetch runtime configuration such as role mappings, allowed MIME types, feature flags, and display labels.

## Open Questions

- What Active Directory groups or roles map to approving, rejecting, editing priority, assigning users, deleting drafts, and superuser edits?
- Which exact backend URL and endpoint paths will IT expose?
