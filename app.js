const http = require('http');
const url = require('url');
const express = require('express');
const app = express();
const Wappalyzer = require('wappalyzer');
const hostname = 'localhost';
const port = 3000;

let defaultOptions = {
  debug: false,
  delay: 500,
  maxDepth: 3,
  maxUrls: 1,
  maxWait: 5000,
  recursive: true,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
  htmlMaxCols: 2000,
  htmlMaxRows: 2000,
};

app.get('/', async (req, res) => {
  const query = url.parse(req.url, true).query;
  const analyzeUrl = query.url;
  console.log("server started");
  if (!analyzeUrl) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/text');
    res.send("Url is required. Example: http://127.0.0.1:3000/?url=https://github.com/");
    return;
  }
  
  const options = {
    delay: query.delay             || defaultOptions.delay,
    maxDepth: query.maxDepth       || defaultOptions.maxDepth,
    maxUrls: query.maxUrls         || defaultOptions.maxUrls,
    maxWait: query.maxWait         || defaultOptions.maxWait,
    recursive: query.recursive     || defaultOptions.recursive,
    userAgent: query.userAgent     || defaultOptions.userAgent,
    htmlMaxCols: query.htmlMaxCols || defaultOptions.htmlMaxCols,
    htmlMaxRows: query.htmlMaxRows || defaultOptions.htmlMaxRows
  };

  const analyzerResultOrError = await RunUrlAnalyzer(analyzeUrl, options);

  const jsonResult = JSON.stringify(analyzerResultOrError, null, 2);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonResult);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


async function RunUrlAnalyzer(analyzeUrl, options) {
  let analyzeResult;

  const wappalyzer = await new Wappalyzer(options);

  try {
    await wappalyzer.init();

    const site = await wappalyzer.open(analyzeUrl);

    site.on('error', console.error);

    analyzeResult = await site.analyze();

    await wappalyzer.destroy()

  } catch (error) {
    analyzeResult = error;
  }

  console.log(analyzeResult)
  return analyzeResult;
}
