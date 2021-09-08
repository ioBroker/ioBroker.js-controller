-- design: custom
-- search: state
local rep = {}
-- local keys=redis.call("keys", KEYS[1].."*")
local cursor = KEYS[4];
local result = redis.call("SCAN", cursor, "MATCH", KEYS[1] .. "*", "COUNT", 500)
cursor = result[1]
local keys = result[2]
local argStart = KEYS[1] .. KEYS[2]
local argEnd = KEYS[1] .. KEYS[3]
--  function(doc) {
--      if (doc.type==="state" && (doc.common.custom || doc.common.history))
--          emit(doc._id, doc.common.custom || doc.common.history)
--   }
for _, key in ipairs(keys) do
    if (key >= argStart and key < argEnd) then
        local obj = redis.call("get", key)
        local success, decoded = pcall(cjson.decode, obj)
        if (success and decoded.type == "state" and decoded.common ~= nil and decoded.common.custom ~= nil) then
            rep[#rep + 1] = obj
        end
    end
end
return { rep, cursor }
