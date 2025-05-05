// Keep the existing imports

// Add new language keys for voting and proposals
export type LanguageKey =
  | "funding"
  | "freelance"
  | "pending"
  | "appName"
  | "welcomeTo"
  | "appDescription"
  | "joinAsSupplier"
  | "joinAsInvestor"
  | "joinAsFreelancer"
  | "supplierDesc"
  | "investorDesc"
  | "freelancerDesc"
  | "seeOpenJobs"
  | "seeOpenInvestments"
  | "seeOpenDeals"
  | "login"
  | "signup"
  | "forgotPassword"
  | "role"
  | "main"
  | "dashboard"
  | "explore"
  | "settings"
  | "support"
  | "helpCenter"
  | "contactUs"
  | "signOut"
  | "accountSettings"
  | "darkMode"
  | "lightMode"
  | "language"
  | "voting"
  | "proposals"
  | "arbitration"
  | "groupBuying"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "ago"
  | "justNow"
  | "votingDescription"
  | "proposalsDescription"
  | "searchProposals"
  | "filterByStatus"
  | "allStatus"
  | "active"
  | "closed"
  | "filterByCategory"
  | "allCategories"
  | "newProposal"
  | "createdBy"
  | "details"
  | "vote"
  | "noProposalsFound"
  | "clearFilters"
  | "accessRestricted"
  | "votingRestrictionMessage"
  | "exploreContracts"
  | "searchVotes"
  | "createNewProposal"
  | "voteNow"
  | "viewDetails"
  | "yes"
  | "no"
  | "abstain"
  | "remaining"
  | "noVotesFound"
  | "returnToHome";

// Keep the existing translations structure but add new keys
export const translations: Record<string, Record<LanguageKey, string>> = {
  en: {
    // Keep existing translations
    funding: "Funding",
    freelance: "Freelance",
    pending: "Pending",
    appName: "Mirror DAO",
    welcomeTo: "Welcome to Mirror DAO",
    appDescription: "A decentralized platform for group buying, funding, and freelance contracts",
    joinAsSupplier: "Join as Supplier",
    joinAsInvestor: "Join as Investor",
    joinAsFreelancer: "Join as Freelancer",
    supplierDesc: "Access open B2B deals and collaborate with buyers for group purchases",
    investorDesc: "Discover verified funding requests and contribute to promising projects",
    freelancerDesc: "Find open jobs and contribute your skills to ongoing projects",
    seeOpenJobs: "See Open Jobs",
    seeOpenInvestments: "See Funding Opportunities",
    seeOpenDeals: "See Open B2B Deals",
    login: "Login",
    signup: "Sign Up",
    forgotPassword: "Forgot Password",
    role: "Role",
    main: "Main",
    dashboard: "Dashboard",
    explore: "Explore",
    settings: "Settings",
    support: "Support",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
    signOut: "Sign Out",
    accountSettings: "Account Settings",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    voting: "Voting",
    proposals: "Proposals",
    arbitration: "Arbitration",
    groupBuying: "Group Buying",
    day: "day",
    days: "days",
    hour: "hour",
    hours: "hours",
    minute: "minute",
    minutes: "minutes",
    ago: "ago",
    justNow: "Just now",
    votingDescription: "Vote on active proposals to help shape the future of our community",
    proposalsDescription: "Explore and create proposals for community voting",
    searchProposals: "Search proposals...",
    filterByStatus: "Filter by status",
    allStatus: "All Statuses",
    active: "Active",
    closed: "Closed",
    filterByCategory: "Filter by category",
    allCategories: "All Categories",
    newProposal: "New Proposal",
    createdBy: "Created by",
    details: "Details",
    vote: "Vote",
    noProposalsFound: "No proposals found matching your criteria",
    clearFilters: "Clear Filters",
    accessRestricted: "Access Restricted",
    votingRestrictionMessage: "You need to be registered and KYC verified to access voting features",
    exploreContracts: "Explore Contracts",
    searchVotes: "Search votes...",
    createNewProposal: "Create New Proposal",
    voteNow: "Vote Now",
    viewDetails: "View Details",
    yes: "Yes",
    no: "No",
    abstain: "Abstain",
    remaining: "Remaining",
    noVotesFound: "No votes found matching your criteria",
    returnToHome: "Return to Home"
  },
  ar: {
    // Keep existing translations
    funding: "تمويل",
    freelance: "العمل الحر",
    pending: "قيد الانتظار",
    appName: "Mirror DAO",
    welcomeTo: "مرحبًا بك في Mirror DAO",
    appDescription: "منصة لامركزية للشراء الجماعي والتمويل وعقود العمل الحر",
    joinAsSupplier: "انضم كمورد",
    joinAsInvestor: "انضم كمستثمر",
    joinAsFreelancer: "انضم كعامل حر",
    supplierDesc: "الوصول إلى صفقات B2B المفتوحة والتعاون مع المشترين للشراء الجماعي",
    investorDesc: "اكتشف طلبات التمويل المتحقق منها وساهم في المشاريع الواعدة",
    freelancerDesc: "ابحث عن وظائف مفتوحة وساهم بمهاراتك في المشاريع الجارية",
    seeOpenJobs: "مشاهدة الوظائف المفتوحة",
    seeOpenInvestments: "مشاهدة فرص التمويل",
    seeOpenDeals: "مشاهدة صفقات B2B المفتوحة",
    login: "تسجيل الدخول",
    signup: "التسجيل",
    forgotPassword: "نسيت كلمة المرور",
    role: "الدور",
    main: "الرئيسية",
    dashboard: "لوحة التحكم",
    explore: "استكشاف",
    settings: "الإعدادات",
    support: "الدعم",
    helpCenter: "مركز المساعدة",
    contactUs: "اتصل بنا",
    signOut: "تسجيل الخروج",
    accountSettings: "إعدادات الحساب",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    language: "اللغة",
    voting: "التصويت",
    proposals: "المقترحات",
    arbitration: "التحكيم",
    groupBuying: "الشراء الجماعي",
    day: "يوم",
    days: "أيام",
    hour: "ساعة",
    hours: "ساعات",
    minute: "دقيقة",
    minutes: "دقائق",
    ago: "منذ",
    justNow: "الآن",
    votingDescription: "صوت على المقترحات النشطة للمساعدة في تشكيل مستقبل مجتمعنا",
    proposalsDescription: "استكشف وأنشئ مقترحات للتصويت المجتمعي",
    searchProposals: "البحث في المقترحات...",
    filterByStatus: "تصفية حسب الحالة",
    allStatus: "جميع الحالات",
    active: "نشط",
    closed: "مغلق",
    filterByCategory: "تصفية حسب الفئة",
    allCategories: "جميع الفئات",
    newProposal: "مقترح جديد",
    createdBy: "أنشئ بواسطة",
    details: "التفاصيل",
    vote: "صوت",
    noProposalsFound: "لم يتم العثور على مقترحات تطابق المعايير الخاصة بك",
    clearFilters: "مسح التصفية",
    accessRestricted: "الوصول مقيد",
    votingRestrictionMessage: "تحتاج إلى التسجيل والتحقق من هويتك للوصول إلى ميزات التصويت",
    exploreContracts: "استكشاف العقود",
    searchVotes: "البحث في التصويتات...",
    createNewProposal: "إنشاء مقترح جديد",
    voteNow: "صوت الآن",
    viewDetails: "عرض التفاصيل",
    yes: "نعم",
    no: "لا",
    abstain: "امتناع",
    remaining: "متبقي",
    noVotesFound: "لم يتم العثور على تصويتات تطابق المعايير الخاصة بك",
    returnToHome: "العودة إلى الرئيسية"
  }
};

// Keep existing getTranslation function
export const getTranslation = (language: string, key: LanguageKey): string => {
  if (!translations[language]) {
    return translations.en[key] || key;
  }
  return translations[language][key] || translations.en[key] || key;
};
