class AnalyticsService {
  private static instance: AnalyticsService;
  private isEnabled = true;

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  public trackPageView(pageName: string) {
    if (!this.isEnabled) return;
    console.log(`[Analytics] Page View: ${pageName}`);
  }

  public trackEvent(eventName: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;
    console.log(`[Analytics] Event: ${eventName}`, properties);
  }

  public trackTradeExecuted(symbol: string, type: string, amount: number) {
    this.trackEvent('trade_executed', { symbol, type, amount, timestamp: new Date().toISOString() });
  }

  public trackAiAdvisorInteraction(advisorId: string, query: string) {
    this.trackEvent('ai_advisor_query', { advisorId, queryLength: query.length });
  }

  public trackFundsAdded(amount: number, method: string) {
    this.trackEvent('funds_added', { amount, method });
  }
}

export const analytics = AnalyticsService.getInstance();
