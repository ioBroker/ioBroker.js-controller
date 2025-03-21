type SessionData = Record<string, any>;

type Session = {
    Store: any;
};

// TODO: in the long term move this file somewhere where we have types access it is nowhere used in controller itself and just exported for adapters so it should go to js-controller-adapter package
interface AdapterStoreOptions {
    /** The ioBroker adapter */
    adapter: any;
    /** The cookie */
    cookie?: {
        maxAge?: number;
        originalMaxAge?: number;
    };
}

/**
 * Function to create an AdapterStore constructor
 *
 * @param session The session object, like "express-session"
 * @param defaultTtl the default time to live in seconds
 * @returns the constructor to create a new AdapterStore
 */
export function createAdapterStore(session: Session, defaultTtl = 3600): any {
    const Store = session.Store;

    class AdapterStore extends Store {
        private readonly adapter: any;

        constructor(options: AdapterStoreOptions) {
            super(options);

            this.adapter = options.adapter;

            options = options || {};
            if (!options.cookie) {
                options.cookie = { maxAge: defaultTtl };
            }
            Store.call(this, options);
        }

        /**
         * Attempt to fetch session by the given `sid`.
         *
         * @param sid Session ID
         * @param fn callback
         */
        get(sid: string, fn: (err?: Error | string | null, obj?: SessionData) => void): void {
            this.adapter.getSession(sid, (obj: SessionData): void => {
                if (obj) {
                    if (fn) {
                        return fn(null, obj);
                    }
                } else if (fn) {
                    return fn();
                }
            });
        }

        /**
         * Commit the given `sess` object associated with the given `sid`.
         *
         * @param sid Session ID
         * @param sess the session
         * @param fn callback
         */
        set(sid: string, sess: SessionData, fn: (err?: Error | null) => void): void;
        /**
         * Commit the given `sess` object associated with the given `sid`.
         *
         * @param sid Session ID
         * @param ttl Time to live
         * @param sess the session
         * @param fn callback
         */
        set(sid: string, ttl: number, sess: SessionData, fn: (err?: Error | null) => void): void;

        /**
         * Commit the given `sess` object associated with the given `sid`.
         *
         * @param sid Session ID
         * @param ttl Time to live
         * @param sess the session
         * @param fn callback
         */
        set(sid: unknown, ttl: unknown, sess: unknown, fn?: unknown): void {
            if (typeof sess === 'function') {
                fn = sess as (err?: Error | null) => void;
                sess = ttl;
                // analyse if the session is stored directly from express session
                ttl = (sess as SessionData)?.cookie?.originalMaxAge
                    ? Math.round((sess as SessionData).cookie.originalMaxAge / 1000)
                    : defaultTtl;
            }
            ttl = ttl || defaultTtl;
            this.adapter.setSession(
                sid as string,
                ttl as number,
                sess as SessionData,
                function (err?: Error | null): void {
                    // @ts-expect-error fix later
                    fn?.call(this, err);
                },
            ); // do not use here => !!!
        }

        /**
         * Destroy the session associated with the given `sid`.
         *
         * @param sid Session ID
         * @param fn callback
         */
        destroy(sid: string, fn: () => void): void {
            this.adapter.destroySession(sid, fn);
        }
    }

    return AdapterStore;
}
