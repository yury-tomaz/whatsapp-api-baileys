import {AuthenticationCreds, initAuthCreds, proto, SignalDataTypeMap} from "@whiskeysockets/baileys";

export interface AuthStateRepositoryInterface {
    writeData(data: any, key: string): Promise<any>;
    readData(key: string): Promise<any>;
    removeData(key: string): Promise<any>;
}

export async function authState(
    repository: AuthStateRepositoryInterface
) {

    const {writeData, readData, removeData} = repository;

    const creds: AuthenticationCreds = (await readData('creds')) || initAuthCreds();

    return {
        state: {
            creds,
            keys: {
                // TODO:  define type
                // @ts-ignore
                get: async (type, ids: string[]) => {
                    // @ts-ignore
                    const data: { [_: string]: SignalDataTypeMap[type] } = {};
                    await Promise.all(
                        ids.map(async (id) => {
                            let value = await readData(`${type}-${id}`);
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
                            tasks.push(value ? writeData(value, key) : removeData(key));
                        }
                    }

                    await Promise.all(tasks);
                },
            },
        },
        saveCreds: async () => {
            return await writeData(creds, 'creds');
        },
    };

}