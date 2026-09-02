-- design: system
-- search: custom
local rep = {}
-- local keys=redis.call("keys", KEYS[1].."*")
local cursor = KEYS[4];
local result = redis.call("SCAN", cursor, "MATCH", KEYS[1] .. "*", "COUNT", 500)
cursor = result[1]
local keys = result[2]
local argStart = KEYS[1] .. KEYS[2]
local argEnd = KEYS[1] .. KEYS[3]
-- Compare bytes: Lua's < uses strcoll(), so it depends on the locale the Redis
-- server was started with, and argEnd ends in the U+9999 sentinel.
local sLen = #argStart
local endHasPrefix = argEnd:sub(1, sLen) == argStart
local function byteLess(a, b, from)
    local la, lb = #a, #b
    local i = from or 1
    while i <= la and i <= lb do
        local ca, cb = a:byte(i), b:byte(i)
        if ca ~= cb then
            return ca < cb
        end
        i = i + 1
    end
    return la < lb
end
local function inRange(key)
    if endHasPrefix then
        return key:sub(1, sLen) == argStart and byteLess(key, argEnd, sLen + 1)
    end
    return not byteLess(key, argStart) and byteLess(key, argEnd)
end
local checkStr = string.format("%q:{", "custom")
--  function(doc) {
--      if (doc.type==="state" && (doc.common.custom || doc.common.history))
--          emit(doc._id, doc.common.custom || doc.common.history)
--   }
for _, key in ipairs(keys) do
    if (inRange(key)) then
        local obj = redis.call("get", key)
        if (obj:find(checkStr) ~= nil) then
            local success, decoded = pcall(cjson.decode, obj)
            if (success and decoded.type == "state" and decoded.common ~= nil and decoded.common.custom ~= nil) then
                rep[#rep + 1] = obj
            end
        end
    end
end
return { rep, cursor }
