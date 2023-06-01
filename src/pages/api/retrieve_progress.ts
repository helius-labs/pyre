import { supabase } from '../../../supabaseClient';

export default async function handler(req: any, res: any) {
    try {
        if (req.method === "POST") {

            const { data, error } = await supabase
                .from('users')
                .select()
                .eq('user', req.body.user)

            res.status(200).json(data)

        };

    }
    catch (err) { console.log(err) }
}




