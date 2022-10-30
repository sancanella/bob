const assert = require('assert');
const fetch = require('node-fetch');

const { App } = require('../dist/api/app')
let app;
before(function (done) {
  this.timeout(3000);
  app = new App()
  app.start(done)

})

after(() => {
  console.log('End')
  app.stop()
})

describe('CRUD UserBag', function () {

  

  describe('#create()', function () {
    it('shoud be able to create userInfo', async function () {

      const random = parseInt(Math.random()*1000)
      
      await create("Name 1",random)

      const data = await getAll();
      assert.equal(data.filter(item => item.Bags == random).length, 1);
    });
    it('shoud fail if I use invalid params',async function () {

      const random = parseInt(Math.random()*1000)
      await create(undefined, random)
      const data = await getAll();

      assert.equal(data.filter(item => item.Bags == random).length, 0);

    });
  });

  describe('#getAll()', function () {
    it('It\'s able to get all items', async function () {
        const data = await getAll();
        await create("Test 2", 1)
        const data2 = await getAll();

        assert.equal(data.length+1,data2.length)
    });
  });

  describe('#update()', function () {
    it('should be able to update entity', async function () {
      const random = parseInt(Math.random()*1000)
      const creation = await create("test update", random).then(res => res.json())

      const data = await getAll();
      assert.equal(data.filter(item => item.Bags == random).length, 1);

      const id = creation._id
      await fetch('http://localhost:'+process.env.PORT+"/bag/"+id,{method:'PUT', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({Name:"Update 2",Bags:1})})

      const data2 = await getAll();
      assert.equal(data2.filter(item => item.Bags == random).length, 0);
      assert.equal(data2.filter(item => item._id == id).length, 1);
    });
  });

  describe('#delete()', function () {
    it('should delete entity', async function () {
      const creation = await create("test delete", 1).then(res => res.json())
      let data = await getAll();
      const initLength = data.length;
      assert.equal(data.filter(item => item._id == creation._id).length, 1);
      await fetch('http://localhost:'+process.env.PORT+"/bag/"+creation._id,{method:'DELETE'})
      data = await getAll();
      assert.equal(data.filter(item => item._id == creation._id).length, 0);
      assert.equal( data.length,initLength-1);

    });
  });
});

const getAll = () => {
  return fetch('http://localhost:'+process.env.PORT+"/bag").then(res => res.json());
}

const create = (Name, Bags) => {
  return fetch('http://localhost:'+process.env.PORT+"/bag",{method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({Name,Bags})})
}
