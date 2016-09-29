/*global require describe beforeEach it */
const expect = require('chai').expect;


const db = require('../../../server/db');

const supertest = require('supertest');

let checkInInfo = {
    lastFed: 'Nursed at 6:45 AM',
    wokeUp: '6:30 AM',
    lastChanged: 'Wet at 7:00 AM',
    note: 'Had a great night.  A little stuffy this AM',

};

let userInfo = {
    name: 'Abigail Mayer',
    email: 'AMayer@email.net',
    password: 'abigailM',
    isParent: true,
    isTeacher: false,
    isAdmin: false,
};

let childInfo = {
    name: 'Tatiana Mayer-Gold',
    birthdate: 'December 9, 2015',
};

let classroomInfo  = {
    name: 'Little Guppies',
    ageRange: '3 to 15 months'
}

describe('Checkin Route', function(){
    let app, Checkin, User, Child, Classroom, agent, user, checkin, child, classroom;

    beforeEach('Sync DB', function () {
        return db.sync({force: true});
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
        Checkin = db.model('checkin');
        Child = db.model('child');
        Classroom = db.model('classroom');
    });

    beforeEach('Create guest agent', function () {
        agent = supertest.agent(app);
    });
    beforeEach('Create a child', function(done){
        Child.create(childInfo).then(function(createdChild){
            child = createdChild;
            done();
        })
        .catch(done);
    });
    beforeEach('Create a classroom', function(done){
            Classroom.create(classroomInfo).then(function(createdClassroom){
                return createdClassroom.addChild(child);
            })
            .then(function(createdClassroom){
                classroom = createdClassroom;
                done();

            })
            .catch(done);
        });


    beforeEach('Create a user', function(done){
        User.create(userInfo).then(function(createdUser){
            user = createdUser;
            done();
        })
        .catch(done);
    })


    beforeEach('Create a checkin', function(done){
         Checkin.create(checkInInfo)
        .then(function(createdCheckin){
            return createdCheckin.setParent(user);
        })
        .then(function(createdCheckin){
            return createdCheckin.setClassroom(classroom)
        })
        .then(function(createdCheckin){
            return createdCheckin.setChild(child);
        })
        .then(function(createdCheckin){
            checkin = createdCheckin;
            done();
        })
        .catch(done);
    });

    describe('Checkins by Classroom', function() {

        it('should get a response with an array of checkins', function(done) {
            agent.get('/api/checkins/class/1').expect(200).end(function(err, response){
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body[0].lastFed).to.equal(checkin.lastFed);
                done();
            });
        });
    });

    describe('Checkins by Id', function(){
        it('should get a checkin back as a response', function(done){
            agent.get('/api/checkins/1').expect(200).end(function(err, response){
                if (err) return done(err);
                expect(response.body.lastFed).to.equal(checkin.lastFed);
                done();
            })
        })
    })
});
