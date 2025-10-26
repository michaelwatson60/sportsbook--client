import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './assets/styles/style.scss';
import App from './App';
import { persistor, store } from './redux/store';
import ThemeProvider from './providers/ThemProvider';
import MyI18nextProvider from './providers/I18nextProvider';
import ConfigsProvider from './providers/ConfigsProvider';
import InitialConfigProvider from './providers/InitialConfigProvider';
import SportsbookProvider from './package/providers';
import LiveProvider from '@/providers/LiveProvider';
import * as Sentry from '@sentry/react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
} from 'react-router-dom';

import(`./whitelabelStyles/${process.env.REACT_APP_LABEL_FLAG}.scss`);

if (process.env.REACT_APP_SENTRY_URL) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_URL,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.httpClientIntegration(),
      Sentry.browserProfilingIntegration(),
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    // Tracing
    tracesSampleRate: 0.5, //  Capture 50% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    parentSpanIsAlwaysRootSpan: false,
    tracePropagationTargets: [
      process.env.REACT_APP_API_URL,
      process.env.REACT_APP_STATIC_URL,
      process.env.REACT_APP_DICTIONARY_URL,
    ],
    profilesSampler: () => {
      return 1;
    },
    ignoreErrors: [],
    profilesSampleRate: 0.5,
    replaysSessionSampleRate: 0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    beforeSend(event, hint) {
      const error = hint.originalException;

      if (error && error.isAxiosError) {
        return null;
      }

      if (error instanceof Error && error.message.includes('ChunkLoadError')) {
        return null;
      }

      if (
        error instanceof Error &&
        (error.name === 'CanceledError' || error.message.includes('canceled'))
      ) {
        return null;
      }

      if (error instanceof Error && error.message.includes('Unknown')) {
        return null;
      }

      return event;
    },
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <LiveProvider>
        <PersistGate loading={null} persistor={persistor}>
          <InitialConfigProvider>
            <MyI18nextProvider>
              <ConfigsProvider>
                <ThemeProvider>
                  <SportsbookProvider>
                    <App />
                  </SportsbookProvider>
                </ThemeProvider>
              </ConfigsProvider>
            </MyI18nextProvider>
          </InitialConfigProvider>
        </PersistGate>
      </LiveProvider>
    </Provider>
  </BrowserRouter>,
);
