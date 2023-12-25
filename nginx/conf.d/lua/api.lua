-- api.lua

local cjson = require("cjson")
local lfs = require("lfs")

local api = {}

function api.get_pages(directory)
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

function api.say_hello()
    return "hello from mdavid.cn"
end

--print(api.say_hello())
--print(api.get_pages("./"))

return api
