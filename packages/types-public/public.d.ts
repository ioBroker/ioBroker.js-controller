// Types which are only safe to share publicly

import { AdapterClass, AdapterOptions as _AdapterOptions } from './build/types';

declare global {
    namespace ioBroker {
        type Adapter = AdapterClass;

        type AdapterOptions = _AdapterOptions;
    }
}
