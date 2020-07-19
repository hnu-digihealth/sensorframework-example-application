import {Sensor} from 'sensors';

interface CustomBatterySensorData {

    charging: boolean;

    level: number;

}

class CustomBatterySensor extends Sensor {

    private batteryManager;

    constructor() {
        super({
            name: 'battery',
            actions: {
                get: true,
                watch: true
            }
        });
    }

    protected async onStart() {

        if ((navigator as any).getBattery !== 'undefined') {
            this.batteryManager = await (navigator as any).getBattery();
        } else {
            throw new Error('Battery API unavailable');
        }

    }

    protected async onStop() {

        if (this.batteryManager) {
            this.batteryManager.onlevelchange = undefined;
            this.batteryManager.onchargingchange = undefined;
        }

        this.batteryManager = undefined;

    }

    protected async onGet(): Promise<CustomBatterySensorData> {

        const data = {
            level: this.batteryManager.level,
            charging: this.batteryManager.charging,
        };

        return data;
    }

    protected async onWatch(): Promise<void> {

        const handler = () => {

            const data = {
                level: this.batteryManager.level,
                charging: this.batteryManager.charging,
            };

            this.onSensorDataChanged(data);
        };

        this.batteryManager.onlevelchange = handler;
        this.batteryManager.onchargingchange = handler;
    }

}

const Battery = new CustomBatterySensor();
export {Battery};
