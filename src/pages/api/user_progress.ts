import { supabase } from '../../../supabaseClient';

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let user_data = {
                user: req.body.user,
                completed_questions: req.body.completed_questions,
                progress: req.body.progress,
                minted_award: req.body.minted_award
            }

            const { data, error } = await supabase
                .from('users')
                .upsert(user_data)

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }
}

