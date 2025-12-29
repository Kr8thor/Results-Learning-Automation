-- Disable RLS on questionnaire_responses table to allow anonymous API access
ALTER TABLE results_learning.questionnaire_responses DISABLE ROW LEVEL SECURITY;

-- Also ensure proper grants
GRANT ALL ON results_learning.questionnaire_responses TO anon;
GRANT ALL ON results_learning.questionnaire_responses TO authenticated;
GRANT USAGE ON SCHEMA results_learning TO anon;
GRANT USAGE ON SCHEMA results_learning TO authenticated;
