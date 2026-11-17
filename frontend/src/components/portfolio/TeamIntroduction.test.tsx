
/** @vitest-environment jsdom */

import '@testing-library/jest-dom/vitest'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import {
  cleanup,
  render,
  screen,
} from '@testing-library/react'

import { LanguageProvider } from '../../contexts/LanguageProvider'
import { portfolioData } from '../../../../backend/src/portfolioData'
import { PortfolioDataContext } from '../../data/portfolioData'
import TeamIntroduction from './TeamIntroduction'

const LANGUAGE_STORAGE_KEY = 'team-portfolio-ai-language'

function renderTeamIntroduction() {
  return render(
    <LanguageProvider>
      <PortfolioDataContext.Provider value={portfolioData}>
        <TeamIntroduction />
      </PortfolioDataContext.Provider>
    </LanguageProvider>,
  )
}

describe('TeamIntroduction Component', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    window.localStorage.clear()
  })

  it('should display the English introduction by default', () => {
    renderTeamIntroduction()

    expect(
      screen.getByRole('heading', {
        name: 'A little about our team',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('We are KUAi (Know Us. Ask AI.)'),
    ).toBeInTheDocument()

    expect(screen.getByText('Turn data into conversations and make technology accessible.')).toBeInTheDocument()
  })

  it('should display Thai content when Thai is selected', () => {
    window.localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      'th',
    )

    renderTeamIntroduction()

    expect(
      screen.getByRole('heading', {
        name: 'รู้จักทีมของเรา',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('เราคือทีม KUAi (Know Us. Ask AI.)'),
    ).toBeInTheDocument()

    expect(screen.getByText('เปลี่ยนข้อมูลให้เป็นบทสนทนา และเปลี่ยนเทคโนโลยีให้เข้าถึงง่าย')).toBeInTheDocument()
    expect(screen.queryByText('กำลังเตรียมข้อมูล')).not.toBeInTheDocument()
  })

  it('should display the confirmed team member count', () => {
    renderTeamIntroduction()

    expect(screen.getByText('03', { selector: 'p' })).toBeInTheDocument()
    expect(screen.getByText('TEAM MEMBERS')).toBeInTheDocument()
  })

  it('should display the selected core strengths', () => {
    renderTeamIntroduction()

    expect(
      screen.getByText(
        'Cross-functional collaboration with clear API contracts',
      ),
    ).toBeInTheDocument()

    expect(
      screen.queryByText(
        'Our confirmed team strengths will appear here after the members review their skills and collaboration.',
      ),
    ).not.toBeInTheDocument()
  })
})
