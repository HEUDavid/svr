const myProxy = {
  name: "mDavid_CN",
  type: "vmess",
  uuid: "abc",
  server: "ip",
  port: 10086,
  alterId: 0,
  cipher: "none",
  udp: true,
};
const groupBase = {
  interval: 300, // 单位s
  timeout: 5, // 单位s
  url: "https://www.google.com/generate_204",
  lazy: true,
  "max-failed-times": 3,
  hidden: false,
};
const goodGroup = {
  name: "GOOD",
  type: "select",
  proxies: [myProxy.name],
  icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
  ...groupBase,
};
const subGroup = {
  name: "SUB",
  type: "url-test",
  icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
  ...groupBase,
  proxies: [],
  use: [],
};
const proxyGroups = [
  {
    name: "PROXY",
    type: "select",
    proxies: ["GOOD", "SUB"],
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
    ...groupBase,
  },
  {
    name: "MEDIA",
    type: "select",
    proxies: ["GOOD", "SUB"],
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg",
    ...groupBase,
  },
  {}, // 自建节点GOOD分组占位
  {}, // 订阅节点SUB分组占位
  {
    name: "FINAL",
    type: "select",
    proxies: ["GOOD", "SUB", "DIRECT"],
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
    ...groupBase,
  },
];
const ruleSets = ["mdavid_proxy", "mdavid_direct", "douyin", "applications"];
function main(config, profileName) {
  console.log("load: " + profileName);
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;
  console.log(
    "proxy: " + proxyCount + ", proxyProvider: " + proxyProviderCount
  );
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }
  if (proxyCount > 0) {
    subGroup.proxies = config.proxies.map((proxy) => proxy.name);
    config.proxies.unshift(myProxy);
  } else {
    config.proxies = [myProxy];
  }
  if (proxyProviderCount > 0) {
    subGroup.use = Object.keys(config["proxy-providers"]);
  }
  proxyGroups[2] = goodGroup;
  proxyGroups[3] = subGroup;
  config["proxy-groups"] = proxyGroups;
  config["rule-providers"] = Object.keys(config["rule-providers"])
    .filter((key) => ruleSets.includes(key))
    .reduce((obj, key) => {
      obj[key] = config["rule-providers"][key];
      return obj;
    }, {});
  config["dns"] = {
    enable: false,
  };
  return config;
}
