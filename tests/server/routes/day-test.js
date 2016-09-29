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

let diaperInfo = {
    time: '9:15 AM',
    type: 'wet',
    cream: 'true',
    notes: 'very red, apply cream every change'
}

let bottleInfo = {
    time: '12:45 PM',
    type: 'breast milk',
    ounces: 6,
    notes: 'Tatiana was fussy but was quickly soothed by the bottle'
}

let mealInfo = {
    time: '11:45',
    type: 'lunch',
    food: ['chicken', 'noodles', 'peas', 'peaches'],
    notes: 'Tati loved the noodles, peas and peaches, she ate about half of the chicken.'
}

let napInfo = {
    start: '1:10 PM',
    end: '2:45 PM',
    notes: 'Went down easily and slept soundly.  Did not need binky today.'
}

describe('Day Route', function(){
    let app, User, Child, Classroom, Checkin, Day, Diaper, Bottle, Meal, Nap, agent, teacher, child, classroom, parent, checkin, day, diaper, bottle, meal, nap; //eslint-disable-line

    beforeEach('Sync DB', function () {
        return db.sync({force: true});
    });

    beforeEach('create app', function(){
        app = require('../../../server/app')(db);
        User = db.model('user');
        Child = db.model('child');
        Classroom = db.model('classroom');
        Checkin = db.model('checkin');
        Day = db.model('day');
        Diaper = db.model('diaper');
        Bottle = db.model('bottle');
        Meal = db.model('meal');
        Nap = db.model('nap')
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

    beforeEach('create a diaper', function(done){
        Diaper.create(diaperInfo)
        .then(function(createdDiaper){
            return createdDiaper.setDay(day);
        })
        .then(function(createdDiaper){
            diaper = createdDiaper;
            done();
        })
        .catch(done);
    });

    beforeEach('create a Bottle', function(done){
        Bottle.create(bottleInfo)
        .then(function(createdBottle){
            return createdBottle.setDay(day);
        })
        .then(function(createdBottle){
            bottle = createdBottle;
            done();
        })
        .catch(done);
    });

    beforeEach('create a meal', function(done){
        Meal.create(mealInfo)
        .then(function(createdMeal){
            return createdMeal.setDay(day);
        })
        .then(function(createdMeal){
            meal = createdMeal;
            done();
        })
        .catch(done);
    });

    beforeEach('create a nap', function(done){
        Nap.create(napInfo)
        .then(function(createdNap){
            return createdNap.setDay(day);
        })
        .then(function(createdNap){
            nap = createdNap;
            done();
        })
        .catch(done);
    })

    describe('day by Id', function(){
        it('should get a day back as a response', function(done) {
            agent.get('/api/days/1').expect(200).end(function(err, response){
                if (err) return done(err);
                // console.log(response.body);
                expect(response.body.childId).to.equal(1);
                done();
            });
        })
    })
})

