import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { nanoid } from 'nanoid';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const urlSchema = new mongoose.Schema({ shortId: String, longUrl: String });
const Url = mongoose.model('Url', urlSchema);

app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const shortId = nanoid(6);
  await Url.create({ shortId, longUrl });
  res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
});

app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });
  url ? res.redirect(url.longUrl) : res.status(404).json({ error: 'Not found' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
