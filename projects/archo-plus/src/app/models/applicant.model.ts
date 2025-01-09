export interface Applicant {
  id: string;
  managersId: string; //manager
  previousLocationsId: string; //location
  currentLocationsId: string; //location
  nextLocationsId: string; //location
  archiveNumber: number;
  comment: string;
  isSnils: string; //statusBoolean
  passport: {
    isMain: string; //statusBoolean
    isRegistration: string; //statusBoolean
    isChangePassport: string; //statusBoolean
  };
  diploma: {
    isTitlePage: string; //statusBoolean
    isAttachmentPage: string; //statusBoolean
  };
  statement: {
    isFirst: string; //statusBoolean
    isSecond: string; //statusBoolean
    isThird: string; //statusBoolean
  };
  opd: {
    isFirst: string; //statusBoolean
    isSecond: string; //statusBoolean
    isThird: string; //statusBoolean
    isFourth: string; //statusBoolean
  };
  isMarriage: string; //statusBoolean
  isNameChange: string; //statusBoolean
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


export interface statusBoolean {
  id: string;
  text: string;
}
export interface location {
  id: string;
  text: string;
}

export interface manager {
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