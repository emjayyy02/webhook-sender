# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS, and modular vanilla JavaScript. No framework, backend, database, or deployment target for V1.

## Users

Mj is the primary user. The tool is used while building and debugging Make, n8n, and similar webhook automations.

## Product Purpose

Webhook Sender makes it faster to construct and send small webhook requests without repeatedly editing temporary scripts. Success means a user can enter an endpoint, choose a method, build a payload from key/value rows, send it, and clearly inspect the outcome.

## Positioning

A deliberately small, browser-native webhook tester focused on the payload workflow used in automation projects rather than the breadth of a general API client.

## Operating Context

The tool runs locally in a browser alongside Make or n8n. Requests are sent directly from the browser and are therefore subject to the target server's CORS policy.

## Capabilities and Constraints

- Editable webhook URL.
- GET, POST, PUT, PATCH, and DELETE methods.
- Dynamic key/value payload fields with add and remove controls.
- Automatic JSON payload construction.
- Visible HTTP status, response body, duration, loading state, and request errors.
- GET requests do not send a request body.
- No custom headers, presets, history, authentication, persistence, backend proxy, or universal CORS support in V1.

## Evidence on Hand

The implementation brief provides the V1 fields, request flow, module boundaries, default sample payload, completion criteria, and explicit scope exclusions. There are no customer claims or production benchmarks to represent.

## Product Principles

- Keep the common webhook-testing task fast and legible.
- Make failures visible and useful for debugging.
- Preserve small, understandable module boundaries.
- Avoid features and infrastructure that do not serve V1.
- Teach the request data flow through clear interface feedback and readable code.

## Accessibility & Inclusion

Use semantic controls, explicit labels, visible keyboard focus, readable status announcements, and responsive behavior suitable for desktop and mobile browsers.
