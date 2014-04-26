(function (global) {
    'use strict';

    var storaageInstanceIndex = 0;

    var isBoolean = function (value) {
        return (value === true || value === false ||
                value && typeof value == 'object' && value.toString() == '[object Boolean]') || false;
    };

    var Storaage = function (namespace, dataOrPersist, persist) {
        var storage, data;

        if(!namespace || !namespace.toString().trim()) {
            namespace = 'storaage-' + Date.now() + ++storaageInstanceIndex
        }

        if (isBoolean(dataOrPersist)) {
            persist = dataOrPersist;
        } else {
            data = dataOrPersist;
        }

        storage = persist ? 'localStorage' : 'sessionStorage';

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
