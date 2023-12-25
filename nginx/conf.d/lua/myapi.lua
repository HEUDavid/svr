-- myapi.lua

local cjson = require "cjson"

local _M = {}

function _M.handle_request()
    local response = {
        status = "success",
        message = "Hello, this is your API response from Lua script!"
    }
    ngx.say(cjson.encode(response))
end

return _M
