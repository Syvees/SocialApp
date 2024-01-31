const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes')
const likeRoutes = require('./routes/like.routes')
const friendRequestRoutes = require('./routes/friendRequest.routes')
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

userRoutes(app);
postRoutes(app)
commentRoutes(app)
likeRoutes(app)
friendRequestRoutes(app)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
