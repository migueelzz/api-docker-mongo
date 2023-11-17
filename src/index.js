const express = require('express');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

app.use(express.json());


// # Connection to MongoDB
mongoose
  .connect('mongodb://database:27017/mydatabase', {
    useNewUrlParser: true
  })
  .then(result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });

const schema = new mongoose.Schema({ 
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
})

const Film = mongoose.model('Film', schema);

app.get('/', (req, res) => res.send('Node API with MongoDB and Docker!'));

app.get('/films', async (req, res) => {
    const films = await Film.find()
    return res.send(films)
  })

app.get('/films/:id', async (req, res) => {
    const id = req.params.id
    const film = await Film.findById(id)
    return res.send(film)
})

app.post('/film', async (req, res) => {

    const film = new Film({ 
      title: req.body.title, 
      description: req.body.description, 
      image_url: req.body.image_url, 
      trailer_url: req.body.trailer_url,
   });
  
    await film.save()
    return res.send(film)
  })

  app.put('/:id', async (req, res) => {
    const { id } = req.params;
  
    const film = await Film.findByIdAndUpdate(id, {
      title: req.body.title, 
      description: req.body.description, 
      image_url: req.body.image_url, 
      trailer_url: req.body.trailer_url,
    }, {
      new: true,
    })
  
    return res.send(film)
    
  })
  
  app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const film = await Film.findByIdAndDelete(id)
  
    return res.send(film)
  })

app.listen(port, () => console.log(`Server listening on ${port}`));