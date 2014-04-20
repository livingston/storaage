(function (global) {
    'use strict';
    var Storaage = function (namespace, data) {
        this.ns = namespace;

        if (data)
            this.data = data;
    };

    Object.defineProperties(Storaage.prototype, {
        data: {
            get: function () {
                return JSON.parse(window.sessionStorage.getItem(this.ns));
            },
            set: function (data) {
                window.sessionStorage.setItem(this.ns, JSON.stringify(data || {}));
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
