# Role

You are a Senior Full-Stack Software Architect, DevOps Engineer, and Next.js expert.

Your job is NOT to simply answer questions—you will inspect the entire codebase, understand the architecture, implement the required changes, fix issues, verify everything works, and document every change.

You must think like a Lead Engineer responsible for delivering a production-quality architecture.

---

# Project Structure

I have two completely separate Next.js applications inside one parent directory.

project-root/
├── essence-admin/
└── mystore/

Technology Stack:

- Node.js
- Next.js
- PostgreSQL
- Shared PostgreSQL Database

The two projects are independent applications but share the same database.

mystore
---------
Customer-facing Store

essence-admin
-------------
Administration Panel

---

# Goal

I want BOTH applications to behave as ONE website.

Instead of running them separately, I should only execute ONE command.

Example:

npm run dev

or

pnpm dev

or

yarn dev

(Choose whichever package manager the projects already use.)

After running that single command:

- Store application starts
- Admin application starts
- Proxy/Gateway starts
- Everything becomes accessible from one URL.

Public URLs:

Store

http://localhost:3000/

Admin

http://localhost:3000/admin/

Examples

Store

http://localhost:3000/
http://localhost:3000/products
http://localhost:3000/cart
http://localhost:3000/categories
http://localhost:3000/checkout

Admin

http://localhost:3000/admin
http://localhost:3000/admin/login
http://localhost:3000/admin/dashboard
http://localhost:3000/admin/products
http://localhost:3000/admin/orders
http://localhost:3000/admin/users

Everything beginning with

/admin

must be served from

essence-admin

Everything else must be served from

mystore

---

# VERY IMPORTANT

DO NOT assume anything.

FIRST inspect both projects completely.

Determine:

• Next.js version
• App Router or Pages Router
• Existing startup scripts
• Existing ports
• Existing APIs
• Existing middleware
• Authentication
• Session handling
• Cookies
• Asset paths
• Images
• Fonts
• API architecture
• Environment variables
• Prisma / pg / Sequelize / Drizzle
• Existing rewrites
• Existing redirects

Check all important files including but not limited to:

package.json

next.config.js
next.config.mjs
next.config.ts

middleware.ts
middleware.js

tsconfig.json

src/

app/

pages/

public/

components/

lib/

utils/

hooks/

styles/

.env

.env.local

.env.example

Dockerfile

docker-compose.yml

README.md

---

# Architecture

I DO NOT want to manually run two terminals.

I want ONE command only.

Preferred architecture:

Parent Directory

↓

Starts both applications

↓

Starts Reverse Proxy

↓

Everything available through

localhost:3000

Example internal ports

Store

3001

Admin

3002

Gateway

3000

You may choose different ports if needed.

---

# Reverse Proxy

Implement a lightweight Node.js reverse proxy.

Express + http-proxy-middleware is perfectly acceptable.

Routing

/admin

↓

essence-admin

Everything else

↓

mystore

Support

GET

POST

PUT

PATCH

DELETE

OPTIONS

HEAD

WebSockets

Multipart uploads

Cookies

Headers

Authorization

Streaming

Redirects

---

# Next.js Configuration

Inspect both applications.

If required configure:

basePath

assetPrefix

rewrites

redirects

images

middleware

Only modify what is actually required.

Do NOT introduce unnecessary changes.

Ensure these work correctly

/admin/_next

/admin/assets

/admin/images

/admin/fonts

/admin/favicon.ico

/admin/login

/admin/dashboard

CSS

JS

Images

Fonts

must all load correctly.

---

# Authentication

Inspect authentication.

Determine whether application uses

JWT

NextAuth

Auth.js

Custom sessions

Cookies

Middleware

Protect authentication.

Do NOT break login.

Admin redirects must remain inside

/admin

For example

/admin/login

NOT

/login

---

# Shared Database

Both applications share ONE PostgreSQL database.

Inspect

.env

Database connection

Prisma schema

Database client

Do NOT create another database.

Do NOT modify schema unless absolutely necessary.

---

# API Calls

Search entire repository.

Look for

localhost

127.0.0.1

hardcoded ports

API URLs

Replace hardcoded URLs with environment variables where appropriate.

Prefer same-origin API requests whenever possible.

---

# Development Startup

From

project-root

I want

npm install

npm run dev

That's all.

The root command should

Start Store

Start Admin

Start Gateway

Display readable logs

Terminate all child processes on Ctrl+C

Terminate all child processes when one fails

Avoid orphan processes

Handle port conflicts

Provide useful startup errors

---

# Root Package

If needed create

package.json

inside

project-root

Use

concurrently

npm-run-all

or another clean solution.

The root project should only orchestrate the applications.

Do NOT merge both applications.

Do NOT convert into a monorepo unless absolutely necessary.

---

# Production

The solution must also support production.

Document production architecture.

Expected URLs

https://example.com/

https://example.com/admin/

Provide production deployment instructions.

---

# Nginx Configuration

Generate production-ready Nginx configuration.

Correctly proxy

/admin

↓

Admin

Everything else

↓

Store

Support

WebSockets

Large uploads

Headers

Forwarded headers

SSL compatibility

HTTP/2

Trailing slash handling

Avoid redirect loops.

---

# Next.js Production

Document

npm run build

npm run start

Environment variables

Production ports

Standalone output if appropriate.

---

# Process Manager

If appropriate create

PM2 ecosystem configuration

Document

Start

Restart

Stop

Logs

Only if useful.

---

# README

This is VERY IMPORTANT.

Create or completely rewrite

project-root/README.md

The README must become the complete project documentation.

Include:

# Project Overview

Explain architecture.

Explain both applications.

Explain gateway.

Explain proxy.

Explain routing.

---

# Directory Structure

Generate the COMPLETE directory structure.

Show every important folder.

For example

project-root/

├── essence-admin/
├── mystore/
├── gateway/
├── package.json
├── README.md

Expand every important directory.

Do NOT invent folders.

Use actual folders from the project.

---

# Installation

Document

Node version

npm version

Package manager

Installation

Dependencies

---

# Environment Variables

Document every required variable.

Create

.env.example

if missing.

Never expose secrets.

---

# Local Development

Explain

npm install

npm run dev

Expected ports

Expected URLs

---

# Production Deployment

Explain

npm run build

npm run start

Nginx

PM2

Server setup

Firewall

SSL

---

# Server Setup

Document everything required on server.

Ubuntu packages

Node installation

Nginx

PM2

Permissions

Environment variables

Deployment steps

Restart commands

Log locations

Health checks

---

# Troubleshooting

Document

Port already in use

Missing env

Database connection failures

Proxy failures

404s

Static assets

Next.js cache

Build errors

Authentication

---

# Testing

Verify

/

/products

/cart

/checkout

/admin

/admin/login

/admin/dashboard

Refresh works.

CSS loads.

JS loads.

Images load.

Fonts load.

Cookies work.

Sessions work.

Authentication works.

Redirects work.

No CORS issues.

No console errors.

No broken assets.

No broken links.

No redirect loops.

---

# Safety

Do NOT delete existing code.

Do NOT rewrite business logic.

Do NOT modify database schema unnecessarily.

Do NOT remove authentication.

Do NOT overwrite production configuration.

Keep changes minimal, clean, maintainable, and production-ready.

---

# Deliverables

Complete the work in these phases.

Phase 1

Analyze the codebase.

Explain current architecture.

List risks.

Recommend implementation.

Phase 2

List every file that will be modified or created.

Explain why.

Wait for confirmation ONLY if a destructive change is required. Otherwise continue.

Phase 3

Implement the solution.

Fix issues encountered.

Phase 4

Run and verify both applications.

Ensure every required route works.

Phase 5

Generate a final report containing:

- Architecture diagram
- Final folder structure
- Files changed
- Root startup command
- Internal ports
- Public URLs
- Production deployment steps
- Nginx configuration
- PM2 configuration (if applicable)
- Server setup guide
- README summary
- Rollback instructions

The final result must allow me to clone the repository, run:

npm install
npm run dev

and immediately access:

Store:
http://localhost:3000/

Admin:
http://localhost:3000/admin/

without manually starting multiple applications or making additional configuration changes.