-- api.lua

local cjson = require("cjson")

local function generate_json_response()
    local data = {
        message = "hello, 1",
        timestamp = os.time()
    }
    return cjson.encode(data)
end

local function generate_another_json_response()
    local data = {
        message = "hello, 2",
        timestamp = os.time()
    }
    return cjson.encode(data)
end

local function generate_hello_response()
    return "hello, 3"
end

-- dispatcher
local uri = ngx.var.uri

if uri == "/api" then
    ngx.header.content_type = "application/json"
    ngx.say(generate_json_response())
elseif uri == "/aaa" then
    ngx.header.content_type = "application/json"
    ngx.say(generate_another_json_response())
elseif uri == "/bbb" then
    ngx.header.content_type = "text/plain"
    ngx.say(generate_hello_response())
else
    ngx.exit(ngx.HTTP_NOT_FOUND)
end
