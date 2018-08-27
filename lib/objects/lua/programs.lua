local rep = {}
local keys=redis.call("keys", "cfg.o.*")
local argStart="cfg.o."..KEYS[1]
local argEnd="cfg.o."..KEYS[2]
local obj
local decoded
--  function(doc) {
--      if (doc._id.match(/^hm-rega\\.[0-9]+\\.[0-9,A-Z,a-z]+/) && (doc.native.TypeName === 'PROGRAM')) {
--          emit(doc._id, doc);
--      }
--  }
for i,key in ipairs(keys) do
	if (key >= argStart and key < argEnd and key:sub(7, 13) == "hm-rega") then
	    obj = redis.call("get", key)
	    decoded = cjson.decode(obj)
		if (decoded.native ~= nil and decoded.native.TypeName == "PROGRAM") then
            rep[#rep+1] = obj
        end
	end
end
return rep