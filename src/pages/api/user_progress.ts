import { supabase } from '../../../supabaseClient';

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let user_data = {
                user: req.body.user,
                questions_remaining: req.body.questions_remaining,
                progress: req.body.progress
            }

            const { data, error } = await supabase
                .from('users')
                .upsert(user_data)

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }
}

