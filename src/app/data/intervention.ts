import { InterventionUnit } from './intervention-unit';

export class Intervention {
    id: string;
    dateStart: string;
    dateEnd: string;
    timeStart: string;
    timeEnd: string;
    victims: string;
    interveners: string;
    cause: string;
    interventionUnit: InterventionUnit;
    
}
