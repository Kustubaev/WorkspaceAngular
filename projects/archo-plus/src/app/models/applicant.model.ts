export interface Applicant {
  id: string;
  managersId: string; //manager
  previousLocationsId: string; //location
  currentLocationsId: string; //location
  nextLocationsId: string; //location
  archiveNumber: number;
  comment: string;
  isSnils: string; //status
  passport: {
    isMain: string; //status
    isRegistration: string; //status
    isChangePassport: string; //status
  };
  diploma: {
    isTitlePage: string; //status
    isAttachmentPage: string; //status
  };
  statement: {
    isFirst: string; //status
    isSecond: string; //status
    isThird: string; //status
  };
  opd: {
    isFirst: string; //status
    isSecond: string; //status
    isThird: string; //status
    isFourth: string; //status
  };
  isMarriage: string; //status
  isNameChange: string; //status
  person: {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    directions: number[];
    dateOfBirth: string;
    snils: string;
  };
}

export interface Status {
  id: string;
  text: string;
  color: string;
}
export interface Location {
  id: string;
  text: string;
}

export interface Manager {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  locationsId: string;
}

// export interface statusLocation {
//   id: string;
//   text: string;
// }
