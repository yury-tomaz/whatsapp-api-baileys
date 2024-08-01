import { messageBroker } from "../../../main/server/server";

export const queueBindings = async (instanceName: string) => {
    const exchangeName = 'baileys_api_exchange'
    await messageBroker.createExchange(exchangeName, 'topic', {
        durable: true,
    });

    const queues = [
        {
          name: `${instanceName}.qrcode.updated`,
          routingKey: "qrcode.updated"
        },
        {
          name: `${instanceName}.connection.update`,
          routingKey: `${instanceName}.connection.update`
        },
        {
          name: `${instanceName}.messages.upsert`,
          routingKey: `${instanceName}.messages.upsert`
        },
        {
          name: `${instanceName}.send.message`,
          routingKey: `${instanceName}.send.message`
        },
        {
          name: `${instanceName}.messages.update`,
          routingKey: `${instanceName}.messages.update`
        },
        {
          name: `${instanceName}.messages.delete`,
          routingKey: `${instanceName}.messages.delete`
        }
    ];

    for (const queue of queues) {
        await messageBroker.createQueue(queue.name, { durable: true });
        await messageBroker.bindQueue(queue.name, exchangeName, queue.routingKey);
    }
}