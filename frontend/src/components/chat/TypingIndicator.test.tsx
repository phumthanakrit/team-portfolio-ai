
/**
 * @vitest-environment jsdom
 */

import type { ReactNode } from 'react'

import {
  afterEach,
  describe,
  expect,
  it,
} from 'vitest'

import {
  cleanup,
  render,
  screen,
} from '@testing-library/react'

import '@testing-library/jest-dom/vitest'

import TypingIndicator from './TypingIndicator'

import { LanguageContext } from '../../contexts/language-context'

import type { Language } from '../../data/portfolioData'

afterEach(() => {
  cleanup()
})

// Render with an explicit language context
function renderWithLanguage(
  component: ReactNode,
  language: Language = 'en',
) {
  return render(
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: () => undefined,
      }}
    >
      {component}
    </LanguageContext.Provider>,
  )
}

describe('TypingIndicator Component', () => {

  it('should display the English typing message', () => {
    renderWithLanguage(
      <TypingIndicator />,
      'en',
    )

    expect(
      screen.getByText('Team AI is thinking...'),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('status'),
    ).toBeInTheDocument()
  })

  it('should display the Thai typing message', () => {
    renderWithLanguage(
      <TypingIndicator />,
      'th',
    )

    expect(
      screen.getByText('ผู้ช่วย AI กำลังคิด...'),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('status'),
    ).toBeInTheDocument()
  })

})
