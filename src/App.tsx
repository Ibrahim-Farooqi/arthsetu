import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DashboardLayout } from './layouts/DashboardLayout';

import { ProtectedRoute } from './components/routing/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { ProductsPage } from './pages/landing/ProductsPage';
import { AiResearchPage } from './pages/landing/AiResearchPage';
import { PricingPage } from './pages/landing/PricingPage';
import { AboutPage } from './pages/landing/AboutPage';
import { ContactPage } from './pages/landing/ContactPage';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import AnalystDashboard from './pages/admin/AnalystDashboard';
import Pricing from './pages/Pricing';
import InvestorPersonalization from './components/molecules/InvestorPersonalization';
import { OnboardingFlowContainer } from './pages/onboarding/OnboardingFlowContainer';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/ai-research" element={<AiResearchPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes (Now Public) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/pricing" element={<DashboardLayout><Pricing /></DashboardLayout>} />
            <Route path="/analyst" element={<DashboardLayout><AnalystDashboard /></DashboardLayout>} />
            <Route path="/personalization" element={<InvestorPersonalization />} />
            <Route path="/onboarding" element={<OnboardingFlowContainer />} />
          </Route>
          
          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
