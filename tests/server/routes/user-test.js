/* global require describe beforeEach it */
const expect = require('chai').expect;
const db = require('../../../server/db');
const supertest = require('supertest')

let teacherInfo = {
    name: 'Violet Bridges',
    email: 'violet@motherhen.com',
    password: 'violetB',
    isParent: false,
    isTeacher: true,
    isAdmin: false
}

let parentInfo = {
    name: 'Abigail Mayer',
    email: 'AMayer@email.net',
    password: 'abigailM',
    isParent: true,
    isTeacher: false,
    isAdmin: false,
}

let adminInfo = {
    name: 'Holly Cook',
    email: 'holly@motherhen.com',
    password: 'hollyC',
    isParent: false,
    isTeacher: false,
    isAdmin: true
}

describe('User Route', function(){
    let app, User, agent, teacher, parent, admin

    beforeEach('Sync DB', function () {
        return db.sync({force: true});
    });

    beforeEach('Create app', function() {
        app = require('../../../server/app')(db);
        User = db.model('user')
    });

    beforeEach('Create agent', function(){
        agent = supertest.agent(app);
    });

    beforeEach('Create a teacher', function(done){
        User.create(teacherInfo).then(function(createdUser){
            teacher = createdUser;
            done();
        })
        .catch(done);
    });

    beforeEach('Create a parent', function(done){
        User.create(parentInfo).then(function(createdParent){
            parent = createdParent
            done()
        })
        .catch(done);
    });

    beforeEach('Create an admin', function(done){
        User.create(adminInfo).then(function(createdAdmin){
            admin = createdAdmin
            done()
        })
        .catch(done);
    })

    describe('gets all staff', function(){
        it('should get an array of staff', function(done){
            agent.get('/api/users/staff').expect(200).end(function(err, response){
                if (err) return done(err);
                console.log(response.body)
                expect(response.body[0].id).to.equal(teacher.id);
                expect(response.body[1].id).to.equal(admin.id);
                done();
            })
        })
    })

    describe('gets all parents', function(done){
        it('should get an array of parents', function(done){
            agent.get('/api/users/parents').expect(200).end(function(err, response){
                if (err) return done(err);
                console.log(response.body);
                expect(response.body[0].id).to.equal(parent.id)
                done();
            })
        })
    })
})
