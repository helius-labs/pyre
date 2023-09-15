
const url = `https://api.tensor.so/graphql`
const axios = require('axios')

const getFP = async (context:string) => {
    // const response = await fetch(url,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-TENSOR-API-KEY': process.env.TENSOR_KEY?process.env.TENSOR_KEY:"",
    //       },
    //       body: JSON.stringify({
    //         query: `
    //         query CollectionStats($slug: String!) {
    //             instrumentTV2(slug: $slug) {
    //               slug,
    //               statsV2 {
    //                 currency
    //                 sellNowPrice
    //                 floor1h
    //               }
    //                 slug: "HV4Nvm9zHfNA43JYYkjZu8vwqiuE8bfEhwcKFfyQ65o5",

    //             }
    //           }
    //         `
    //       }),
    //     });

        const response = await axios.post(
          "https://api.tensor.so/graphql",
          {
            query: `            query CollectionStats($slug: String!) {
              instrumentTV2(slug: $slug) {
                slug,
                statsV2 {
                  currency
                  sellNowPrice
                  floor1h
                }
                  slug: "HV4Nvm9zHfNA43JYYkjZu8vwqiuE8bfEhwcKFfyQ65o5",

              }
            }`,
            variables: {
              slug: "HV4Nvm9zHfNA43JYYkjZu8vwqiuE8bfEhwcKFfyQ65o5",
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-TENSOR-API-KEY": process.env.TENSOR_KEY,
            },
          }
        );
    
      const data = await response.json()
      console.log(data, 's')
    return data;
};

const getExample = async (context:string) => {

    const url = `https://api.helius.xyz/v1/nft-events?api-key=${process.env.HELIUS_KEY}`
  
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: {
            accounts: [context],
            types: ["NFT_SALE"],
          }
        }),
      });
  
    const data = await response.json()
    return data  
  };
  
export default async function handler(req: any, res: any) {

    // try {
    //     if (req.method === "POST") {
    //         let data;

    //         if (req.body.type=="answer") {
    //             data = await getNftEvents(req.body.context)
    //         }
    //         else if (req.body.type=="example") {
    //             data = await getExample(req.body.context)
    //         }

    //         res.status(200).json(data)
    //     };

    // }
    let data = await getFP('a');

    res.status(200).json(data)

    // catch (err) { console.log(err) }

}
