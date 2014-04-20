describe('Storaage', function () {

  describe('sessionStorage', function () {
    beforeEach(function (done) {
      window.sessionStorage.clear();
      done();
    });

    it('to set the namespace property', function() {
      var store = new Storaage('sessionstore');

      expect(store).to.have.property('ns');
      expect(store.ns).to.equal('sessionstore');
    });

    it('to set data property', function () {
      var store = new Storaage('sessionstore', { version: '1.0.0' });

      expect(store.data).to.be.a('object');
      expect(store.data).to.eql({ version: '1.0.0' })
    });

    it('to select the right storage', function () {
      var store = new Storaage('sessionstore', {}, false);

      expect(store.storage).to.equal('sessionStorage');
      expect(store.storage).to.not.equal('localStorage');
    });

    it('to not modify the storage property', function () {
      var store = new Storaage('sessionstore', {}, false);

      store.storage = 'randomstore';

      expect(store.storage).to.equal('sessionStorage');
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

    it('retrives the individual property from data', function () {
      var store = new Storaage('testing', { storage: ['session', 'local'] });

      expect(store.getItem('storage')).to.eql(['session', 'local']);
    });

    it('sets the individual property to data', function () {
      var store = new Storaage('testing', { storage: ['session', 'local'] });

      store.setItem('storage', 'IndexedDB');

      expect(store.getItem('storage')).to.eql('IndexedDB');
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
  });

});
