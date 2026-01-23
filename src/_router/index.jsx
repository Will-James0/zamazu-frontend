// src/_router/index.jsx - VERSION SIMPLIFIÉE ET FONCTIONNELLE
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

// IMPORT DEPUIS PAGES/ (si tes pages sont dans pages/)
import AllProjects from '../pages/AllProjects'
import Exclusives from '../pages/Exclusives'
import Series from '../pages/Series'
import Singles from '../pages/Singles'
import Freestyles from '../pages/Freestyles'
import NotFound from '../pages/NotFound'

// IMPORT DEPUIS COMPONENTS/ (pour la page d'accueil)
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import DiscographySection from '../components/DiscographySection'

// Page d'accueil qui utilise tes composants flamboyants
const HomePage = () => (
  <>
    <HeroSection />
    <AboutSection />
    <DiscographySection />
  </>
)

// Configuration SIMPLE des routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'discography/all',
        element: <AllProjects />
      },
      {
        path: 'discography/exclusives',
        element: <Exclusives />
      },
      {
        path: 'discography/series',
        element: <Series />
      },
      {
        path: 'discography/singles',
        element: <Singles />
      },
      {
        path: 'discography/freestyles',
        element: <Freestyles />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default router