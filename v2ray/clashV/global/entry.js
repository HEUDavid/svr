function main(config, profileName) {
  console.log("load: " + profileName);
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;
  console.log(
    "proxies: " + proxyCount + ", proxy-providers: " + proxyProviderCount
  );
  if (proxyCount > 0) {
    config.proxies = [...config["my-local-proxies"], ...config.proxies];
  } else {
    config.proxies = config["my-local-proxies"];
  }
  return config;
}
