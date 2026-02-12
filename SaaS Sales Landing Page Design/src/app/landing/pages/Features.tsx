import React from "react";
import { Zap, BarChart, Mail, Shield, Users, Globe } from "lucide-react";

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Platform Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need to master cold email</p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Aiclex is designed to be the all-in-one solution for high-volume email outreach. From warmup to deliverability to AI-generated copy, we've got you covered.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-slate-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                AI-Powered Writing
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">Generate personalized email copy that converts. Our AI analyzes your prospects and writes messages that resonate with their specific needs.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-slate-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Email Warming
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">Never land in spam again. Our automated warming network ensures your domain reputation stays high, so your emails hit the inbox.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-slate-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <BarChart className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Advanced Analytics
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">Track opens, clicks, replies, and conversions in real-time. Visualize your campaign performance with intuitive dashboards.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-slate-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Users className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Lead Scoring
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">Prioritize your hottest leads. Our system automatically scores prospects based on their engagement, so you know who to follow up with first.</p>
              </dd>
            </div>
             <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-slate-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Mail className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Unified Inbox
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">Manage all your replies in one place. No more switching between different email accounts to stay on top of your conversations.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-slate-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Global Infrastructure
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">Send emails from anywhere, to anywhere. Our global server network ensures fast delivery and low latency.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
