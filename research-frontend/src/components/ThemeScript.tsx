export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        // Check for saved theme
        const theme = localStorage.getItem('theme');
        
        // Apply the saved theme or use system preference
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        // Add a debug message to help troubleshoot
        console.log('Theme script executed. Current theme:', theme || 'system default');
      } catch (e) {
        // Fail silently if localStorage is not available
        console.error('Error accessing localStorage:', e);
      }
    })()
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
