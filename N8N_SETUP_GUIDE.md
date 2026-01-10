# n8n Setup Guide for Results Learning

## Overview

This guide covers the complete n8n infrastructure setup to support the YIELD Framework implementation for Results Learning. We'll create a scalable, maintainable automation platform that connects Teachworks → Google Sheets → Email notifications.

---

## Part 1: n8n Infrastructure Setup

### Option A: Self-Hosted n8n (RECOMMENDED for Results Learning)

**Why Self-Hosted?**
- ✅ Full data control (important for student/educational data)
- ✅ No per-workflow cost scaling
- ✅ Custom integrations and extensions
- ✅ Can run 5+ simultaneous workflows
- ✅ One-time setup cost, unlimited workflows

**Why Not Cloud?**
- ❌ Per-workflow costs add up quickly (5 workflows = $50-150/month)
- ❌ Data sovereignty concerns (education sector)
- ❌ Less control over execution
- ❌ Harder to debug and monitor

### Hosting Recommendation: **DigitalOcean App Platform**

**Specs**:
- **Instance**: Basic ($5/month) upgraded to Standard ($12/month) for reliability
- **Database**: PostgreSQL ($15/month managed)
- **Total Monthly**: ~$27/month
- **Setup Time**: 30 minutes
- **Uptime SLA**: 99.9%

**Why DigitalOcean?**
- Simple one-click deployment
- Integrated PostgreSQL
- Good regional availability
- Excellent documentation
- Easy scaling if needed
- Team uses it (familiar)

---

## Part 2: Installation & Configuration

### Step 1: Deploy n8n on DigitalOcean

**Prerequisites**:
- DigitalOcean account (create at digitalocean.com)
- Domain name (optional, can use IP address initially)
- SSH access to droplet

**Deployment Steps**:

```bash
# 1. Create DigitalOcean App
# - Go to DigitalOcean > Apps > Create App
# - Choose "n8n" from the marketplace
# - Select region (pick closest to Results Learning)
# - Choose plan (Standard for reliability)

# 2. During setup:
# - Set database: Managed PostgreSQL
# - Enable auto-deploy from GitHub (if code updates needed)
# - Configure environment variables (see below)

# 3. DNS setup (optional):
# - Point your domain to DigitalOcean
# - Or use DigitalOcean's auto-generated domain

# 4. SSL/TLS:
# - Automatically configured by DigitalOcean
# - Free Let's Encrypt certificate
```

**Environment Variables to Set**:
```env
# n8n Core
N8N_PROTOCOL=https
N8N_HOST=your-domain.com
N8N_PORT=443
N8N_SECURE_COOKIE=true

# Database
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=your-pg-db-host
DB_POSTGRESDB_PORT=25060
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n_user
DB_POSTGRESDB_PASSWORD=strong_password_here

# Security
N8N_ENCRYPTION_KEY=generate_random_32_char_string
N8N_USER_MANAGEMENT_JWT_SECRET=another_random_string

# Editor Settings
N8N_EDITOR_DISABLE_TELEMETRY=true
```

---

### Step 2: Access n8n Dashboard

1. **First Login**:
   - Go to `https://your-domain.com`
   - Create admin user (email + password)
   - Set up workspace

2. **Create Service Account** (for API access):
   - Settings → Users → Create API Key
   - Copy key → Store securely in Supabase

3. **Enable Webhooks**:
   - Settings → Security → Allow Incoming Webhooks
   - Document webhook base URL for later

---

## Part 3: Integration Setup

### Integrations Needed for Results Learning

#### 1. Teachworks Integration

**API Connection Setup**:

1. **Get Teachworks API Credentials**:
   - Contact Teachworks support
   - Request API documentation
   - Get: Base URL, API Key, Account ID

2. **Create n8n Teachworks Connector**:
   ```
   In n8n:
   - Credentials → New → HTTP Basic Auth
   - Name: "Teachworks API"
   - Username: your_account_id
   - Password: your_api_key
   - URL: https://api.teachworks.com/v1/
   ```

3. **Test Connection**:
   ```
   - Create test workflow
   - Add HTTP Request node
   - GET https://api.teachworks.com/v1/lessons?limit=1
   - Should return lesson data
   ```

**Key Teachworks Endpoints** (typical):
- `GET /lessons` - Fetch lessons
- `GET /students` - Fetch students
- `GET /employees` - Fetch teachers
- `GET /lessons/{id}` - Lesson details
- `GET /reports` - Financial/reporting data

#### 2. Google Sheets Integration

**Setup**:

1. **Create Google Service Account**:
   ```
   - Go to Google Cloud Console
   - Create new project: "Results Learning Automation"
   - Enable Google Sheets API
   - Create Service Account
   - Generate JSON key file
   - Download and keep secure
   ```

2. **Share Sheets with Service Account**:
   ```
   - Find service account email (from JSON key)
   - Open each Google Sheet
   - Share with service account email (as Editor)
   - Do this for:
     * Kristen's Weekly Reports sheet
     * Katie's Program Tracking sheet
     * Katie's Financial Tracking sheet
     * Katie's Compliance Tracking sheet
     * Jennifer's Email Routing sheet
   ```

3. **n8n Google Sheets Credential**:
   ```
   - Credentials → New → Google Sheets OAuth2
   - Name: "Google Sheets Service"
   - Authenticate with service account JSON
   - Test connection
   ```

#### 3. Gmail Integration

**Setup for Jennifer's Email Automation**:

1. **Gmail API Setup**:
   ```
   - Google Cloud Console
   - Enable Gmail API
   - Create OAuth2 credential (Desktop app)
   - Get Client ID and Client Secret
   ```

2. **n8n Gmail Credential**:
   ```
   - Credentials → New → Gmail OAuth2
   - Name: "Gmail API"
   - Add Client ID and Secret
   - Test scope: compose, send, read
   ```

3. **Gmail Label Setup** (for email routing):
   ```
   - Create label in Gmail: "CEO_Review"
   - Jennifer marks emails with this label
   - n8n monitors for emails with label
   ```

#### 4. Supabase Integration (for Monitoring Data)

**Purpose**: Store workflow execution logs and measurement data

**Setup**:

1. **Create n8n Tables in Supabase**:
   ```sql
   -- Workflow Executions (for billing measurement)
   CREATE TABLE n8n_executions (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     workflow_name VARCHAR(255),
     workflow_id VARCHAR(255),
     execution_date TIMESTAMPTZ DEFAULT NOW(),
     execution_time_ms INTEGER,
     status VARCHAR(50), -- success, error, timeout
     items_processed INTEGER,
     hours_saved DECIMAL(10,2),
     notes TEXT
   );

   -- Automation Metrics (for YIELD billing)
   CREATE TABLE automation_metrics (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     staff_member VARCHAR(255),
     automation_name VARCHAR(255),
     baseline_hours_week DECIMAL(10,2),
     automation_time_ms INTEGER,
     hours_saved_week DECIMAL(10,2),
     week_of TIMESTAMPTZ,
     tier VARCHAR(20),
     rate_per_hour DECIMAL(10,2),
     billing_amount DECIMAL(10,2)
   );

   -- Workflow Errors (for debugging)
   CREATE TABLE workflow_errors (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     workflow_name VARCHAR(255),
     error_message TEXT,
     error_timestamp TIMESTAMPTZ DEFAULT NOW(),
     error_context JSONB
   );
   ```

2. **n8n Supabase Credential**:
   ```
   - Credentials → New → PostgreSQL
   - Name: "Supabase Results Learning"
   - Host: your-project.supabase.co
   - Port: 5432
   - Database: postgres
   - User: postgres
   - Password: your_password
   - Test connection
   ```

---

## Part 4: Workflow Architecture

### Workflow Structure Overview

```
n8n Instance (DigitalOcean)
│
├─ Workflow 1: Kristen Weekly Reporting
│  ├─ Trigger: Schedule (Monday 6:00 AM UTC)
│  ├─ Step 1: Fetch lessons from Teachworks API
│  ├─ Step 2: Calculate metrics (hours, revenue, completion)
│  ├─ Step 3: Update Google Sheet
│  ├─ Step 4: Send email notification
│  └─ Step 5: Log to Supabase (for measurement)
│
├─ Workflow 2: Katie Data Entry Sync
│  ├─ Trigger: Schedule (Tuesday 9:00 AM UTC)
│  ├─ Step 1: Fetch lessons from Teachworks
│  ├─ Step 2: Validate data quality
│  ├─ Step 3: Update Program Tracking sheet
│  ├─ Step 4: Update Financial sheet
│  ├─ Step 5: Update Compliance sheet
│  ├─ Step 6: Send summary email
│  └─ Step 7: Log execution to Supabase
│
├─ Workflow 3: Jennifer Email Routing
│  ├─ Trigger: Gmail label added (real-time)
│  ├─ Step 1: Read email with label
│  ├─ Step 2: Extract key info (sender, subject, body)
│  ├─ Step 3: Add to Google Sheet
│  ├─ Step 4: Forward to CEO with context
│  └─ Step 5: Log to Supabase
│
├─ Workflow 4: Nikki Template Auto-Population
│  ├─ Trigger: Google Form submission
│  ├─ Step 1: Get RFP request data
│  ├─ Step 2: Fetch company data
│  ├─ Step 3: Populate template
│  ├─ Step 4: Send document
│  └─ Step 5: Log to Supabase
│
└─ Workflow 5: YIELD Measurement & Billing
   ├─ Trigger: Schedule (weekly)
   ├─ Step 1: Query Supabase executions
   ├─ Step 2: Calculate hours saved per automation
   ├─ Step 3: Calculate billing amounts
   ├─ Step 4: Generate measurement report
   └─ Step 5: Send to admin email
```

---

## Part 5: Detailed Workflow Setup

### Template: Kristen Weekly Reporting Workflow

```json
{
  "name": "Kristen - Weekly Reporting Automation",
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.cronTrigger",
      "config": {
        "cronExpression": "0 6 * * 1", // Every Monday at 6 AM
        "timeZone": "UTC"
      }
    },
    {
      "name": "Fetch Teachworks Lessons",
      "type": "n8n-nodes-base.httpRequest",
      "config": {
        "url": "https://api.teachworks.com/v1/lessons",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer {{$credentials.teachworksAPI}}"
        },
        "params": {
          "start_date": "{{$today.subtract(7, 'days').format('YYYY-MM-DD')}}",
          "end_date": "{{$today.format('YYYY-MM-DD')}}",
          "limit": 1000
        }
      }
    },
    {
      "name": "Calculate Metrics",
      "type": "n8n-nodes-base.code",
      "config": {
        "language": "javascript",
        "code": `
          // Input: Teachworks lessons data
          const lessons = items[0].json.lessons;

          // Group by program
          const byProgram = {};
          lessons.forEach(lesson => {
            const program = lesson.program_name;
            if (!byProgram[program]) {
              byProgram[program] = {
                hours: 0,
                completed: 0,
                scheduled: 0,
                revenue: 0
              };
            }
            byProgram[program].scheduled++;
            if (lesson.status === 'completed') {
              byProgram[program].completed++;
              byProgram[program].hours += lesson.duration_hours;
            }
            // Assume €50/hour rate (adjust as needed)
            if (lesson.status === 'completed') {
              byProgram[program].revenue += lesson.duration_hours * 50;
            }
          });

          // Calculate totals
          const totals = {
            total_hours: 0,
            total_completed: 0,
            total_scheduled: 0,
            total_revenue: 0,
            completion_rate: 0
          };

          Object.values(byProgram).forEach(prog => {
            totals.total_hours += prog.hours;
            totals.total_completed += prog.completed;
            totals.total_scheduled += prog.scheduled;
            totals.total_revenue += prog.revenue;
          });

          totals.completion_rate = (totals.total_completed / totals.total_scheduled * 100).toFixed(1);

          return {
            json: {
              by_program: byProgram,
              totals: totals,
              week_of: new Date().toISOString().split('T')[0]
            }
          };
        `
      }
    },
    {
      "name": "Update Google Sheet",
      "type": "n8n-nodes-base.googleSheets",
      "config": {
        "spreadsheetId": "YOUR_SHEET_ID",
        "range": "Weekly Reports!A:H",
        "operation": "append",
        "values": "{{JSON.stringify([
          ['{{$now.format('YYYY-MM-DD')}}',
           '{{$node.Calculate Metrics.json.totals.total_hours}}',
           '{{$node.Calculate Metrics.json.totals.total_completed}}',
           '{{$node.Calculate Metrics.json.totals.total_scheduled}}',
           '{{$node.Calculate Metrics.json.totals.completion_rate}}%',
           '€{{$node.Calculate Metrics.json.totals.total_revenue}}',
           'Automated',
           'Success']
        ])}}"
      }
    },
    {
      "name": "Send Email",
      "type": "n8n-nodes-base.sendGrid",
      "config": {
        "from": "automation@results-learning.com",
        "to": "kristen@results-learning.com",
        "subject": "Weekly Report Ready - {{$now.format('MMM DD, YYYY')}}",
        "htmlBody": `
          <h2>Weekly Hours & Revenue Report</h2>
          <p>Report for week of: {{$node.Calculate Metrics.json.week_of}}</p>

          <h3>Summary</h3>
          <ul>
            <li>Total Hours: {{$node.Calculate Metrics.json.totals.total_hours}}</li>
            <li>Lessons Completed: {{$node.Calculate Metrics.json.totals.total_completed}}</li>
            <li>Completion Rate: {{$node.Calculate Metrics.json.totals.completion_rate}}%</li>
            <li>Total Revenue: €{{$node.Calculate Metrics.json.totals.total_revenue}}</li>
          </ul>

          <p><strong>Full report updated in Google Sheet</strong></p>
        `
      }
    },
    {
      "name": "Log to Supabase",
      "type": "n8n-nodes-base.postgres",
      "config": {
        "query": `
          INSERT INTO automation_metrics
          (staff_member, automation_name, baseline_hours_week, automation_time_ms, hours_saved_week, week_of, tier, rate_per_hour, billing_amount)
          VALUES
          ('Kristen', 'Weekly Reporting', 5.0, {{$executionTime}}, 4.92, NOW(), 'Tier 2', 6, 29.52)
        `
      }
    }
  ]
}
```

---

## Part 6: Security & Monitoring

### Security Best Practices

1. **Credential Management**:
   ```
   - NEVER hardcode API keys
   - Use n8n Credential storage (encrypted)
   - Rotate API keys every 90 days
   - Different credentials per environment
   ```

2. **Data Protection**:
   ```
   - Enable HTTPS/TLS
   - Use environment variables for secrets
   - Encrypt sensitive data in Supabase
   - Limit API access by IP if possible
   ```

3. **Access Control**:
   ```
   - n8n: One admin user + read-only team members
   - Google Sheets: Service account with least privilege
   - Teachworks: Dedicated API user (not personal)
   - Supabase: RLS policies on measurement tables
   ```

### Monitoring Dashboard

**Create n8n Monitor Workflow** (runs weekly):

```
Monitor Workflow:
1. Query Supabase for failed executions
2. Check each workflow's uptime
3. Calculate total hours saved
4. Flag any errors or warnings
5. Send weekly status email to admin

Report includes:
- Workflow uptime (target: 99%)
- Error rate (target: <2%)
- Total hours saved (vs baseline)
- Estimated billing for month
- Any issues needing attention
```

**Create Grafana Dashboard** (optional, for visualization):
- Workflow execution timeline
- Hours saved per automation per week
- Error rate trending
- Performance metrics

---

## Part 7: Deployment Checklist

### Pre-Deployment
- [ ] DigitalOcean account created and funded
- [ ] Domain registered (optional)
- [ ] Teachworks API credentials obtained
- [ ] Google Service Account created with Sheets API enabled
- [ ] Gmail API enabled (for Jennifer's automation)
- [ ] Supabase tables created
- [ ] All integrations tested locally

### Deployment
- [ ] n8n deployed to DigitalOcean
- [ ] HTTPS/TLS configured
- [ ] Admin user created
- [ ] All credentials entered in n8n
- [ ] Webhook URLs documented
- [ ] Backup procedures set up

### Post-Deployment
- [ ] Test each workflow with sample data
- [ ] Verify Google Sheet updates
- [ ] Verify email notifications send
- [ ] Verify Supabase logging works
- [ ] Run baseline measurement period (1 week)
- [ ] Calibrate hour calculations
- [ ] Schedule training sessions with team

### Launch
- [ ] Go-live date confirmed
- [ ] Team trained on automation
- [ ] Monitoring dashboard live
- [ ] Support contact established
- [ ] First weekly measurement completed
- [ ] First invoice generated (for verification)

---

## Part 8: Maintenance & Scaling

### Weekly Tasks
- [ ] Check workflow execution logs
- [ ] Verify measurement data accuracy
- [ ] Review error logs
- [ ] Confirm emails sent successfully

### Monthly Tasks
- [ ] Generate measurement report
- [ ] Calculate billing
- [ ] Review automation performance
- [ ] Plan optimizations

### Quarterly Tasks
- [ ] Rotate API credentials
- [ ] Review and update workflows
- [ ] Assess new automation opportunities
- [ ] Plan Phase 2 automations

### Scaling (Future)
```
When Results Learning grows:

Single Workflow → Multiple Workflows
- Current: 4 live workflows
- Phase 2: Add Cyle's automation (+1)
- Phase 3: Add workflow for each department

Single Instance → Multi-Instance
- Load balancer between instances
- Dedicated database for performance
- Failover instance for redundancy
```

---

## Part 9: Cost Breakdown

### Monthly Infrastructure Costs

| Component | Cost | Notes |
|---|---|---|
| DigitalOcean Droplet (Standard) | $12 | n8n instance |
| PostgreSQL Database (Managed) | $15 | n8n database + logs |
| SendGrid (if email volume high) | $10 | Optional, email sending |
| Domain (annual) | $1.67/mo | Simple Mail provider |
| Slack Notifications (optional) | $0 | Use free tier |
| **Total Infrastructure** | **$38.67/mo** | Or ~$464/year |

### Software Costs
- n8n: Free (self-hosted open source)
- Google Sheets API: Free
- Gmail API: Free
- Supabase: Free tier sufficient for logging

### Total Monthly Operational Cost
**~$39/month** vs traditional SaaS (~$200-500/month)

### ROI on Infrastructure
```
Infrastructure Cost: $464/year
YIELD Revenue (Results Learning): $6,143/year
Profit on YIELD: $6,143 - $464 = $5,679/year (92% margin)
```

---

## Part 10: Disaster Recovery

### Backup Strategy

1. **n8n Workflows**:
   ```
   - Export all workflows weekly to GitHub
   - Version control all workflow JSON
   - Can restore in <5 minutes
   ```

2. **Measurement Data**:
   ```
   - Supabase automatic backups
   - Weekly download to external storage
   - Can restore in <1 hour
   ```

3. **Google Sheets**:
   ```
   - Google Drive versioning (automatic)
   - Weekly snapshots to external storage
   - Can restore to any previous version
   ```

### Failover Procedure
```
If main n8n instance goes down:

1. Alert sent automatically within 5 minutes
2. Can spin up replacement instance in DigitalOcean (15 min)
3. Restore workflows from GitHub (5 min)
4. Reschedule any missed executions (manual, 10 min)
5. Resume operation in <30 minutes total

During downtime:
- Workflows don't execute
- Manual process could be used as fallback
- Data won't be lost (backed up)
- Billing calculated when workflows resume
```

---

## Quick Start Command Reference

```bash
# DigitalOcean Deployment
doctl apps create --spec app.yaml

# Export n8n Workflows to Git
# (Via UI: Settings → Data Export)

# Verify n8n Health
curl https://your-domain.com/health

# Test Teachworks Connection
curl -H "Authorization: Bearer YOUR_KEY" \
  https://api.teachworks.com/v1/lessons?limit=1

# Check Supabase Connection
psql "postgresql://user:pass@host:5432/n8n"

# Restart n8n (if needed)
doctl apps restart YOUR_APP_ID
```

---

## Support & Documentation

### n8n Resources
- Official Docs: https://docs.n8n.io
- Community Forum: https://community.n8n.io
- Example Workflows: https://n8n.io/workflows

### For This Implementation
- All workflow definitions stored in `/n8n-workflows/` (GitHub)
- Setup documentation in this file
- Troubleshooting guide in separate document
- Support contact: (your email)

---

## Summary

**n8n Setup for Results Learning**:
- ✅ Self-hosted on DigitalOcean ($39/month)
- ✅ 5 core workflows for YIELD Framework
- ✅ Connected to Teachworks, Google Sheets, Gmail
- ✅ Measurement data logged to Supabase
- ✅ Automated billing based on actual time saved
- ✅ Scalable for future growth

**Ready to deploy once:**
1. DigitalOcean account created
2. All integrations tested locally
3. Team trained on monitoring
4. Baseline measurements confirmed

---

*n8n Setup Guide v1.0*
*Results Learning - January 2026*
