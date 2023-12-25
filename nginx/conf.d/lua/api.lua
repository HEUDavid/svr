-- api.lua

local main = require("main")

-- dispatcher
local uri = ngx.var.uri

if uri == "/api" then
    ngx.header.content_type = "application/json"
    ngx.say(main.get_files("/data/"))

elseif uri == "/api/hello" then
    ngx.header.content_type = "text/plain"
    ngx.say(main.say_hello())

else
    ngx.exit(ngx.HTTP_NOT_FOUND)
end
