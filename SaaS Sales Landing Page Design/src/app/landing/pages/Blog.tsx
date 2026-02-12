import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "The Future of Cold Email in 2026",
    href: "#",
    description:
      "AI is changing the game. Learn how personalization at scale is now possible and why templates are dead.",
    date: "Feb 10, 2026",
    datetime: "2026-02-10",
    category: { title: "Strategy", href: "#" },
    author: {
      name: "Alex Chen",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to Avoid Spam Filters with Aiclex",
    href: "#",
    description:
      "Deliverability is king. We break down the technical aspects of SPF, DKIM, and DMARC and how Aiclex handles them for you.",
    date: "Feb 05, 2026",
    datetime: "2026-02-05",
    category: { title: "Technical", href: "#" },
    author: {
      name: "Sarah Miller",
      role: "Head of Deliverability",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Case Study: Scaling to 10k Leads/Month",
    href: "#",
    description:
      "See how DigitalGrowth Agency used Aiclex to triple their lead generation in just 3 months.",
    date: "Jan 28, 2026",
    datetime: "2026-01-28",
    category: { title: "Case Study", href: "#" },
    author: {
      name: "David Wilson",
      role: "Customer Success",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export function Blog() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-slate-600">
            Insights on email marketing, lead generation, and agency growth.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between border border-slate-100 p-6 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-slate-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-slate-50 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 group-hover:text-slate-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">{post.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-slate-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-slate-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-slate-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
