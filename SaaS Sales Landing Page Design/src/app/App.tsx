import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import { PublicLayout } from "./landing/layout/PublicLayout";
import { AboutUs } from "./landing/pages/AboutUs";
import { Careers } from "./landing/pages/Careers";
import { Blog } from "./landing/pages/Blog";
import { Contact } from "./landing/pages/Contact";
import { PrivacyPolicy } from "./landing/pages/PrivacyPolicy";
import { TermsOfService } from "./landing/pages/TermsOfService";
import { GDPR } from "./landing/pages/GDPR";
import { Security } from "./landing/pages/Security";
import { Features } from "./landing/pages/Features";
import { PricingPage } from "./landing/pages/PricingPage";
import { Integrations } from "./landing/pages/Integrations";
import { Changelog } from "./landing/pages/Changelog";

import { AuthLayout } from "./auth/AuthLayout";
import { LoginPage } from "./auth/LoginPage";
import { RegisterPage } from "./auth/RegisterPage";

import { DashboardLayout } from "./dashboard/DashboardLayout";
import { AdminLayout } from "./dashboard/AdminLayout";
import { Overview } from "./dashboard/pages/Overview";
import { Campaigns } from "./dashboard/pages/Campaigns";
import { Analytics } from "./dashboard/pages/Analytics";
import { HotLeads } from "./dashboard/pages/HotLeads";
import { Settings } from "./dashboard/pages/Settings";
import { Subscription } from "./dashboard/pages/Subscription";
import { Admin } from "./dashboard/pages/Admin";
import { BlogManager } from "./dashboard/pages/admin/BlogManager";
import { Integrations as DashboardIntegrations } from "./dashboard/pages/Integrations";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route element={<PublicLayout />}>
          <Route path="about-us" element={<AboutUs />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="gdpr" element={<GDPR />} />
          <Route path="security" element={<Security />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="changelog" element={<Changelog />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="leads" element={<HotLeads />} />
          <Route path="integrations" element={<DashboardIntegrations />} />
          <Route path="settings" element={<Settings />} />
          <Route path="subscription" element={<Subscription />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="users" element={<Admin />} />
          <Route path="blogs" element={<BlogManager />} />
          <Route path="logs" element={<Admin />} />
          <Route path="database" element={<Admin />} />
          <Route path="settings" element={<Admin />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
