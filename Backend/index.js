require('dotenv').config({ path: 'Backend/.env' });
const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');

const connectDb=require('./db/connect');
const expressError=require('./middleware/expressErrors');
const notFound=require('./middleware/notFound'); 
const userRoute=require('./routes/user'); 
const blogsRoute=require('./routes/blogs');
const imagesRoute=require('./routes/images');

const app=express(); 
const PORT=5000;


app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));


app.use('/api/v1/auth',userRoute);
app.use('/api/v1/blogs',blogsRoute);
app.use('/api/v1/images',imagesRoute);

app.get('/', (req, res) => {
    console.log(req)
  });


app.use(notFound);
app.use(expressError);

const start=async()=>{
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`Listening on ${PORT}...`);
        })
    } catch (error) {
         
    }
}


start();
