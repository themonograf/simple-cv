type EducationTypes = {
  id: number;
  sequence: number;
  from: number;
  to: number;
  schoolName: string;
  location: string;
  faculty: string;
  isCurrent: boolean;
};

type WorkExperiencesTypes = {
  id: number;
  sequence: number;
  companyName: string;
  position: string;
  isCurrent: boolean;
  from: string;
  to: string;
  descriptionList: {
    id: number;
    description: string;
  }[];
};
type OrganizationsTypes = {
  id: number;
  title: string;
  name: string;
  isCurrent: boolean;
  from: number;
  to: number;
  descriptionList: {
    id: number;
    description: string;
  }[];
};

export type CVViewTypes = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  currentPosition?: string;
  introduction?: string;
  mobilePhone?: string;
  email?: string;
  streetAddress?: string;
  maritalStatus?: string;
  nationality?: string;
  religion?: string;
  gender?: string;
  dob?: string;
  education?: EducationTypes[];
  skills?: string[];
  hobbies?: string[];
  workExperiences?: WorkExperiencesTypes[];
  organizations?: OrganizationsTypes[];
};
