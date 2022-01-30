-- design: script
-- search: javascript
local rep = {}
local cursor = KEYS[4];
local result = redis.call("SSCAN", KEYS[5], cursor, "MATCH", KEYS[1] .. "*", "COUNT", 500)
cursor = result[1]
local keys = result[2]
local argStart = KEYS[1] .. KEYS[2]
local argEnd = KEYS[1] .. KEYS[3]
--  function(doc) {
--      if (doc.type === "script" && doc.common.engineType.match(/^[jJ]ava[sS]cript|^[cC]offee[sS]cript|^[tT]ype[sS]cript|^Blockly/)) emit(doc.common.name, doc); }
for _, key in ipairs(keys) do
    if (key >= argStart and key < argEnd) then
        rep[#rep + 1] = redis.call("get", key)
    end
end
return { rep, cursor }
