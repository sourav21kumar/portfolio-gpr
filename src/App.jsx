import { useReducer, useCallback } from 'react'

import Navbar                from './components/shared/Navbar.jsx'
import AmbientBackground     from './components/shared/AmbientBackground.jsx'
import ModeTransitionOverlay from './components/shared/ModeTransitionOverlay.jsx'

import HeroSection           from './components/developer/HeroSection.jsx'
import ProfessionalJourney   from './components/developer/ProfessionalJourney.jsx'
import TechStack             from './components/developer/TechStack.jsx'
import DeveloperClosingCta   from './components/developer/DeveloperClosingCta.jsx'

import CreatorHero           from './components/creator/CreatorHero.jsx'
import CreatorStats          from './components/creator/CreatorStats.jsx'
import ReelsGrid             from './components/creator/ReelsGrid.jsx'
import FeaturedPosts         from './components/creator/FeaturedPosts.jsx'
import CreatorClosingCta     from './components/creator/CreatorClosingCta.jsx'
import Footer                from './components/shared/Footer.jsx'
import SectionNav            from './components/shared/SectionNav.jsx'

import { downloadResume }    from './utils/downloadResume.js'
import {
  careerTimeline,
  educationEntry,
  skills,
  creatorStats,
  instagramReels,
  instagramPosts,
} from './data/portfolioData.js'

/* ── Transition durations (ms) per variant ──────────────────── */
const TRANSITION_DURATION_MS = {
  bloom: 1800,
  wash:  1400,
  burst: 1700,
}

/* ── State shape & reducer ───────────────────────────────────── */
const initialState = {
  mode:              'dev',     // 'dev' | 'creator'
  devTheme:          'dark',    // 'dark' | 'light'
  transitioning:     false,
  transitionVariant: 'bloom',   // 'bloom' | 'wash' | 'burst'
  transitionTarget:  null,      // 'dev' | 'creator' | null
}

function portfolioReducer(state, action) {
  switch (action.type) {
    case 'BEGIN_TRANSITION':
      return { ...state, transitioning: true, transitionTarget: action.target }
    case 'SWAP_MODE':
      return { ...state, mode: action.targetMode }
    case 'END_TRANSITION':
      return { ...state, transitioning: false }
    case 'TOGGLE_DEV_THEME':
      return { ...state, devTheme: state.devTheme === 'dark' ? 'light' : 'dark' }
    default:
      return state
  }
}

/* ── Root component ──────────────────────────────────────────── */
export default function App() {
  const [state, dispatch] = useReducer(portfolioReducer, initialState)

  const isDeveloperMode = state.mode === 'dev'
  const isLightTheme    = isDeveloperMode && state.devTheme === 'light'

  const switchMode = useCallback(() => {
    if (state.transitioning) return

    const targetMode  = state.mode === 'dev' ? 'creator' : 'dev'
    const duration    = targetMode === 'creator'
      ? 8000
      : TRANSITION_DURATION_MS[state.transitionVariant]

    dispatch({ type: 'BEGIN_TRANSITION', target: targetMode })

    setTimeout(() => {
      dispatch({ type: 'SWAP_MODE', targetMode })
      try { window.scrollTo({ top: 0, behavior: 'auto' }) } catch (_) {}
    }, duration * 0.46)

    setTimeout(() => dispatch({ type: 'END_TRANSITION' }), duration)
  }, [state.transitioning, state.mode, state.transitionVariant])

  const toggleDevTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_DEV_THEME' })
  }, [])

  const scrollToJourney = useCallback(() => {
    const journeySection = document.querySelector('[data-section="professional-journey"]')
    if (journeySection) {
      window.scrollTo({
        top: journeySection.getBoundingClientRect().top + window.scrollY - 30,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <div
      data-theme={isLightTheme ? 'light' : 'dark'}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        fontFamily: "'Sora', system-ui, sans-serif",
        color: 'var(--text)',
        background: 'var(--bg)',
        transition: 'background 0.8s ease',
      }}
    >
      {/* Grain texture — always shown across both modes and both themes */}
      <AmbientBackground isLight={isLightTheme} isCreatorMode={!isDeveloperMode} />

      <Navbar
        isDeveloperMode={isDeveloperMode}
        isLightTheme={isLightTheme}
        isTransitioning={state.transitioning}
        switchLabel={isDeveloperMode ? 'Creator Mode' : 'Developer Mode'}
        switchOrbGradient={
          isDeveloperMode
            ? 'linear-gradient(135deg, #ff2d8e, #ff7a3d)'
            : 'linear-gradient(135deg, #a98bff, #3b5bdb)'
        }
        onSwitchMode={switchMode}
        onToggleTheme={toggleDevTheme}
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* ── Developer world ─────────────────────────────────── */}
      {isDeveloperMode && (
        <main style={{ position: 'relative', zIndex: 2 }}>
          <div id="sec-hero">
            <HeroSection
              onScrollToJourney={scrollToJourney}
              onSwitchMode={switchMode}
              onDownloadResume={downloadResume}
              isLightTheme={isLightTheme}
            />
          </div>
          <div id="sec-journey">
            <ProfessionalJourney timeline={careerTimeline} education={educationEntry} />
          </div>
          <div id="sec-stack">
            <TechStack skills={skills} isLightTheme={isLightTheme} />
          </div>
          <DeveloperClosingCta onSwitchMode={switchMode} isLightTheme={isLightTheme} />
          <div id="sec-connect">
            <Footer isCreatorMode={false} isLightTheme={isLightTheme} />
          </div>
          <SectionNav />
        </main>
      )}

      {/* ── Creator world ───────────────────────────────────── */}
      {!isDeveloperMode && (
        <main
          style={{
            position: 'relative',
            zIndex: 2,
            minHeight: '100vh',
            background: 'radial-gradient(135% 95% at 78% -8%, #46123f 0%, #280b30 46%, #170721 100%)',
            overflow: 'hidden',
          }}
        >
          <CreatorHero   onSwitchMode={switchMode} />
          <CreatorStats  stats={creatorStats} />
          <ReelsGrid     reels={instagramReels} />
          <FeaturedPosts posts={instagramPosts} />
          <CreatorClosingCta />
          <Footer isCreatorMode={true} />
        </main>
      )}

      {/* ── Mode transition overlay ─────────────────────────── */}
      {state.transitioning && (
        <ModeTransitionOverlay
          variant={state.transitionVariant}
          isCreatorTransition={state.transitionTarget === 'creator'}
        />
      )}
    </div>
  )
}
