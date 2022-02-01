-- design: hm-rega
-- search: programs
local rep = {}
local cursor = KEYS[4];
local result = redis.call("SCAN", cursor, "MATCH", KEYS[1] .. "*", "COUNT", 500)
cursor = result[1]
local keys = result[2]
local argStart = KEYS[1] .. KEYS[2]
local argEnd = KEYS[1] .. KEYS[3]
local checkStr = string.format("%q:%q", "TypeName", "PROGRAM")
--  function(doc) {
--      if (doc._id.match(/^hm-rega\\.[0-9]+\\.[0-9,A-Z,a-z]+/) && (doc.native.TypeName === "PROGRAM")) {
--          emit(doc._id, doc);
--      }
--  }
for _, key in ipairs(keys) do
    if (key >= argStart and key < argEnd and key:sub(7, 13) == "hm-rega") then
        local obj = redis.call("get", key)
        if (obj:find(checkStr) ~= nil) then
            local success, decoded = pcall(cjson.decode, obj)
            if (success and decoded.native ~= nil and decoded.native.TypeName == "PROGRAM") then
                rep[#rep + 1] = obj
            end
        end
    end
end
return { rep, cursor }
