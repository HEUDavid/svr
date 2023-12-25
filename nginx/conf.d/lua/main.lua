local cjson = require("cjson")
local lfs = require("lfs")

main = {}

function main.get_files(path)
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

function main.say_hello()
    return "hello from mdavid.cn"
end

return main
