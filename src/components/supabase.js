import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://akogujvtoroycqqneydr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrb2d1anZ0b3JveWNxcW5leWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0MjY3OTUsImV4cCI6MjA0NzAwMjc5NX0.VSum6DmtqtdlMs6eCnIF6ewhx7koBf4jG80Z6ZILEJQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
