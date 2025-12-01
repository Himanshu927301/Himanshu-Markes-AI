import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eeusdukckrqwsfoypkai.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldXNkdWtja3Jxd3Nmb3lwa2FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1ODQwNDIsImV4cCI6MjA4MDE2MDA0Mn0.wyUuM7eour4-JJYrhVYhiXlS7aK4pXvUADTaJW5f6uU';

export const supabase = createClient(supabaseUrl, supabaseKey);