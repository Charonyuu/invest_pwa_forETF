const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
app.use(express.json());
app.use(cors())

app.get('/investETF_worths', async (req, res) => {
  try {
    const data = await axios.get('https://mis.twse.com.tw/stock/data/all_etf.txt?1667721106804')
    res.json(data.data.a1);
  } catch(err) {
    console.log('error...', err)
    res.send(err);
  }
})

app.listen(8000, () => {
  console.log('server listening on 8000...')
})

