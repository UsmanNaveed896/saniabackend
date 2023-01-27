
import { TwitterApi } from 'twitter-api-v2';


const tweet = async (req, res) => {

    try {
        const client = new TwitterApi({
            AccessToken: process.env.AccessToken,
            SecretAcessToken: process.env.SecretAcessToken,
            ApiKey: process.env.APIKey,
            SecretApikey: process.env.APIKeySecret
        });
        const params = {
            q: req.params.q,
            count: req.params.count
        };
        client.get('search/tweets', params, (err, data) => {
          if(err){
            res.status(500).send({
				// eslint-disable-next-line no-undef
				err
			}); 
          }
          res.status(200).send({
            // eslint-disable-next-line no-undef
            result:data,
            Message: 'Event Created Successfully',
            
        });
        });
    } catch (e) {
        console.log(e);
    }
};
const tweetPost = async (req, res) => {

    try {
        const client = new TwitterApi({
            AccessToken: process.env.AccessToken,
            SecretAcessToken: process.env.SecretAcessToken,
            ApiKey: process.env.APIKey,
            SecretApikey: process.env.APIKeySecret
        });
        const params = {
            id:req.params.id
        };
        client.post('statuses/retweet/:id', params, (err, data) => {
          if(err){
            res.status(500).send({
				// eslint-disable-next-line no-undef
				err
			}); 
          }
          res.status(200).send({
            // eslint-disable-next-line no-undef
            result:data,
            Message: 'Event Created Successfully',
            
        });
        });
    } catch (e) {
        console.log(e);
    }
};
export default{tweet,tweetPost};
