const sqlite3 = require('sqlite3').verbose();

// Connecting the DB
let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// sql instructions
let sql = `SELECT 
    matriculate,
    firstname fname,
    lastname lname,
    grade sgrade,
    age sage
    FROM students
    WHERE grade = ?
    ORDER BY matriculate`;

// function to get students per grade
function GetStudentsPerGrade(grade)
{
    db.all(sql, grade, (err, rows) => {
        if (err)
        {
            throw err;
        }
        rows.forEach((row) => {
            // formating 
            console.log(`Estudiante: ${row.fname} ${row.lname}, edad: ${row.sage} [MATRICULA: ${row.matriculate}]`);
        });
    });
};

GetStudentsPerGrade(12);

db.close();