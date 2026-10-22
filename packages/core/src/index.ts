export const serverName = "google-analytics-mcp";

/** Supplies a Google access token. The CLI and a future hosted worker both implement this. */
export interface AnalyticsAuthProvider {
  getAccessToken: () => Promise<string>;
}
