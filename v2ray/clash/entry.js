// 国内DNS服务器
const domesticNameservers = [
    "https://dns.alidns.com/dns-query", // 阿里云公共DNS
    "https://doh.pub/dns-query", // 腾讯DNSPod
    "https://doh.360.cn/dns-query" // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
    "https://1.1.1.1/dns-query", // Cloudflare(主)
    "https://1.0.0.1/dns-query", // Cloudflare(备)
    "https://208.67.222.222/dns-query", // OpenDNS(主)
    "https://208.67.220.220/dns-query", // OpenDNS(备)
    "https://194.242.2.2/dns-query", // Mullvad(主)
    "https://194.242.2.3/dns-query" // Mullvad(备)
];
// DNS配置
const dnsConfig = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": true,
    "use-system-hosts": false,
    "cache-algorithm": "arc",
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": [
        // 本地主机/设备
        "+.lan",
        "+.local",
        // Windows网络出现小地球图标
        "+.msftconnecttest.com",
        "+.msftncsi.com",
        // QQ快速登录检测失败
        "localhost.ptlogin2.qq.com",
        "localhost.sec.qq.com",
        // 微信快速登录检测失败
        "localhost.work.weixin.qq.com"
    ],
    "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
    "nameserver": [...domesticNameservers, ...foreignNameservers],
    "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
    "nameserver-policy": {
        "geosite:private,cn,geolocation-cn": domesticNameservers,
        "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
    }
};
// 规则集通用配置
const ruleProviderCommon = {
    "type": "http",
    "format": "yaml",
    "interval": 86400
};
// 规则集配置
const ruleProviders = {
    "icloud": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/icloud.txt",
        "path": "./ruleset/loyalsoldier/icloud.yaml"
    },
    "apple": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/apple.txt",
        "path": "./ruleset/loyalsoldier/apple.yaml"
    },
    "google": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/google.txt",
        "path": "./ruleset/loyalsoldier/google.yaml"
    },
    "proxy": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/proxy.txt",
        "path": "./ruleset/loyalsoldier/proxy.yaml"
    },
    "private": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/private.txt",
        "path": "./ruleset/loyalsoldier/private.yaml"
    },
    "gfw": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/gfw.txt",
        "path": "./ruleset/loyalsoldier/gfw.yaml"
    },
    "tld-not-cn": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/tld-not-cn.txt",
        "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
    },
    "cncidr": {
        ...ruleProviderCommon,
        "behavior": "ipcidr",
        "url": "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/cncidr.txt",
        "path": "./ruleset/loyalsoldier/cncidr.yaml"
    },
    "lancidr": {
        ...ruleProviderCommon,
        "behavior": "ipcidr",
        "url": "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/lancidr.txt",
        "path": "./ruleset/loyalsoldier/lancidr.yaml"
    },
    "applications": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/applications.txt",
        "path": "./ruleset/loyalsoldier/applications.yaml"
    },
    "openai": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
        "path": "./ruleset/blackmatrix7/openai.yaml"
    },
    "globalmedia": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GlobalMedia/GlobalMedia_Classical.yaml",
        "path": "./ruleset/blackmatrix7/globalmedia.yaml"
    },
    "douyin": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/DouYin/DouYin.yaml",
        "path": "./ruleset/blackmatrix7/douyin.yaml"
    },
    "mdavid_proxy": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://raw.githubusercontent.com/HEUDavid/svr/main/v2ray/clash/proxy.yaml",
        "path": "./ruleset/mdavid/proxy.yaml"
    },
    "mdavid_direct": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://raw.githubusercontent.com/HEUDavid/svr/main/v2ray/clash/direct.yaml",
        "path": "./ruleset/mdavid/direct.yaml"
    },
};
// 规则
const rules = [
    // 自定义规则
    "RULE-SET,mdavid_direct,DIRECT",
    "RULE-SET,douyin,DIRECT",
    "RULE-SET,applications,DIRECT",
    "RULE-SET,mdavid_proxy,PROXY",
    "RULE-SET,openai,PROXY",
    "RULE-SET,globalmedia,MEDIA", // 国外流媒体
    "RULE-SET,icloud,PROXY",
    "RULE-SET,apple,PROXY",
    "RULE-SET,google,PROXY",
    "RULE-SET,tld-not-cn,PROXY",
    "RULE-SET,gfw,PROXY",
    "RULE-SET,proxy,PROXY",
    "RULE-SET,private,DIRECT",
    "RULE-SET,lancidr,DIRECT,no-resolve",
    "RULE-SET,cncidr,DIRECT,no-resolve",
    "GEOIP,LAN,DIRECT,no-resolve",
    "GEOIP,CN,DIRECT,no-resolve",
    "MATCH,FINAL"
];
// 代理组通用配置
const groupBaseOption = {
    "interval": 300,
    "timeout": 3000,
    "url": "https://www.google.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": false
};

// 程序入口
function main(config, profileName) {
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount =
        typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error("配置文件中未找到任何代理");
    }

    // 覆盖原配置中DNS配置
    config["dns"] = dnsConfig;

    // 覆盖原配置中的代理组
    config["proxy-groups"] = [
        {
            ...groupBaseOption,
            "name": "PROXY",
            "type": "select",
            "proxies": ["GOOD", "SUB"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
        },
        {
            ...groupBaseOption,
            "name": "MEDIA",
            "type": "select",
            "proxies": ["GOOD", "SUB"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
        },
        {
            ...groupBaseOption,
            "name": "GOOD",
            "type": "select",
            "include-all": true,
            "filter": ".*mDavid.*",
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
        },
        {
            ...groupBaseOption,
            "name": "SUB",
            "type": "url-test",
            "tolerance": 50,
            "include-all": true,
            "exclude-filter": ".*mDavid.*",
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
        },
        {
            ...groupBaseOption,
            "name": "FINAL",
            "type": "select",
            "proxies": ["GOOD", "SUB", "DIRECT"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
        }
    ];

    // 覆盖原配置中的规则
    config["rule-providers"] = ruleProviders;
    config["rules"] = rules;

    return config;
}
