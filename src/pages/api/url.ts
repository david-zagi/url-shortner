import type { NextApiRequest, NextApiResponse } from 'next'
import Url from '../../models/url'

import validUrl from 'valid-url'

import shortid from 'shortid'
import { connectDb } from '@/components/connector/mongoose-connector'


const baseUrl = ``


export default  async function urlHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { longUrl } = req.body;
    // validate long url
    if(!validUrl.isUri(longUrl)){
        return res.status(401).json('Invalid long url');
    }

    //create short url
    const urlCode = shortid.generate();
    
    await connectDb(baseUrl);
     if(validUrl.isUri(longUrl)){
         try {
            let url = await Url.collection.findOne({ longUrl });
            console.log({url})
            if(url){
                // increment the clickCounter
                
                const incrementCount = url.clickCount + 1;
                
                //@ts-ignore
                await Url.update({longUrl},{saveSameCount: url.saveSameCount + 1, date: Date.now});
                res.json("Success")
            }else{
                const shortUrl = urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    clickCount: 0,
                    saveSameCount: 1,
                    urlCode,
                    date: new Date()
                });
                console.log({newURL: url})
                await url?.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error ' + err)
        }
    }else {
        res.status(401).json('Invalid long url');
    }
}