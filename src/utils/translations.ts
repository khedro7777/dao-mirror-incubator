
export const translations = {
  en: {
    // Common
    appName: "Mirror DAO",
    welcomeTo: "Welcome to Mirror DAO",
    appDescription: "A decentralized platform for group buying, funding, and freelance contracts",
    
    // Roles
    joinAsSupplier: "Join as Supplier",
    joinAsInvestor: "Join as Investor",
    joinAsFreelancer: "Join as Freelancer",
    supplierDesc: "Access open B2B deals and collaborate with buyers for group purchases",
    investorDesc: "Discover verified funding requests and contribute to promising projects",
    freelancerDesc: "Find open jobs and contribute your skills to ongoing projects",
    seeOpenB2BDeals: "See Open B2B Deals",
    seeFundingOpportunities: "See Funding Opportunities",
    seeOpenJobs: "See Open Jobs",
    
    // Gateways
    exploreGateways: "Explore Gateways",
    groupBuying: "Group Buying",
    funding: "Funding",
    freelance: "Freelance",
    exploreGroupBuying: "Explore Group Buying",
    exploreFunding: "Explore Funding",
    exploreFreelance: "Explore Freelance",
    
    // KYC
    kycStatus: "KYC Status",
    notStarted: "Not Started",
    inReview: "In Review",
    verified: "Verified",
    startKycProcess: "Start KYC Process",
    
    // Contracts
    hotContractsNow: "Hot Contracts Now",
    viewAll: "View All",
    exploreContracts: "Explore Contracts",
    discoverAndParticipate: "Discover and participate in active contracts across all categories",
    searchContracts: "Search contracts...",
    noContractsFound: "No contracts found matching your search criteria.",
    createContract: "Create new contract",
    
    // Contract Status
    active: "Active",
    pending: "Pending",
    closed: "Closed",
    
    // Navigation
    home: "Home",
    explore: "Explore",
    contracts: "Contracts",
    activity: "Activity",
    settings: "Settings",
    
    // Footer
    about: "About Us",
    contact: "Contact",
    faq: "FAQ",
    
    // Error
    pageNotFound: "Oops! Page not found",
    returnToHome: "Return to Home",
  },
  ar: {
    // Common
    appName: "مرآة DAO",
    welcomeTo: "مرحبًا بك في مرآة DAO",
    appDescription: "منصة لامركزية للشراء الجماعي والتمويل وعقود العمل الحر",
    
    // Roles
    joinAsSupplier: "انضم كمورّد",
    joinAsInvestor: "انضم كمستثمر",
    joinAsFreelancer: "انضم كمستقل",
    supplierDesc: "الوصول إلى صفقات B2B المفتوحة والتعاون مع المشترين للشراء الجماعي",
    investorDesc: "اكتشف طلبات التمويل المُتحقق منها وساهم في المشاريع الواعدة",
    freelancerDesc: "ابحث عن وظائف مفتوحة وساهم بمهاراتك في المشاريع الجارية",
    seeOpenB2BDeals: "شاهد صفقات B2B المفتوحة",
    seeFundingOpportunities: "شاهد فرص التمويل",
    seeOpenJobs: "شاهد الوظائف المفتوحة",
    
    // Gateways
    exploreGateways: "استكشف البوابات",
    groupBuying: "الشراء الجماعي",
    funding: "التمويل",
    freelance: "العمل الحر",
    exploreGroupBuying: "استكشف الشراء الجماعي",
    exploreFunding: "استكشف التمويل",
    exploreFreelance: "استكشف العمل الحر",
    
    // KYC
    kycStatus: "حالة التحقق من الهوية",
    notStarted: "لم يبدأ بعد",
    inReview: "قيد المراجعة",
    verified: "تم التحقق",
    startKycProcess: "ابدأ عملية التحقق من الهوية",
    
    // Contracts
    hotContractsNow: "العقود الرائجة الآن",
    viewAll: "عرض الكل",
    exploreContracts: "استكشف العقود",
    discoverAndParticipate: "اكتشف وشارك في العقود النشطة عبر جميع الفئات",
    searchContracts: "ابحث عن عقود...",
    noContractsFound: "لا توجد عقود مطابقة لمعايير البحث الخاصة بك.",
    createContract: "إنشاء عقد جديد",
    
    // Contract Status
    active: "نشط",
    pending: "قيد الانتظار",
    closed: "مغلق",
    
    // Navigation
    home: "الرئيسية",
    explore: "استكشاف",
    contracts: "العقود",
    activity: "النشاط",
    settings: "الإعدادات",
    
    // Footer
    about: "من نحن",
    contact: "اتصل بنا",
    faq: "الأسئلة الشائعة",
    
    // Error
    pageNotFound: "عذراً! الصفحة غير موجودة",
    returnToHome: "العودة إلى الرئيسية",
  }
};

export type LanguageKey = keyof typeof translations.en;

export const getTranslation = (language: "en" | "ar", key: LanguageKey): string => {
  return translations[language][key] || translations.en[key] || key;
};
