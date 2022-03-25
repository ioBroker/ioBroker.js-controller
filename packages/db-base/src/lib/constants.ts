// @ts-expect-error types missing
import Resp from 'respjs';

export const QUEUED_STR_BUF: Buffer = Resp.encodeString('QUEUED');
export const OK_STR_BUF: Buffer = Resp.encodeString('OK');
