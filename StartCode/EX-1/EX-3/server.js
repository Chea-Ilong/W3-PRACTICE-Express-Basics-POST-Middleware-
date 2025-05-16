import express from 'express';
import { appendFile } from 'fs';

const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.type('text').send('Welcome to the Home Page');
});

app.get('/contact', (req, res) => {
    res.type('html').send(`
        <script>
            function submitForm(event) {
                event.preventDefault();
                const name = document.getElementById('name').value;
                fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                })
                .then(res => res.text())
                .then(text => alert(text));
            }
        </script>
        <form onsubmit="submitForm(event)">
            <input type="text" id="name" placeholder="Your name" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/contact', (req, res) => {
    const name = req.body.name;

    console.log('Form data received:', name);

    appendFile('submissions.txt', `${name}\n`, err => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).type('text').send('Server error, please try again later.');
        }

        res.type('text').send(`Thank you, ${name}, for your submission!`);
    });
});

app.use((req, res) => {
    res.status(404).type('text').send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
