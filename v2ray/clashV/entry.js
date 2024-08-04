const groupBase = {
  interval: 300, // 单位s
  timeout: 5, // 单位s
  url: "https://www.google.com/generate_204",
  lazy: true,
  "max-failed-times": 3,
  hidden: false,
};
const subGroup = {
  name: "SUB",
  type: "url-test",
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
function main(config, profileName) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;
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
  config["dns"] = {
    enable: false,
  };
  return config;
}
