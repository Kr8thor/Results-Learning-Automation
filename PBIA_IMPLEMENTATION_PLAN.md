# PBIA Implementation Plan - Results Learning

## Executive Summary

This document outlines a performance-based automation implementation for Results Learning using the PBIA Framework™. We will automate repetitive workflows, measure time savings monthly, and bill based on actual efficiency gains.

**Total Annual Opportunity**: $72,000 - $90,000 (60-75 hours/week saved)

---

## Phase 1: Baseline Measurement & Validation (Week 1-2)

### 1.1 Establish Time Baselines

**Objective**: Precisely document current manual processes and time spent

#### Task 1.1.1: Kristen - Reporting Workflow Baseline
**Current Process**: Weekly hours/grouping/revenue reporting
- **Frequency**: 1x per week
- **Current Time**: 4-6 hours/week
- **Process Steps**:
  1. Export student hours from Teachworks
  2. Organize by program
  3. Calculate total hours per program
  4. Calculate revenue (hours × rate)
  5. Compile into summary sheet
  6. Email to stakeholders

**Measurement Method**:
- Have Kristen time the next 3 weekly reports
- Document each step
- Identify bottlenecks
- **Target Baseline**: 5 hours/week (midpoint)

**PBIA Tier**: Tier 2 (Operational Process) = 6€/hour saved

---

#### Task 1.1.2: Katie - Data Entry Consolidation Baseline
**Current Process**: Multi-system data entry across platforms
- **Frequency**: Daily/weekly
- **Current Time**: 3-4 hours/day (as stated: "Copying data between systems: 60 min/day" but broader scope)
- **Process Steps**:
  1. Pull lesson data from Teachworks
  2. Enter into program tracking sheet
  3. Update financial tracking
  4. Sync to compliance tracking
  5. Verify consistency across sheets
  6. Flag discrepancies

**Measurement Method**:
- Have Katie track entries for 1 week
- Categorize by destination system
- Time each data entry batch
- **Target Baseline**: 3 hours/day (data entry only)

**PBIA Tier**: Tier 2 (Operational Process) = 6€/hour saved

---

#### Task 1.1.3: Jennifer - Email Workflow Baseline
**Current Process**: Identifying and forwarding emails to CEO
- **Frequency**: Multiple times daily
- **Current Time**: 2-3 hours/week (estimated from questionnaire)
- **Process Steps**:
  1. Monitor incoming emails for CEO-relevant items
  2. Review and decide routing
  3. Forward to CEO with context
  4. Track in follow-up list

**Measurement Method**:
- Track emails sent to CEO for 1 week
- Time the identification/forwarding process
- **Target Baseline**: 2.5 hours/week

**PBIA Tier**: Tier 1 (Simple Task - data transfer) = 3€/hour saved

---

#### Task 1.1.4: Nikki - Template Automation Baseline
**Current Process**: Creating RFP responses from scratch
- **Frequency**: 2-3x per week
- **Current Time**: 1-2 hours/week
- **Process Steps**:
  1. Receive RFP request
  2. Look up company details
  3. Build response from scratch
  4. Format and send

**Measurement Method**:
- Track RFP responses for 2 weeks
- Time from request to send
- **Target Baseline**: 1.5 hours/week

**PBIA Tier**: Tier 1 (Simple Task - templates) = 3€/hour saved

---

#### Task 1.1.5: Cyle - CEO Data Entry Baseline (Follow-up Required)
**Current Process**: Manual data entry (scope unknown)
- **Current Time**: 4 hours/day = 20 hours/week
- **Status**: Incomplete questionnaire - needs follow-up interview

**Measurement Method**:
- Schedule 30-min follow-up with Cyle
- Understand what data is being entered
- Who could/should be doing this instead?
- **Target Baseline**: To be determined

**PBIA Tier**: Tier 2 or 3 (depends on process type)

---

### 1.2 Deliverables (End of Week 2)

- [ ] Signed baseline measurement document with all 5 team members
- [ ] Cyle follow-up interview completed
- [ ] Time baseline established for each process
- [ ] Process flow diagrams (current state)
- [ ] Monthly baseline hours calculated

**Baseline Summary Table:**
| Staff | Process | Current Hours/Week | PBIA Tier | €/Hour |
|---|---|---|---|---|
| Kristen | Reporting | 5.0 | Tier 2 | 6 |
| Katie | Data Entry | 15.0 | Tier 2 | 6 |
| Jennifer | Email Workflow | 2.5 | Tier 1 | 3 |
| Nikki | Templates | 1.5 | Tier 1 | 3 |
| Cyle | Data Entry (TBD) | TBD | TBD | TBD |
| **TOTAL** | | **24.0** | | |

---

## Phase 2: Automation Design & Deployment (Week 3-6)

### 2.1 Priority Ranking

**Ranking Criteria:**
1. Time saved (hours/week)
2. Implementation complexity
3. Business impact
4. Data availability

**Priority Order:**
1. **🥇 Kristen - Reporting Automation** (5 hrs/week, Tier 2)
2. **🥈 Katie - Data Entry Consolidation** (15 hrs/week, Tier 2)
3. **🥉 Jennifer - Email Workflow** (2.5 hrs/week, Tier 1)
4. **Nikki - Template Library** (1.5 hrs/week, Tier 1)
5. **Cyle - TBD** (20 hrs/week, TBD)

---

### 2.2 Automation 1: Kristen - Weekly Reporting (Week 3-4)

**Scope**: Auto-generate weekly hours/grouping/revenue report from Teachworks

**n8n Workflow Design:**
```
Trigger: Weekly (Monday 6:00 AM)
  ↓
Step 1: Fetch all lessons from Teachworks API
  - Filter: past 7 days
  - Extract: student, teacher, hours, program, status
  ↓
Step 2: Calculate metrics by program
  - Group by program
  - Sum hours per program
  - Calculate revenue (hours × program rate)
  - Count completions vs scheduled
  ↓
Step 3: Generate report
  - Create formatted summary
  - Sort by program
  - Add variance to previous week
  ↓
Step 4: Populate Google Sheet
  - Insert data into "Weekly Reports" sheet
  - Highlight KPIs (hours, revenue, completion %)
  ↓
Step 5: Send notification
  - Email Kristen: "Weekly report ready in Sheet"
  - Email leadership: summary stats
  ↓
Output: Updated sheet + stakeholder emails
```

**Implementation Tasks:**
- [ ] Verify Teachworks API credentials
- [ ] Document Teachworks data schema
- [ ] Get sample Google Sheet structure from Kristen
- [ ] Build and test workflow
- [ ] Deploy with monitoring

**Success Metric**: Automation generates report in <5 minutes vs 5 hours manual
**Expected Savings**: 5 hours/week = €30/week = €1,560/year

**Timeline**: 2 weeks

---

### 2.3 Automation 2: Katie - Data Entry Consolidation (Week 4-6)

**Scope**: Single entry point → auto-sync to all tracking systems

**n8n Workflow Design:**
```
Trigger: Weekly (Tuesday 9:00 AM) + Manual entry option
  ↓
Step 1: Check Teachworks for new lessons
  - Fetch lessons from past week
  - Identify new entries not yet in tracking
  ↓
Step 2: Extract data
  - Student name, ID, hours, program
  - Teacher assignment
  - Completion status
  ↓
Step 3: Validate data
  - Check for duplicates
  - Verify against known students
  - Flag missing required fields
  ↓
Step 4: Push to tracking systems
  - Update Program Tracking sheet
  - Update Financial sheet
  - Update Compliance sheet
  - Update Katie's dashboard
  ↓
Step 5: Generate data quality report
  - List all entries processed
  - Flag any validation errors
  - Suggest corrections
  ↓
Step 6: Send summary
  - Email Katie: "X entries synced, Y warnings"
  - Show before/after consistency check
  ↓
Output: All systems updated + validation report
```

**Implementation Tasks:**
- [ ] Get Katie's sheet structures (all 3 tracking sheets)
- [ ] Understand data validation rules
- [ ] Build Teachworks → Sheets connectors
- [ ] Add error handling and retry logic
- [ ] Create monitoring/alerting
- [ ] Test with historical data

**Success Metric**: Automation handles 90%+ of entries correctly vs 100% manual
**Expected Savings**: 15 hours/week = €90/week = €4,680/year

**Timeline**: 3 weeks

---

### 2.4 Automation 3: Jennifer - Email Workflow (Week 5-6)

**Scope**: Smart email routing to CEO with context extraction

**n8n Workflow Design:**
```
Trigger: New email arrives + manual flag option
  ↓
Step 1: Receive email notification
  - Monitor inbox for flagged emails
  - OR manually trigger via form
  ↓
Step 2: Extract key info
  - Sender, subject, body
  - Attachments
  - Priority indicators
  ↓
Step 3: Add context
  - Identify email type (client, staff, vendor)
  - Extract key action items
  - Flag if urgent
  ↓
Step 4: Create row in Google Sheet
  - Email from: sender
  - Subject
  - Key points (extracted)
  - Date received
  - Status: pending
  ↓
Step 5: Forward to CEO
  - Send email with link to spreadsheet
  - Include extracted key points
  - Note priority level
  ↓
Step 6: Track completion
  - Monitor when CEO marks as "actioned"
  - Log turnaround time
  ↓
Output: Spreadsheet updated + CEO notified
```

**Implementation Tasks:**
- [ ] Set up Gmail integration
- [ ] Define "CEO-relevant" email criteria (rules)
- [ ] Get Jennifer's spreadsheet structure
- [ ] Build extraction logic (regex/AI)
- [ ] Create monitoring dashboard

**Success Metric**: Auto-routes 95%+ of CEO emails correctly
**Expected Savings**: 2.5 hours/week = €7.50/week = €390/year

**Timeline**: 2 weeks

---

### 2.5 Automation 4: Nikki - Template Library (Week 6)

**Scope**: Pre-built templates with auto-populated company data

**Implementation:**
- Create Google Drive folder with RFP templates
- Build n8n workflow that:
  - Receives RFP request
  - Pulls company data from Supabase/sheet
  - Auto-populates template
  - Formats and sends
- Create template library dashboard

**Expected Savings**: 1.5 hours/week = €4.50/week = €234/year

**Timeline**: 1 week

---

### 2.6 Phase 2 Deliverables (End of Week 6)

- [ ] 4 live n8n workflows deployed
- [ ] All workflows monitored and logging
- [ ] Team trained on workflows
- [ ] Backup/failsafe procedures documented
- [ ] Weekly measurement dashboard created

**Total Expected Savings (Baseline)**: 24 hours/week

---

## Phase 3: Performance Monitoring & Billing (Week 7+)

### 3.1 Measurement Dashboard

**Dashboard shows:**
- Hours saved per workflow per week
- Cost calculation (hours × tier rate)
- Trend analysis (is automation improving?)
- Uptime/reliability metrics
- Error rates and failed automations

**Data Collected:**
1. **Kristen Reporting**:
   - Time automation took to generate report
   - Manual verification time (if any)
   - Hours saved = 5 - verification time

2. **Katie Data Entry**:
   - Number of entries processed
   - Time to sync all systems
   - Manual intervention needed
   - Hours saved = (entries ÷ 4 entries/hour) - automation time

3. **Jennifer Email Workflow**:
   - Emails processed per week
   - Time per email (routing + extraction)
   - Hours saved = emails × (avg manual time - auto time)

4. **Nikki Templates**:
   - RFPs processed per week
   - Time per RFP
   - Hours saved = RFPs × (avg manual time - auto time)

---

### 3.2 Monthly Billing Cycle

**Process:**
1. Week 1-3 of month: Collect performance data
2. Week 3: Generate measurement report
3. Week 4: Invoice based on formula

**PBIA Formula:**
```
Monthly Billing = Σ(Hours Saved × Tier Rate) - Setup Fee (if applicable)

Example (Month 1):
Kristen: 5 hrs/week × 4 weeks × €6 = €120
Katie: 15 hrs/week × 4 weeks × €6 = €360
Jennifer: 2.5 hrs/week × 4 weeks × €3 = €30
Nikki: 1.5 hrs/week × 4 weeks × €3 = €18
Cyle: [TBD after baseline]

Monthly Total: €528 + Setup Fee (€200 / €100 / €0 based on commitment)

Annual Value (no commitment): €6,336 + setup fees
```

---

### 3.3 Commitment Options

**Option 1: No Commitment**
- Setup Fee: €200
- First Month: €528 + €200 = €728
- Ongoing Months: €528
- **Annual Total**: €6,536

**Option 2: 6-Month Commitment**
- Setup Fee: €100
- First Month: €528 + €100 = €628
- Months 2-6: €528 each
- Months 7-12: €528 each
- **Annual Total**: €6,436

**Option 3: 12-Month Commitment**
- Setup Fee: €0
- All months: €528
- **Annual Total**: €6,336

**Projected Value to Client:**
- Time saved: 24 hours/week = 1,248 hours/year
- At €50/hour operational cost: €62,400 value generated
- Client pays: €6,336 - €6,536 (10% of value)
- **ROI**: 900%

---

## Phase 4: Optimization & Scaling (Month 2+)

### 4.1 Continuous Improvement

**Monthly review:**
- Are automations meeting/exceeding baselines?
- Where are the failures/manual overrides?
- Can we expand scope?
- Can we add new automations?

**Optimization opportunities:**
- Kristen: Add student performance analytics to reports
- Katie: Extend to additional data sources
- Jennifer: Add AI-powered priority scoring
- Nikki: Expand to other template types
- Cyle: Once baseline established, automate CEO workflows

---

## Implementation Timeline

```
Week 1-2:   PHASE 1 - Baseline Measurement
            ├─ Interview all 5 staff
            ├─ Time current processes
            ├─ Document workflows
            └─ Complete Cyle follow-up

Week 3-4:   PHASE 2a - Kristen Reporting Automation
            ├─ Build Teachworks connector
            ├─ Design report generation
            ├─ Test with real data
            └─ Deploy monitoring

Week 4-6:   PHASE 2b - Katie Data Entry Consolidation
            ├─ Map all 3 tracking sheets
            ├─ Build multi-sheet sync
            ├─ Error handling
            └─ Deploy with validation

Week 5-6:   PHASE 2c - Jennifer Email Workflow
            ├─ Gmail integration
            ├─ Extract logic
            ├─ Spreadsheet connector
            └─ Deploy with rules

Week 6:     PHASE 2d - Nikki Template Library
            ├─ Create templates
            ├─ Build auto-population
            └─ Deploy

Week 7+:    PHASE 3 - Monitoring & Billing
            ├─ Dashboard live
            ├─ Weekly measurements
            ├─ Monthly billing
            └─ Monthly optimization reviews
```

---

## Risk Mitigation

### Risks & Mitigation Strategies

| Risk | Impact | Mitigation |
|---|---|---|
| Teachworks API unavailable | High | Fallback to manual export, retry logic, alerts |
| Data validation errors | High | Testing framework, error logging, manual review |
| Google Sheets quota limits | Medium | Distribute across multiple sheets, archive old data |
| Team doesn't use automation | High | Training, monitoring, support sessions |
| Measurement disputes | Medium | Detailed logging, shared dashboard, weekly reviews |
| Integration downtime | Medium | Failsafe procedures, email alerts, manual backup |

---

## Success Criteria

**Phase 1 Complete When:**
- [ ] All 5 baselines established and signed off
- [ ] Cyle's process documented
- [ ] Time measurements within ±10% accuracy

**Phase 2 Complete When:**
- [ ] 4 workflows live and stable
- [ ] Uptime >95%
- [ ] Team trained and autonomous
- [ ] Measurement dashboard live

**Phase 3 Success When:**
- [ ] Monthly savings > baseline prediction (>24 hrs/week)
- [ ] Client renews at month 3+
- [ ] Error rate <5%
- [ ] Team reports improved experience

---

## Questions for Results Learning

### Before Kicking Off (Week 0)

**For Kristen:**
1. Can you share a sample of last 4 weeks' weekly reports?
2. What is the revenue rate per hour by program?
3. Do you have direct access to Teachworks API?
4. What time does this report need to be ready by (for stakeholder emails)?

**For Katie:**
1. Can you share all 3 tracking sheets (anonymized)?
2. What are the validation rules for "correct" data entry?
3. How often does data need to sync? (daily? weekly?)
4. Do all three sheets need to be in sync, or is one the "source of truth"?

**For Jennifer:**
1. How do you currently decide which emails go to CEO?
2. Can you share examples of recent CEO-relevant emails?
3. Does CEO need attachments forwarded?
4. What's the typical response time expected?

**For Nikki:**
1. How many RFP responses per week/month?
2. Can you share a template + sample response?
3. What company data should auto-populate?
4. Are there variations by RFP type?

**For Cyle:**
1. What specifically are you entering 4 hours/day?
2. Is this something someone else could do instead?
3. What would 4 extra hours/day enable you to focus on?
4. Do you have direct involvement or can delegation work?

---

## Conclusion

This PBIA implementation focuses on **proven, measurable automation** that delivers immediate ROI. We start with clear baselines, deploy working solutions, and only charge for actual time saved.

**Expected Results:**
- 24+ hours/week saved (initial phase)
- €6,336 - €6,536 annual billing (10% of value generated)
- 900%+ ROI for client
- Continuous improvement cycle

**Next Step**: Schedule baseline measurement kickoff meeting with team.

---

*PBIA Implementation Plan v1.0*
*Results Learning - January 2026*
