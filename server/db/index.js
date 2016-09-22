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
var Feeding = require('./models/feeding');
var Meal = require('./models/meal');
var Message = require('./models/message');
var Nap = require('./models/nap');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
User.belongsToMany(Child, {as: 'parent', through: 'parent_child', foreignKey: 'parentId'});
Child.belongsToMany(User, {through: 'parent_child'});
User.belongsToMany(Classroom, {as: 'teacher', through: 'teacher_classroom', foreignKey: 'teacherId'});
Classroom.belongsToMany(User, {through: 'teacher_classroom'});
Checkin.belongsTo(User, { foreignKey: 'parentId'});
User.hasMany(Checkin, {as: 'parent', foreignKey: 'parentId'});
Child.hasMany(Checkin);
Checkin.belongsTo(Child);
Child.belongsTo(Classroom);
Classroom.hasMany(Child);
Day.belongsTo(Child);
Child.hasMany(Day);
Day.hasMany(Diaper);
Diaper.belongsTo(Day)
Day.hasMany(Feeding);
Feeding.belongsTo(Day);
Day.hasMany(Meal);
Meal.belongsTo(Day);
Day.hasMany(Nap)
Nap.belongsTo(Day);
Diaper.belongsTo(Child);
Child.hasMany(Diaper);
Diaper.belongsTo(User, {foreignKey: 'teacherId'})
User.hasMany(Diaper, {as: 'teacher', foreignKey: 'teacherId'});
Feeding.belongsTo(Child);
Child.hasMany(Feeding);
Feeding.belongsTo(User, {foreignKey: 'teacherId'});
User.hasMany(Feeding, {as: 'teacher', foreignKey: 'teacherId'});
Nap.belongsTo(Child);
Child.hasMany(Nap);
Message.belongsTo(User, {as: 'from'});
Message.belongsTo(User, {as: 'to'});
User.hasMany(Message);

