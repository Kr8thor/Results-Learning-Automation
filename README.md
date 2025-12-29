# Results Learning Automation

n8n workflow automation suite for Results Learning tutoring business, featuring Teachworks integration.

## Overview

This repository contains automation workflows designed to streamline operations for tutoring businesses using Teachworks as their management platform.

## Workflows Included

### 1. Student Data Management
- Automated attendance tracking
- Student data synchronization with Supabase

### 2. Email Management
- Email triage and prioritization
- VIP sender detection
- AI-powered email categorization using OpenAI
- Automated logging to Google Sheets

### 3. Task Allocation
- Automated task distribution workflows

### 4. Teachworks Integration (Main Feature)
Comprehensive automation suite for Teachworks platform:

| Flow | Trigger | Description |
|------|---------|-------------|
| **Daily Morning Schedule** | 7:00 AM | Fetches today's lessons and sends morning briefing email |
| **End of Day Report** | 8:00 PM | Analyzes completion rates, no-shows, and missing notes |
| **Weekly Teacher Performance** | Mondays | Calculates per-teacher metrics and productivity stats |
| **Inactive Student Detection** | 9:00 AM | Identifies students with no recent lessons for re-engagement |
| **Teacher Schedule Analysis** | 6:00 AM | Detects conflicts, overbooked days, and underutilized teachers |
| **Availability Check Webhook** | On-demand | Real-time API for checking teacher availability |

## Setup Instructions

### Prerequisites
- n8n instance (self-hosted or cloud)
- Teachworks account with API access
- Gmail account with OAuth configured
- (Optional) Supabase account for data storage

### Teachworks API Setup
1. Go to Teachworks → Settings → API
2. Generate an API Token
3. In n8n, create an "HTTP Header Auth" credential:
   - **Name:** `Teachworks API`
   - **Header Name:** `Authorization`
   - **Header Value:** `Token YOUR_API_TOKEN`

### Importing Workflows
1. Open n8n
2. Go to Workflows → Import from File
3. Select the workflow JSON file from the appropriate folder
4. Update credential IDs to match your n8n instance
5. Activate the workflow

## File Structure

```
Results-Learning-Automation/
├── 1-Student-Data-Management/
│   └── n8n-attendance-workflow.json
├── 2-Email-Management/
│   └── n8n-email-triage-workflow.json
├── 3-Task-Allocation-Documentation/
│   └── n8n-task-allocation-workflow.json
├── 4-Teachworks-Integration/
│   └── n8n-teachworks-demo-workflow.json
├── LOVABLE-PROMPT-PROPOSAL.md
└── README.md
```

## Webhook API Reference

### Check Teacher Availability
**Endpoint:** `POST /webhook/schedule-lesson`

**Request Body:**
```json
{
  "teacher_id": 123,
  "student_name": "John Smith",
  "date": "2024-01-15",
  "start_time": "14:00",
  "end_time": "15:00"
}
```

**Response:**
```json
{
  "isAvailable": true,
  "teacher": "Jane Doe",
  "message": "Time slot is available!",
  "alternatives": []
}
```

## Customization

### Adjustable Thresholds
- **Overbooked threshold:** 8 hours/day (configurable in code)
- **Underutilized threshold:** 10 hours/week (configurable in code)
- **Inactive student threshold:** 7 days without lessons

### Email Recipients
Update the `sendTo` parameter in Gmail nodes to customize notification recipients.

## License

Private - Results Learning

## Support

For questions or support, contact the development team.
