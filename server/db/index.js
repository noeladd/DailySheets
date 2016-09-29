'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Checkin = require('./models/checkin');
var Child = require('./models/child');
var Classroom = require('./models/classroom');
var Day = require('./models/day');
var Diaper = require('./models/diaper');
var Bottle = require('./models/bottle');
var Meal = require('./models/meal');
var Message = require('./models/message');
var Nap = require('./models/nap');


User.belongsTo(Child);
Child.hasMany(User, {as: 'parent'});
User.belongsTo(Classroom);
Classroom.hasMany(User, {as: 'teacher'
});
Checkin.belongsTo(User, {as: 'parent', foreignKey: 'parentId'});
User.hasMany(Checkin, {as: 'parent', foreignKey: 'parentId'});
Child.hasMany(Checkin);
Checkin.belongsTo(Child);
Checkin.belongsTo(Classroom);
Classroom.hasMany(Checkin);
Child.belongsTo(Classroom);
Classroom.hasMany(Child);
Day.belongsTo(Child);
Child.hasMany(Day);
Day.hasMany(Diaper);
Diaper.belongsTo(Day)
Day.hasMany(Bottle);
Bottle.belongsTo(Day);
Day.hasMany(Meal);
Meal.belongsTo(Day);
Day.hasMany(Nap)
Nap.belongsTo(Day);
Diaper.belongsTo(Child);
Child.hasMany(Diaper);
Diaper.belongsTo(User, {foreignKey: 'teacherId'})
User.hasMany(Diaper, {as: 'teacher', foreignKey: 'teacherId'});
Bottle.belongsTo(Child);
Child.hasMany(Bottle);
Bottle.belongsTo(User, {foreignKey: 'teacherId'});
User.hasMany(Bottle, {as: 'teacher', foreignKey: 'teacherId'});
Nap.belongsTo(Child);
Child.hasMany(Nap);
Message.belongsTo(User, {as: 'from'});
Message.belongsTo(User, {as: 'to'});
User.hasMany(Message);

