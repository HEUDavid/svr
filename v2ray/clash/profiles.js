module.exports.parse = (raw, {yaml}) => {
  const config = yaml.parse(raw);
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
    tolerance: 50, // 节点切换容差，单位 ms
    ...groupBase,
  };
  const proxyCount = config?.proxies?.length ?? 0;
  if (proxyCount > 0) {
    subGroup.proxies = config.proxies
      .map((proxy) => proxy.name)
      .filter((name) => !name.includes("mDavid"));
  }
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;
  if (proxyProviderCount > 0) {
    subGroup.use = Object.keys(config["proxy-providers"]);
  }
  config["proxy-groups"] = [
    {
      name: "PROXY",
      type: "select",
      proxies: ["GOOD", "SUB"],
      ...groupBase,
    },
    {
      name: "MEDIA",
      type: "select",
      proxies: ["GOOD", "SUB"],
      ...groupBase,
    },
    {
      name: "GOOD",
      type: "select",
      proxies: ["mDavid_CN"],
      ...groupBase,
    },
    subGroup,
    {
      name: "FINAL",
      type: "select",
      proxies: ["GOOD", "SUB", "DIRECT"],
      ...groupBase,
    },
  ];
  const newConf = {
    proxies: config["proxies"],
    "proxy-providers": config["proxy-providers"],
    "proxy-groups": config["proxy-groups"],
  };
  return yaml.stringify(newConf);
};
