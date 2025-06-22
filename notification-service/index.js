const amqp = require("amqplib")
require("dotenv").config()

async function start() {
        try{
            connection = await amqp.connect(process.env.RABBITMQ_URI)
            channel = await connection.createChannel();
            await channel.assertQueue("task_created");
            console.log("Notfication Service is listening to messages");

            channel.consume("task_created", (msg) => {
                const taskData = JSON.parse(msg.content.toString());
                console.log("Notication: NEW TASK: ", taskData.title);
                console.log("Notication: NEW TASK: ", taskData);
                channel.ack(msg);
            })
            return;
        }
        catch(error){
            console.error("RabbitMQ Connection Error : ", error.message);
        }
}

start()