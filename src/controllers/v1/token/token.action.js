import dotenv from 'dotenv';
import md5 from 'md5';
import { StreamChat } from 'stream-chat';

dotenv.config();

exports.token = async (req, res) => {
    try {
        const data = req.body;

        const apiKey = process.STREAM_API_KEY;
        const apiSecret = process.env.STREAM_API_SECRET;

        // Heroku
        if (process.env.STREAM_URL) {
            const [apiKey, apiSecret] = process.env.STREAM_URL.substr(8)
                .split('@')[0]
                .split(':');
        }

        const client = new StreamChat(apiKey, apiSecret);

        const user = Object.assign({}, data, {
            id: md5(data.email),
            role: 'admin',
            image: `https://robohash.org/${data.email}`,
        });
        const token = client.createToken(user.id);
        await client.updateUsers([user]);

        res.status(200).json({ user, token, apiKey });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
