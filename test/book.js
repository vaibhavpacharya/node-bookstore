process.env.NODE_ENV = 'test';

let mongoose = require('mongoose')
let Book = require('../models/book')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')
global.should = require("chai").should();

chai.use(chaiHttp)
describe('Books', () => {
    beforeEach((done) => { //Before each test we empty the database
        Book.remove({}, (err) => {
           done();
        });
    });

		/*
  * Test the /GET route
  */
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/books')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });





	})

	// describe('/GET book', () => {
	// 	it('it should GET all the books', (done) => {
	// 		chai.request(server)
	// 				.get('/books')
	// 				.end(function(err, res) {
	// 						 should.equal(err, null);
	// 						 res.should.have.status(200);
	// 						 // res.should.be.json;
	// 						 // res.body.should.be.a('array');
	// 						 // res.body.should.have.length(3);
	// 						 res.should.be.a('object');
	// 						 // res.body.should.have.property('id');
	// 						 res.should.have.property('name');
	// 						 res.should.have.property('price');
	// 						 res.should.have.property('description');
	// 						 res.should.have.property('image');
	// 						 // res.body.id.should.be.a('price');
	// 						 res.body.name.should.be.a('string');
	// 						 done();
	// 					 })
	// 	})
	// })

	// describe('/POST book', () => {
		// it('it should not Post a book without pages field', (done) => {
		// 	let book = {
		// 		name: 'The Lord of the Rings',
		// 		price: '9.99',
		// 		description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
		// 	}
		// 	chai.request(server)
		// 			.post('/books')
		// 			.send(book)
		// 			.end((err, res) => {
		// 				res.should.have.status(200)
		// 				res.body.should.be.a('object')
		// 				res.body.should.have.property('errors')
		// 				res.body.errors.should.have.property('pages')
		// 				res.body.errors.pages.should.have.property('kind').eql('required')
		// 				done()
		// 			})
		// })
// 		it('it should POST a book', (done) => {
// 			let book = {
// 				name: 'The Lord of the Rings',
// 				price: '9.99',
// 				image: 'https://static.comicvine.com/uploads/scale_large/6/67663/4598258-70.jpg',
// 				description: 'In order to face off against Madara and his newly acquired Six Paths power, Guy pulls out his most dangerous move. Guy has put his very life on the line, but is it enough against Madara? Meanwhile, as Naruto fights on the edge of death, he meets a special figure who may change the entire direction of the battle!'
// 			}
// 			chai.request(server)
// 					.post('/books')
// 					.send(book)
// 					.end((err, res) => {
// 						res.should.have.status(200)
// 						res.body.should.be.a('object')
// 						// res.body.should.have.property('message').eql('Book successfully added!')
// 						res.body.should.have.property('name')
// 						res.body.should.have.property('price')
// 						res.body.should.have.property('image')
// 						res.body.should.have.property('description')
// 						done()
// 					})
// 		})
// 	})
//
// 	describe('/GET/:id book', () => {
// 		it('it should GET a book by the given id', (done) => {
// 			let book = new Book({
// 				title: 'The Lord of the Rings',
// 				author: 'J.R.R. Tolkien',
// 				year: 1954,
// 				pages: 1170
// 			})
// 			book.save((err, book) => {
// 				chai.request(server)
// 						.get('/book/' + book.id)
// 						.send(book)
// 						.end((err, res) => {
// 							res.should.have.status(200)
// 							res.body.should.be.a('object')
// 							res.body.should.have.property('title')
// 							res.body.should.have.property('author')
// 							res.body.should.have.property('pages')
// 							res.body.should.have.property('year')
// 							res.body.should.have.property('_id').eql(book.id)
// 							done()
// 						})
// 			})
// 		})
// 	})
//
// 	describe('/PUT/:id book', () => {
// 		it('it should UPDATE a book given the id', (done) => {
// 			let book = new Book({
// 				title: 'The Chronicles of Narnia',
// 				author: 'C.S. Lewis',
// 				year: 1948,
// 				pages: 778
// 			})
// 			book.save((err, book) => {
// 				chai.request(server)
// 						.put('/book/' + book.id)
// 						.send({
// 							title: 'The Chronicles of Narnia',
// 							author: 'C.S. Lewis',
// 							year: 1950,
// 							pages: 778
// 						})
// 						.end((err, res) => {
// 							res.should.have.status(200)
// 							res.body.should.be.a('object')
// 							res.body.should.have.property('message').eql('Book updated!')
// 							res.body.book.should.have.property('year').eql(1950)
// 							done()
// 						})
// 			})
// 		})
// 	})
//
// 	describe('/DELETE/:id book', () => {
// 		it('it should DELETE a book given the id', (done) => {
// 			let book = new Book({
// 				title: 'The Chronicles of Narnia',
// 				author: 'C.S. Lewis',
// 				year: 1948,
// 				pages: 778
// 			})
// 			book.save((err, book) => {
// 				chai.request(server)
// 						.delete('/book/' + book.id)
// 						.end((err, res) => {
// 							res.should.have.status(200)
// 							res.body.should.be.a('object')
// 							res.body.should.have.property('message').eql('Book successfully deleted!')
// 							res.body.result.should.have.property('ok').eql(1)
// 							res.body.result.should.have.property('n').eql(1)
// 							done()
// 						})
// 			})
// 		})
// 	})
// })
