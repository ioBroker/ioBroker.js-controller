module.exports = function (session) {



    var Store = session.Store;



    function AdapterStore(options) {
        var that = this;

        this.adapter = options.adapter;

        options = options || {};
        Store.call(this, options);

    };

    AdapterStore.prototype.__proto__ = Store.prototype;

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
                return fn(null, obj);
            } else {
                return fn();
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

    AdapterStore.prototype.set = function (sid, sess, fn) {
        var ttl = 3600;
        this.adapter.setSession(sid, ttl, sess, function () {
            console.log('setSession');
            fn && fn.apply(this, arguments);
        });

    };

    /**
     * Destroy the session associated with the given `sid`.
     *
     * @param {String} sid
     * @api public
     */

    AdapterStore.prototype.destroy = function(sid, fn){
        this.adapter.destroySession(sid, fn);
    };

    return AdapterStore;
};