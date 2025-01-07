export interface Applicant {
  id: string;
  managersId: string;
  previousLocation: {
    locationsId: string;
  };
  currentLocation: {
    locationsId: string;
  };
  nextLocation: {
    locationsId: string;
  };
  archiveNumber: number;
  comment: string;
  status: string;
  isSnils: boolean;
  passport: {
    isMain: boolean;
    isRegistration: boolean;
    isChangePassport: boolean;
  };
  diploma: {
    isTitlePage: boolean;
    isAttachmentPage: boolean;
  };
  isStatement: {
    statusId: string;
  };
  isOPD: boolean;
  isMarriage: boolean;
  isChangeName: boolean;
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
