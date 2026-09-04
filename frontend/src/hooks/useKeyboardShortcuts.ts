import { useEffect } from 'react';

export interface ShortcutHandlers {
  onOpenSearch?: () => void;
  onCloseModals?: () => void;
  onNewTrade?: () => void;
  onToggleTheme?: () => void;
  onDashboardTab?: () => void;
  onOpenShortcutsModal?: () => void;
}

export const useKeyboardShortcuts = (handlers: ShortcutHandlers) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore inside inputs or editable elements
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
        if (e.key === 'Escape' && handlers.onCloseModals) {
          handlers.onCloseModals();
        }
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (handlers.onOpenSearch) handlers.onOpenSearch();
      } else if (e.key === 'Escape') {
        if (handlers.onCloseModals) handlers.onCloseModals();
      } else if (modifier && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        if (handlers.onNewTrade) handlers.onNewTrade();
      } else if (modifier && e.key.toLowerCase() === 't') {
        e.preventDefault();
        if (handlers.onToggleTheme) handlers.onToggleTheme();
      } else if (e.key === '?') {
        e.preventDefault();
        if (handlers.onOpenShortcutsModal) handlers.onOpenShortcutsModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
};
