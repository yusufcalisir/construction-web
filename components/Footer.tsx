'use client'

import { useLanguage } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

export default function Footer() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <footer
        className={`relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950' 
            : 'bg-gradient-to-b from-stone-50 via-white to-stone-50'
        }`}
      >
        {/* Subtle decorative line */}
        <div className={`absolute top-0 left-0 right-0 h-px ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-transparent via-dark-700 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-stone-300 to-transparent'
        }`} />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className={`text-3xl font-bold mb-4 transition-colors tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-stone-900'
                }`}>
                  Ber Tadilat
                </h3>
                <div className={`h-1 w-16 mb-6 ${
                  theme === 'dark' ? 'bg-dark-700' : 'bg-stone-300'
                }`} />
              </div>
              <p className={`text-base leading-relaxed max-w-lg transition-colors ${
                theme === 'dark' ? 'text-dark-300' : 'text-stone-600'
              }`}>
                {t('footer.description')}
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <h4 className={`text-sm font-semibold uppercase tracking-wider mb-6 transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-stone-900'
              }`}>
                {t('nav.navigation')}
              </h4>
              <ul className="space-y-4">
                {[
                  { key: 'home', id: 'home' },
                  { key: 'works', id: 'works' },
                  { key: 'services', id: 'services' },
                  { key: 'contact', id: 'contact' },
                ].map((item) => (
                  <li key={item.key}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`group text-base transition-all duration-300 inline-flex items-center ${
                        theme === 'dark' 
                          ? 'text-dark-400 hover:text-white' 
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <span className={`w-0 group-hover:w-2 h-0.5 mr-0 group-hover:mr-3 transition-all duration-300 ${
                        theme === 'dark' ? 'bg-white' : 'bg-stone-900'
                      }`} />
                      {t(`nav.${item.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className={`text-sm font-semibold uppercase tracking-wider mb-6 transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-stone-900'
              }`}>
                {t('contact.title')}
              </h4>
              <div className="space-y-5">
                <a
                  href="tel:+905458259495"
                  className={`group flex items-center text-lg font-medium transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'text-white hover:text-dark-300' 
                      : 'text-stone-900 hover:text-stone-600'
                  }`}
                >
                  <span className="mr-3">📞</span>
                  <span>0545 825 94 95</span>
                </a>
                
                {/* Social Media Icons */}
                <div className="flex items-center space-x-4 pt-2">
                  <a
                    href="https://www.instagram.com/berdekorasyontadilat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white'
                        : 'bg-stone-200 hover:bg-stone-300 text-stone-600 hover:text-stone-900'
                    }`}
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/905458259495"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white'
                        : 'bg-stone-200 hover:bg-stone-300 text-stone-600 hover:text-stone-900'
                    }`}
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright Line */}
      <div
        className={`py-6 px-4 text-center border-t transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-dark-950 border-dark-800/50 text-dark-500'
            : 'bg-stone-50 border-stone-200/50 text-stone-500'
        }`}
      >
        <p className="text-sm font-medium">
          {t('footer.copyright')}
        </p>
      </div>
    </>
  )
}

