import React from "react";
import { Button } from "../../components/ui/CustomButton";

export function Careers() {
  const positions = [
    {
      id: 1,
      title: "Senior Backend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Sales",
      location: "New York, NY",
      type: "Full-time",
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Contract",
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Join our team</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We're a team of passionate individuals working to redefine the future of email marketing. We value creativity, autonomy, and a growth mindset.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">Open Positions</h3>
          <div className="mt-6 border-t border-slate-200">
            <dl className="divide-y divide-slate-200">
              {positions.map((position) => (
                <div key={position.id} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 hover:bg-slate-50 transition-colors rounded-lg">
                  <dt className="text-sm font-medium leading-6 text-slate-900">
                    {position.title}
                    <div className="mt-1 text-xs text-slate-500 font-normal">{position.department}</div>
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-1 sm:mt-0">
                    {position.location} • {position.type}
                  </dd>
                  <dd className="sm:col-span-1 sm:mt-0 flex justify-end">
                    <Button variant="outline" size="sm">Apply Now</Button>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
            <p className="text-slate-600">Don't see a role that fits? <a href="mailto:careers@aiclex.com" className="text-blue-600 font-semibold hover:underline">Email us anyway.</a></p>
        </div>
      </div>
    </div>
  );
}
