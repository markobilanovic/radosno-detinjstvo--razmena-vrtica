import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
    const person = req.body;
    const { error } = await supabase.from('persons')
        .delete()
        .eq('email', person.email)

    if (error) {
        res.status(500).json({ error });
    } else {
        res.status(200).json({ ok: 'ok' })
    }
}
