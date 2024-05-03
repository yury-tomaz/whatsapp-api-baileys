import {AuthenticationCreds, initAuthCreds, proto, SignalDataTypeMap} from "@whiskeysockets/baileys";
import {AuthStateRepositoryInterface} from "../gateway/auth-state-repository.interface";

export async function authState(
    repository: AuthStateRepositoryInterface,
    instanceId: string
) {
    const {writeData, readData, removeData} = repository;

    const creds: AuthenticationCreds = (await readData(instanceId, 'creds')) || initAuthCreds();

    return {
        state: {
            creds,
            keys: {
                // @ts-ignore
                get: async (type, ids: string[]) => {
                    // @ts-ignore
                    const data: { [_: string]: SignalDataTypeMap[type] } = {};
                    await Promise.all(
                        ids.map(async (id) => {
                            let value = await readData(instanceId, `${type}-${id}`);
                            if (type === 'app-state-sync-key' && value) {
                                value = proto.Message.AppStateSyncKeyData.fromObject(value);
                            }

                            data[id] = value;
                        }),
                    );

                    return data;
                },
                set: async (data: any) => {
                    const tasks: Promise<void>[] = [];
                    for (const category in data) {
                        for (const id in data[category]) {
                            const value = data[category][id];
                            const key = `${category}-${id}`;
                            tasks.push(value ? writeData(instanceId, value, key) : removeData(instanceId, key));
                        }
                    }

                    await Promise.all(tasks);
                },
            },
        },
        saveCreds: async () => {
            return await writeData(instanceId, creds, 'creds');
        },
    };

}