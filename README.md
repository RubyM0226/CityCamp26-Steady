# Steady

A storm plan that adapts to a users specific needs, for Alachua County. Built for CityCamp Gainesville 2026 (Hack Day), General Civic Tech + Google Gemini API Key track.

**Live site:** https://citycamp26-storm-planner.vercel.app

## The problem

Florida's official "Get A Plan!" tool gives everyone the same information regardless of their personal situation, blank fill-in-the-box questions and emails back a generic PDF. It doesn't adapt to who's answering and that is something I wanted to highlight. Someone who relies on power-dependent medical equipment, has no car, or has a mobility limitation gets the exact same form as anyone else, with no guidance on what actually applies to them. For Alachua County residents with accessibility needs, this can cause people missing out on resources that could significantly change lives. 

## What Steady does

Steady builds a personalized storm plan from either:
- a short multiple choice question intake form
- describing your situation in your own words, parsed by Google's Gemini API into the same structured profile, with the user being able to edit the form afterwards

From there, a rules engine matches your answers against a set of plan modules (registering with the county, backup power, evacuation zones, pet plans, mobile-home-specific guidance, and more) and organizes them into four phases: **Do now**, **When a storm is coming**, **During**, and **After**. Anything left unanswered defaults to *showing* the related step rather than hiding it. If there are any error or if the alogorithm is in doubt, the plan will show more information rather than less. It is better to have useless information than necessary information be absent. 

The finished plan can be printed as a single page that works without power or internet: key phone numbers written out in full, a pack list generated from users specific needs, and space to fill in personal details by hand. Nothing personal is ever stored within the site and because the website runs in browser (with the exception of the small AI element) no personal information is saved. I am emphasizing this for internet safety.

## Accessibility first

- two ways to access information — multiple-choice questions or free-text AI parsing (no one is stuck with an interface that doesn't fit how they communicate)
- page read aloud — on-device text-to-speech (no server round-trip) reads any screen, plus individual plan steps one at a time
- adjustable text size, high-contrast mode, reduced motion, and a plain-language toggle — all live in a fixed settings panel, not buried in a menu making it always visible to users
- colorblind-safe color palette used consistently for the four plan phases — and every phase is also distinguished by icon and label, never color alone
- Atkinson Hyperlegible typeface, designed for readers with low vision
- Nothing typed into the question flow ever leaves the browser; free-text descriptions sent to Gemini for parsing are never stored

## Printable QR flyer

A dedicated flyer screen generates a QR code linking straight to the site, designed to be printed and posted in libraries, shelters, or community centers. This will connect more people to the site and connect them with resources they might not have known about otherwise. People without a way to look this up themselves can find it from a physical space and connect with the same information.

## Tech stack

- React + TypeScript (Vite)
- Tailwind CSS (version 4)
- Motion (Framer Motion) for animation, respecting `prefers-reduced-motion`
- Google Gemini API (via a Vercel serverless function) for free-text intake parsing, with all model output validated against fixed allow-lists before use
- Deployed on Vercel

## Content sources

All sources and source links were verified with up to date information.

## Running locally

  npm install
  npm run dev