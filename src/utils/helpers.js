/**
 * Convert Google Drive sharing URL to direct image URL
 * 
 * Input formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID&export=view
 * 
 * Output: https://lh3.googleusercontent.com/d/FILE_ID
 */
export function getGoogleDriveImageUrl(url) {
  if (!url) return null

  // Already a direct URL format
  if (url.includes('lh3.googleusercontent.com/d/')) {
    return url
  }

  // Extract file ID from various Google Drive URL formats
  let fileId = null

  // Format: /file/d/FILE_ID/
  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileDMatch) {
    fileId = fileDMatch[1]
  }

  // Format: ?id=FILE_ID
  if (!fileId) {
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (idMatch) {
      fileId = idMatch[1]
    }
  }

  // Format: /open?id=FILE_ID
  if (!fileId) {
    const openMatch = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/)
    if (openMatch) {
      fileId = openMatch[1]
    }
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`
  }

  // Return original URL if not Google Drive
  return url
}

/**
 * Check if URL is a Google Drive URL
 */
export function isGoogleDriveUrl(url) {
  if (!url) return false
  return url.includes('drive.google.com')
}
