const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://qyspmedutegwcdwlbbot.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5c3BtZWR1dGVnd2Nkd2xiYm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzQ1NTgsImV4cCI6MjA3OTMxMDU1OH0.DHayxPYKp6EiWsBvUxWAtsk3lr8REt2ADpIL-L1ggb8'
);

async function deleteEntries() {
  try {
    // Delete Leo's entries (client_name = 'Leo')
    const { error } = await supabase
      .schema('results_learning')
      .from('questionnaire_responses')
      .delete()
      .eq('client_name', 'Leo');

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('Successfully deleted Leo\'s entries');

    // Get remaining count
    const { data, error: countError } = await supabase
      .schema('results_learning')
      .from('questionnaire_responses')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Count error:', countError);
      return;
    }

    console.log('Remaining responses: ' + data.length);

  } catch (error) {
    console.error('Fatal error:', error);
  }
}

deleteEntries();
