local rep = {} 
local keys=redis.call("keys", "cfg.o.*")
local argStart="cfg.o."..KEYS[1]
local argEnd="cfg.o."..KEYS[2]
local type=KEYS[3]
local obj
-- function(doc) { if (doc.type === 'chart') emit(doc.common.name, doc); }
for i,key in ipairs(keys) do
	if (key >= argStart and key < argEnd) then
	    obj = redis.call("get", key)
		if (cjson.decode(obj).type == type) then
            rep[#rep+1] = obj
        end
	end
end
return rep