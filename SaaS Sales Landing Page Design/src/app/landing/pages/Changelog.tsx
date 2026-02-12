import React from "react";

export function Changelog() {
  const changes = [
    {
      date: "February 10, 2026",
      version: "v2.1.0",
      title: "New AI Engine & Dashboard Redesign",
      description: "We've completely overhauled our AI engine for better personalization and updated the dashboard for a smoother user experience.",
      type: "Major",
      details: [
        "Introduced GPT-5 based personalization engine.",
        "Redesigned dashboard with drag-and-drop widgets.",
        "Fixed issue with SES credential validation.",
        "Improved mobile responsiveness."
      ]
    },
    {
      date: "January 25, 2026",
      version: "v2.0.5",
      title: "Lead Scoring Improvements",
      description: "Fine-tuned the lead scoring algorithm to better predict conversion likelihood.",
      type: "Minor",
      details: [
        "Updated lead scoring weights.",
        "Added manual lead score override.",
        "Fixed minor bugs in campaign reporting."
      ]
    },
    {
      date: "January 10, 2026",
      version: "v2.0.0",
      title: "Integrations & API",
      description: "Added support for HubSpot and Salesforce integrations, plus a new public API.",
      type: "Major",
      details: [
        "Bi-directional sync with HubSpot.",
        "Salesforce CRM integration.",
        "Public API for campaign management.",
        "New documentation site launched."
      ]
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Changelog</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Keep track of all the updates, improvements, and fixes we make to Aiclex.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <ol className="relative border-l border-slate-200 dark:border-slate-700">
            {changes.map((change, index) => (
              <li key={index} className="mb-10 ml-6">
                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white ${change.type === 'Major' ? 'bg-blue-600' : 'bg-slate-200'}`}>
                  <svg aria-hidden="true" className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">
                    {change.title} 
                    <span className={`bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3 ${change.type === 'Major' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>{change.version}</span>
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-slate-400">{change.date}</time>
                <p className="mb-4 text-base font-normal text-slate-500">{change.description}</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-500 text-sm">
                    {change.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                    ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
