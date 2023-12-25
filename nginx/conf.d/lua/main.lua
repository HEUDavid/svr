-- main.lua

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

return main
