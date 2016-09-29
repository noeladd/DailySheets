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
};

let messageInfo = {
    subject: 'Parent-Teacher Conferences',
    content: 'Hi Abigail, it\'s time for me to set conferences for Tomek and Tatiana, would you prefer to have a conference with Abe or would you each like to schedule your own conferences \n Please let me know by next Wednesday! \n Violet Bridges, head teacher Little Guppies classroom'
}

describe('Message Route', function(){
    let app, User, Message, agent, teacher, parent, message //eslint-disable-line

     beforeEach('Sync DB', function () {
        return db.sync({force: true});
    });

    beforeEach('Create app', function() {
        app = require('../../../server/app')(db);
        User = db.model('user')
        Message = db.model('message');
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

    beforeEach('create a message', function(done){
        Message.create(messageInfo).then(function(createdMessage){
            return createdMessage.setFrom(teacher)
        })
        .then(function(createdMessage){
            return createdMessage.setTo(parent)
        })
        .then(function(createdMessage){
            message = createdMessage;
            done();
        })
        .catch(done)
    });

    describe('messages by fromId', function(){
        it('should get an array of messages from user id', function(done){
            agent.get(`/api/messages/from/1`).expect(200).end(function(err, response){
                if (err) return done(err);
                // console.log(response.body);
                expect(response.body[0].toId).to.equal(parent.id);
                done();
            })
        })
    })

    describe('messages by fromId', function(){
        it('should get an array of messages to user id', function(done){
            agent.get(`/api/messages/to/2`).expect(200).end(function(err, response){
                if (err) return done(err);
                // console.log(response.body);
                expect(response.body[0].fromId).to.equal(teacher.id);
                done();
            })
        })
    })


})
