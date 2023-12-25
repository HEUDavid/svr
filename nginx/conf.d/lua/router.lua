-- router.lua

local api = require("api")

local uri = ngx.var.uri

if uri == "/api" then
    ngx.header.content_type = "application/json"
    ngx.say(api.get_pages())

elseif uri == "/api/hello" then
    ngx.header.content_type = "text/plain"
    ngx.say(api.say_hello())

else
    ngx.exit(ngx.HTTP_NOT_FOUND)
end
