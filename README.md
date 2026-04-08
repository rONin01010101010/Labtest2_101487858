# 101487858-lab-test2-comp3133

**Student ID:** 101487858  
**Course:** COMP 3133 – Full Stack Development II  
**Lab Test 2 – SpaceX Mission Theme (Version 2a)**

Angular application displaying SpaceX mission launches using the SpaceX REST API v3.

---

## Known Issues

### Issue 1: Blank Screen on Load (NG8103)

The app loads but displays nothing — a completely blank page after the toolbar renders. Angular 21 standalone components require `NgIf`/`NgFor` or `CommonModule` to be explicitly listed in each component's `imports` array when using legacy structural directives `*ngIf` and `*ngFor`. Without them, Angular silently skips rendering all conditional and repeated elements with no hard error thrown.

Angular compiler warning: **NG8103**
```
The `*ngIf` directive was used in the template, but neither the `NgIf` directive
nor the `CommonModule` was imported.
```

---

### Issue 2: Slow Initial Load

Angular Material components are slow to appear on first load. `provideAnimationsAsync()` lazy-loads the entire Angular animations module as a separate async chunk. Angular Material components depend on this module before they can render, blocking the entire UI until the async chunk downloads and initializes.

---

### Issue 3: Slow API Response (All 111 Launches at Once)

The mission list takes several seconds to render. The initial API call fetches all 111 launches in one request (~417 KB of JSON) with no pagination, then triggers 111 simultaneous image requests for mission patch images.

API response stats:
- Endpoint: `https://api.spacexdata.com/v3/launches`
- Payload size: ~417 KB
- Total launches returned: 111
- API response time: ~67ms (API itself is fast — rendering is the bottleneck)

---

## Features

- **Mission List** — list of SpaceX launches, click any card to view details
- **Filter by Year** — filter missions by launch year using year buttons
- **Mission Details** — full details for a selected mission including rocket info, launch site, links to article, Wikipedia, and video

## API

Uses the SpaceX REST API v3 (deprecated Nov 2020, still functional):
- All launches: `GET /v3/launches`
- Filter by year: `GET /v3/launches?launch_year=YEAR`
- Mission details: `GET /v3/launches/:flight_number`

## Running Locally

```bash
npm install
ng serve
```

Open `http://localhost:4200`
