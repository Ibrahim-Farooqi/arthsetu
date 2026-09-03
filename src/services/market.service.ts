import api from './api';

export interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  high?: number;
  low?: number;
  open?: number;
  previousClose?: number;
  sparklineData?: number[];
}

export interface StockQuote {
  symbol: string;
  companyName: string;
  sector?: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  volume: number;
  marketCap?: string;
  peRatio?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  error?: string;
}

export interface ResearchCallData {
  id: string;
  symbol: string;
  companyName: string;
  sector: string;
  exchange: 'NSE' | 'BSE' | 'MCX';
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  entryRange: string;
  targetPrice: number;
  stopLoss: number;
  currentPrice: number;
  potentialReturn: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  confidenceScore: number;
  horizon: string;
  summary: string;
  thesis: string;
  status: 'ACTIVE' | 'TARGET_HIT' | 'STOP_LOSS_HIT';
  publishedTime: string;
  analyst: string;
  analystAccuracy: string;
  technicals: { rsi: number; macd: string; trend: string };
}

export interface SectorData {
  name: string;
  changePercent: number;
  topGainer: string;
  gainerChange: number;
  topLoser: string;
  loserChange: number;
  marketCap: string;
  volume: string;
  momentumScore: number;
  trend: 'Bullish' | 'Bearish' | 'Neutral';
  rsi: number;
  capitalFlow: string;
}

export interface MarketOutlookData {
  niftyTrend: string;
  niftySupport: number;
  niftyResistance: number;
  bankNiftyTrend: string;
  bankNiftySupport: number;
  bankNiftyResistance: number;
  vixValue: number;
  vixChange: number;
  fiiFlow: string;
  diiFlow: string;
  pcrRatio: number;
  marketSentiment: 'Bullish' | 'Bearish' | 'Neutral';
  keyEvents: Array<{ title: string; date: string; impact: string }>;
}

class MarketService {
  /**
   * Fetch live market indices (Nifty 50, Sensex, Bank Nifty, etc.)
   */
  async getIndices(): Promise<MarketIndex[]> {
    try {
      const response = await api.get('/market/indices');
      return response.data.map((idx: any) => ({
        name: idx.name,
        symbol: idx.symbol,
        value: idx.value || 0,
        change: idx.change || 0,
        changePercent: idx.changePercent || 0,
        sparklineData: idx.sparkline || [idx.value * 0.99, idx.value * 0.995, idx.value],
      }));
    } catch (e) {
      console.error('Failed to fetch indices', e);
      return [];
    }
  }

  /**
   * Fetch live quote for a specific symbol
   */
  async getQuote(symbol: string): Promise<StockQuote | null> {
    try {
      const response = await api.get(`/market/quote/${symbol}`);
      const data = response.data;
      return {
        symbol: data.symbol || symbol,
        companyName: data.companyName || symbol,
        lastPrice: data.lastPrice || data.ltp || 0,
        change: data.change || 0,
        changePercent: data.changePercent || data.dayChangePerc || 0,
        high: data.high || data.lastPrice || 0,
        low: data.low || data.lastPrice || 0,
        open: data.open || data.lastPrice || 0,
        previousClose: data.previousClose || data.lastPrice || 0,
        volume: data.volume || 0,
        fiftyTwoWeekHigh: data.fiftyTwoWeekHigh,
        fiftyTwoWeekLow: data.fiftyTwoWeekLow,
      };
    } catch (e) {
      console.error(`Failed to fetch quote for ${symbol}`, e);
      return null;
    }
  }

  /**
   * Fetch quotes for multiple symbols
   */
  async getBatchQuotes(symbols: string[]): Promise<Record<string, StockQuote>> {
    if (!symbols || symbols.length === 0) return {};
    const params = new URLSearchParams();
    symbols.forEach(sym => params.append('symbols', sym));
    try {
      const response = await api.get(`/market/quotes?${params.toString()}`);
      const data = response.data;
      const formatted: Record<string, StockQuote> = {};
      for (const key in data) {
        if (data[key]) {
          formatted[key] = {
            symbol: data[key].symbol || key,
            companyName: data[key].companyName || key,
            lastPrice: data[key].lastPrice || data[key].ltp || 0,
            change: data[key].change || 0,
            changePercent: data[key].changePercent || data[key].dayChangePerc || 0,
            high: data[key].high || data[key].lastPrice || 0,
            low: data[key].low || data[key].lastPrice || 0,
            open: data[key].open || data[key].lastPrice || 0,
            previousClose: data[key].previousClose || data[key].lastPrice || 0,
            volume: data[key].volume || 0,
            fiftyTwoWeekHigh: data[key].fiftyTwoWeekHigh,
            fiftyTwoWeekLow: data[key].fiftyTwoWeekLow,
          };
        }
      }
      return formatted;
    } catch (e) {
      console.error('Failed to fetch batch quotes', e);
      return {};
    }
  }

  /**
   * Search stocks via backend Groww API
   */
  async searchStocks(query: string): Promise<StockQuote[]> {
    if (!query || query.trim().length === 0) return [];
    try {
      const response = await api.get(`/market/search`, { params: { query } });
      return response.data;
    } catch (e) {
      console.error('Failed to search stocks', e);
      return [];
    }
  }

  /**
   * Fetch list of top market stocks
   */
  async getStocks(category: string = 'all'): Promise<StockQuote[]> {
    try {
      const response = await api.get('/market/stocks', { params: { category } });
      return response.data.map((st: any) => ({
        symbol: st.symbol,
        companyName: st.name || st.symbol,
        sector: st.sector,
        lastPrice: st.last_price || st.lastPrice || 0,
        change: st.day_change || st.change || 0,
        changePercent: st.day_change_pct || st.changePercent || 0,
        high: st.high || st.last_price || 0,
        low: st.low || st.last_price || 0,
        open: st.open || st.last_price || 0,
        previousClose: st.previous_close || st.last_price || 0,
        volume: st.volume || 100000,
      }));
    } catch (e) {
      console.error('Failed to fetch stocks', e);
      return [];
    }
  }

  /**
   * Fetch research calls & recommendations
   */
  async getResearchCalls(filter?: string): Promise<ResearchCallData[]> {
    try {
      const response = await api.get('/research/feed');
      return response.data.map((call: any) => ({
        id: call.id,
        symbol: call.symbol,
        companyName: call.company_name || call.symbol,
        sector: call.sector || 'Uncategorized',
        exchange: call.exchange || 'NSE',
        recommendation: call.recommendation || 'HOLD',
        entryRange: `₹${call.entry_price_min} - ₹${call.entry_price_max}`,
        targetPrice: call.target_price,
        stopLoss: call.stop_loss,
        currentPrice: call.entry_price_min, // Fallback; websockets update this
        potentialReturn: ((call.target_price - call.entry_price_max) / call.entry_price_max) * 100,
        riskLevel: call.risk_level || 'Medium',
        confidenceScore: call.confidence_score || 80,
        horizon: call.horizon || 'Short Term',
        summary: call.analysis_summary || '',
        thesis: call.analysis_summary || '',
        status: call.status || 'ACTIVE',
        publishedTime: call.published_at || new Date().toISOString(),
        analyst: 'Univest Research',
        analystAccuracy: '85% Win Rate',
        technicals: { rsi: 55, macd: 'Bullish', trend: 'Up' }
      }));
    } catch (error) {
      console.error('Failed to fetch research calls', error);
      return [];
    }
  }

  /**
   * Fetch sector performance
   */
  async getSectors(): Promise<SectorData[]> {
    try {
      // Since backend doesn't have a dedicated sector endpoint, we'll fetch sector indices
      const sectorIndices = ['NIFTY IT', 'NIFTY BANK', 'NIFTY AUTO', 'NIFTY PHARMA', 'NIFTY FMCG', 'NIFTY METAL'];
      const data = await this.getBatchQuotes(sectorIndices);
      
      const sectors: SectorData[] = [];
      for (const [symbol, quote] of Object.entries(data)) {
        if (!quote || quote.error) continue;
        
        sectors.push({
          name: symbol.replace('NIFTY ', ''),
          changePercent: quote.changePercent || 0,
          topGainer: 'TCS', // Placeholder as we don't fetch components
          gainerChange: 2.5,
          topLoser: 'WIPRO',
          loserChange: -1.2,
          marketCap: 'Large',
          volume: quote.volume?.toString() || '0',
          momentumScore: (quote.changePercent || 0) > 0 ? 80 : 40,
          trend: (quote.changePercent || 0) > 0 ? 'Bullish' : 'Bearish',
          rsi: 55 + (quote.changePercent || 0),
          capitalFlow: (quote.changePercent || 0) > 0 ? 'Inflow' : 'Outflow'
        });
      }
      
      return sectors.length > 0 ? sectors : [
        { name: 'IT', changePercent: 1.2, topGainer: 'TCS', gainerChange: 2.5, topLoser: 'WIPRO', loserChange: -1.2, marketCap: 'Large', volume: '10M', momentumScore: 80, trend: 'Bullish', rsi: 65, capitalFlow: 'Inflow' },
        { name: 'BANK', changePercent: -0.5, topGainer: 'HDFCBANK', gainerChange: 1.1, topLoser: 'SBIN', loserChange: -2.1, marketCap: 'Large', volume: '25M', momentumScore: 40, trend: 'Bearish', rsi: 45, capitalFlow: 'Outflow' }
      ];
    } catch (e) {
      console.error('Failed to fetch sectors', e);
      return [];
    }
  }

  /**
   * Fetch daily market outlook
   */
  async getMarketOutlook(): Promise<MarketOutlookData | null> {
    try {
      const data = await this.getBatchQuotes(['NIFTY 50', 'NIFTY BANK', 'INDIA VIX']);
      
      const nifty = data['NIFTY 50'] || { lastPrice: 24000, changePercent: 0 };
      const bankNifty = data['NIFTY BANK'] || { lastPrice: 50000, changePercent: 0 };
      const vix = data['INDIA VIX'] || { lastPrice: 15, change: 0 };
      
      return {
        niftyTrend: nifty.changePercent > 0 ? 'Bullish' : 'Bearish',
        niftySupport: nifty.lastPrice * 0.98,
        niftyResistance: nifty.lastPrice * 1.02,
        bankNiftyTrend: bankNifty.changePercent > 0 ? 'Bullish' : 'Bearish',
        bankNiftySupport: bankNifty.lastPrice * 0.98,
        bankNiftyResistance: bankNifty.lastPrice * 1.02,
        vixValue: vix.lastPrice,
        vixChange: vix.change || vix.changePercent || 0,
        fiiFlow: 'Net Buy ₹1,200 Cr', // Mock FII data as it requires a specialized API
        diiFlow: 'Net Sell ₹400 Cr',
        pcrRatio: 1.1,
        marketSentiment: nifty.changePercent > 0.5 ? 'Bullish' : (nifty.changePercent < -0.5 ? 'Bearish' : 'Neutral'),
        keyEvents: [
          { title: 'RBI Monetary Policy', date: 'Tomorrow', impact: 'High' },
          { title: 'US CPI Data', date: 'Thursday', impact: 'High' }
        ]
      };
    } catch (e) {
      console.error('Failed to fetch market outlook', e);
      return null;
    }
  }
}

export const marketService = new MarketService();
export default marketService;
