const evaluateCode = async (context: string) => {

    let test = await eval(context);
    
    console.log(test, 'evalc')
    
};

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data:any;

            evaluateCode(req.body.context)

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }

}
