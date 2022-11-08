import express from 'express'
import mqtt from 'mqtt'

const mqttclient = mqtt.connect('mqtt://broker.hivemq.com', {
    port: 1883,

})
mqttclient.subscribe('/tugasAkhir/SensorInfus');


let dataSensor1 = ""
let dataSensor2 = ""
let dataRes
const getData = async (req, res) => {
    
    try {
        await mqttclient.on('message', function (topic, message) {
            dataRes = message.toString()
            dataRes = JSON.parse(dataRes)
            console.log(dataRes);
            dataSensor1 = dataRes["sensor1"]
            dataSensor2 = dataRes["sensor2"]
            
        });

        res.json({
            'info' : "success",
            'data' : {
                'sensor1' : dataSensor1,
                'sensor2' : dataSensor2
            }
        })

        
    } catch (error) {
        console.log(error);
    }
}


export {getData};