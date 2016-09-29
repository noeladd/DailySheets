/* global require describe beforeEach it */
const expect = require('chai').expect;
const db = require('../../../server/db');
const supertest = require('supertest');

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

let childInfo = {
    name: 'Tatiana Mayer-Gold',
    birthdate: 'December 9, 2015',
};

let classroomInfo  = {
    name: 'Little Guppies',
    ageRange: '3 to 15 months'
};

let checkinInfo = {
    lastFed: 'Nursed at 6:45 AM',
    wokeUp: '6:30 AM',
    lastChanged: 'Wet at 7:00 AM',
    note: 'Had a great night.  A little stuffy this AM',

};

let dayInfo = {
    date: 'September 23, 2016'
};

describe('Classroom Route', function(){
    let app, User, Child, Classroom, Checkin, Day, agent, teacher, child, classroom, parent, checkin, day; //eslint-disable-line

    beforeEach('Sync DB', function () {
        return db.sync({force: true});
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
        Child = db.model('child');
        Classroom = db.model('classroom');
        Checkin = db.model('checkin');
        Day = db.model('day')
    });

    beforeEach('Create agent', function(){
        agent = supertest.agent(app);
    });

    beforeEach('Create a child', function(done){
        Child.create(childInfo).then(function(createdChild){
            child = createdChild;
            done();
        })
        .catch(done);
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
            return createdParent.setChild(child)
        })
        .then(function(createdParent){
            parent = createdParent
            done()
        })
        .catch(done);
    })


    beforeEach('Create a classroom', function(done){
            Classroom.create(classroomInfo).then(function(createdClassroom){
                return createdClassroom.addChild(child);
            })
            .then(function(createdClassroom){
                return createdClassroom.setTeacher(teacher);
            })
            .then(function(createdClassroom){
                classroom = createdClassroom;
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

    beforeEach('Create a checkin', function(done){
         Checkin.create(checkinInfo)
        .then(function(createdCheckin){
            return createdCheckin.setParent(parent);
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

    describe('All Classrooms', function(){
        it('should get a response with an array of children', function(done) {
            agent.get('/api/classrooms').expect(200).end(function(err, response){
                if (err) return done(err)
                console.log(response.body[0]);
                expect(response.body).to.be.an('array');
                expect(response.body[0].name).to.equal(classroom.name);
                done();
            });
        });
    });

    describe('Classroom by Id', function(){
        it('should get a classroom back as a response', function(done) {
            agent.get('/api/classrooms/1').expect(200).end(function(err, response){
                if (err) return done(err);
                //console.log(response.body)
                expect(response.body.ageRange).to.equal(classroom.ageRange);
                expect(response.body.teacher[0].name).to.equal(teacher.name);
                expect(response.body.children[0].name).to.equal(child.name);
                done()
            })
        })
    })
})
