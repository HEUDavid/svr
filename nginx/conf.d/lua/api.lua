-- api.lua

local lfs = require("lfs")
local cjson = require("cjson")
local root = "/etc/nginx/conf.d/lua/"

local M = {}

function M.get_files(path)
    local files = {}
    for file in lfs.dir(path) do
        local full_path = path .. file
        local attr = lfs.attributes(full_path)
        if attr.mode == "file" then
            table.insert(files, {
                name = file,
                size = attr.size,
                mtime = attr.modification,
                type = attr.mode
            })
        end
    end

    return cjson.encode(files)
end

function M.get_node()
    local cmd = "python3 " .. root .. "py/get_node.py 2>&1"
    local handle = io.popen(cmd)
    local result = handle:read("*a")
    handle:close()
    return result
end

local debug = false

if debug == false then
    -- dispatcher
    local uri = ngx.var.uri
    if uri == "/api" then
        ngx.header.content_type = "text/plain"
        ngx.say(M.get_node())
    elseif uri == "/api/get_files" then
        ngx.header.content_type = "application/json"
        ngx.say(M.get_files("/data/"))
    else
        ngx.exit(ngx.HTTP_NOT_FOUND)
    end
else
    root = "./"
    print("echo:", M.get_node())
end
