// eslint-disable-next-line @typescript-eslint/no-var-requires
const Resp = require('respjs');

export const QUEUED_STR_BUF: Buffer = Resp.encodeString('QUEUED');
export const OK_STR_BUF: Buffer = Resp.encodeString('OK');
