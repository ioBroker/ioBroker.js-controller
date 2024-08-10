// Types which are only safe to share publicly

import type { AdapterClass, AdapterOptions as _AdapterOptions } from './build/types';

declare global {
    namespace ioBroker {
        type Adapter<TOptions extends _AdapterOptions | string> = AdapterClass<TOptions>;

        type AdapterOptions = _AdapterOptions;
    }
}
