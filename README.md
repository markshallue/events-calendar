# 📅 Events Calendar

**A flexible, responsive, and feature-rich calendar component for modern React applications.**  
Fully written in TypeScript, easy to customize, and designed for event-heavy UIs.

## ✨ Features

- **Day, week, month and year views**
- **Responsive layout** with smart event overflow handling
- **Click & drag to create** new events
- **Dark mode ready**
- **Context menus and popovers** for managing events
- **Supports timed and all-day events**
- **Multi-day and overlapping events**
- Fully **typed API** with autocompletion and IntelliSense support

## 📦 Installation

Install the package with your package manager of choice:

```bash
# npm
npm install events-calendar

# yarn
yarn add events-calendar

# pnpm
pnpm add events-calendar
```

## ⚡ Quick Start

💡 **Important:**  
The calendar expands to fill its parent container. Make sure the parent has a defined height.

```tsx
import { EventsCalendar } from 'events-calendar';

// Import CSS
import 'events-calendar/styles.css'

export function MyCalendar() {
  return (
    <div style={{ height: '560px' }}>
      <EventsCalendar events={[{ title: 'My first event!', end: new Date() }]} />
    </div>
  );
}
```

## 📖 Documentation

For full documentation, see the [official docs](https://events-calendar-beta.vercel.app/getting-started).
