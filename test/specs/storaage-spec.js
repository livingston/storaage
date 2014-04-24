describe('Storaage', function () {

  describe('common functionality', function () {
    beforeEach(function (done) {
      window.sessionStorage.clear();
      done();
    });

    xit('to fail when no namespace is passed', function() {
      expect(new Storaage).to.throw(Error);
      chai.assert.throws(new Storaage, Error, 'Undefined namespace')
    });

    it('to set the namespace property', function() {
      var store = new Storaage('sessionstore');

      expect(store).to.have.property('ns');
      expect(store.ns).to.equal('sessionstore');
    });

    it('to not modify the namespace property', function () {
      var store = new Storaage('sessions');

      store.ns = 'random';

      expect(store.ns).to.equal('sessions');
    });

    it('retrives the individual property from data', function () {
      var store = new Storaage('testing', { storage: ['session', 'local'] });

      expect(store.getItem('storage')).to.eql(['session', 'local']);
    });

    it('sets the individual property to data', function () {
      var store = new Storaage('testing', { storage: ['session', 'local'] });

      store.setItem('storage', 'IndexedDB');

      expect(store.getItem('storage')).to.eql('IndexedDB');
    });

    it('to set storage as sessionStorage only one argument is passed', function () {
      var store = new Storaage('sessionstore');

      expect(store.storage).to.equal(window.sessionStorage);
      expect(store.storage).to.not.equal(window.localStorage);
    });

    it('to set localStorage as storage when `true` is passed as 2nd argument', function () {
      var store = new Storaage('testing', true);

      expect(store.storage).to.equal(window.localStorage);
    });
  });

  describe('sessionStorage', function () {
    beforeEach(function (done) {
      window.sessionStorage.clear();
      done();
    });

    it('to set data property', function () {
      var store = new Storaage('sessionstore', { version: '1.0.0' });

      expect(store.data).to.be.a('object');
      expect(store.data).to.eql({ version: '1.0.0' })
    });

    it('to set storage as sessionStorage', function () {
      var store = new Storaage('sessionstore', {}, false);

      expect(store.storage).to.equal(window.sessionStorage);
      expect(store.storage).to.not.equal(window.localStorage);
    });

    it('to not modify the storage property', function () {
      var store = new Storaage('sessionstore', {}, false);

      store.storage = {};

      expect(store.storage).to.equal(window.sessionStorage);
    });

    it('to store data passed in as argument, in sessionStorage', function () {
      var store = new Storaage('sessionstore', { version: '2.0.0' });

      expect(JSON.parse(sessionStorage.getItem('sessionstore'))).to.eql({ version: '2.0.0' });
    });

    it('to store data set as value in sessionStorage', function () {
      var store = new Storaage('sessionstore');

      store.data = { test: '1234' };

      expect(JSON.parse(sessionStorage.getItem('sessionstore'))).to.eql({ test: '1234' });
    });

    it('to not overwrite data in sessionStorage', function () {
      window.sessionStorage.setItem('sessionstore', '{ "test": 123 }');
      var store = new Storaage('sessionstore');

      expect(JSON.parse(sessionStorage.getItem('sessionstore'))).to.eql({ test: 123 });
    });

    it('data should be identical among instances using the same namespace', function () {
      var store1 =  new Storaage('sessionstore', { version: '1.0.0' });
      var store2 =  new Storaage('sessionstore', { version: '2.0.0' });

      expect(store1.data).to.eql(store2.data);
    })

    it('data should be unique among instances with different namespace', function () {
      var store1 =  new Storaage('sessionstore', { version: '1.0.0' });
      var store2 =  new Storaage('sessionstore2', { version: '2.0.0' });

      expect(store1.data).to.not.eql(store2.data);
    });

    it('to not use sessionStorage when persist is true', function () {
      var store = new Storaage('sessionstore', {}, true);

      expect(store.storage).to.not.equal(window.sessionStorage);
    });
  });

  describe('localStorage', function () {
    beforeEach(function (done) {
      window.localStorage.clear();
      done();
    });

    it('to set data property', function () {
      var store = new Storaage('localstore', { version: '1.0.0' }, true);

      expect(store.data).to.be.a('object');
      expect(store.data).to.eql({ version: '1.0.0' })
    });

    it('to set storage as localStorage', function () {
      var store = new Storaage('localstore', {}, true);

      expect(store.storage).to.not.equal(window.sessionStorage);
      expect(store.storage).to.equal(window.localStorage);
    });

    it('to not modify the storage property', function () {
      var store = new Storaage('localstore', {}, true);

      store.storage = {};

      expect(store.storage).to.equal(window.localStorage);
    });

    it('to store data passed in as argument, in localStorage', function () {
      var store = new Storaage('localstore', { version: '2.0.0' }, true);

      expect(JSON.parse(localStorage.getItem('localstore'))).to.eql({ version: '2.0.0' });
    });

    it('to store data set as value in localStorage', function () {
      var store = new Storaage('localstore', null, true);

      store.data = { test: '1234' };

      expect(JSON.parse(localStorage.getItem('localstore'))).to.eql({ test: '1234' });
    });

    it('to not overwrite data in localStorage', function () {
      localStorage.setItem('localstore', '{ "test": 123 }');
      var store = new Storaage('localstore', null, true);

      expect(JSON.parse(localStorage.getItem('localstore'))).to.eql(store.data);
    });

    it('data should be identical among instances using the same namespace', function () {
      var store1 =  new Storaage('localstore', { version: '1.0.0' }, true);
      var store2 =  new Storaage('localstore', { version: '2.0.0' }, true);

      expect(store1.data).to.eql(store2.data);
    })

    it('data should be unique among instances with different namespace', function () {
      var store1 =  new Storaage('localstore', { version: '1.0.0' }, true);
      var store2 =  new Storaage('localstore2', { version: '2.0.0' }, true);

      expect(store1.data).to.not.eql(store2.data);
    });

    it('to not use localStorage when persist is false', function () {
      var store = new Storaage('localstore', {}, true);

      expect(store.storage).to.not.equal(window.sessionStorage);
    });
  });

});
