// UI strings this module needs that don't exist yet in src/data/lang/*.json
// (that file is Module 1's — not touched here). strings.app.community.title
// and .description from AppContext ARE used directly in Community.jsx,
// since those already exist. Everything below is additional copy.

export const communityStrings = {
  en: {
    empty:
      'No questions yet. Select text in the Reader and choose “Ask Question” to start a thread.',
    countLabel: (n) => `${n} open thread${n === 1 ? '' : 's'}`,
    askedBy: 'asked by',
    verifiedTeacher: 'Verified Teacher',
    devSeedButton: 'Add sample question (dev only)',
  },
  hi: {
    empty:
      'अभी कोई प्रश्न नहीं है। रीडर में टेक्स्ट चुनें और "प्रश्न पूछें" विकल्प से चर्चा शुरू करें।',
    countLabel: (n) => `${n} खुली चर्चा${n === 1 ? '' : 'एँ'}`,
    askedBy: 'द्वारा पूछा गया',
    verifiedTeacher: 'सत्यापित शिक्षक',
    devSeedButton: 'नमूना प्रश्न जोड़ें (केवल डेव मोड)',
  },
}