/**
 * Shared chat message utilities.
 *
 * Both ChatComposer and Chat API use the same
 * grapheme-based message length validation.
 */

export const MAX_CHAT_MESSAGE_GRAPHEMES = 2000

const graphemeSegmenter =
  typeof Intl.Segmenter !== 'undefined'
    ? new Intl.Segmenter(undefined, {
        granularity: 'grapheme',
      })
    : null

/**
 * Split text into grapheme clusters.
 *
 * Modern browsers use Intl.Segmenter for accurate
 * Unicode grapheme segmentation.
 *
 * Fallback: Array.from() counts Unicode code points,
 * which is less accurate for combined characters.
 */
function getGraphemes(value: string): string[] {
  if (graphemeSegmenter) {
    return Array.from(
      graphemeSegmenter.segment(value),
      ({ segment }) => segment,
    )
  }

  return Array.from(value)
}

/**
 * Count grapheme clusters in a string.
 */
export function countGraphemes(value: string): number {
  return getGraphemes(value).length
}

/**
 * Truncate text to the maximum number of grapheme clusters.
 */
export function truncateGraphemes(
  value: string,
  maxLength = MAX_CHAT_MESSAGE_GRAPHEMES,
): string {
  const safeMaxLength = Math.max(0, Math.floor(maxLength))

  return getGraphemes(value)
    .slice(0, safeMaxLength)
    .join('')
}