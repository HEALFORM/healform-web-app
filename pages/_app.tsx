import { CTAComponent, FooterComponent, HeaderComponent } from '@components'
import ChatwootWidget from '@components/ChatwootWidget'
import '@healform/design-tokens/dist/css/variables--root.css'
import { ThemeProvider } from '@healform/liquid'
import GlobalStyles from '@styles/Global'
import '@styles/global.css'
import '@styles/normalize.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, { FC, useEffect } from 'react'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const callCC = () => {
      let cc
      try {
        cc = (window as any).initCookieConsent()
      } catch (error) {
        console.error(error)
      }
      if (cc) {
        cc.run({
          gui_options: {
            consent_modal: {
              layout: 'cloud',
              position: 'bottom center',
              transition: 'slide',
              swap_buttons: false,
            },
            settings_modal: {
              layout: 'box',
              position: 'left',
              transition: 'slide',
            },
          },
          current_lang: 'de',
          autoclear_cookies: true,
          page_scripts: true,

          languages: {
            de: {
              consent_modal: {
                title: 'Wir verwenden Cookies! 🍪',
                description:
                  'Hallo, diese Website verwendet essentielle Cookies, um ihren ordnungsgemäßen Betrieb zu gewährleisten, und Tracking-Cookies, um zu verstehen, wie Sie mit ihr interagieren. Letztere werden nur nach Zustimmung gesetzt werden. <button type="button" data-cc="c-settings" class="cc-link">Einstellungen →</button>',
                primary_btn: {
                  text: 'Alle akzeptieren',
                  role: 'accept_all',
                },
                secondary_btn: {
                  text: 'Alle ablehnen',
                  role: 'accept_necessary',
                },
              },
              settings_modal: {
                title: 'Cookie Einstellungen',
                save_settings_btn: 'Einstellungen speichern',
                accept_all_btn: 'Alle akzeptieren',
                reject_all_btn: 'Alle ablehnen',
                close_btn_label: 'Schließen',
                cookie_table_headers: [
                  { col1: 'Name' },
                  { col2: 'Domain' },
                  { col3: 'Expiration' },
                  { col4: 'Description' },
                ],
                blocks: [
                  {
                    title: 'Cookie-Verwendung 📢',
                    description:
                      'Wir verwenden Cookies, um die grundlegenden Funktionen der Website zu gewährleisten und um Ihr Online-Erlebnis zu verbessern. Sie können für jede Kategorie wählen, ob Sie sich ein- oder austragen möchten. Für weitere Einzelheiten zu Cookies und anderen sensiblen Daten lesen Sie bitte die vollständige <a href="/legal/datenschutz" class="cc-link">Datenschutzerklärung</a>.',
                  },
                  {
                    title: 'Notwendige Cookies',
                    description:
                      'Diese Cookies sind für das ordnungsgemäße Funktionieren unserer Website unerlässlich. Ohne diese Cookies würde die Website nicht richtig funktionieren',
                    toggle: {
                      value: 'necessary',
                      enabled: true,
                      readonly: true,
                    },
                  },
                  {
                    title: 'Leistungs- und Analyse-Cookies',
                    description:
                      'Diese Cookies ermöglichen es der Website, sich an die von Ihnen in der Vergangenheit getroffene Auswahl zu erinnern',
                    toggle: {
                      value: 'analytics',
                      enabled: false,
                      readonly: false,
                    },
                    cookie_table: [
                      {
                        col1: '^_ga',
                        col2: 'google.com',
                        col3: '2 years',
                        col4: 'description ...',
                        is_regex: true,
                      },
                      {
                        col1: '_gid',
                        col2: 'google.com',
                        col3: '1 day',
                        col4: 'description ...',
                      },
                    ],
                  },
                  {
                    title: 'Cookies für Werbung und Zielgruppenansprache',
                    description:
                      'Diese Cookies sammeln Informationen darüber, wie Sie die Website nutzen, welche Seiten Sie besucht und welche Links Sie angeklickt haben. Alle Daten sind anonymisiert und können nicht verwendet werden, um Sie zu identifizieren',
                    toggle: {
                      value: 'targeting',
                      enabled: false,
                      readonly: false,
                    },
                  },
                  {
                    title: 'Weitere Informationen',
                    description:
                      'Bei Fragen zu unserer Verwendung in Bezug auf Cookies und Ihre Wahlmöglichkeiten <a class="cc-link" href="#yourcontactpage">kontaktieren</a> Sie uns.',
                  },
                ],
              },
            },
          },
        })
      }
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.5.0/dist/cookieconsent.js'
    script.type = 'application/javascript'
    document.head.appendChild(script)

    const timer = setTimeout(() => {
      callCC()
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap" rel="stylesheet" />
        <link
          href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.7.1/dist/cookieconsent.css"
          rel="stylesheet"
        />

        <script type="text/plain" data-cookiecategory="analytics">
          console.log('"ads" category accepted');
        </script>
      </Head>

      <GlobalStyles />
      <HeaderComponent />
      <Component {...pageProps} />
      <CTAComponent />
      <FooterComponent />
      <ChatwootWidget />
    </>
  )
}

const MyAppWithProviders = ({ ...props }: AppProps) => (
  <ThemeProvider nonce={''}>
    <MyApp {...props} />
  </ThemeProvider>
)

export default MyAppWithProviders
