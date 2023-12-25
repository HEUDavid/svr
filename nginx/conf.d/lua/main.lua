-- main.lua

local cjson = require("cjson")
local lfs = require("lfs")

main = {}

function main.get_pages()
    local data = {}
    local directory = "/data"
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

print(main.get_pages())
