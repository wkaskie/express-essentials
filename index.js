import express from 'express';
import data from './data/mock.json' assert { type: 'json' };

const app = express();

const PORT = 3000;

// Using the public folder at the root
app.use(express.static('public'));

// Using the public folder at the root
app.use('/images', express.static('images'));

// Using express.json and express.urlencoded
// app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// GET
app.get('/', (req, res) => {
  res.json(data);
});

// POST - express.json and express.urlencoded
app.post('/item', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app
  .route('/class')
  .get((req, res) => {
    // res.send('get class');
    throw new Error();
  })
  .post((req, res) => {
    res.send('post class');
  })
  .put((req, res) => {
    res.send('put class');
  });

app.get('/download', (req, res) => {
  res.download('images/roses.png');
});

app.get('/redirect', (req, res) => {
  res.redirect('https://google.com');
});

// GET with next
app.get(
  '/next',
  (req, res, next) => {
    console.log('response will be sent with the next ');

    next();
  },
  (req, res) => {
    res.send('this is frmo the next ');
  }
);

// GET with params
app.get('/class/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const student = data.filter((person) => person.id === studentId);

  res.json(student);
});

// POST
app.post('/create', (req, res) => {
  res.send('Create Request');
});

// PUT
app.put('/edit', (req, res) => {
  res.send('Edit Request');
});

// DELETE
app.delete('/delete', (req, res) => {
  res.send('Delete Request');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('You fucked up!')
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});


