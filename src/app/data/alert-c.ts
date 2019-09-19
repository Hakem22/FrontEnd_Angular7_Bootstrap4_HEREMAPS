import { Acteur } from './acteur';

export class AlertC {

    id: string;
    dateSend: string;
    timeSend: string;
    dateRecieved: string;
    timeRecieved: string;
    alertState: string;
    localisationA: string;
    alerttype:string;
    description: string;
    acteur: Acteur;
    citizen:{ id: string;
    phoneNumber: string;
    firstName: string;
    fastName: string;
}
}
