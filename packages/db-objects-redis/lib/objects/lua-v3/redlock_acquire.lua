-- REDLOCK SCRIPT
-- call with key, value, ms (for set px)
local key = KEYS[1]

if redis.call("exists", key) == 1 then
  -- lock already acquired by someone could be us too (we can only extend)
  return 0
end

redis.call("set", key, KEYS[2], "PX", KEYS[3])
-- return 1 if lock acquired
return 1
