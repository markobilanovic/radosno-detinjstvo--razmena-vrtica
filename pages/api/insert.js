// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  const person = req.body;
  const { error } = await supabase.from('persons').insert(person);

  if (error) {
    res.status(500).json({ error })
  } else {
    res.status(201).json({ ok: 'ok' })
  }
}
