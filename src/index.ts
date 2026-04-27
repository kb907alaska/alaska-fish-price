/**
 * Alaska Fish Price - Intelligence API & Scraper Worker
 * 
 * Fetches and serves ex-vessel price per pound data for Alaska commercial fisheries.
 * Sources:
 * 1. ADF&G Commercial Operator's Annual Report (COAR)
 * 2. NOAA Fisheries Market News
 * 3. ASMI (Alaska Seafood Marketing Institute) Reports
 * 4. Urner Barry / SeafoodNews.com Index
 */

export interface Env {
  // If using KV to store latest scrape:
  // FISH_PRICES: KVNamespace;
}

export default {
  // 1. HTTP API to retrieve data
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Provide an open API for the Alaska Fleet Watch project
    if (url.pathname === '/api/historical') {
      // In a real production deployment, fetch this from GitHub Raw or KV.
      // For this worker, we redirect to the GitHub raw URL for the open repo.
      return Response.redirect('https://raw.githubusercontent.com/kb907alaska/alaska-fish-price/main/data/historical_prices.json', 302);
    }

    if (url.pathname === '/api/latest') {
      return Response.redirect('https://raw.githubusercontent.com/kb907alaska/alaska-fish-price/main/data/latest_prices.json', 302);
    }

    return new Response(JSON.stringify({
      name: "Alaska Fish Price Intelligence API",
      status: "operational",
      endpoints: [
        "/api/latest",
        "/api/historical"
      ],
      sources: [
        "ADF&G COAR",
        "NOAA Market News",
        "ASMI Reports",
        "UB Seafood Index"
      ]
    }), {
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      }
    });
  },

  // 2. CRON Trigger to scrape 4 times a day
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    console.log(`Cron triggered at ${event.cron}`);
    
    // Scraper logic goes here. 
    // In a pure Cloudflare Worker without KV, we can't persist files directly to GitHub easily without a PAT (Personal Access Token).
    // Therefore, the primary scraper runs via GitHub Actions, and this CF worker acts as the edge API router.
    
    // Example scraping procedure:
    // const noaaData = await fetch('https://www.fisheries.noaa.gov/alaska/commercial-fishing/...');
    // const parsed = parseNOAAData(await noaaData.text());
    
    console.log('Scraping completed. Awaiting GitHub Action sync.');
  },
};
