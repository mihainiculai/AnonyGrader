const sequelize = require('./index');
const bcrypt = require('bcrypt');

const Deliverable = require('../models/Deliverable');
const Grade = require('../models/Grade');
const Project = require('../models/Project');
const Role = require('../models/Role');
const Team = require('../models/Team');
const User = require('../models/User');
const UserTeam = require('../models/UserTeam');

const roles = [
    { name: 'Student' },
    { name: 'Teacher' },
]

const salt = bcrypt.genSaltSync();

const users = [
    { name: "Student 1", email: "stud1@ase.ro", password: bcrypt.hashSync("stud1", salt), roleId: 1 },
    { name: "Student 2", email: "stud2@ase.ro", password: bcrypt.hashSync("stud2", salt), roleId: 1 },
    { name: "Student 3", email: "stud3@ase.ro", password: bcrypt.hashSync("stud3", salt), roleId: 1 },
    { name: "Student 4", email: "stud4@ase.ro", password: bcrypt.hashSync("stud4", salt), roleId: 1 },
    { name: "Student 5", email: "stud5@ase.ro", password: bcrypt.hashSync("stud5", salt), roleId: 1 },
    { name: "Student 6", email: "stud6@ase.ro", password: bcrypt.hashSync("stud6", salt), roleId: 1 },
    { name: "Student 7", email: "stud7@ase.ro", password: bcrypt.hashSync("stud7", salt), roleId: 1 },
    { name: "Student 8", email: "stud8@ase.ro", password: bcrypt.hashSync("stud8", salt), roleId: 1 },
    { name: "Student 9", email: "stud9@ase.ro", password: bcrypt.hashSync("stud9", salt), roleId: 1 },
    { name: "Student 10", email: "stud10@ase.ro", password: bcrypt.hashSync("stud10", salt), roleId: 1 },
    { name: "Teacher 1", email: "teach1@ase.ro", password: bcrypt.hashSync("teach1", salt), roleId: 2 },
    { name: "Teacher 2", email: "teach2@ase.ro", password: bcrypt.hashSync("teach2", salt), roleId: 2 },
    { name: "Teacher 3", email: "teach3@ase.ro", password: bcrypt.hashSync("teach3", salt), roleId: 2 },
    { name: "Teacher 4", email: "teach4@ase.ro", password: bcrypt.hashSync("teach4", salt), roleId: 2 },
    { name: "Teacher 5", email: "teach5@ase.ro", password: bcrypt.hashSync("teach5", salt), roleId: 2 },
    { name: "Teacher 6", email: "teach6@ase.ro", password: bcrypt.hashSync("teach6", salt), roleId: 2 },
    { name: "Teacher 7", email: "teach7@ase.ro", password: bcrypt.hashSync("teach7", salt), roleId: 2 },
    { name: "Teacher 8", email: "teach8@ase.ro", password: bcrypt.hashSync("teach8", salt), roleId: 2 },
    { name: "Teacher 9", email: "teach9@ase.ro", password: bcrypt.hashSync("teach9", salt), roleId: 2 },
    { name: "Teacher 10", email: "teach10@ase.ro", password: bcrypt.hashSync("teach10", salt), roleId: 2 },
]

const projects = [
    { title: "Biology Research", description: "Study of plant cell mitosis under different light conditions", teacherId: 11 },
    { title: "Mathematics Workshop", description: "Exploring advanced calculus concepts through interactive sessions", teacherId: 11 },
    { title: "History of Art", description: "Analyzing the Renaissance period and its impact on modern art", teacherId: 11 },
    { title: "Chemistry Lab", description: "Experimenting with organic compounds and their reactions", teacherId: 11 },
    { title: "Robotics Club", description: "Design and construction of a line-following robot", teacherId: 11 },
    { title: "Creative Writing", description: "Workshop on narrative structures in short story writing", teacherId: 11 },
    { title: "Physics Experiment", description: "Investigation of Newton's laws through practical experiments", teacherId: 11 },
    { title: "Computer Science Intro", description: "Introduction to programming with Python", teacherId: 11 },
    { title: "Environmental Studies", description: "Fieldwork focused on local biodiversity and conservation efforts", teacherId: 11 },
    { title: "World Geography", description: "Exploring the physical and political geography of Asia", teacherId: 11 }
];

const teams = [
    { name: "Team 1", projectId: 1 },
    { name: "Team 2", projectId: 1 },
    { name: "Team 3", projectId: 1 },
    { name: "Team 4", projectId: 1 },
    { name: "Team 5", projectId: 1 },
    { name: "Team 6", projectId: 1 },
    { name: "Team 7", projectId: 1 },
    { name: "Team 8", projectId: 1 },
    { name: "Team 9", projectId: 1 },
    { name: "Team 10", projectId: 1 },
]

const userTeams = [
    { userId: 1, teamId: 1 },
    { userId: 2, teamId: 1 },
    { userId: 3, teamId: 1 },
    { userId: 4, teamId: 2 },
    { userId: 5, teamId: 2 },
    { userId: 6, teamId: 2 },
    { userId: 7, teamId: 3 },
    { userId: 8, teamId: 3 },
    { userId: 9, teamId: 3 },
    { userId: 10, teamId: 3 },
]

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        await Role.bulkCreate(roles);
        console.log('✅ Roles seeded!');
        const createdUsers = await User.bulkCreate(users);
        console.log('✅ Users seeded!');
        const createdProjects = await Project.bulkCreate(projects);
        console.log('✅ Projects seeded!');
        const createdTeams = await Team.bulkCreate(teams);
        console.log('✅ Teams seeded!');
        const createdUserTeams = await UserTeam.bulkCreate(userTeams);
        console.log('✅ UserTeams seeded!');

        console.log('✅ Database seeded!');
    }
    catch (err) {
        console.log('❌ Error seeding database: ', err);
    }
}

seedDatabase();