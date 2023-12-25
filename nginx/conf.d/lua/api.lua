-- api.lua

local lfs = require("lfs")
local cjson = require("cjson")

local M = {}

function M.get_files(path)
    local files = {}
    for file in lfs.dir(path) do
        if file ~= "." and file ~= ".." then
            local attr = lfs.attributes(path .. file)
            table.insert(files, {
                name = file,
                size = attr.size,
                mtime = attr.modification
            })
        end
    end
    return cjson.encode(files)
end

function M.say_hello()
    return "hello from api.mdavid.cn"
end


-- dispatcher
local uri = ngx.var.uri

if uri == "/api" then
    ngx.header.content_type = "text/plain"
    ngx.say(M.say_hello())


elseif uri == "/api/get_files" then
    ngx.header.content_type = "application/json"
    ngx.say(M.get_files("/data/"))

else
    ngx.exit(ngx.HTTP_NOT_FOUND)
end
