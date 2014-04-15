describe('SessionStore', function () {

  beforeEach(function (done) {
    window.sessionStorage.clear();
    done();
  });

  it('to set the namespace property', function() {
    var store = new SessionStore('sessionstore');

    expect(store).to.have.property('ns');
    expect(store.ns).to.equal('sessionstore');
  });

  it('to set data property', function () {
    var store = new SessionStore('sessionstore', { version: '1.0.0' });

    expect(store.data).to.be.a('object');
    expect(store.data).to.eql({ version: '1.0.0' })
  });

  it('to store data passed in as argument, in sessionStorage', function () {
    var store = new SessionStore('sessionstore', { version: '2.0.0' });

    expect(JSON.parse(sessionStorage.getItem('sessionstore'))).to.eql({ version: '2.0.0' });
  });

  it('to store data set as value in sessionStorage', function () {
    var store = new SessionStore('sessionstore');

    store.data = { test: '1234' };

    expect(JSON.parse(sessionStorage.getItem('sessionstore'))).to.eql({ test: '1234' });
  });
});
