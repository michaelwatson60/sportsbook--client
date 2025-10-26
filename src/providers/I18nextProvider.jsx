import React, { Suspense, useEffect } from 'react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import Backend from 'i18next-http-backend';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../redux/store';
import { selectSupportedLanguages } from '../redux/reducers/configs/configs.slice';
import GlobalLoader from '../components/GlobalLoader/GlobalLoader';
import { useLocation } from 'react-router-dom';
import { SERVER_URLS } from '../helpers/utils';

export const langFromUrl = location.search.split('lang=')[1];
const langFromLocalStorage = localStorage.getItem('lang');

export function getDefaultLanguage(supportedLangs) {
  const supportedLanguages =
    supportedLangs || store.getState().configs.languages || [];

  if (langFromUrl && supportedLanguages.includes(langFromUrl)) {
    return langFromUrl;
  } else if (
    langFromLocalStorage &&
    supportedLanguages.includes(langFromLocalStorage)
  ) {
    return langFromLocalStorage;
  } else {
    return supportedLanguages[0];
  }
}

export const t = i18n.t.bind(i18n);

function MyI18nextProvider({ children }) {
  const supportedLanguages = useSelector(selectSupportedLanguages);
  // const navigate = useNavigate();
  const location = useLocation();
  // const { i18n: newI18N } = useTranslation();

  useEffect(() => {
    const newLang = location.search.split('lang=')[1];

    const lang = getDefaultLanguage();

    if (lang && lang !== newLang) {
      i18n.changeLanguage(newLang);
    }
  }, [location.search]);

  useEffect(() => {
    if (supportedLanguages) {
      const defaultLang = getDefaultLanguage(supportedLanguages);

      const loadPath = `${SERVER_URLS.dictionaryUrl}/public/{{lng}}/{{ns}}.json`;

      i18n.use(Backend).init({
        lng: defaultLang,
        supportedLngs: supportedLanguages,
        ns: [
          'translation',
          'markets2',
          'betSlip',
          'teams',
          'leagues',
          'countries',
          'pages',
        ],
        defaultNS: 'translation',
        keySeparator: '.',
        backend: {
          loadPath,
        },
      });
    }
  }, [supportedLanguages]);

  return (
    <Suspense fallback={<GlobalLoader />}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Suspense>
  );
}

export default MyI18nextProvider;
