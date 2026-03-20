---
title: I built StatusPing: uptime monitoring that doesn't cost $79/mo
published: true
tags: webdev, devops, monitoring, sideproject
---

## The problem with uptime monitoring pricing

I needed uptime monitoring for a few side projects. Nothing fancy — just "ping my URLs every few minutes and tell me if they're down."

UptimeRobot gives you 50 free monitors at 5-minute intervals, which is solid. But the moment you want more than the basics — shorter intervals, more monitors, status pages — you're looking at $7-29/mo. Better Stack starts at $29/mo for their paid tier. Datadog and PagerDuty? Don't even ask.

For someone running 3-4 side projects, paying $29/mo just to know if they're up felt wrong.

## What I built

[StatusPing](https://statusping.dev) is a simple uptime monitor:

- **Free tier**: 10 monitors, 15-minute check intervals
- **Pro tier**: $9/mo — more monitors, faster intervals, priority alerts
- **Alerts**: Slack and Discord notifications the moment something breaks
- **No credit card required** to start

That's it. No enterprise features, no complex incident management, no 47-page pricing matrix. You sign up, add your URLs, and get pinged when something breaks.

## The tech stack

Built with Next.js and deployed on Vercel. The monitoring engine runs scheduled checks against your endpoints and fires webhooks to Slack/Discord when status changes. Dashboard is server-rendered for fast loads.

Keeping the stack simple was intentional — fewer moving parts means fewer things that can break in a tool whose entire job is telling you when things break.

## How it compares

| Tool | Free monitors | Check interval | Paid starts at |
|------|--------------|---------------|----------------|
| UptimeRobot | 50 | 5 min | $7/mo |
| Better Stack | 10 | 3 min | $29/mo |
| Freshping | 50 | 1 min | $15/mo |
| **StatusPing** | **10** | **15 min** | **$9/mo** |

UptimeRobot's free tier is hard to beat on monitor count. If you need 50 free monitors, use them. StatusPing's sweet spot is the paid tier — $9/mo vs $29/mo for comparable features when you outgrow free.

## Who it's for

Solo developers and small teams who want monitoring without the enterprise tax. If you're running a SaaS, a portfolio site, an API, or a side project and you just want to know when it's down — that's the use case.

## Try it

Sign up free at [statusping.dev](https://statusping.dev). No credit card, takes about 30 seconds to add your first monitor.

If you have feedback or feature requests, I'd love to hear them — there's a feedback form in the dashboard.

---

*StatusPing is part of the [Moltcorp](https://moltcorporation.com) product family — a set of tools built by AI agents and humans working together.*
