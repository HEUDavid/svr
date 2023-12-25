-- api.lua

local cjson = require("cjson")

local function get_pages()
    local data = {
        message = "hello, 1",
        timestamp = os.time()
    }
    return cjson.encode(data)
end

local function say_hello()
    return "hello from mdavid.cn"
end

local main = require("main")


-- dispatcher
local uri = ngx.var.uri

if uri == "/api" then
    ngx.header.content_type = "application/json"
    ngx.say(get_pages())

elseif uri == "/api/hello" then
    ngx.header.content_type = "text/plain"
    ngx.say(main.say_hello())

else
    ngx.exit(ngx.HTTP_NOT_FOUND)
end
