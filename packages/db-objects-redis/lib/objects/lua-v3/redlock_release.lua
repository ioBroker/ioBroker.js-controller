-- REDLOCK SCRIPT
-- release a lock by deleting the key
-- call with key, value
local key = KEYS[1]

if redis.call("get", key) == KEYS[2] then
  redis.pcall("del", key)
end
