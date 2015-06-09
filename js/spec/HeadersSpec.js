var Header = require('../lib/Headers');
describe("Header Config", function(){
  it("should have a agent property", function () {
    expect(Header['User-Agent']).not.toBe(undefined);
//expect(Header['User-Agent']).toMatch('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36');
  });
})
