# PRIVION English Website

English-language version of the PRIVION industrial FMCW LiDAR website.

## Pages

- Home
- Technology
- Products
- DL100
- DL100S
- DL150
- DL150S
- Applications
- Contact
- Search
- Terms of Use
- Privacy Policy

## Structure

```text
privion-homepage-en/
├── index.html
├── technology.html
├── product.html
├── product-dl100.html
├── product-dl100s.html
├── product-dl150.html
├── product-dl150s.html
├── application.html
├── contact.html
├── search.html
├── terms.html
├── privacy.html
├── assets/
│   ├── css/
│   │   ├── privion.css
│   │   └── privion-en.css
│   ├── js/
│   │   ├── privion-common.js
│   │   └── privion-search.js
│   ├── data/
│   │   └── search-data.json
│   ├── images/
│   └── download/
└── sitemap.xml
```

Shared English localization, page metadata, navigation labels, product specifications, application copy, contact information, and policy content are managed through `assets/js/privion-common.js`.

Search content is managed in `assets/data/search-data.json`.

## Deployment Note

Before production deployment, update the canonical domain, Open Graph URLs, `sitemap.xml`, and custom-domain settings to match the final English website domain.
