const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};
function main(config, profileName) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }
  const sub = {
    "name": "SUB",
    "type": "url-test",
    "tolerance": 50,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
    ...groupBaseOption,
  };
  if (proxyCount > 0) {
    sub.proxies = config.proxies
      .map((proxy) => proxy.name)
      .filter((name) => !name.includes("mDavid"));
  }
  if (proxyProviderCount > 0) {
    sub.use = Object.keys(config["proxy-providers"]);
  }
  config["proxy-groups"] = [
    {
      "name": "PROXY",
      "type": "select",
      "proxies": ["GOOD", "SUB"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
      ...groupBaseOption,
    },
    {
      "name": "MEDIA",
      "type": "select",
      "proxies": ["GOOD", "SUB"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg",
      ...groupBaseOption,
    },
    {
      ...groupBaseOption,
      "name": "GOOD",
      "type": "select",
      "include-all": true,
      "filter": ".*mDavid.*",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    sub,
    {
      "name": "FINAL",
      "type": "select",
      "proxies": ["GOOD", "SUB", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
      ...groupBaseOption,
    },
  ];
  return config;
}