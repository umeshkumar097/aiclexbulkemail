import React from "react";
import { Users, Target, Shield, Zap } from "lucide-react";

export function AboutUs() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-slate-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About Aiclex</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              We're on a mission to revolutionize email marketing for agencies through the power of artificial intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Our Mission</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                At Aiclex, we believe that email marketing shouldn't be a shot in the dark. By leveraging advanced AI algorithms, we help agencies and businesses connect with their audience more effectively, ensuring that every message sent is relevant, timely, and impactful.
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Founded in 2024, Aiclex started as a solution to a common problem: low engagement rates in cold outreach. Today, we process millions of emails daily, helping our clients achieve unprecedented growth.
              </p>
            </div>
            <div className="lg:pr-4">
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                <div className="absolute inset-0 bg-slate-900 mix-blend-multiply" />
                <div
                  className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                  aria-hidden="true"
                >
                  <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-40"
                    style={{
                      clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <blockquote className="mt-6 text-xl font-semibold leading-8 text-white">
                    <p>
                      "We built Aiclex to give agencies the unfair advantage they need in a crowded inbox."
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 text-sm leading-6 text-slate-300">
                    <strong className="font-semibold text-white">Alex Chen</strong> – Founder & CEO
                  </figcaption>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Our Values</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              These core principles guide every decision we make and every feature we build.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-slate-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Target className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Precision
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">We obsess over data accuracy and targeting precision. Every email must count.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-slate-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Customer First
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">Our roadmap is built on customer feedback. Your success is our success.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-slate-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Security
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">We protect your data with enterprise-grade security standards.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-slate-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Innovation
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">We're constantly pushing the boundaries of what's possible with AI in email.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
