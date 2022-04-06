export declare class GatewaySaveDto {
    gatewayName: string;
    temp: number;
    hum: number;
}
export declare class GatewaySaveHumidityDto {
    _id: string;
    humidity: number;
    wasSent: boolean;
    date: string;
    gw: string;
}
export declare class GatewaySaveTemperatureDto {
    _id: string;
    temperature: number;
    wasSent: boolean;
    date: string;
    gw: string;
}
export declare class createGateWayDto {
    name: string;
    password: string;
    description: string;
    creator: string;
}
export declare class GatewayLogInDto {
    name: string;
    password: string;
}
export declare class GatewayID {
    id: string;
}
