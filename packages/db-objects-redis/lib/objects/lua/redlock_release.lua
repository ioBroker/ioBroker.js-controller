-- REDLOCK SCRIPT
-- release a lock by deleting the key
-- call with key, value
local key = KEYS[1]

if redis.call("get", key) == KEYS[2] then
  redis.pcall("del", key)
  -- we need to publish a expire, because redis won't do it
  redis.call("publish", "__keyevent@" .. KEYS[3] .. "__:expired", KEYS[4])
end
