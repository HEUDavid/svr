-- api.lua

local cjson = require("cjson")
local lfs = require("lfs")

local main = {}

function main.get_pages(directory)
    local data = {}
    for file in lfs.dir(directory) do
        if file ~= "." and file ~= ".." then
            local path = directory .. "/" .. file
            local attr = lfs.attributes(path)
            if attr and attr.mode == "file" then
                table.insert(data, { name = file, mtime = attr.modification })
            end
        end
    end
    return cjson.encode(data)
end

function main.say_hello()
    return "hello from mdavid.cn"
end


-- dispatcher
local uri = ngx.var.uri

if uri == "/api" then
    ngx.header.content_type = "application/json"
    ngx.say(main.get_pages("/data"))

elseif uri == "/api/hello" then
    ngx.header.content_type = "text/plain"
    ngx.say(main.say_hello())

else
    ngx.exit(ngx.HTTP_NOT_FOUND)
end
