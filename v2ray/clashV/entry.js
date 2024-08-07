const groupBase = {
  interval: 300, // 健康检查间隔，如不为 0 则启用定时测试，单位为秒
  timeout: 3000, // 健康检查超时时间，单位为毫秒
  url: "https://www.google.com/generate_204",
  lazy: true,
  "max-failed-times": 3,
  hidden: false,
};
const subGroup = {
  name: "SUB",
  type: "select",
  icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
  ...groupBase,
  proxies: [],
  use: [],
};
const allGroups = [
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
  {
    name: "GOOD",
    type: "select",
    proxies: ["mDavid_CN"],
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
    ...groupBase,
  },
  {}, // 订阅节点SUB分组占位
  {
    name: "FINAL",
    type: "select",
    proxies: ["GOOD", "SUB", "DIRECT"],
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
    ...groupBase,
  },
];
function insertGood(config, profileName) {
  const proxyCount = config?.proxies?.length ?? 0;
  if (proxyCount > 0) {
    config.proxies = [...config["my-local-proxies"], ...config.proxies];
  } else {
    config.proxies = config["my-local-proxies"];
  }
  return config;
}
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
    subGroup.proxies = config.proxies
      .map((proxy) => proxy.name)
      .filter((name) => !name.includes("mDavid"));
  }
  if (proxyProviderCount > 0) {
    subGroup.use = Object.keys(config["proxy-providers"]);
  }
  allGroups[3] = subGroup;
  config["proxy-groups"] = allGroups;
  config["rule-providers"] = Object.keys(config["rule-providers"])
    .filter((key) => config["used-rule-providers"].includes(key))
    .reduce((obj, key) => {
      obj[key] = config["rule-providers"][key];
      return obj;
    }, {});
  return insertGood(config, profileName);
}
