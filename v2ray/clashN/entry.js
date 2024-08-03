function main(config) {
    const proxyCount = config?.proxies?.length ?? 0;
    console.log(proxyCount);
    if (proxyCount > 0) {
        let proxyNames = config.proxies
            .map((proxy) => proxy.name)
            .filter((name) => !name.includes("mDavid"));
        config["proxy-groups"].forEach((group) => {
            if (group.name === "SUB") {
                group.proxies = proxyNames;
            }
        });
    }
    const proxyProviderCount =
        typeof config?.["proxy-providers"] === "object"
            ? Object.keys(config["proxy-providers"]).length
            : 0;
    console.log(proxyProviderCount);
    if (proxyProviderCount > 0) {
        let providerNames = Object.keys(config["proxy-providers"]);
        config["proxy-groups"].forEach((group) => {
            if (group.name === "SUB") {
                group.use = providerNames;
                group.proxies = null;
            }
        });
    }
    return config;
}
