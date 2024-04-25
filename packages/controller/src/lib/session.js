export default function createAdapterStore(session, defaultTtl = 3600) {
    const Store = session.Store;

    class AdapterStore extends Store {
        constructor(options) {
            super(options);
            // const that = this;

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
         * @param {String} sid Session ID
         * @param {Function} fn callback
         * @api public
         */
        get(sid, fn) {
            this.adapter.getSession(sid, obj => {
                if (obj) {
                    if (fn) {
                        return fn(null, obj);
                    }
                } else {
                    if (fn) {
                        return fn();
                    }
                }
            });
        }

        /**
         * Commit the given `sess` object associated with the given `sid`.
         *
         * @param {String} sid Session ID
         * @param {Number} ttl Time to live
         * @param {Session} sess
         * @param {Function} fn callback
         * @api public
         */
        set(sid, ttl, sess, fn) {
            if (typeof ttl === 'object') {
                fn = sess;
                sess = ttl;
                // analyse if the session is stored directly from express session
                ttl =
                    sess && sess.cookie && sess.cookie.originalMaxAge
                        ? Math.round(sess.cookie.originalMaxAge / 1000)
                        : defaultTtl;
            }
            ttl = ttl || defaultTtl;
            this.adapter.setSession(sid, ttl, sess, function () {
                fn && fn.apply(this, arguments);
            }); // do not use here => !!!
        }

        /**
         * Destroy the session associated with the given `sid`.
         *
         * @param {String} sid Session ID
         * @param {Function} fn callback
         * @api public
         */
        destroy(sid, fn) {
            this.adapter.destroySession(sid, fn);
        }
    }

    return AdapterStore;
}
