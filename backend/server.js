require = require('esm')(module)
import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()

app.use(cors())

const PORT = process.env.PORT || 5000

app.get('/api/posts/:subreddit', async(req, res) => {
  const subreddit = req.params.subreddit;
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    res.status(500).json({error:'Internal server error()'})
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
