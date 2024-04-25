const express = require('express');
const { exec } = require('child_process');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    let { domain, repo, artifactId, groupId } = req.body;
    console.log(req.body)
    let bashCommand = `echo ${domain} ${repo} ${artifactId} ${groupId}`;

    exec(bashCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    exec(`bash deploy.sh`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
