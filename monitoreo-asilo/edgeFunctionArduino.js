// Example Supabase Edge Function (written in JavaScript)
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabase = createClient('https://nlvojgrzpeyyjujpgvqw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdm9qZ3J6cGV5eWp1anBndnF3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzM0ODA2MywiZXhwIjoyMDM4OTI0MDYzfQ.wD4gJ8ex9QOTcfENz6ZiE761RryCe8WlExymUjXyEzs');
  
  if (req.method === 'POST') {
    const { temperature, board_id, sensor_id , registered_at } = req.body;

    const { data, error } = await supabase
      .from('temperatures')
      .insert([{ registered_at, temperature, board_id, sensor_id }]);

    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ data });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}