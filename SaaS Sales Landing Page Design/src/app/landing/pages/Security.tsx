import React from "react";
import { Lock, ShieldCheck, Server, Key } from "lucide-react";

export function Security() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Security at Aiclex</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We take the security of your data seriously. Our platform is built on enterprise-grade infrastructure designed to protect your information at every layer.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-slate-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Lock className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Encryption
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">All data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption. We utilize industry-standard cryptographic protocols to ensure your data remains confidential.</p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-slate-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Compliance
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">We are SOC 2 Type II compliant and regularly undergo third-party audits to verify our security controls. We also comply with GDPR, CCPA, and other data privacy regulations.</p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-slate-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Server className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Infrastructure
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">Aiclex is hosted on Amazon Web Services (AWS), providing world-class physical and network security. Our servers are located in secure data centers with 24/7 monitoring.</p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-slate-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Key className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Access Control
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">We employ strict access controls, including Multi-Factor Authentication (MFA) and Role-Based Access Control (RBAC), to ensure that only authorized personnel can access sensitive data.</p>
              </dd>
            </div>

          </dl>
        </div>
        
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 sm:p-10 lg:p-12 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-white">Responsible Disclosure</h3>
            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                If you believe you have found a security vulnerability in Aiclex, please let us know right away. We appreciate your help in keeping our platform secure.
            </p>
            <div className="mt-8">
                 <a href="mailto:security@aiclex.com" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Report a Vulnerability</a>
            </div>
        </div>
      </div>
    </div>
  );
}
