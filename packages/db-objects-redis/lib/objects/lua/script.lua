-- design: script
-- search: javascript
local rep = {}
local cursor = KEYS[4];
local result = redis.call("SCAN", cursor, "MATCH", KEYS[1] .. "*", "COUNT", 500)
cursor = result[1]
local keys = result[2]
local argStart = KEYS[1] .. KEYS[2]
local argEnd = KEYS[1] .. KEYS[3]
--  function(doc) {
--      if (doc.type === "script" && doc.common.engineType.match(/^[jJ]ava[sS]cript|^[cC]offee[sS]cript|^[tT]ype[sS]cript|^Blockly/)) emit(doc.common.name, doc); }
for _, key in ipairs(keys) do
    if (key >= argStart and key < argEnd) then
        local obj = redis.call("get", key)
        local success, decoded = pcall(cjson.decode, obj)
        if (success and decoded.type == "script") then
            rep[#rep + 1] = obj
        end
    end
end
return { rep, cursor }
