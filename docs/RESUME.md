# Resume: Analytics and Tag Manager MCP servers

Scaffold only. No Google API calls, no OAuth app, and no published packages. Start from this file.

Kaneo was unavailable when this was written (`/api/auth/get-session: Application not found`), so this document is the tracker.

## Already shipped

| Repo | Role |
| --- | --- |
| [lemon-squared/signal](https://github.com/lemon-squared/signal) | Consent banner, `cookieDomain`, Next.js GTM loader. Sites pass their own domain and container id. |
| [lemon-squared/gtm-template-consent-mode](https://github.com/lemon-squared/gtm-template-consent-mode) | Consent Mode v2 web tag. Submitted to the Community Template Gallery on 22 Oct 2026. Review usually takes a few days. README badge stays red until listed. |
| [lemon-squared/gtm-template-workflows](https://github.com/lemon-squared/gtm-template-workflows) | Shared gallery-status workflow. Sunday check flips the badge. |
| [Runur PR #11](https://github.com/lemon-squared/Runur-Monorepo/pull/11) | Marketing depends on the Signal repo and sets `cookieDomain: ".runur.co.uk"`. |

Server tags (Meta, Snap, TikTok, Reddit) are not repos yet. Each one will be `<vendor>-tag`, server container only, with a Tag Execution Consent Settings group: send always, or abort unless `ad_storage` is granted.

## This repository

TypeScript, formatted with Ultracite. The tools are read-only (`analytics.readonly`). The local CLI keeps client Analytics data on the machine that holds the credentials.

| Path | Package | Status |
| --- | --- | --- |
| `packages/core` | `@lemon-squared/google-analytics-mcp-core` | `AnalyticsAuthProvider` only. Tools go here. |
| `packages/cli` | `@lemon-squared/google-analytics-mcp` | Exits immediately and points at this file. |
| `apps/worker` | not created | Hosted OAuth, after the CLI is in use. |

`AnalyticsAuthProvider.getAccessToken()` is the only auth seam. The CLI and a later worker both implement it. Tools never see how the token was obtained.

### Tools to add

v1 does not create properties, links, or audiences.

| Tool | Purpose |
| --- | --- |
| `get_account_summaries` | Accounts and properties the token can see. |
| `get_property_details` | One property. |
| `list_google_ads_links` | Google Ads links on a property. |
| `list_property_annotations` | Notes on dates or periods. |
| `get_custom_dimensions_and_metrics` | Custom dimensions and metrics. |
| `run_report` | Core report. |
| `run_realtime_report` | Realtime report. |
| `run_funnel_report` | Funnel report. |
| `run_conversions_report` | Conversions and attribution. |

Reporting tools take optional filters, sort, pagination, and currency. A normal call is `get_account_summaries`, then property details or custom definitions, then a report.

Credentials for the CLI, in order of preference for client work: a service account key, a refresh token, or a short-lived access token. One environment variable. Do not put that value in a committed `.cursor/mcp.json`.

When the CLI speaks MCP over stdio, user-level Cursor config is `~/.cursor/mcp.json` so every internal and client project can see it.

## Tag Manager MCP

Scaffolded at [lemon-squared/google-tag-manager-mcp-server](https://github.com/lemon-squared/google-tag-manager-mcp-server). Continue that work in its own `docs/RESUME.md`. Do not put those tools in this repository.

## Business Profile MCP

Scaffolded at [lemon-squared/google-business-profile-mcp-server](https://github.com/lemon-squared/google-business-profile-mcp-server). Continue that work in its own `docs/RESUME.md`. Do not put those tools in this repository.

## Related scaffolds

Search Console, PageSpeed and CrUX, Ads, Bing Webmaster, IndexNow, the Indexing API, both Merchant Center APIs, Microsoft Advertising, Bing Places, and Clarity are their own repositories. Do not add their tools here.

| Repo | Role |
| --- | --- |
| [google-search-console-mcp-server](https://github.com/lemon-squared/google-search-console-mcp-server) | Search Console |
| [google-pagespeed-mcp-server](https://github.com/lemon-squared/google-pagespeed-mcp-server) | PageSpeed Insights and CrUX |
| [google-ads-mcp-server](https://github.com/lemon-squared/google-ads-mcp-server) | Ads conversion actions |
| [bing-webmaster-mcp-server](https://github.com/lemon-squared/bing-webmaster-mcp-server) | Bing Webmaster |
| [indexnow-mcp-server](https://github.com/lemon-squared/indexnow-mcp-server) | IndexNow URL pushes |
| [google-indexing-mcp-server](https://github.com/lemon-squared/google-indexing-mcp-server) | Indexing API for 8ball.live streams |
| [google-merchant-mcp-server](https://github.com/lemon-squared/google-merchant-mcp-server) | Google Merchant Center for the WMS |
| [microsoft-advertising-mcp-server](https://github.com/lemon-squared/microsoft-advertising-mcp-server) | Microsoft Advertising, REST |
| [microsoft-merchant-mcp-server](https://github.com/lemon-squared/microsoft-merchant-mcp-server) | Microsoft Merchant Center |
| [bing-places-mcp-server](https://github.com/lemon-squared/bing-places-mcp-server) | Bing Places trusted-partner listings |
| [microsoft-clarity-mcp-server](https://github.com/lemon-squared/microsoft-clarity-mcp-server) | Clarity dashboard export |

## Order of work

1. Implement the nine read-only Analytics tools in `packages/core`, then make `packages/cli` an stdio MCP server.
2. Implement the Tag Manager container tools in [google-tag-manager-mcp-server](https://github.com/lemon-squared/google-tag-manager-mcp-server), then its stdio CLI.
3. Add the Signal template tools on top of generic container edits.
4. Add hosted OAuth workers only after the local CLIs are what Cursor uses for client projects.

## Constraints

- Format with Ultracite (`bun run format`). The config extends `ultracite/biome/core`.
- v1 Analytics scope stays `analytics.readonly`.
- Keep client Google data on the local CLI until a hosted worker exists.
