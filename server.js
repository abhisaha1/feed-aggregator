const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
let Parser = require('rss-parser');
let parser = new Parser();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rssFeeds = [
  'https://www.google.com/alerts/feeds/00535233684744274122/8378428220344810704',
  'https://www.google.com/alerts/feeds/00535233684744274122/4028123715123824358',
  'https://www.google.com/alerts/feeds/00535233684744274122/15887160396950349304',
  'https://www.google.com/alerts/feeds/00535233684744274122/487733051825527716',
  'https://www.google.com/alerts/feeds/00535233684744274122/4798842631179472103',
  'https://www.google.com/alerts/feeds/00535233684744274122/12779468768334470494',
  'https://www.google.com/alerts/feeds/00535233684744274122/3338070903770865100',
  'https://www.google.com/alerts/feeds/00535233684744274122/15700916142949631709',
  'https://www.google.com/alerts/feeds/00535233684744274122/10072482497841134741',
  'https://www.google.com/alerts/feeds/00535233684744274122/9642334099703744023',
  'https://www.google.com/alerts/feeds/00535233684744274122/13304326625407378846',
  'https://www.google.com/alerts/feeds/00535233684744274122/11430515166256539925',
  'https://www.google.com/alerts/feeds/00535233684744274122/4584062697790258741',
  'https://www.google.com/alerts/feeds/00535233684744274122/12893342808999147990',
  'https://www.google.com/alerts/feeds/00535233684744274122/8197730922361596426',
  'https://www.google.com/alerts/feeds/00535233684744274122/7380130487540644611',
  'https://www.google.com/alerts/feeds/00535233684744274122/10265046117952155470',
  'https://www.google.com/alerts/feeds/00535233684744274122/8551208919200025693',
  'https://www.google.com/alerts/feeds/00535233684744274122/454018051588849953',
  'https://www.google.com/alerts/feeds/00535233684744274122/16783618325712301020',
  'https://www.google.com/alerts/feeds/00535233684744274122/11430515166256539038',
];

// Basic route
app.get('/', async (req, res) => {
  const feedData = await Promise.all(
    rssFeeds.map((feed) => {
      return new Promise(async (resolve) => {
        let response = await parser.parseURL(feed);
        resolve(response.items);
      });
    })
  );
  const fullData = [];
  feedData.forEach((feed) => {
    fullData.push(...feed);
  });

  res.json(
    fullData.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
    }))
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
