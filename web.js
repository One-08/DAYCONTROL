// Web entry point for DayControl
import { registerRootComponent } from 'expo';

if (typeof window !== 'undefined' && window.document) {
  // We're on web - serve the HTML interface
  window.location.href = '/web/index.html';
} else {
  // We're on mobile - use React Native
  import('./App').then(({ default: App }) => {
    registerRootComponent(App);
  });
}
