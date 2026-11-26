/**
 * Marker the in-memory (jsonl) states server uses to recognize this script on `SCRIPT LOAD`
 * and to emulate it natively instead of running Lua.
 */
export const SET_STATE_SCRIPT_MARKER = '-- IOBROKER SETSTATE SCRIPT v1';

/**
 * Writes a state, computes its `lc` (last change) on the server and publishes it, all in one round trip.
 *
 * Without it, `setState` first has to `GET` the old state only to find out whether the value changed,
 * and then send `SET` and `PUBLISH`: two round trips per call on the hottest path of the system.
 *
 * KEYS[1]  key of the state
 * ARGV[1]  the new state as JSON **without** `lc` and without the closing `}`.
 *          `lc` is always the last property of a state, so appending `,"lc":<lc>}` gives exactly
 *          the string the client would have produced itself.
 * ARGV[2]  JSON of the new `val` (only primitive values, objects take the classic path)
 * ARGV[3]  `ts` of the new state, used as `lc` if the value changed
 * ARGV[4]  expire in seconds, or an empty string
 *
 * Keep the logic identical to the emulation in `@iobroker/db-states-jsonl` (statesInMemServerRedis.ts).
 */
export const SET_STATE_SCRIPT = `${SET_STATE_SCRIPT_MARKER}
local lc = ARGV[3]
local oldRaw = redis.call('GET', KEYS[1])
if oldRaw then
    local okOld, old = pcall(cjson.decode, oldRaw)
    if okOld and type(old) == 'table' and type(old.lc) == 'number' and old.lc ~= 0 then
        local okVal, val = pcall(cjson.decode, ARGV[2])
        if okVal and old.val == val then
            lc = string.format('%.17g', old.lc)
        end
    end
end
local state = ARGV[1] .. ',"lc":' .. lc .. '}'
if ARGV[4] ~= '' then
    redis.call('SETEX', KEYS[1], ARGV[4], state)
else
    redis.call('SET', KEYS[1], state)
end
redis.call('PUBLISH', KEYS[1], state)
return 1
`;
