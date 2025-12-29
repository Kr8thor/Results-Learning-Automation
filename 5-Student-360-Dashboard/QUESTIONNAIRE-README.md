# Business Process Discovery Questionnaire Dashboard

An interactive, modern questionnaire dashboard for capturing business process pain points and automation opportunities. Built with vanilla HTML/CSS/JavaScript and Supabase for data persistence.

## Features

- **Beautiful Dark Theme UI** - Modern glassmorphism design with gradient accents
- **7-Section Progressive Form** - Organized into logical sections with navigation
- **Interactive Elements**:
  - Clickable frustration ratings (1-5 scale with color coding)
  - Multi-select checkboxes with visual feedback
  - Ranking dropdowns for pain point prioritization
  - Dynamic report rows (add more as needed)
- **Auto-Save** - Responses are automatically saved to Supabase as drafts
- **Progress Tracking** - Visual progress bar and section completion indicators
- **Admin Dashboard** - View and analyze all submitted questionnaires

## Setup Instructions

### 1. Configure Supabase

1. Go to your Supabase project: https://supabase.com/dashboard/project/qyspmedutegwcdwlbbot

2. Run the migration to create the questionnaire table:
   - Navigate to **SQL Editor**
   - Open the file: `supabase/migrations/20251229230000_questionnaire_schema.sql`
   - Copy and execute the SQL

3. Get your **anon key**:
   - Go to **Project Settings** > **API**
   - Copy the `anon` / `public` key

4. Update the dashboard files:
   - Open `questionnaire-dashboard.html`
   - Find the line: `const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';`
   - Replace with your actual anon key

   - Open `questionnaire-admin.html`
   - Do the same replacement

### 2. Deploy the Dashboard

#### Option A: Local Testing
Simply open the HTML files in your browser:
- `questionnaire-dashboard.html` - Client-facing questionnaire
- `questionnaire-admin.html` - Admin view of responses

#### Option B: Deploy to Hosting
Upload the HTML files to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

### 3. Share with Clients

Send clients the link to `questionnaire-dashboard.html`. They can:
- Fill out the questionnaire in multiple sessions (auto-saved)
- See their progress through the visual indicators
- Submit when complete

## File Structure

```
5-Student-360-Dashboard/
├── questionnaire-dashboard.html   # Client-facing questionnaire form
├── questionnaire-admin.html       # Admin dashboard to view responses
└── QUESTIONNAIRE-README.md        # This file

supabase/migrations/
└── 20251229230000_questionnaire_schema.sql  # Database schema
```

## Database Schema

The questionnaire responses are stored in `results_learning.questionnaire_responses` with these key fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `client_name` | VARCHAR | Company/client name |
| `completed_by` | VARCHAR | Name of person completing |
| `time_allocation` | JSONB | Activity hours and frustration levels |
| `repetitive_tasks` | TEXT[] | Selected repetitive tasks |
| `top_pain_points` | JSONB | Ranked pain points (1-5) |
| `one_task_to_automate` | TEXT | Priority automation target |
| `estimated_time_saved_hours` | DECIMAL | Potential time savings |
| `emails_per_day` | VARCHAR | Email volume selection |
| `common_questions` | TEXT[] | List of repetitive questions |
| `current_tools` | TEXT[] | Tools currently in use |
| `manual_reports` | JSONB | Reports created manually |
| `top_three_automations` | TEXT[] | Priority automations |
| `success_definition` | TEXT | 6-month success criteria |
| `status` | VARCHAR | 'draft' or 'submitted' |
| `progress_percentage` | INTEGER | 0-100 completion percentage |

## Customization

### Adding New Questions
1. Add the question HTML to the appropriate section in `questionnaire-dashboard.html`
2. Add the field to `collectFormData()` function
3. Add the column to the database migration
4. Update `questionnaire-admin.html` to display the new field

### Styling
All styles are embedded in the HTML files. Key CSS variables are at the top:
```css
:root {
    --primary: #6366f1;
    --secondary: #10b981;
    --bg-dark: #0f172a;
    --bg-card: #1e293b;
    /* ... */
}
```

### Adding Sections
1. Add a new nav pill to `section-nav`
2. Create a new `<section>` with the next number
3. Update `totalSections` constant
4. Add navigation buttons

## Security Notes

- The anon key is safe to expose in client-side code - it only allows operations permitted by Row Level Security (RLS)
- RLS is configured to allow insert/select for anonymous users
- For production, consider:
  - Adding authentication for the admin dashboard
  - Implementing rate limiting
  - Adding CAPTCHA to prevent spam submissions

## Integration with n8n

You can trigger n8n workflows when questionnaires are submitted:

1. Create a webhook trigger in n8n
2. In Supabase, create a database webhook:
   - Go to **Database** > **Webhooks**
   - Create webhook on `INSERT` to `questionnaire_responses` where `status = 'submitted'`
   - Point to your n8n webhook URL

This enables automatic:
- Email notifications to sales team
- CRM record creation
- Follow-up task scheduling
