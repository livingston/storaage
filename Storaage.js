(function (global) {
    'use strict';

    var Storaage = function (namespace, data, persist) {
        var storage = persist ? 'localStorage' : 'sessionStorage';

        this.ns = namespace;
        this.storage = global[storage];

        Object.freeze(this);

        if (data)
            this.data = data;
    };

    Object.defineProperties(Storaage.prototype, {
        data: {
            get: function () {
                return JSON.parse(this.storage.getItem(this.ns));
            },
            set: function (data) {
                this.storage.setItem(this.ns, JSON.stringify(data || {}));
            }
        },
        getItem: {
            value: function (key) {
                return this.data[key];
            }
        },
        setItem: {
            value: function (key, value) {
                var data = this.data;
                data[key] = value;

                this.data = data;
            }
        }
    });

    global.Storaage = Storaage;
}(window));
