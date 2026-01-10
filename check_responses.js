const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://qyspmedutegwcdwlbbot.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5c3BtZWR1dGVnd2Nkd2xiYm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzQ1NTgsImV4cCI6MjA3OTMxMDU1OH0.DHayxPYKp6EiWsBvUxWAtsk3lr8REt2ADpIL-L1ggb8'
);

async function checkResponses() {
  try {
    const { data, error } = await supabase
      .schema('results_learning')
      .from('questionnaire_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('\n=== QUESTIONNAIRE RESPONSES ===');
    console.log('Total responses: ' + data.length + '\n');

    data.forEach((response, idx) => {
      console.log('\n--- Response ' + (idx + 1) + ' ---');
      console.log('ID: ' + response.id);
      console.log('Client: ' + response.client_name);
      console.log('Completed by: ' + response.completed_by + ' (' + response.completed_by_role + ')');
      console.log('Status: ' + response.status);
      console.log('Created: ' + new Date(response.created_at).toLocaleString());
      console.log('Updated: ' + new Date(response.updated_at).toLocaleString());
      if (response.submitted_at) {
        console.log('Submitted: ' + new Date(response.submitted_at).toLocaleString());
      }
      console.log('Progress: ' + response.progress_percentage + '%');

      if (response.time_allocation && Object.keys(response.time_allocation).length > 0) {
        console.log('\nTime Allocation:');
        Object.entries(response.time_allocation).forEach(([activity, data]) => {
          console.log('  - ' + activity + ': ' + data.minutes + 'm/day (frustration: ' + data.frustration + '/5)');
        });
      }

      if (response.top_pain_points && response.top_pain_points.length > 0) {
        console.log('\nTop Pain Points:');
        response.top_pain_points.forEach(point => {
          console.log('  ' + point.rank + '. ' + point.process);
        });
      }

      if (response.repetitive_tasks && response.repetitive_tasks.length > 0) {
        console.log('\nRepetitive Tasks: ' + response.repetitive_tasks.join(', '));
      }

      if (response.current_tools && response.current_tools.length > 0) {
        console.log('\nCurrent Tools: ' + response.current_tools.join(', '));
      }

      if (response.one_task_to_automate) {
        console.log('\nOne Task to Automate: ' + response.one_task_to_automate);
      }

      if (response.top_three_automations && response.top_three_automations.length > 0) {
        console.log('\nTop 3 Automations:');
        response.top_three_automations.forEach((auto, i) => {
          console.log('  ' + (i + 1) + '. ' + auto);
        });
      }
    });

  } catch (error) {
    console.error('Fatal error:', error);
  }
}

checkResponses();
