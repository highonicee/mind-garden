import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xaaydzsxaizryjbhtomx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhYXlkenN4YWl6cnlqYmh0b214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MTc4MDksImV4cCI6MjA3NzI5MzgwOX0.K0zoYNKAMEoA6njpWJNyI3erQdPzjxUIByFeTTdKvs8'

export const supabase = createClient(supabaseUrl, supabaseKey)