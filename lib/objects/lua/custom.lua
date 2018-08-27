local rep = {}
local keys=redis.call("keys", "cfg.o.*")
local argStart="cfg.o."..KEYS[1]
local argEnd="cfg.o."..KEYS[2]
local obj
local decoded
--  function(doc) {
--      if (doc.type==='state' && (doc.common.custom || doc.common.history))
--          emit(doc._id, doc.common.custom || doc.common.history)
--   }
for i,key in ipairs(keys) do
	if (key >= argStart and key < argEnd) then
	    obj = redis.call("get", key)
	    decoded = cjson.decode(obj)
		if (decoded.type == "state" and decoded.common ~= nil and decoded.common.custom ~= nil) then
            rep[#rep+1] = obj
        end
	end
end
return rep