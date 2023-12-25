-- api.lua

local main = require("main")

local uri = ngx.var.uri
main.handle_request(uri)
