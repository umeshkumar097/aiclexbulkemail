import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../../components/ui/CustomButton";

export function Contact() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Have questions about Aiclex? We're here to help. Reach out to our team for support, sales inquiries, or just to say hello.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          
          <div className="grid grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2">
            <div>
              <h3 className="border-l-4 border-blue-600 pl-4 font-semibold text-slate-900">Support</h3>
              <address className="border-l-4 border-transparent pl-4 pt-2 not-italic text-slate-600">
                <p>Need technical assistance?</p>
                <p>
                    <a href="mailto:support@aiclex.com" className="hover:text-blue-600">support@aiclex.com</a>
                </p>
              </address>
            </div>
            <div>
              <h3 className="border-l-4 border-blue-600 pl-4 font-semibold text-slate-900">Sales</h3>
              <address className="border-l-4 border-transparent pl-4 pt-2 not-italic text-slate-600">
                <p>Interested in our enterprise plans?</p>
                <p>
                    <a href="mailto:sales@aiclex.com" className="hover:text-blue-600">sales@aiclex.com</a>
                </p>
              </address>
            </div>
            <div>
              <h3 className="border-l-4 border-blue-600 pl-4 font-semibold text-slate-900">Headquarters</h3>
              <address className="border-l-4 border-transparent pl-4 pt-2 not-italic text-slate-600">
                <p>123 Innovation Drive</p>
                <p>San Francisco, CA 94105</p>
              </address>
            </div>
             <div>
              <h3 className="border-l-4 border-blue-600 pl-4 font-semibold text-slate-900">Phone</h3>
              <address className="border-l-4 border-transparent pl-4 pt-2 not-italic text-slate-600">
                <p>Mon-Fri 9am to 6pm PST</p>
                <p>+1 (555) 123-4567</p>
              </address>
            </div>
          </div>

          <form action="#" method="POST" className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-slate-900">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-slate-900">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button type="submit" variant="primary">
                Send message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
