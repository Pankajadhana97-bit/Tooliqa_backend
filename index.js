const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors('*'))
app.use(express.json())
const PORT = process.env.PORT || 5000;

const channelRoute = require('./routes/route')
app.use('/api',channelRoute)

app.listen(PORT, () => console.log(`server is running at the port http://localhost:${PORT}`))