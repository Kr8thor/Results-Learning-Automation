-- =====================================================
-- Business Process Discovery Questionnaire Schema
-- Project: qyspmedutegwcdwlbbot
-- =====================================================

-- Questionnaire responses table
CREATE TABLE IF NOT EXISTS results_learning.questionnaire_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Client info
    client_name VARCHAR(255),
    completed_by VARCHAR(255),
    completed_by_role VARCHAR(100),

    -- Section 1: Time Allocation Overview
    time_allocation JSONB DEFAULT '{}',
    -- Structure: {activity: {hours: number, frustration: number}}

    repetitive_tasks TEXT[] DEFAULT '{}',
    repetitive_tasks_other TEXT,

    -- Section 2: Biggest Pain Points
    top_pain_points JSONB DEFAULT '[]',
    -- Structure: [{process: string, rank: number}]

    one_task_to_automate TEXT,
    estimated_time_saved_hours DECIMAL(5,2),
    dreaded_tasks TEXT,

    -- Section 3: Communication Bottlenecks
    emails_per_day VARCHAR(20),
    repetitive_email_percentage VARCHAR(20),
    common_questions TEXT[] DEFAULT '{}',
    chase_frequency VARCHAR(50),
    chase_targets TEXT[] DEFAULT '{}',
    chase_targets_other TEXT,

    -- Section 4: Manual Processes & Workarounds
    typical_process_name TEXT,
    typical_process_steps TEXT[] DEFAULT '{}',
    typical_process_time VARCHAR(50),
    current_tools TEXT[] DEFAULT '{}',
    current_tools_details JSONB DEFAULT '{}',
    copy_paste_between_systems BOOLEAN DEFAULT FALSE,
    copy_paste_systems TEXT,
    information_wish_list TEXT,

    -- Section 5: Reporting & Visibility
    manual_reports JSONB DEFAULT '[]',
    -- Structure: [{name: string, frequency: string, time: string}]

    realtime_kpis TEXT,
    unnoticed_problems TEXT,

    -- Section 6: Impact Assessment
    time_reclaimed_usage TEXT,
    high_value_tasks TEXT,
    low_value_tasks TEXT,
    things_falling_through_cracks TEXT,
    previous_solution_attempts TEXT,

    -- Section 7: Quick Wins & Priorities
    top_three_automations TEXT[] DEFAULT '{}',
    success_definition TEXT,
    additional_notes TEXT,

    -- Metadata
    status VARCHAR(20) DEFAULT 'draft',
    progress_percentage INTEGER DEFAULT 0,
    submitted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_questionnaire_status ON results_learning.questionnaire_responses(status);
CREATE INDEX IF NOT EXISTS idx_questionnaire_created ON results_learning.questionnaire_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_questionnaire_client ON results_learning.questionnaire_responses(client_name);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_questionnaire_updated_at ON results_learning.questionnaire_responses;
CREATE TRIGGER update_questionnaire_updated_at
    BEFORE UPDATE ON results_learning.questionnaire_responses
    FOR EACH ROW EXECUTE FUNCTION results_learning.update_updated_at();

-- Grant permissions
GRANT ALL ON results_learning.questionnaire_responses TO authenticated;
GRANT ALL ON results_learning.questionnaire_responses TO anon;

-- Completion message
DO $$
BEGIN
    RAISE NOTICE 'Questionnaire schema created successfully!';
END $$;
