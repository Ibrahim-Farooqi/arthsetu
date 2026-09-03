# Univest & Waya Stock Advisory Platform - Workspace Reference

This document serves as the central workspace reference for the **Univest / Waya Style Stock Advisory Platform**. It compiles the complete development blueprint, infrastructure requirements, and detailed functionality lists for both platforms.

---

## 1. Complete Development Blueprint

### 1. Equity Advisory Module
* **Purpose**: Buy/Sell/Hold recommendations.
* **Required APIs**:
  * NSE/BSE Market Data
  * Upstox API
  * Zerodha Kite Connect
  * Angel One SmartAPI
* **Backend Components**:
  * Research Call Engine
  * Analyst Dashboard
  * Recommendation Service
* **Database Tables/Models**: `ResearchCall`, `ResearchCategory`, `ResearchPerformance`, `CallSubscription`
* **Third Party Services**: Firebase Push, Email Service, SMS Gateway
* **Complexity**: Medium

### 2. F&O Advisory Module
* **Purpose**: Futures & Options recommendations.
* **Required APIs**:
  * Option Chain Data API
  * Live Market Feed API
* **Backend Components**:
  * Option Strategy Engine
  * Risk Calculator
  * Greeks Calculator
* **Database Tables/Models**: `OptionCall`, `Strategy`, `RiskProfile`
* **Complexity**: High

### 3. MCX Commodity Advisory
* **Purpose**: Gold, Silver, Crude Oil and Commodity Calls.
* **Required APIs**:
  * MCX Market Feed
  * Commodity Price Feed
* **Database Tables/Models**: `CommodityCall`, `CommodityHistory`
* **Complexity**: Medium

### 4. Portfolio Tracking
* **Purpose**: User portfolio analysis.
* **Required APIs**:
  * Broker APIs
  * CAS Import
* **Backend Components**:
  * P&L Engine
  * Portfolio Analyzer
  * Risk Analyzer
* **Database Tables/Models**: `Portfolio`, `Holdings`, `Transactions`
* **Complexity**: High

### 5. Stock Screener
* **Purpose**: Filter stocks using indicators.
* **Indicators**: PE, ROE, RSI, MACD, Volume Breakout
* **Backend Components**:
  * Screening Engine
  * Indicator Service
* **Complexity**: High

### 6. AI Recommendation Engine
* **Purpose**: AI-based stock analysis.
* **Requirements**:
  * OpenAI API / LLM
  * Historical Market Data
  * Technical Indicators
* **Backend Components**:
  * AI Analysis Service
  * Prompt Engine
* **Complexity**: High

### 7. Mutual Fund Module
* **Features**:
  * Fund Discovery
  * SIP Tracking
  * Returns Analysis
* **Required APIs**:
  * MF APIs
  * NAV Data Feed
* **Complexity**: Medium

### 8. IPO Module
* **Features**:
  * Upcoming IPOs
  * GMP Tracking
  * IPO Analysis
* **Required APIs**:
  * IPO Data Providers
* **Complexity**: Medium

### 9. Broker Integration
* **Supported Brokers**: Zerodha, Upstox, Angel One
* **Features**:
  * Holdings Sync
  * Order Placement
  * Position Tracking
* **Complexity**: High

### 10. Subscription & Payments
* **Features**: Plans, Coupons, Renewals, Invoices
* **Required APIs**: Razorpay, Cashfree
* **Database Tables/Models**: `Plan`, `Subscription`, `Payment`
* **Complexity**: Medium

### 11. Notification Engine
* **Channels**: Push Notifications, Email, SMS, WhatsApp
* **Services**: Firebase, MSG91, Twilio
* **Complexity**: Medium

### 12. Admin Research Panel
* **Features**:
  * Create Calls
  * Manage Calls
  * Track Performance
  * Publish Reports
* **Complexity**: Medium

### 13. Analyst Dashboard
* **Features**:
  * Recommendation Creation
  * Success Tracking
  * Audit Logs
* **Complexity**: Medium

### 14. PMS Module
* **Features**:
  * Managed Portfolios
  * Investor Reports
  * Allocation Tracking
* **Complexity**: Very High

### 15. Infrastructure
* **Backend**: Node.js / Django Backend
* **Database**: MongoDB / PostgreSQL
* **Caching/Messaging**: Redis
* **Real-time**: WebSocket
* **Scheduling**: Cron Jobs
* **Queue System**: BullMQ / Celery
* **Cloud Hosting**: AWS / Azure
* **Complexity**: High

### 16. Compliance & Audit
* **Required**:
  * Recommendation History
  * Audit Trail
  * User Consent Logs
  * Disclaimer System
  * SEBI Compliance Workflows
* **Complexity**: Very High

### 17. Mobile App
* **Features**: Live Calls, Portfolio, Alerts, Watchlist, Research Reports
* **Technology**: Flutter or React Native

### 18. MVP Roadmap
* **Phase 1**:
  * Login
  * Subscription
  * Research Calls
  * Notifications
* **Phase 2**:
  * Portfolio Tracking
  * Broker Integration
  * Screeners
* **Phase 3**:
  * AI Recommendations
  * PMS
  * Advanced Analytics

### 19. Research Management System (Core of both platforms)
* **Features**:
  * Research Creation
  * Technical Analysis Notes
  * Fundamental Analysis Notes
  * Research Approval Workflow
  * Research Publishing
  * Version History
  * Research Attachments (Charts/PDFs)
* **Database Tables/Models**: `Research`, `ResearchVersion`, `ResearchAttachment`, `ResearchApproval`

### 20. Watchlist & Alert Engine
* **Features**:
  * User Watchlists
  * Price Alerts
  * Volume Alerts
  * Breakout Alerts
  * News Alerts
  * Target Hit Alerts
  * Stop Loss Alerts
* **Database Tables/Models**: `Watchlist`, `Alert`, `AlertHistory`

### 21. Trade Execution & OMS (Required for Univest-Type Platform)
* **Features**:
  * One Click Trade
  * Order Placement
  * Order Tracking
  * Position Tracking
  * Margin Validation
* **Services**: OMS (Order Management System), Execution Engine
* **Broker APIs**: Zerodha, Upstox, Angel One, Dhan, Shoonya

### 22. KYC & Demat Onboarding
* **Features**: Aadhaar Verification, PAN Verification, Digilocker Integration, CKYC, eSign
* **Required APIs**: Signzy, Karza, HyperVerge, Digilocker

### 23. Content & Learning Module
* **Features**: Blogs, Research Articles, Market News, Video Learning, Stock Education
* **Database Tables/Models**: `Blog`, `Article`, `Video`, `News`

### 24. Performance Analytics Module
* **Features**: Call Accuracy, Win Rate, ROI Tracking, Monthly Reports, Analyst Performance
* **Database Tables/Models**: `CallPerformance`, `AnalystPerformance`, `MonthlyStatistics`

### 25. AI Validation Layer (Waya Style)
* **Features**: Recommendation Validation, Risk Assessment, Confidence Score, Signal Verification
* **Services**: LLM, Rule Engine, Risk Engine

### 26. Wealth Marketplace (Univest Style)
* **Features**: Bonds, Fixed Deposits, NCDs, Wealth Products, Partner Investments

### 27. Admin Compliance Panel
* **Features**: SEBI Disclosures, Analyst Approval, Audit Logs, Recommendation Approval, Consent Management

### 28. Data Engineering Layer
* **Required Services**:
  * Market Data Collector
  * Historical Data Store
  * Tick Data Processing
  * Data Warehouse
* **Infrastructure**: Kafka (Optional), Redis, TimescaleDB, ClickHouse

---

## 2. Detailed Functionality Comparison: Univest vs. Waya

### UNIVEST
* **Business Vision**: **Investment Super App** — "Help users discover, analyze, invest, and track investments from one platform."
* **Core Focus Areas**:
  1. **Investment Ecosystem**: Stock Recommendations, Portfolio Management, Stock Screeners, Mutual Funds, SIP Tracking, IPO Analysis, F&O Trading, Commodity Research.
  2. **Portfolio Intelligence**: Portfolio health, Risk exposure, Profit/Loss analysis, Buy/Hold/Sell ratings.
  3. **Research + Technology**: AI-assisted stock discovery, Technical/Fundamental analysis tools, Automated screeners.
  4. **Trade Execution**: Broker integrations, One-click order execution, Trading workflow management.
* **Full Functionality List**:
  * User Registration, Login and KYC
  * Stock Advisory Recommendations
  * Buy / Sell / Hold Signals
  * Entry Price, Target Price and Stop Loss
  * Intraday Trading Calls
  * Short-Term Trading Calls
  * Positional Trading Calls
  * Futures & Options (F&O) Recommendations
  * Commodity Trading Recommendations
  * AI-Based Stock Recommendations
  * Stock Analysis and Research
  * Portfolio Tracking
  * Portfolio Health Analysis
  * Portfolio Profit & Loss Tracking
  * Buy-Sell-Hold Ratings for Holdings
  * Mutual Fund Tracking
  * SIP Tracking
  * IPO Analysis and Reviews
  * Stock Screeners
  * Fundamental Screeners
  * Technical Screeners
  * Breakout Stock Detection
  * Momentum Stock Detection
  * Low Debt Stock Screening
  * Dividend Opportunity Screening
  * Real-Time Market Alerts
  * Entry and Exit Alerts
  * Market News and Insights
  * Educational Content
  * Research Reports
  * Analyst Recommendations
  * Curated Stock Baskets
  * Trade Execution Integration
  * Demat Account Integration
  * Margin Calculator
  * Brokerage Integration
  * Cashback & Subscription Plans
  * Expert Portfolio Review
  * AI + Human Research Model
  * Multi-Asset Support (Stocks, F&O, Commodities, Mutual Funds)

### WAYA
* **Business Vision**: **Research Advisory Company with a Technology Platform** — "Provide high-quality research and actionable trading calls." Waya is focused on research advisory and trading recommendations, and is not trying to be a complete investing ecosystem.
* **Core Focus Areas**:
  1. **Advisory Services**: Equity Recommendations, Swing Trading Calls, Intraday Calls, Positional Calls.
  2. **F&O Trading** (A strong focus area): Option Buying Calls, Futures Calls, Nifty Strategies, Bank Nifty Strategies, F&O Alerts.
  3. **Commodity Advisory**: Gold, Silver, Crude Oil, MCX Calls.
  4. **Quantitative Research**: Statistical Models, Back-tested Strategies, Algorithmic Research, AI-assisted Validation.
  5. **PMS (Portfolio Management Services)**: Managed portfolios, Wealth management, Investment allocation.
* **Full Functionality List**:
  * User Registration and Subscription
  * Equity Advisory
  * Swing Trade Recommendations
  * Short-Term Trade Recommendations
  * Multibagger Stock Recommendations
  * Buy / Sell / Hold Recommendations
  * Stock Fundamental Analysis
  * Market Trend Analysis
  * Sectoral Trend Analysis
  * Research-Based Stock Calls
  * Technology / Quant Model Based Recommendations
  * Futures & Options Advisory
  * Index Option Calls
  * Stock Option Calls
  * Hero-Zero Option Calls
  * Intraday F&O Calls
  * BTST (Buy Today Sell Tomorrow) Calls
  * Nifty & BankNifty Strategies
  * MCX Commodity Advisory
  * Gold Trading Recommendations
  * Silver Trading Recommendations
  * Crude Oil Trading Recommendations
  * Commodity Futures Recommendations
  * Commodity Options Recommendations
  * Research Reports
  * Market Insights
  * Educational Content
  * Portfolio Management Service (PMS)
  * Long-Term Managed Portfolios
  * Weekly Market Updates
  * Monthly Market Updates
  * App-Based Advisory Delivery
  * Trade Alerts and Notifications
  * SEBI Registered Research Advisory Workflow
