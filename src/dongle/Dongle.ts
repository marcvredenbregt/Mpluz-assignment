import { v4 as uuidv4 } from 'uuid';
import { DongleModel } from './DongleModel';
import { DongleType } from './DongleType';

export abstract class Dongle {
    private _id: string;
    private _model: DongleModel;
    private _type: DongleType;
    private _ip: string;

    constructor(model: DongleModel, type: DongleType, ip: string) {
        this._id = uuidv4();
        this._model = model;
        this._type = type;
        this._ip = ip;
    }

    get id(): string {
        return this._id;
    }

    get model(): DongleModel {
        return this._model;
    }

    get type(): DongleType {
        return this._type;
    }

    get ip(): string {
        return this._ip;
    }

    get connectors(): number {
        const SINGLE_CONNECTOR = 1;
        const DOUBLE_CONNECTOR = 2;

        return this.model === DongleModel.MNA110 ? SINGLE_CONNECTOR : DOUBLE_CONNECTOR;
    }

    get maxResolution(): string {
        // if dongleModel ends with 40, it's 4K
        return this.model.toString().endsWith('40') ? '4K' : 'HD';
    }

    get supports3D(): boolean {
        const DONGLE_SERIES_DIGIT = 3;
        const NO_3D_SUPPORT_SERIES = 1;
        const seriesNumber = parseInt(this.model.charAt(DONGLE_SERIES_DIGIT), 10);
        return seriesNumber > NO_3D_SUPPORT_SERIES;
    }
}