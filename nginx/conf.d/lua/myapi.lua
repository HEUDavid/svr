-- myapi.lua

local cjson = require("cjson")

-- 定义一个返回 JSON 数据的函数
local function generate_json_response()
    local data = {
        message = "Hello from myapi.lua",
        timestamp = os.time()
    }
    return cjson.encode(data)
end

-- 输出 JSON 数据
ngx.header.content_type = "application/json"
ngx.say(generate_json_response())
