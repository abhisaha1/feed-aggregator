const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
let Parser = require('rss-parser');
let parser = new Parser();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rssFeeds = [
  'https://www.google.com/alerts/feeds/00535233684744274122/487733051825527716',
  'https://www.google.com/alerts/feeds/00535233684744274122/4798842631179472103',
];

// Basic route
const ALLOWED_FIELDS = ['title', 'link', 'pubDate']
app.get('/', async (req, res) => {
  const feedData = await Promise.all(rssFeeds.map((feed) => {
    return new Promise(async (resolve) => {
        let response = await parser.parseURL(feed);
        resolve(response.items);
    });
  }));
  const fullData = []
  feedData.forEach(feed => {
    fullData.push(...feed)
  })
  
  res.json(fullData.map(item => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate
  })));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
