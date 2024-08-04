module.exports.parse = (raw, {yaml}) => {
  const config = yaml.parse(raw);
  const groupBaseOption = {
    "interval": 300,
    "timeout": 3000,
    "url": "https://www.google.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": false,
  };
  const subGroup = {
    "name": "SUB",
    "type": "url-test",
    "tolerance": 50, // 节点切换容差，单位 ms
    ...groupBaseOption,
  }
  const proxyCount = config?.proxies?.length ?? 0;
  if (proxyCount > 0) {
    subGroup.proxies = config.proxies
      .map((proxy) => proxy.name)
      .filter((name) => !name.includes("mDavid"));
  }
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyProviderCount > 0) {
    subGroup.use = Object.keys(config["proxy-providers"]);
  }
  config["proxy-groups"] = [
    {
      "name": "PROXY",
      "type": "select",
      "proxies": ["GOOD", "SUB"],
      ...groupBaseOption,
    },
    {
      "name": "MEDIA",
      "type": "select",
      "proxies": ["GOOD", "SUB"],
      ...groupBaseOption,
    },
    {
      "name": "GOOD",
      "type": "select",
      "proxies": ["mDavid_CN"],
      ...groupBaseOption,
    },
    subGroup,
    {
      "name": "FINAL",
      "type": "select",
      "proxies": ["GOOD", "SUB", "DIRECT"],
      ...groupBaseOption,
    }
  ];
  const newConf = {
    'proxies': config['proxies'],
    'proxy-providers': config['proxy-providers'],
    'proxy-groups': config['proxy-groups'],
  };
  return yaml.stringify(newConf);
}
