const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};
const myProxy = {
  "name": "mDavid_CN",
  "type": "vmess",
  "server": "ip",
  "port": 10086,
  "uuid": "abc",
  "alterId": 0,
  "cipher": "none",
  "udp": true
};
const good = {
  ...groupBaseOption,
  "name": "GOOD",
  "type": "select",
  "proxies": [myProxy.name],
  // "include-all": true,
  // "filter": ".*mDavid.*",
  "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
};
const sub = {
  "name": "SUB",
  "type": "url-test",
  "tolerance": 50,
  "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
  ...groupBaseOption,
  "proxies": ["DIRECT"],
  "use": []
};
function main(config, profileName) {
  console.log(profileName);
  const proxyCount = config?.proxies?.length ?? 0;
  console.log(proxyCount);
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }
  console.log(proxyProviderCount);
  if (proxyCount > 0) {
    sub.proxies = config.proxies.map((proxy) => proxy.name);
    config.proxies.unshift(myProxy);
  } else {
    config.proxies = [
      myProxy,
    ];
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
    good,
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