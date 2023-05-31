import { supabase } from '../../../supabaseClient';

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            console.log(req.body, 'qwe')

            let user_data = {
                user: req.body.user,
                questions_remaining: req.body.questions_remaining,
                progress: req.body.progress
            }

            const { data, error } = await supabase
                .from('users')
                .upsert(user_data)

            res.status(200).json("Success")

            console.log(data, error)

        };

    }

    catch (err) { console.log(err) }
}

