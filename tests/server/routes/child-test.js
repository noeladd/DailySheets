/*global require describe beforeEach it */
const expect = require('chai').expect;

const db = require('../../../server/db');

const supertest = require('supertest');

let checkinInfo = {
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
};

let dayInfo = {
    date: 'September 23, 2016'
}

describe('Checkin Route', function(){
    let app, Day, User, Child, Classroom, Checkin, agent, user, day, child, classroom, checkin;

    beforeEach('Sync DB', function () {
        return db.sync({force: true});
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
        Day = db.model('day');
        Child = db.model('child');
        Classroom = db.model('classroom');
        Checkin = db.model('checkin');
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
            return createdUser.setChild(child)
        })
        .then(function(createdUser){
            user = createdUser;
            done();
        })
        .catch(done);
    });
     beforeEach('Create a checkin', function(done){
         Checkin.create(checkinInfo)
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

    beforeEach('Create a day', function(done){
        Day.create(dayInfo)
        .then(function(createdDay){
            return createdDay.setChild(child);
        })
        .then(function(createdDay){
            day = createdDay;
            done();
        })
        .catch(done);
    });

    describe('All Children', function() {
        it('should get a response with an array of children', function(done) {
            agent.get('/api/children').expect(200).end(function(err, response){
                if (err) return done(err)
                expect(response.body).to.be.an('array');
                expect(response.body[0].name).to.equal(child.name);
                done();
            });
        });
    });

    describe('Child by Id', function(){
        it('should get a child back as a response', function(done){
            agent.get('/api/children/1').expect(200).end(function(err, response){
                if (err) return done(err);
                //console.log(response);
                expect(response.body.classroomId).to.equal(1);
                done();
            })
        })
    })
});
