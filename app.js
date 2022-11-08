import express from 'express';
const app = express();
import {getData} from './sensor.js'
import mqtt from 'mqtt'
import cors  from'cors';
app.use(cors({
    origin: '*'
}));
// const host = 'broker.hivemq.com'
// const port = '1883'
// const connectUrl = `mqtt://${host}:${port}`

// const client = mqtt.connect(connectUrl, {
//     clean: true,
//     connectTimeout: 4000,
// })

// const topic = '/tugasAkhir/SensorInfus'

// client.on('connect', () => {
//     console.log('Connected')
//     client.subscribe([topic], () => {
//         console.log(`Subscribe to topic '${topic}'`)
//     })
// })


const mqttclient = mqtt.connect('mqtt://broker.hivemq.com', {
    port: 1883,

})
mqttclient.subscribe('/tugasAkhir/SensorInfus');




app.get('/sensor', getData);
app.get('/', function(req, res){
    res.send("this Backend builded using node JS");
 });

app.listen(3001);