export function downloadResume() {
  const anchor = document.createElement('a')
  anchor.href = '/assets/resume/Gayani_Polireddy_Resume.pdf'
  anchor.download = 'Gayani_Polireddy_Resume.pdf'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}
