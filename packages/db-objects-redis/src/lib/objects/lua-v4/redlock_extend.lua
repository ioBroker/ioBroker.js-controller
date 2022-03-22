-- REDLOCK SCRIPT
-- call with key, value, ms (for set px)
local key = KEYS[1]

if redis.call("get", key) ~= KEYS[2] then
  -- we return 0 if lock is already taken by someone else
  return 0
end

redis.call("set", key, KEYS[2], "PX", KEYS[3])
-- return 1 if we extended the lock successfully
return 1
