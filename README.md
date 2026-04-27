# Alaska Fish Price Intelligence API

An open-source data repository and intelligence worker providing historical and real-time ex-vessel prices for Alaska's commercial fisheries.

## Overview
This repository operates as a "Flat Data" API. A GitHub Actions worker runs 4 times a day (every 6 hours) to fetch the latest ex-vessel prices across multiple intelligence sources. The updated JSON is committed directly to this repository, making it instantly accessible to developers via GitHub's raw content delivery network.

### Primary Data Sources
We aggregate ex-vessel pricing and market trends from:
1. **ADF&G COAR** (Commercial Operator's Annual Report)
2. **NOAA Fisheries Market News**
3. **Alaska Seafood Marketing Institute (ASMI)**
4. **Urner Barry / SeafoodNews.com**

## Data Endpoints (Open API)

The data is available as static JSON files. You can fetch them directly into your applications using the GitHub raw URL:

* **Live Market Prices (Updated 4x/day):**
  `https://raw.githubusercontent.com/kb907alaska/alaska-fish-price/main/data/latest_prices.json`

* **Historical Prices (2000 - Present):**
  `https://raw.githubusercontent.com/kb907alaska/alaska-fish-price/main/data/historical_prices.json`

## Cloudflare Worker Support
Included is a `src/index.ts` Cloudflare Worker that can act as a routing edge API to serve the data if you prefer hitting an API domain rather than the raw GitHub URL.

## Architecture
- **Scraper:** Node.js script (`src/scraper.ts`)
- **Automation:** GitHub Actions cron job (`.github/workflows/scrape.yml`)
- **Storage:** Public GitHub Repository (Immutable ledger)
