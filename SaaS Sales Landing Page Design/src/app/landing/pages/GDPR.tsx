import React from "react";
import { CheckCircle } from "lucide-react";

export function GDPR() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">GDPR Compliance</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Aiclex is fully committed to the General Data Protection Regulation (GDPR). We believe that the protection of data privacy is a fundamental right.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-start">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">What is GDPR?</h3>
              <p className="mt-4 text-lg text-slate-600">
                The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy in the European Union (EU) and the European Economic Area (EEA). It also addresses the transfer of personal data outside the EU and EEA areas.
              </p>
              
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 mt-10">Our Commitment</h3>
              <ul className="mt-6 space-y-4">
                <li className="flex gap-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  <span className="text-slate-600">
                    <strong className="font-semibold text-slate-900">Data Processing Agreement (DPA).</strong> We offer a DPA to all our customers that clearly outlines our responsibilities as a data processor.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  <span className="text-slate-600">
                    <strong className="font-semibold text-slate-900">Right to be Forgotten.</strong> We have processes in place to delete all user data upon request, ensuring compliance with the "Right to Erasure".
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  <span className="text-slate-600">
                    <strong className="font-semibold text-slate-900">Data Portability.</strong> You can export your data from Aiclex at any time in a standard, machine-readable format.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  <span className="text-slate-600">
                    <strong className="font-semibold text-slate-900">Privacy by Design.</strong> We design our systems with privacy in mind from the ground up, minimizing data collection and ensuring secure storage.
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">Your Rights Under GDPR</h3>
              <div className="mt-6 space-y-6">
                 <div>
                    <h4 className="font-semibold text-slate-900">The Right to Access</h4>
                    <p className="mt-2 text-sm text-slate-600">You have the right to request copies of your personal data.</p>
                 </div>
                 <div>
                    <h4 className="font-semibold text-slate-900">The Right to Rectification</h4>
                    <p className="mt-2 text-sm text-slate-600">You have the right to request that we correct any information you believe is inaccurate.</p>
                 </div>
                 <div>
                    <h4 className="font-semibold text-slate-900">The Right to Erasure</h4>
                    <p className="mt-2 text-sm text-slate-600">You have the right to request that we erase your personal data, under certain conditions.</p>
                 </div>
                 <div>
                    <h4 className="font-semibold text-slate-900">The Right to Restrict Processing</h4>
                    <p className="mt-2 text-sm text-slate-600">You have the right to request that we restrict the processing of your personal data.</p>
                 </div>
                 <div>
                    <h4 className="font-semibold text-slate-900">The Right to Object to Processing</h4>
                    <p className="mt-2 text-sm text-slate-600">You have the right to object to our processing of your personal data.</p>
                 </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-600">To exercise any of these rights, please contact us at <a href="mailto:privacy@aiclex.com" className="text-blue-600 font-semibold hover:underline">privacy@aiclex.com</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
