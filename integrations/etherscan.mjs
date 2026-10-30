/**
 * Etherscan V2 — read-only Ethereum block lookup.
 * Disabled by default. Requires ETHERSCAN_ENABLED=true and ETHERSCAN_API_KEY.
 * Never commit API keys. Never submits transactions.
 */
export async function getEthereumBlockNumber({ env = process.env, fetchImpl = fetch } = {}) {
  if (env.ETHERSCAN_ENABLED !== "true") {
    return { enabled: false, reason: "ETHERSCAN_ENABLED is not true" };
  }
  const key = env.ETHERSCAN_API_KEY;
  if (!key) throw new Error("ETHERSCAN_API_KEY is missing");
  const url = new URL("https://api.etherscan.io/v2/api");
  url.search = new URLSearchParams({
    chainid: "1", module: "proxy", action: "eth_blockNumber", apikey: key
  }).toString();
  const response = await fetchImpl(url, { method: "GET", signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Etherscan HTTP ${response.status}`);
  const body = await response.json();
  if (typeof body.result !== "string" || !/^0x[0-9a-f]+$/i.test(body.result)) {
    throw new Error("Etherscan returned an error or invalid block number");
  }
  return { enabled: true, chainId: 1, blockNumber: Number.parseInt(body.result, 16) };
}
