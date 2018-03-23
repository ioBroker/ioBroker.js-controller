'use strict';

module.exports = function (session, defaultTtl) {
    var Store = session.Store;
    defaultTtl = defaultTtl || 3600;
    
    function AdapterStore(options) {
        var that = this;

        this.adapter = options.adapter;

        options = options || {};
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

        this.adapter.getSession(sid, function (obj) {
            if (obj) {
                if (fn) return fn(null, obj);
            } else {
                if (fn) return fn();
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
            ttl  = defaultTtl;
        }

        ttl = ttl || defaultTtl;
        this.adapter.setSession(sid, ttl, sess, function () {
            if (fn) fn.apply(this, arguments);
        });
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