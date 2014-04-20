(function (global) {
    'use strict';
    var Storaage = function (namespace, data, persist) {
        this.ns = namespace;
        this.storage = persist ? 'localStorage' : 'sessionStorage';

        Object.freeze(this);

        if (data)
            this.data = data;
    };

    Object.defineProperties(Storaage.prototype, {
        data: {
            get: function () {
                return JSON.parse(global[this.storage].getItem(this.ns));
            },
            set: function (data) {
                global[this.storage].setItem(this.ns, JSON.stringify(data || {}));
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
