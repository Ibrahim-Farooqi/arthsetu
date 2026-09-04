class PerformanceService {
  private static instance: PerformanceService;
  private marks: Map<string, number> = new Map();

  private constructor() {}

  public static getInstance(): PerformanceService {
    if (!PerformanceService.instance) {
      PerformanceService.instance = new PerformanceService();
    }
    return PerformanceService.instance;
  }

  public startMark(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      this.marks.set(name, window.performance.now());
    }
  }

  public endMark(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      const startTime = this.marks.get(name);
      if (startTime) {
        const duration = window.performance.now() - startTime;
        console.log(`[Performance] ${name} took ${duration.toFixed(2)}ms`);
        this.marks.delete(name);
        return duration;
      }
    }
    return 0;
  }

  public logMetric(metricName: string, value: number) {
    console.log(`[Performance Metric] ${metricName}: ${value}`);
  }
}

export const perfMonitor = PerformanceService.getInstance();
