'use strict';

module.exports = function (session, defaultTtl) {
    const Store = session.Store;
    defaultTtl = defaultTtl || 3600;

    /** @class */
    function AdapterStore(options) {
        // const that = this;

        this.adapter = options.adapter;

        options = options || {};
        if (!options.cookie) {
            options.cookie = {maxAge: defaultTtl};
        }
        Store.call(this, options);
    }

    // Object.getPrototypeOf(AdapterStore.prototype) ?
    // AdapterStore.prototype.__proto__ = Store.prototype;
    AdapterStore.prototype = Object.create(Store.prototype);

    /**
     * Attempt to fetch session by the given `sid`.
     *
     * @param {String} sid
     * @param {Function} fn
     * @api public
     */

    AdapterStore.prototype.get = function (sid, fn) {

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
    };

    /**
     * Commit the given `sess` object associated with the given `sid`.
     *
     * @param {String} sid
     * @param {Session} sess
     * @param {Function} fn
     * @api public
     */
    AdapterStore.prototype.set = function (sid, ttl, sess, fn) {
        if (typeof ttl === 'object') {
            fn   = sess;
            sess = ttl;
            // analyse if the session is stored directly from express session
            ttl  = sess && sess.cookie && sess.cookie.originalMaxAge ? Math.round(sess.cookie.originalMaxAge / 1000) : defaultTtl;
        }
        ttl = ttl || defaultTtl;
        this.adapter.setSession(sid, ttl, sess, function () {
            fn && fn.apply(this, arguments);
        }); // do not use here => !!!
    };

    /**
     * Destroy the session associated with the given `sid`.
     *
     * @param {String} sid
     * @api public
     */

    AdapterStore.prototype.destroy = function (sid, fn) {
        this.adapter.destroySession(sid, fn);
    };

    return AdapterStore;
};
