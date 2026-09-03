class OfflineService {
  private static instance: OfflineService;
  private isOnlineStatus = true;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.isOnlineStatus = navigator.onLine;
      window.addEventListener('online', () => {
        this.isOnlineStatus = true;
        console.log('[OfflineService] Network reconnected');
      });
      window.addEventListener('offline', () => {
        this.isOnlineStatus = false;
        console.log('[OfflineService] Network disconnected');
      });
    }
  }

  public static getInstance(): OfflineService {
    if (!OfflineService.instance) {
      OfflineService.instance = new OfflineService();
    }
    return OfflineService.instance;
  }

  public isOnline(): boolean {
    return this.isOnlineStatus;
  }
}

export const offlineService = OfflineService.getInstance();
