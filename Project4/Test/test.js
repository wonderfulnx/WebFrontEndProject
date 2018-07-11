const assert = require('assert');
const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');

host = 'localhost'
server_url = host + ':3000'

describe('Test', function() {
	//测试计算api
	describe('Part1', function() {
		it('Should get right answer', function(done) {
			request(server_url).get('/api/compute')
			  	.set('hw-token', '1234567890')
				.query({
					firstParam: 1,
					secondParam: 2,
					type: 'ADD'
				})
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)
				.end(function(err, res) {
					if (err) {
						console.log(err)
						throw err;
					}
					expect(res.body).to.include.keys('ans');
					expect(res.body.ans).to.be.equal(3);
					done();
				});
		});
	});

	//测试添加键值对
	describe('Part2', function() {
		it('Should correctly store', function(done) {
			request(server_url).post('/api/pair')
			  .set('hw-token', '1234567890')
			  .set('Content-Type', 'multipart/form-data')
              .field('key', 'key1')
              .field('value', 'I L0ve Web')
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                done();
              });
		});
	});
	
	//测试查询键值
	describe('Part3', function() {
		it('Should get right value', function(done) {
			request(server_url).get('/api/pair')
				.query({
					key: 'key1'
				})
			  	.set('hw-token', '1234567890')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)
				.end(function(err, res) {
					if (err) {
						console.log(err)
						throw err;
					}
					expect(res.body).to.include.keys('value');
					expect(res.body.value).to.be.equal('I L0ve Web');
					done();
				});
		});
	});

	//测试删除键值
	describe('Part4', function() {
		it('Should correctly delete', function(done) {
			request(server_url).del('/api/pair')
			  .set('hw-token', '1234567890')
			  .query({
			  	key: 'key1'
			  })
			  .expect(200)
        	  .end(function(err, res) {
          	  	if (err) return done(err);
          		done();
        	  });
		})
	});

	//测试无token的情况
	describe('Part5', function() {
		it ('Should return 403', function(done) {
			request(server_url).get('/api/pair')
				.query({
					key: 'Key1'
				})
				.expect(403)
				.end(function(err, res) {
					if (err) return done(err);
					done();
				})
		})
	})

	//测试查询键值的404
	describe('Part6', function() {
		it('Should return 404', function(done) {
			request(server_url).get('/api/pair')
				.query({
					key: 'key2'
				})
			  	.set('hw-token', '1234567890')
				.expect(404)
				.end(function(err, res) {
					  if (err) return done(err);
					done();
				});
		});
	});

	//测试删除键值404
	describe('Part7', function() {
		it('Should return 404', function(done) {
			request(server_url).del('/api/pair')
			  .set('hw-token', '1234567890')
			  .query({
			  	key: 'key3'
			  })
			  .expect(404)
        	  .end(function(err, res) {
          	  	if (err) return done(err);
          		done();
        	  });
		})
	});

	//测试token错误的情况
	describe('Part8', function() {
		it ('Should return 403', function(done) {
			request(server_url).get('/api/pair')
				.query({
					key: 'Key1'
				})
				.set('hw-token', '12345678901234')
				.expect(403)
				.end(function(err, res) {
					if (err) return done(err);
					done();
				})
		})
	})

});
