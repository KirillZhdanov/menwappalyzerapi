# Men.Wappalyzer is web api service
### Small tool to get all analyze information using Wappalyzer by api

To use:

```
npm i wappalyzer
node app.js
```

## Usage

```http
http://localhost:3000/?url=https://github.com/
```

As response you should receive Json like
```json
{
  "urls": {
    "https://github.com/": {
      "status": 200
    }
  },
  "applications": [
    {
      "name": "Google Analytics Enhanced eCommerce",
      "confidence": 100,
      "version": "",
      "icon": "Google Analytics.svg",
      "website": "https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce",
      "cpe": null,
      "categories": {
        "10": "Analytics"
      }
    },
    ...
  ],
  "meta": {
    "language": "en"
  }
}
```
