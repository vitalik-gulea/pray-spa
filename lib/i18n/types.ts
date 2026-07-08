export type Dictionary = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    features: string;
    howItWorks: string;
    privacy: string;
    support: string;
    download: string;
  };
  storeButtons: {
    comingSoon: string;
    downloadOn: string;
    appStore: string;
    googlePlay: string;
  };
  themeToggle: {
    light: string;
    dark: string;
    system: string;
  };
  languageSwitcher: {
    label: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    imageAlt: string;
  };
  features: {
    heading: string;
    subheading: string;
    items: { title: string; description: string }[];
  };
  howItWorks: {
    heading: string;
    subheading: string;
    steps: { title: string; description: string }[];
  };
  gallery: {
    heading: string;
    subheading: string;
    alts: string[];
  };
  privacyTeaser: {
    heading: string;
    description: string;
    cta: string;
  };
  privacyPage: {
    title: string;
    effectiveDate: string;
    lastUpdated: string;
    backLink: string;
    copyright: string;
    sections: { title: string; content: string }[];
  };
  support: {
    heading: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    subjectOptions: {
      general: string;
      bug: string;
      account_deletion: string;
      suggestion: string;
      other: string;
    };
    messageLabel: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    successRetry: string;
    errorGeneric: string;
  };
  footer: {
    rights: string;
    privacyLink: string;
  };
};
