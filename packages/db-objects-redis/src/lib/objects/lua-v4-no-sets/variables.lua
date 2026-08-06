-- design: hm-rega
-- search: variables
local rep = {}
-- local keys=redis.call("keys", KEYS[1].."*")
local cursor = KEYS[4];
local result = redis.call("SCAN", cursor, "MATCH", KEYS[1] .. "*", "COUNT", 500)
cursor = result[1]
local keys = result[2]
local argStart = KEYS[1] .. KEYS[2]
local argEnd = KEYS[1] .. KEYS[3]
-- Lua compares strings with strcoll(), and Redis picks up LC_COLLATE from the
-- environment it was started in (it calls setlocale(LC_COLLATE, "") on startup).
-- Under a UTF-8 collation "key < argEnd" stops holding for our ranges, because
-- argEnd ends in the U+9999 sentinel - the view then silently returns nothing,
-- while the objects are stored correctly and direct GETs keep working. Compare
-- bytes instead, which gives the same result whatever locale the server has.
-- When argEnd starts with argStart - the usual "everything below this prefix"
-- range - a key can only be in range if it starts with argStart, so the prefix
-- is checked with a single raw == and only the remainder is walked. That path
-- is measurably faster than the strcoll comparison it replaces.
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
local checkStr = string.format("%q:", "TypeName");
--  function(doc) {
--      if (doc._id.match(/^hm-rega\\.[0-9]+\\.[0-9,A-Z,a-z]+/) && (doc.native.TypeName === "ALARMDP" || doc.native.TypeName === "VARDP")) {
--          emit(doc._id, doc);
--      }
--  }
for _, key in ipairs(keys) do
    if (inRange(key) and key:sub(7, 13) == "hm-rega") then
        local obj = redis.call("get", key)
        if (obj:find(checkStr) ~= nil) then
            local success, decoded = pcall(cjson.decode, obj)
            if (success and decoded.native ~= nil and (decoded.native.TypeName == "ALARMDP" or decoded.native.TypeName == "VARDP")) then
                rep[#rep + 1] = obj
            end
        end
    end
end
return { rep, cursor }
