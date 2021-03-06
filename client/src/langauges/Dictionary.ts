interface ILangProps {
  [key: string]: string;
}

interface ILang {
  [key: string]: ILangProps;
}

export const Lang: ILang = {
  //Menu items
  mainPage: {
    cs: "Hlavní menu",
    en: "Main menu",
  },
  about: {
    cs: "O nás",
    en: "About",
  },

  //Register Component translations
  register: {
    cs: "Registrace",
    en: "Registration",
  },
  name: {
    cs: "Jméno",
    en: "Name",
  },
  surname: {
    cs: "Přijmení",
    en: "Surname",
  },
  form: {
    cs: "Forma",
    en: "Form",
  },
  formValuesDaily: {
    cs: "Denní",
    en: "Daily",
  },
  formValuesDistant: {
    cs: "Dálková",
    en: "Distant",
  },
  level: {
    cs: "Úroveň",
    en: "Level",
  },
  submitBtnRegister: {
    cs: "Zaregistrovat se",
    en: "Register",
  },
  backBtnRegister: {
    cs: "Zpět",
    en: "Back",
  },
  usernameRegister: {
    cs: "Uživatelské jméno",
    en: "User name",
  },
  emailRegister: {
    cs: "Registrační email",
    en: "Register email",
  },
  passwordRegister: {
    cs: "Heslo",
    en: "Password",
  },
  passwordConfirmRegister: {
    cs: "Potvrzení hesla",
    en: "Confirm your password",
  },
  prefferdLanguage: {
    cs: "Jazyk",
    en: "Language",
  },

  //login
  login: {
    cs: "Přihlášení",
    en: "Log In",
  },
  emailLogin: {
    cs: "Přihlašovací email",
    en: "Email address",
  },
  passwordLogin: {
    cs: "Heslo",
    en: "Password",
  },
  submitBtnLogin: {
    cs: "Přihlásit se",
    en: "Sign in",
  },
  registrationText: {
    cs: "Nemáte ještě účet? Zaregistrujte se: ",
    en: "You dont have an account yet? Register:",
  },
  registration: {
    cs: "ZDE",
    en: "HERE",
  },
  credits: {
    cs: "uuClimative 2022",
    en: "uuClimative 2022",
  },

  //App Bar
  btnLogOff: {
    cs: "Odhlásit",
    en: "Log off",
  },
  profileLabel: {
    cs: "Profil",
    en: "Profile",
  },
  profileName: {
    cs: "Jméno",
    en: "Name",
  },
  profileEmail: {
    cs: "Email",
    en: "Email",
  },
  profileForm: {
    cs: "Forma studia",
    en: "Study form",
  },
  profileLevel: {
    cs: "Úroveň",
    en: "Level",
  },
  profileLanguage: {
    cs: "Jazyk",
    en: "Language",
  },

  //dahboard
  dashboardSearchTitle: {
    cs: "Vyhledej předměty",
    en: "Search subjects",
  },
  dashboardEnrolledSubjects: {
    cs: "Zapsané předměty",
    en: "Enrolled subjects",
  },
  dashboardSubjectDetail: {
    cs: "Detail předmětu",
    en: "Subject detail",
  },
  dashboardTitle: {
    cs: "Přehled",
    en: "Dashboard",
  },

  //Subject Detail
  detailTitle: {
    cs: "Detail předmětu",
    en: "Subject detail",
  },
  detailCredits: {
    cs: "Počet kreditů",
    en: "Number of credits",
  },
  detailLevel: {
    cs: "Úroveň studia",
    en: "Degree level",
  },
  detailForm: {
    cs: "Forma studia",
    en: "Study form",
  },
  detailSubjectType: {
    cs: "Typ předmětu",
    en: "Subject type",
  },
  detailGoal: {
    cs: "Cíl předmětu",
    en: "Subject goal",
  },
  detailDescription: {
    cs: "Popis předmětu",
    en: "Subject description",
  },
  detailSubscribe: {
    cs: "Zapsat předmět",
    en: "Subscribe subject",
  },
  detailUnSubscribe: {
    cs: "Odhlásit z předmětu",
    en: "Unsubscribe from subject",
  },
  detailTutors: {
    cs: "Učitelé",
    en: "Tutors",
  },
  detailLinks: {
    cs: "Odkazy",
    en: "Links",
  },
  detailTopics: {
    cs: "Témata",
    en: "Topics",
  },
  detailTopicsDifficulty: {
    cs: "Obtížnost",
    en: "Difficulty",
  },
  detailTutorials: {
    cs: "Tutoriály",
    en: "Tutorials",
  },
  detailTutorial: {
    cs: "Tutoriál",
    en: "Tutorial",
  },
  detailTutorialsDaily: {
    cs: "Denní studium",
    en: "Daily study",
  },
  detailTutorialsDistant: {
    cs: "Distanční studium",
    en: "Distant study",
  },
  detailMaterials: {
    cs: "Materiály",
    en: "Materials",
  },

  //ADMIN
  adminTutorsSearchField: {
    cs: "Vyhledej učitele",
    en: "Search tutor",
  },
  adminRightTitle: {
    cs: "Učitel",
    en: "Tutor",
  },
  adminRightTitleBefore: {
    cs: "Titul před jménem",
    en: "Title before name",
  },
  adminRightTitleAfter: {
    cs: "Titul za jménem",
    en: "Title after name",
  },
  adminTutorTitle: {
    cs: "Učitel",
    en: "Tutor",
  },
  adminNewBtn: {
    cs: "Nový",
    en: "New",
  },
  adminSubmitBtn: {
    cs: "Odeslat",
    en: "Send",
  },
  adminDeletetBtn: {
    cs: "Smazat",
    en: "Delete",
  },
  adminEdittBtn: {
    cs: "Editovat",
    en: "Edit",
  },
  adminFormTypeNew: {
    cs: "Nový",
    en: "New",
  },
  adminFormTypeEdit: {
    cs: "Editovat",
    en: "Edit",
  },
  lastLoggedIn: {
    cs: "Naposledy přihlášený",
    en: "Last Logged In",
  },
};
