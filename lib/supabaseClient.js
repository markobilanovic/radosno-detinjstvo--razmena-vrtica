import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('https://qeuhxjgeqzmjgtvzfiwz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldWh4amdlcXptamd0dnpmaXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA3MjQ5NzUsImV4cCI6MTk5NjMwMDk3NX0.3J-pAHHQvvn0h_JA8-IkzfJNNxYhULHzNiKdCh1Qe6c');