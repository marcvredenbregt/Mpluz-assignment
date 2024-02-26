import { v4 as uuidv4 } from 'uuid';
import { DongleModel } from './DongleModel';
import { DongleType } from './DongleType';

export abstract class Dongle {
  private _id: string;
  private _model: DongleModel;
  private _type: DongleType;
  private _ip: string;
  private _label: string | null;

  constructor(model: DongleModel, type: DongleType, ip: string, label: string | null) {
    this._id = uuidv4();
    this._model = model;
    this._type = type;
    this._ip = ip;
    this._label = label;
  }

  /**
   * Get the id of the dongle
   */
  get id(): string {
    return this._id;
  }

  /**
   * Get the model of the dongle (e.g. MNA240, MNA110, etc.)
   */
  get model(): DongleModel {
    return this._model;
  }

  /**
   * Get the type of the dongle (e.g. Encoder)
   */
  get type(): DongleType {
    return this._type;
  }

  /**
   * Get the ip of the dongle
   */
  get ip(): string {
    return this._ip;
  }

  /**
   * Get the label of the dongle
   */
  get label(): string | null {
    if (this._label) {
      return this._label;
    } else {
      return 'No label'
    }
  }

  /**
   * Set the label of the dongle
   */
  set label(label: string | null) {
    if (label && label.length > 15) {
      throw new Error('Label too long, maximum is 15 characters');
    }
    this._label = label;
  }
    
  /**
   * Add or change the label of the dongle
   * @param label
   * @returns
   */
  addLabel(label: string | null) {
    this.label = label;
  }

  /**
   * Get the number of connectors
   */
  get connectors(): number {
    const SINGLE_CONNECTOR = 1;
    const DOUBLE_CONNECTOR = 2;

    return this.model === DongleModel.MNA110
      ? SINGLE_CONNECTOR
      : DOUBLE_CONNECTOR;
  }

  /**
   * Get the max resolution of the dongle
   */
  get maxResolution(): string {
    const SUPPORTS_4K_ENDING_DIGITS = '40';
    const supports4K = this.model
      .toString()
      .endsWith(SUPPORTS_4K_ENDING_DIGITS);

    return supports4K ? '4K' : 'HD';
  }

  /**
   * Get the 3D support of the dongle
   */
  get supports3D(): boolean {
    const DONGLE_SERIES_DIGIT = 3;
    const NO_3D_SUPPORT_SERIES = 1;
    const seriesNumber = parseInt(this.model.charAt(DONGLE_SERIES_DIGIT), 10);

    return seriesNumber > NO_3D_SUPPORT_SERIES;
  }
}
