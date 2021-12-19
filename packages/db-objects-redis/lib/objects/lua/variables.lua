-- design: hm-rega
-- search: variables
local rep = {}
-- local keys=redis.call("keys", KEYS[1].."*")
local cursor = KEYS[4];
local result = redis.call("SSCAN", KEYS[5], cursor, "MATCH", KEYS[1] .. "*", "COUNT", 500)
cursor = result[1]
local keys = result[2]
local argStart = KEYS[1] .. KEYS[2]
local argEnd = KEYS[1] .. KEYS[3]
local checkStr = string.format("%q:", "TypeName");
--  function(doc) {
--      if (doc._id.match(/^hm-rega\\.[0-9]+\\.[0-9,A-Z,a-z]+/) && (doc.native.TypeName === "ALARMDP" || doc.native.TypeName === "VARDP")) {
--          emit(doc._id, doc);
--      }
--  }
for _, key in ipairs(keys) do
    if (key >= argStart and key < argEnd) then
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
