var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// package/EventsCalendar.tsx
import { useMemo as useMemo5, useRef as useRef7 } from "react";

// package/EventsCalendar.module.css
var EventsCalendar_default = {};

// package/components/event/Event.tsx
import { useRef as useRef2 } from "react";

// package/components/event/Event.module.css
var Event_default = {};

// package/utils/setTime.ts
function setTime(date, time) {
  return date.hour(time.hour()).minute(time.minute());
}

// package/utils/constants.ts
var CALENDAR_VIEWS = ["year", "month", "week", "day"];
var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var DAY_LABELS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];
var DAYS_IN_FULL_MONTH = 42;
var DEFAULT_COLOR = "#0ea5e9";
var HOURS = [
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM"
];

// package/utils/isBetween.ts
function isBetween(date, testStart, testEnd, startOnly = false) {
  return date.isAfter(testStart) && date.isBefore(testEnd) || date.isSame(testStart, "d") || (startOnly ? false : date.isSame(testEnd, "d"));
}

// package/utils/hasOverlap.ts
function hasOverlap(start1, end1, start2, end2) {
  return isBetween(start1, start2, end2) || isBetween(start2, start1, end1) || isBetween(end2, start1, end1);
}

// package/utils/updateEvent.ts
function updateEvent({ state, dispatch, date, view }) {
  const timeScale = view === "month" ? "day" : "minute";
  if (state.dragStartOffset === null) {
    const dateDiff = date.diff(state.clickedEvent.start, timeScale);
    dispatch({ type: "update_event", dragStartOffset: dateDiff });
    return;
  }
  const { start, end, startTime, endTime } = state.clickedEvent;
  const newStart = date.subtract(state.dragStartOffset, timeScale);
  const increment = end.diff(start, timeScale);
  const newEnd = newStart.add(increment, timeScale);
  if (view !== "month" && !newStart.isSame(newEnd, "day")) return;
  dispatch({
    type: "update_event",
    event: __spreadProps(__spreadValues({}, state.placeholderEvent), {
      start: view === "month" ? newStart.hour(start.hour()).minute(start.minute()) : newStart,
      end: view === "month" ? newEnd.hour(end.hour()).minute(end.minute()) : newEnd,
      startTime: view === "month" ? startTime : newStart.format("h:mma"),
      endTime: view === "month" ? endTime : newEnd.format("h:mma")
    })
  });
}

// package/utils/getTimeDiff.ts
function getTimeDiff(dt1, dt2) {
  const mins1 = dt1.hour() * 60 + dt1.minute();
  const mins2 = dt2.hour() * 60 + dt2.minute();
  return mins2 - mins1;
}

// package/utils/getTimeLabel.ts
function getTimeLabel(event, timeDuration) {
  if (!event.start || !event.end) return "";
  const leadingComma = timeDuration <= 30 ? ", " : "";
  return event.start.isBefore(event.end) ? `${leadingComma}${event.start.format("h:mma")} - ${event.end.format("h:mma")}` : `${leadingComma}${event.end.format("h:mma")} - ${event.start.format("h:mma")}`;
}

// package/utils/filterByWeek.ts
function filterByWeek(array, weekStartDate) {
  const weekEndDate = weekStartDate.add(6, "d");
  return array.filter(({ start, end }) => {
    const eventEnd = end || start;
    return hasOverlap(weekStartDate, weekEndDate, start, eventEnd);
  });
}

// package/utils/filterByDate.ts
function filterByDate(data, date) {
  return data.filter(({ start, end }) => isBetween(date, start, end));
}

// package/utils/filterByView.ts
function filterByView(array, activeDate, view) {
  const unit = view === "year" ? "year" : "month";
  const filterStart = activeDate.startOf(unit).day(0);
  const filterEnd = activeDate.endOf(unit).day(6);
  return array.filter(({ start, end }) => hasOverlap(filterStart, filterEnd, start, end));
}

// package/utils/parseRawEvents.ts
import dayjs from "dayjs";
var getDayjs = (rawDate, timeString) => {
  const formatted = timeString.replace(/.{2}$/, " $&").toUpperCase();
  return dayjs(`${rawDate.format("DD-MMM-YYYY")} ${formatted}`);
};
function parseRawEvents(events) {
  return events.filter((event) => event.start || event.end).map((event, index) => {
    var _a, _b;
    let dayjsStart = event.start ? dayjs(event.start) : dayjs(event.end);
    if (event.startTime) {
      dayjsStart = getDayjs(dayjsStart, event.startTime);
    }
    let dayjsEnd = event.end ? dayjs(event.end) : dayjsStart;
    if (event.startTime || event.endTime || event.isAllDay === false) {
      if (!event.startTime && !event.endTime) {
        dayjsEnd = dayjsStart.add(1, "hour");
      } else if (event.endTime) {
        dayjsEnd = getDayjs(dayjsEnd, event.endTime);
      } else {
        dayjsEnd = getDayjs(dayjsEnd, event.startTime).add(1, "hour");
      }
    }
    const parsedEvent = __spreadProps(__spreadValues({}, event), {
      id: (_a = event.id) != null ? _a : index,
      title: (_b = event.title) != null ? _b : "",
      start: dayjsStart,
      end: dayjsEnd,
      isAllDay: event.isAllDay !== false
    });
    return parsedEvent;
  });
}

// package/utils/getVisibleEvents.ts
function getVisibleEvents(data, date, maxEvents, isInDayHeader) {
  return data.filter(
    ({ order, start }) => order < maxEvents && (isInDayHeader || date.day() === 0 || date.isSame(start, "day"))
  );
}

// package/utils/arrangeWeekEvents.ts
function calendarSort(weekEventsArray) {
  const clone = [...weekEventsArray];
  return clone.sort((a, b) => {
    const a_lengthInDays = a.end.diff(a.start, "day") + 1;
    const b_lengthInDays = b.end.diff(b.start, "day") + 1;
    if (a_lengthInDays > b_lengthInDays) return -1;
    if (a_lengthInDays < b_lengthInDays) return 1;
    if (a.start.isBefore(b.start, "day")) return -1;
    if (b.start.isBefore(a.start, "day")) return 1;
    if (a.isAllDay && !b.isAllDay) return -1;
    if (!a.isAllDay && b.isAllDay) return 1;
    return 0;
  });
}
function findAvailableSlot(overlappingSlots) {
  let slot = 0;
  while (overlappingSlots.has(slot)) slot++;
  return slot;
}
function arrangeWeekEvents(weekEventsArray) {
  if (weekEventsArray.length < 2) return weekEventsArray.map((event) => __spreadValues({}, __spreadProps(__spreadValues({}, event), { order: 0, indent: 0 })));
  const sortedWeekEvents = calendarSort(weekEventsArray);
  const [firstEvent, ...followingEvents] = sortedWeekEvents;
  const orderedArray = [__spreadProps(__spreadValues({}, firstEvent), { order: 0, indent: 0 })];
  followingEvents.forEach((testEvent) => {
    const testStart = testEvent.start;
    const testEnd = testEvent.end || testStart;
    const overlappingSlots = /* @__PURE__ */ new Set();
    for (const placedEvent of orderedArray) {
      const placedStart = placedEvent.start;
      const placedEnd = placedEvent.end || placedStart;
      if (hasOverlap(testStart, testEnd, placedStart, placedEnd)) {
        overlappingSlots.add(placedEvent.order);
      }
    }
    const eventOrder = findAvailableSlot(overlappingSlots);
    orderedArray.push(__spreadProps(__spreadValues({}, testEvent), { order: eventOrder, indent: 0 }));
  });
  return orderedArray;
}

// package/state/EMPTY_EVENT.tsx
import dayjs2 from "dayjs";
var EMPTY_EVENT = {
  id: null,
  dragId: null,
  title: "Untitled",
  groups: [],
  start: dayjs2(),
  end: dayjs2(),
  startTime: void 0,
  endTime: void 0,
  isActive: false,
  isAllDay: true,
  indent: 0,
  order: 0
};

// package/utils/returnValidStartEnd.ts
function returnValidStartEnd(start, end) {
  return !end ? [start, start] : start.isSame(end) || start.isBefore(end) ? [start, end] : [end, start];
}

// package/utils/getPlaceholderEvent.ts
var getPlaceholderEvent = (start, end, isTimeEntry, isInitialisation) => {
  const [validStart, validEnd] = returnValidStartEnd(start, end);
  const eventEnd = isInitialisation && isTimeEntry ? validStart.add(15, "minute") : validEnd;
  const updatedEvent = __spreadProps(__spreadValues({}, EMPTY_EVENT), {
    id: null,
    start: validStart,
    end: eventEnd,
    isActive: true,
    isAllDay: isTimeEntry ? false : true,
    startTime: isTimeEntry ? validStart.format("h:mma") : void 0,
    endTime: isTimeEntry ? eventEnd.format("h:mma") : void 0,
    order: isTimeEntry ? 100 : 0
  });
  return updatedEvent;
};

// package/utils/arrangeWeekdayEvents.ts
function sortByStart(array) {
  if (array.length < 2) return array;
  return array.sort((a, b) => {
    const timeDiff = getTimeDiff(a.start, b.start);
    return timeDiff > 0 ? -1 : timeDiff < 0 ? 1 : 0;
  });
}
function overlapsStart(test_start, main_start, main_end) {
  return test_start.isSame(main_start) || test_start.isAfter(main_start) && test_start.isBefore(main_end);
}
function arrangeWeekdayEvents(dayEvents, date) {
  if (dayEvents.length < 2) return dayEvents.map((event) => __spreadProps(__spreadValues({}, event), { order: 0, indent: 0 }));
  const sortedEvents = sortByStart(dayEvents);
  const [firstEvent, ...followingEvents] = sortedEvents;
  const orderedArray = [__spreadProps(__spreadValues({}, firstEvent), { order: 0, indent: 0 })];
  followingEvents.forEach((testEvent, index) => {
    const tempStart_test_event = setTime(date, testEvent.start);
    let eventIndent = 0;
    orderedArray.forEach((currEvent) => {
      const tempStart_curr_event = setTime(date, currEvent.start);
      const tempEnd_curr_event = setTime(date, currEvent.end);
      if (overlapsStart(tempStart_test_event, tempStart_curr_event, tempEnd_curr_event)) {
        eventIndent += 1;
      }
    });
    orderedArray.push(__spreadProps(__spreadValues({}, testEvent), { order: index + 1, indent: eventIndent }));
  });
  return orderedArray;
}

// package/utils/getBackgroundFromGroups.ts
function getBackgroundFromGroups(groups) {
  var _a;
  const colors = (_a = groups == null ? void 0 : groups.map((g) => g.color).filter(Boolean)) != null ? _a : [];
  if (!colors.length) return { backgroundColor: DEFAULT_COLOR };
  if (colors.length === 1) return { backgroundColor: colors[0] };
  const increment = 100 / colors.length;
  const values2 = colors.map((color, i) => `${color} ${increment * i}% ${increment * i + increment}%`).join(", ");
  return { backgroundImage: `-webkit-linear-gradient(-30deg,${values2})` };
}

// package/hooks/useMouseEvent.tsx
var updatePlaceholder = ({
  isTimeEvent,
  firstClickDate,
  start,
  date,
  dispatch
}) => {
  if (isTimeEvent) {
    const tempStart = getTimeDiff(firstClickDate, date) < 0 ? returnValidStartEnd(start, firstClickDate.add(15, "minute"))[1] : firstClickDate;
    const tempEnd = start.hour(date.hour()).minute(date.minute());
    if (Math.abs(getTimeDiff(tempStart, date)) >= 15) {
      const updatedEvent = getPlaceholderEvent(tempStart, tempEnd, true);
      dispatch({ type: "update_event", event: updatedEvent });
    }
  } else {
    const updatedEvent = getPlaceholderEvent(firstClickDate, date);
    dispatch({ type: "update_event", event: updatedEvent });
  }
};
var useMouseEvent = ({ enableDragCreation, dispatch, state, onEventCreate }) => {
  if (!enableDragCreation) {
    return (e) => {
      if (e.type === "mousedown") dispatch({ type: "reset_calendar" });
    };
  }
  const openPopover = () => dispatch({ type: "open_popover" });
  const reset = () => dispatch({ type: "reset_calendar" });
  const mouseEventHandler = (e, date, isTimeEvent, placeholderRef) => {
    const { dragActive, firstClickDate, placeholderEvent } = state;
    const { start } = placeholderEvent;
    if (e.button !== 0) {
      if (dragActive) dispatch({ type: "event_create_stop" });
      return;
    }
    switch (e.type) {
      case "mousedown": {
        if (state.eventAnchor || state.overflowIsOpen) {
          dispatch({ type: "reset_calendar" });
          return;
        }
        const updatedEvent = getPlaceholderEvent(date, date, isTimeEvent, true);
        dispatch({ type: "event_create_start", date, event: updatedEvent, anchor: placeholderRef.current });
        break;
      }
      case "mouseenter": {
        if (e.buttons !== 1 || !dragActive || !firstClickDate) return;
        updatePlaceholder({ isTimeEvent, firstClickDate, start, date, dispatch });
        break;
      }
      case "mouseup": {
        if (!dragActive) return;
        onEventCreate && onEventCreate({
          clickedEvent: state.clickedEvent,
          newEvent: state.placeholderEvent,
          eventRef: placeholderRef.current,
          openPopover,
          reset
        });
        dispatch({ type: "event_create_end", anchor: placeholderRef.current });
      }
    }
  };
  return mouseEventHandler;
};

// package/hooks/useElementSize.tsx
import { useEffect, useMemo, useRef, useState } from "react";
var defaultState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};
function useResizeObserver(options) {
  const frameID = useRef(0);
  const ref = useRef(null);
  const [rect, setRect] = useState(defaultState);
  const observer = useMemo(
    () => typeof window !== "undefined" ? new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        cancelAnimationFrame(frameID.current);
        frameID.current = requestAnimationFrame(() => {
          if (ref.current) {
            setRect(entry.contentRect);
          }
        });
      }
    }) : null,
    []
  );
  useEffect(() => {
    if (ref.current) {
      observer == null ? void 0 : observer.observe(ref.current, options);
    }
    return () => {
      observer == null ? void 0 : observer.disconnect();
      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, [ref.current]);
  return [ref, rect];
}
function useElementSize(options) {
  const [ref, { width, height }] = useResizeObserver(options);
  return { ref, width, height };
}

// package/hooks/useCalendarEvent.tsx
import { useState as useState2 } from "react";
import { useFloating, flip, offset, shift, useDismiss, useInteractions } from "@floating-ui/react";
function useCalendarEvent({
  dispatch,
  event,
  isInOverflow,
  hasContextMenu,
  state
}) {
  var _a;
  const [contextIsOpen, setContextIsOpen] = useState2(false);
  const closeContextMenu = () => setContextIsOpen(false);
  const isActive = event.id !== null && ((_a = state.clickedEvent) == null ? void 0 : _a.id) === event.id;
  const { refs, floatingStyles, context } = useFloating({
    open: contextIsOpen,
    onOpenChange: setContextIsOpen,
    middleware: [
      offset({ mainAxis: 5, alignmentAxis: 4 }),
      flip({
        fallbackPlacements: ["left-start"]
      }),
      shift({ padding: 10 })
    ],
    placement: "right-start"
    // strategy: 'fixed',
    // whileElementsMounted: autoUpdate,
  });
  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss]);
  const handleContextMenu = (e, eventRef) => {
    if (!hasContextMenu) return;
    e.preventDefault();
    if (state.popoverIsOpen || state.overflowIsOpen && !isInOverflow) return;
    refs.setPositionReference({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: e.clientX,
          y: e.clientY,
          top: e.clientY,
          right: e.clientX,
          bottom: e.clientY,
          left: e.clientX
        };
      }
    });
    dispatch({ type: "open_context_menu", event, anchor: eventRef.current });
    setContextIsOpen(true);
  };
  return {
    handleContextMenu,
    isActive,
    contextIsOpen,
    refs,
    floatingStyles,
    getFloatingProps,
    closeContextMenu
  };
}

// package/hooks/useEventsCalendar.tsx
import dayjs3 from "dayjs";
import { useEffect as useEffect2, useReducer, useState as useState3 } from "react";

// package/state/DEFAULT_STATE.tsx
var DEFAULT_STATE = {
  // View/edit event
  clickedEvent: EMPTY_EVENT,
  popoverIsOpen: false,
  eventAnchor: null,
  // Drag creation
  dragActive: false,
  firstClickDate: null,
  placeholderEvent: EMPTY_EVENT,
  // Event Drag & drop
  dragStartOffset: null,
  eventDragActive: false,
  // Overflow Popover
  overflowAnchor: null,
  overflowIsOpen: false
};

// package/state/reducer.tsx
function reducer(state, action) {
  var _a;
  switch (action.type) {
    // Reset to deafult state
    case "reset_calendar": {
      return DEFAULT_STATE;
    }
    // Overflow
    case "open_overflow": {
      return __spreadProps(__spreadValues(__spreadValues({}, state), DEFAULT_STATE), {
        overflowIsOpen: true,
        overflowAnchor: action.anchor || state.overflowAnchor
      });
    }
    // Popover
    case "open_popover": {
      return __spreadProps(__spreadValues({}, state), {
        popoverIsOpen: true
      });
    }
    // Context menu
    case "open_context_menu": {
      return __spreadProps(__spreadValues({}, state), {
        clickedEvent: action.event || state.clickedEvent,
        eventAnchor: action.anchor || state.eventAnchor
      });
    }
    // Calendar event interaction
    case "set_clicked_event": {
      return __spreadProps(__spreadValues({}, state), {
        clickedEvent: action.event || state.clickedEvent,
        eventAnchor: action.anchor || state.eventAnchor,
        placeholderEvent: EMPTY_EVENT
      });
    }
    // Update event
    case "update_event": {
      return __spreadProps(__spreadValues({}, state), {
        dragStartOffset: (_a = action.dragStartOffset) != null ? _a : state.dragStartOffset,
        placeholderEvent: __spreadProps(__spreadValues(__spreadValues({}, state.placeholderEvent), action.event), { id: null })
      });
    }
    // Drag creation
    case "event_create_start": {
      return __spreadProps(__spreadValues({}, state), {
        dragActive: true,
        firstClickDate: action.date || state.firstClickDate,
        placeholderEvent: __spreadProps(__spreadValues(__spreadValues({}, state.placeholderEvent), action.event), { isActive: true }),
        eventAnchor: action.anchor || state.eventAnchor
      });
    }
    case "event_create_end": {
      return __spreadProps(__spreadValues({}, state), {
        dragActive: false,
        firstClickDate: null,
        placeholderEvent: __spreadProps(__spreadValues({}, state.placeholderEvent), { isActive: true }),
        eventAnchor: action.anchor || state.eventAnchor
      });
    }
    case "event_create_stop": {
      return __spreadProps(__spreadValues({}, state), {
        dragActive: false,
        firstClickDate: null,
        clickedEvent: EMPTY_EVENT,
        placeholderEvent: EMPTY_EVENT,
        eventDragActive: false
      });
    }
    // Event drag & drop rescheduling
    case "event_reschedule_start": {
      return __spreadProps(__spreadValues({}, state), {
        eventDragActive: true,
        clickedEvent: action.event || state.clickedEvent,
        placeholderEvent: __spreadProps(__spreadValues(__spreadProps(__spreadValues({}, state.placeholderEvent), {
          order: 0
        }), action.event), {
          id: null,
          isActive: true
        })
      });
    }
    case "event_reschedule_end": {
      return __spreadProps(__spreadValues({}, state), {
        eventDragActive: false,
        dragStartOffset: null,
        eventAnchor: action.anchor || state.eventAnchor
      });
    }
    default:
      console.log(`Invalid action type ${action.type} passed to calendar reducer`);
      return state;
  }
}

// package/hooks/useEventsCalendar.tsx
function useEventsCalendar({
  isInitialised = false,
  initialDate = dayjs3(),
  initialView = "month",
  closeOnClickOutside = true
} = {}) {
  const [activeDate, setActiveDate] = useState3(dayjs3(initialDate));
  const [view, setView] = useState3(initialView);
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  useEffect2(() => {
    if (!closeOnClickOutside || isInitialised) return;
    const handleClose = () => dispatch({ type: "reset_calendar" });
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [dispatch, isInitialised, closeOnClickOutside]);
  return {
    activeDate,
    setActiveDate,
    view,
    setView,
    state,
    dispatch
  };
}

// package/hooks/useInitEventsCalendar.tsx
function useInitEventsCalendar(calendar) {
  const isInitialised = !!calendar;
  const defaultCalendar = useEventsCalendar({ isInitialised });
  return calendar || defaultCalendar;
}

// package/components/event/TimeEvent.module.css
var TimeEvent_default = {};

// package/components/event/TimeEvent.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function TimeEvent({ event, isCompact }) {
  var _a, _b;
  const { title, start, groups } = event;
  const colorStyles = getBackgroundFromGroups(groups);
  const eventColors = (_a = groups == null ? void 0 : groups.map((g) => g.color).filter(Boolean)) != null ? _a : [];
  const borderStyle = { border: `1px solid ${(_b = eventColors[0]) != null ? _b : DEFAULT_COLOR}` };
  return /* @__PURE__ */ jsxs("div", { className: `${TimeEvent_default.timeContainer}`, "data-sm": isCompact, style: borderStyle, children: [
    /* @__PURE__ */ jsx("div", { className: `${TimeEvent_default.timeDot}`, style: colorStyles }),
    /* @__PURE__ */ jsx("div", { className: `${TimeEvent_default.timeText}`, children: start.format("h:mma") }),
    /* @__PURE__ */ jsx("span", { className: `${TimeEvent_default.timeLabel}`, children: title })
  ] });
}

// package/components/event/AllDayEvent.module.css
var AllDayEvent_default = {};

// package/components/event/utils/getClipPath.ts
var getClipPath = (overflowArrows) => {
  switch (overflowArrows) {
    case "both":
      return "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)";
    case "left":
      return "polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0% 50%)";
    case "right":
      return "polygon(0% 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%)";
    case "none":
      return void 0;
    default:
      return void 0;
  }
};

// package/components/event/utils/getEventStyles.ts
var getEventStyles = (isInOverflow, event, date, isCompact, isInWeekHeader, isInDayHeader) => {
  if (isInOverflow) return { width: "100%" };
  const weekStart = event.start.isSame(date, "w") ? event.start.day() : 0;
  const weekEnd = event.end.isSame(date, "w") ? event.end.day() : 6;
  const styles = {
    position: "absolute",
    left: isInDayHeader ? "0.125rem" : `calc(${weekStart * 100 / 7}% + 0.125rem)`,
    top: `calc(${isInDayHeader ? 4 : isCompact ? 24 : 26}px + ${event.order * (isCompact ? 21 : 22)}px + ${isInWeekHeader ? 6 : 0}px)`,
    width: isInDayHeader ? "calc(100% - 6px)" : `calc(${100 * (1 + (weekEnd - weekStart)) / 7}% - 0.25rem - 1px)`
  };
  return styles;
};

// package/components/event/utils/isBeingDragged.ts
function isBeingDragged(state, event) {
  return !event.isActive && event.id === state.placeholderEvent.dragId;
}

// package/components/event/utils/getOverflowArrows.ts
var getOverflowArrows = (isInOverflow, date, start, end, minMaxDatesInView) => {
  const showLeftArrow = isInOverflow ? start.isBefore(date, "day") : !!(minMaxDatesInView == null ? void 0 : minMaxDatesInView.first) && start.isBefore(minMaxDatesInView.first, "day");
  const showRightArrow = isInOverflow ? end.isAfter(date, "day") : !!(minMaxDatesInView == null ? void 0 : minMaxDatesInView.last) && end.isAfter(minMaxDatesInView.last, "day");
  return showLeftArrow && showRightArrow ? "both" : showLeftArrow ? "left" : showRightArrow ? "right" : "none";
};

// package/components/event/utils/getWeekOrDayEventStyles.ts
var getWeekOrDayEventStyles = (event, timeDuration, dayIndex, overlapOffset, isActive) => {
  const timeColumnOffset = dayIndex === 0 ? 6 : 0;
  return __spreadValues({
    gridColumnStart: dayIndex + 1,
    gridRowStart: event.start && event.start.hour() * 4 + Math.round(event.start.minute() / 15) + 1,
    gridRowEnd: event.end && event.end.hour() * 4 + Math.round(event.end.minute() / 15) + 1,
    height: 12 * ((timeDuration || 60) / 15) - 2,
    borderWidth: event.indent > 0 ? timeDuration > 30 ? "1px" : "0.5px" : 0,
    marginLeft: overlapOffset * event.indent + timeColumnOffset,
    width: `calc(100% - ${overlapOffset * (event.indent + 1) + timeColumnOffset}px)`,
    zIndex: isActive ? 100 : 1 + event.order
  }, getBackgroundFromGroups(event.groups));
};

// package/components/event/AllDayEvent.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function AllDayEvent({ date, event, minMaxDatesInView, isCompact, isInOverflow }) {
  const overflowArrows = getOverflowArrows(isInOverflow, date, event.start, event.end, minMaxDatesInView);
  const clipPath = getClipPath(overflowArrows);
  const colorstyles = getBackgroundFromGroups(event.groups);
  return /* @__PURE__ */ jsx2("div", { className: AllDayEvent_default.container, style: __spreadProps(__spreadValues({}, colorstyles), { clipPath }), children: /* @__PURE__ */ jsx2("div", { className: AllDayEvent_default.content, "data-sm": isCompact, children: /* @__PURE__ */ jsx2("span", { className: AllDayEvent_default.text, "data-arrows": overflowArrows, children: event.title }) }) });
}

// package/components/event/Event.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Event({
  view,
  enableRescheduling,
  compact = false,
  date,
  dispatch,
  event,
  isInWeekHeader = false,
  isInOverflow = false,
  isInDayHeader = false,
  minMaxDatesInView,
  onEventClick,
  placeholderRef,
  renderContextMenu,
  state
}) {
  const ref = useRef2(null);
  const hasContextMenu = !!renderContextMenu;
  const isInteractive = !!onEventClick || enableRescheduling;
  const isMonthView = view === "month";
  const isDayView = view === "day";
  const openPopover = () => dispatch({ type: "open_popover" });
  const closePopover = () => dispatch({ type: "reset_calendar" });
  const onClose = () => dispatch({ type: "reset_calendar" });
  const handleClick = (e, isPlaceholder2, eventRef2, onEventClick2) => {
    var _a;
    e.stopPropagation();
    if (isPlaceholder2) return;
    if (!eventRef2.current) return;
    const isDoubleClick = isActive && ((_a = state.eventAnchor) == null ? void 0 : _a.dataset.anchorday) === eventRef2.current.dataset.anchorday;
    const overflowShouldClose = !isInOverflow && state.overflowIsOpen;
    if (overflowShouldClose) dispatch({ type: "reset_calendar" });
    if (!isDoubleClick) {
      dispatch({ type: "set_clicked_event", event, anchor: eventRef2.current });
    }
    const togglePopover = () => isDoubleClick ? closePopover() : openPopover();
    onEventClick2 == null ? void 0 : onEventClick2({
      event,
      isDoubleClick,
      eventRef: eventRef2.current,
      openPopover,
      closePopover,
      togglePopover
    });
  };
  const { handleContextMenu, isActive, contextIsOpen, refs, floatingStyles, getFloatingProps, closeContextMenu } = useCalendarEvent({
    dispatch,
    event,
    state,
    hasContextMenu,
    isInOverflow
  });
  const isPlaceholder = event.id === null;
  const eventRef = isPlaceholder && event.start.isSame(date, "d") ? placeholderRef : ref;
  const timeDuration = Math.abs(getTimeDiff(event.start, event.end));
  const isShort = timeDuration <= 30;
  const overlapOffset = isDayView ? 120 : 20;
  const dayIndex = isDayView ? 0 : date.day();
  const onDragStart = () => {
    dispatch({ type: "reset_calendar" });
    if (enableRescheduling && !isInOverflow) {
      dispatch({
        type: "event_reschedule_start",
        event: __spreadProps(__spreadValues({}, event), { dragId: event.id, order: isMonthView ? event.order : 1e3 })
      });
    }
  };
  const styles = isMonthView ? getEventStyles(isInOverflow, event, date, compact, isInWeekHeader, isInDayHeader) : getWeekOrDayEventStyles(event, timeDuration, dayIndex, overlapOffset, isInteractive && isActive);
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx3(
      "div",
      {
        className: isMonthView ? Event_default.monthItemContainer : Event_default.weekItemContainer,
        "data-interactive": isInteractive,
        "data-active": isInteractive && isActive,
        "data-anchorday": date.format("DD-MMM-YYYY"),
        "data-placeholder": isPlaceholder,
        "data-dragactive": state.dragActive || state.eventDragActive,
        "data-isdragging": isBeingDragged(state, event),
        "data-sm": compact,
        "data-time": isMonthView && !event.isAllDay,
        draggable: "true",
        onClick: (e) => handleClick(e, isPlaceholder, eventRef, onEventClick),
        onContextMenu: (e) => handleContextMenu(e, eventRef),
        onDragStart,
        ref: eventRef,
        style: styles,
        children: isMonthView ? !event.isAllDay ? /* @__PURE__ */ jsx3(TimeEvent, { event, isCompact: compact }) : /* @__PURE__ */ jsx3(
          AllDayEvent,
          {
            date,
            event,
            isCompact: compact,
            isInOverflow,
            minMaxDatesInView
          }
        ) : /* @__PURE__ */ jsxs2("div", { className: Event_default.itemLabelWrapper, "data-short": isShort, children: [
          /* @__PURE__ */ jsx3("span", { style: isShort ? void 0 : { width: "100%" }, children: event.title }),
          /* @__PURE__ */ jsx3("span", { className: Event_default.timeText, children: getTimeLabel(event, timeDuration) })
        ] })
      }
    ),
    contextIsOpen && /* @__PURE__ */ jsx3("div", __spreadProps(__spreadValues({ ref: refs.setFloating, style: __spreadProps(__spreadValues({}, floatingStyles), { zIndex: 2 }) }, getFloatingProps()), { children: renderContextMenu && renderContextMenu({ event, closeContextMenu, onClose, openPopover }) }))
  ] });
}

// package/components/popover/PopoverContent.tsx
import { createPortal } from "react-dom";
import { useEffect as useEffect3, useRef as useRef3 } from "react";

// package/components/popover/useBindPopover.tsx
import {
  useFloating as useFloating2,
  autoPlacement,
  offset as offset2,
  detectOverflow,
  autoUpdate,
  hide
} from "@floating-ui/react-dom";
var padding = 32;
var padding_x = 32;
var padding_y = 16;
function useBindPopover({ anchor }) {
  const preventViewportOverflow = {
    name: "preventViewportOverflow",
    async fn(state) {
      var _a;
      const overflow = await detectOverflow(state);
      let xPosition = state.x;
      if (overflow.left > 0) xPosition = state.x + overflow.left + padding_x;
      if (overflow.right > 0) xPosition = state.x - overflow.right - padding_x;
      let yPosition = state.y;
      if (overflow.top > 0) yPosition = state.y + overflow.top + padding_y;
      if (overflow.bottom > 0) yPosition = state.y - overflow.bottom - padding_y;
      if ((_a = state.middlewareData.hide) == null ? void 0 : _a.referenceHidden) return __spreadProps(__spreadValues({}, state), { x: xPosition });
      return __spreadProps(__spreadValues({}, state), { x: xPosition, y: yPosition });
    }
  };
  const { refs, floatingStyles } = useFloating2({
    elements: {
      reference: anchor
    },
    placement: "bottom",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      hide(),
      offset2(8),
      autoPlacement({
        crossAxis: true,
        padding
      }),
      preventViewportOverflow
    ]
  });
  return { refs, floatingStyles };
}

// package/components/popover/PopoverContent.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function PopoverContent({ anchor, zIndex, colorScheme, children }) {
  const styles = useRef3({});
  const { refs, floatingStyles } = useBindPopover({ anchor });
  useEffect3(() => {
    setTimeout(() => {
      styles.current = { transitionDuration: "250ms", transitionProperty: "all" };
    }, 100);
  }, []);
  return createPortal(
    /* @__PURE__ */ jsx4(
      "div",
      {
        ref: refs.setFloating,
        style: __spreadProps(__spreadValues(__spreadValues({}, floatingStyles), styles.current), { zIndex }),
        "data-ec-color-scheme": colorScheme,
        children: /* @__PURE__ */ jsx4("div", { onClick: (e) => e.stopPropagation(), children })
      }
    ),
    document.body
  );
}

// package/components/popover/EventsCalendarPopover.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function EventsCalendarPopover({ anchor, colorScheme, isOpen, zIndex = 1, children }) {
  if (!isOpen || !anchor) return null;
  return /* @__PURE__ */ jsx5(PopoverContent, { anchor, zIndex, colorScheme, children });
}

// package/components/event-cell/EventCell.module.css
var EventCell_default = {};

// package/components/event-cell/CellHeader.tsx
import dayjs4 from "dayjs";

// package/components/event-cell/CellHeader.module.css
var CellHeader_default = {};

// package/components/event-cell/ShowMoreText.tsx
import { useRef as useRef4 } from "react";

// package/components/event-cell/ShowMoreText.module.css
var ShowMoreText_default = {};

// package/components/event-cell/ShowMoreText.tsx
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function ShowMoreText({ date, dispatch, isCompact, numOverflowEvents, state }) {
  const ref = useRef4(null);
  const handleClick = (e) => {
    if (state.overflowIsOpen && e.target === state.overflowAnchor) {
      dispatch({ type: "reset_calendar" });
    } else {
      dispatch({ type: "open_overflow", date, anchor: ref.current });
    }
  };
  if (!numOverflowEvents) return;
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: ShowMoreText_default.container,
      "data-sm": isCompact,
      "data-date": date.format("DD-MMM-YYYY"),
      onClick: handleClick,
      onMouseDown: (e) => e.stopPropagation(),
      ref,
      children: [
        /* @__PURE__ */ jsx6("span", { className: `${ShowMoreText_default.label} ${ShowMoreText_default.smOnly}`, children: `+${numOverflowEvents}` }),
        /* @__PURE__ */ jsxs3("span", { className: `${ShowMoreText_default.label} ${ShowMoreText_default.lgOnly}`, children: [
          numOverflowEvents,
          " more"
        ] })
      ]
    }
  );
}

// package/components/event-cell/CellHeader.tsx
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function CellHeader({ dayRecord, dispatch, isCompact, numOverflowEvents, state }) {
  const { date, isCurrentMonth } = dayRecord;
  const isToday = date.isSame(dayjs4(), "day");
  const textColour = isToday ? "white" : isCurrentMonth ? "dark" : "dim";
  return /* @__PURE__ */ jsxs4("div", { className: CellHeader_default.cellHeader, children: [
    /* @__PURE__ */ jsx7("div", { className: CellHeader_default.dateContainer, "data-today": isToday, children: /* @__PURE__ */ jsx7("span", { className: CellHeader_default.dateLabel, "data-color": textColour, "data-sm": isCompact, children: date.date() }) }),
    /* @__PURE__ */ jsx7(
      ShowMoreText,
      {
        date,
        dispatch,
        isCompact,
        numOverflowEvents,
        state
      }
    )
  ] });
}

// package/components/event-cell/CellContainer.tsx
import { Fragment as Fragment2, jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var getPlaceholderActiveState = (placeholderEvent, date, isInHeader = false) => {
  const { isActive, isAllDay, start, end } = placeholderEvent;
  return isActive && (!isInHeader || isAllDay) && isBetween(date, start, end) && (date.day() === 0 || date.isSame(start, "day"));
};
function CellContainer({
  EVENT_LIMIT: EVENT_LIMIT2,
  enableRescheduling,
  compact,
  dayRecord,
  dispatch,
  handleMouseEvent,
  headerHeight = "100%",
  // Explicit cell height for week header
  isInWeekHeader = false,
  isInDayHeader = false,
  minMaxDatesInView,
  onEventClick,
  onEventReschedule,
  orderedEvents,
  placeholderRef,
  renderContextMenu,
  state
}) {
  const { date } = dayRecord;
  const eventsByDate = filterByDate(orderedEvents, date);
  const visibleEvents = getVisibleEvents(eventsByDate, date, EVENT_LIMIT2, isInDayHeader);
  const numOverflowEvents = eventsByDate.reduce((a, c) => a + (c.order >= EVENT_LIMIT2 ? 1 : 0), 0);
  const showOverflowButton = (isInDayHeader || isInWeekHeader) && numOverflowEvents > 0;
  const showPlaceholder = getPlaceholderActiveState(state.placeholderEvent, date, isInWeekHeader || isInDayHeader);
  if (showPlaceholder) visibleEvents.push(state.placeholderEvent);
  const openPopover = () => dispatch({ type: "open_popover" });
  const reset = () => dispatch({ type: "reset_calendar" });
  const handleMouseDown = (e) => {
    handleMouseEvent(e, date, false, placeholderRef);
  };
  const handleMouseEnter = (e) => {
    if (state.eventDragActive) updateEvent({ state, dispatch, date, view: "month" });
    handleMouseEvent(e, date, false, placeholderRef);
  };
  const handleMouseUp = (e) => {
    if (state.eventDragActive) {
      dispatch({ type: "event_reschedule_end", anchor: placeholderRef.current });
      onEventReschedule == null ? void 0 : onEventReschedule({
        clickedEvent: state.clickedEvent,
        newEvent: state.placeholderEvent,
        eventRef: placeholderRef.current,
        openPopover,
        reset
      });
    }
    handleMouseEvent(e, date, false, placeholderRef);
  };
  return /* @__PURE__ */ jsxs5(Fragment2, { children: [
    /* @__PURE__ */ jsxs5(
      "div",
      {
        className: EventCell_default.cell,
        "data-border": !isInDayHeader && date.day() !== 6,
        onMouseDown: handleMouseDown,
        onMouseEnter: handleMouseEnter,
        onMouseUp: handleMouseUp,
        style: { height: headerHeight, cursor: state.eventDragActive ? "grabbing" : "auto" },
        children: [
          !isInWeekHeader && !isInDayHeader && /* @__PURE__ */ jsx8(
            CellHeader,
            {
              state,
              dispatch,
              isCompact: compact,
              dayRecord,
              numOverflowEvents
            }
          ),
          /* @__PURE__ */ jsx8("div", { className: EventCell_default.cellContent, "data-week": isInWeekHeader || isInDayHeader, children: showOverflowButton && /* @__PURE__ */ jsx8(
            ShowMoreText,
            {
              date,
              state,
              dispatch,
              isCompact: compact,
              numOverflowEvents
            }
          ) })
        ]
      }
    ),
    visibleEvents.map((event) => /* @__PURE__ */ jsx8(
      Event,
      {
        date,
        view: "month",
        state,
        event,
        compact,
        dispatch,
        onEventClick,
        isInDayHeader,
        isInWeekHeader,
        placeholderRef,
        renderContextMenu,
        minMaxDatesInView,
        enableRescheduling
      },
      event.id
    ))
  ] });
}

// package/components/circular-loader/CircularLoader.module.css
var CircularLoader_default = {};

// package/components/circular-loader/CircularLoader.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function CircularLoader({ visible }) {
  if (!visible) return;
  return /* @__PURE__ */ jsx9("div", { className: CircularLoader_default.loaderWrapper, children: /* @__PURE__ */ jsx9("span", { className: CircularLoader_default.loader }) });
}

// node_modules/@mantine/core/esm/core/utils/keys/keys.mjs
function keys(object) {
  return Object.keys(object);
}

// node_modules/@mantine/core/esm/core/utils/deep-merge/deep-merge.mjs
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
  const result = __spreadValues({}, target);
  const _source = source;
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(_source[key])) {
        if (!(key in target)) {
          result[key] = _source[key];
        } else {
          result[key] = deepMerge(result[key], _source[key]);
        }
      } else {
        result[key] = _source[key];
      }
    });
  }
  return result;
}

// node_modules/@mantine/core/esm/core/utils/camel-to-kebab-case/camel-to-kebab-case.mjs
function camelToKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

// node_modules/@mantine/core/esm/core/utils/units-converters/rem.mjs
function scaleRem(remValue) {
  if (remValue === "0rem") {
    return "0rem";
  }
  return `calc(${remValue} * var(--mantine-scale))`;
}
function createConverter(units, { shouldScale = false } = {}) {
  function converter(value) {
    if (value === 0 || value === "0") {
      return `0${units}`;
    }
    if (typeof value === "number") {
      const val = `${value / 16}${units}`;
      return shouldScale ? scaleRem(val) : val;
    }
    if (typeof value === "string") {
      if (value === "") {
        return value;
      }
      if (value.startsWith("calc(") || value.startsWith("clamp(") || value.includes("rgba(")) {
        return value;
      }
      if (value.includes(",")) {
        return value.split(",").map((val) => converter(val)).join(",");
      }
      if (value.includes(" ")) {
        return value.split(" ").map((val) => converter(val)).join(" ");
      }
      const replaced = value.replace("px", "");
      if (!Number.isNaN(Number(replaced))) {
        const val = `${Number(replaced) / 16}${units}`;
        return shouldScale ? scaleRem(val) : val;
      }
    }
    return value;
  }
  return converter;
}
var rem = createConverter("rem", { shouldScale: true });
var em = createConverter("em");

// node_modules/@mantine/core/esm/core/utils/filter-props/filter-props.mjs
function filterProps(props) {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== void 0) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
}

// node_modules/@mantine/core/esm/core/utils/is-number-like/is-number-like.mjs
function isNumberLike(value) {
  if (typeof value === "number") {
    return true;
  }
  if (typeof value === "string") {
    if (value.startsWith("calc(") || value.startsWith("var(") || value.includes(" ") && value.trim() !== "") {
      return true;
    }
    const cssUnitsRegex = /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
    const values2 = value.trim().split(/\s+/);
    return values2.every((val) => cssUnitsRegex.test(val));
  }
  return false;
}

// node_modules/@mantine/core/esm/core/utils/get-size/get-size.mjs
function getSize(size, prefix = "size", convertToRem = true) {
  if (size === void 0) {
    return void 0;
  }
  return isNumberLike(size) ? convertToRem ? rem(size) : size : `var(--${prefix}-${size})`;
}

// node_modules/@mantine/core/esm/core/styles-api/create-vars-resolver/create-vars-resolver.mjs
function createVarsResolver(resolver) {
  return resolver;
}

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/resolve-class-names/resolve-class-names.mjs
var EMPTY_CLASS_NAMES = {};
function mergeClassNames(objects) {
  const merged = {};
  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (merged[key]) {
        merged[key] = clsx_default(merged[key], value);
      } else {
        merged[key] = value;
      }
    });
  });
  return merged;
}
function resolveClassNames({ theme, classNames, props, stylesCtx }) {
  const arrayClassNames = Array.isArray(classNames) ? classNames : [classNames];
  const resolvedClassNames = arrayClassNames.map(
    (item) => typeof item === "function" ? item(theme, props, stylesCtx) : item || EMPTY_CLASS_NAMES
  );
  return mergeClassNames(resolvedClassNames);
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-styles/resolve-styles.mjs
function resolveStyles({ theme, styles, props, stylesCtx }) {
  const arrayStyles = Array.isArray(styles) ? styles : [styles];
  return arrayStyles.reduce((acc, style) => {
    if (typeof style === "function") {
      return __spreadValues(__spreadValues({}, acc), style(theme, props, stylesCtx));
    }
    return __spreadValues(__spreadValues({}, acc), style);
  }, {});
}

// node_modules/@mantine/core/esm/core/MantineProvider/Mantine.context.mjs
import { createContext, useContext } from "react";
var MantineContext = createContext(null);
function useMantineContext() {
  const ctx = useContext(MantineContext);
  if (!ctx) {
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  }
  return ctx;
}
function useMantineClassNamesPrefix() {
  return useMantineContext().classNamesPrefix;
}
function useMantineStyleNonce() {
  return useMantineContext().getStyleNonce;
}
function useMantineWithStaticClasses() {
  return useMantineContext().withStaticClasses;
}
function useMantineIsHeadless() {
  return useMantineContext().headless;
}
function useMantineSxTransform() {
  var _a;
  return (_a = useMantineContext().stylesTransform) == null ? void 0 : _a.sx;
}
function useMantineStylesTransform() {
  var _a;
  return (_a = useMantineContext().stylesTransform) == null ? void 0 : _a.styles;
}

// node_modules/@mantine/core/esm/core/MantineProvider/default-theme.mjs
import "react";
import "react/jsx-runtime";

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/default-variant-colors-resolver/default-variant-colors-resolver.mjs
import "react";
import "react/jsx-runtime";

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/to-rgba/to-rgba.mjs
function isHexColor(hex) {
  const HEX_REGEXP = /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i;
  return HEX_REGEXP.test(hex);
}
function hexToRgba(color) {
  let hexString = color.replace("#", "");
  if (hexString.length === 3) {
    const shorthandHex = hexString.split("");
    hexString = [
      shorthandHex[0],
      shorthandHex[0],
      shorthandHex[1],
      shorthandHex[1],
      shorthandHex[2],
      shorthandHex[2]
    ].join("");
  }
  if (hexString.length === 8) {
    const alpha = parseInt(hexString.slice(6, 8), 16) / 255;
    return {
      r: parseInt(hexString.slice(0, 2), 16),
      g: parseInt(hexString.slice(2, 4), 16),
      b: parseInt(hexString.slice(4, 6), 16),
      a: alpha
    };
  }
  const parsed = parseInt(hexString, 16);
  const r2 = parsed >> 16 & 255;
  const g = parsed >> 8 & 255;
  const b = parsed & 255;
  return {
    r: r2,
    g,
    b,
    a: 1
  };
}
function rgbStringToRgba(color) {
  const [r2, g, b, a] = color.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r: r2, g, b, a: a === void 0 ? 1 : a };
}
function hslStringToRgba(hslaString) {
  const hslaRegex = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i;
  const matches = hslaString.match(hslaRegex);
  if (!matches) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  }
  const h = parseInt(matches[1], 10);
  const s = parseInt(matches[2], 10) / 100;
  const l = parseInt(matches[3], 10) / 100;
  const a = matches[5] ? parseFloat(matches[5]) : void 0;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const huePrime = h / 60;
  const x = chroma * (1 - Math.abs(huePrime % 2 - 1));
  const m = l - chroma / 2;
  let r2;
  let g;
  let b;
  if (huePrime >= 0 && huePrime < 1) {
    r2 = chroma;
    g = x;
    b = 0;
  } else if (huePrime >= 1 && huePrime < 2) {
    r2 = x;
    g = chroma;
    b = 0;
  } else if (huePrime >= 2 && huePrime < 3) {
    r2 = 0;
    g = chroma;
    b = x;
  } else if (huePrime >= 3 && huePrime < 4) {
    r2 = 0;
    g = x;
    b = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    r2 = x;
    g = 0;
    b = chroma;
  } else {
    r2 = chroma;
    g = 0;
    b = x;
  }
  return {
    r: Math.round((r2 + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a: a || 1
  };
}
function toRgba(color) {
  if (isHexColor(color)) {
    return hexToRgba(color);
  }
  if (color.startsWith("rgb")) {
    return rgbStringToRgba(color);
  }
  if (color.startsWith("hsl")) {
    return hslStringToRgba(color);
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/darken/darken.mjs
function darken(color, alpha) {
  if (color.startsWith("var(")) {
    return `color-mix(in srgb, ${color}, black ${alpha * 100}%)`;
  }
  const { r: r2, g, b, a } = toRgba(color);
  const f = 1 - alpha;
  const dark = (input) => Math.round(input * f);
  return `rgba(${dark(r2)}, ${dark(g)}, ${dark(b)}, ${a})`;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-primary-shade/get-primary-shade.mjs
function getPrimaryShade(theme, colorScheme) {
  if (typeof theme.primaryShade === "number") {
    return theme.primaryShade;
  }
  if (colorScheme === "dark") {
    return theme.primaryShade.dark;
  }
  return theme.primaryShade.light;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/luminance/luminance.mjs
function gammaCorrect(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function getLightnessFromOklch(oklchColor) {
  const match = oklchColor.match(/oklch\((.*?)%\s/);
  return match ? parseFloat(match[1]) : null;
}
function luminance(color) {
  if (color.startsWith("oklch(")) {
    return (getLightnessFromOklch(color) || 0) / 100;
  }
  const { r: r2, g, b } = toRgba(color);
  const sR = r2 / 255;
  const sG = g / 255;
  const sB = b / 255;
  const rLinear = gammaCorrect(sR);
  const gLinear = gammaCorrect(sG);
  const bLinear = gammaCorrect(sB);
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}
function isLightColor(color, luminanceThreshold = 0.179) {
  if (color.startsWith("var(")) {
    return false;
  }
  return luminance(color) > luminanceThreshold;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/parse-theme-color/parse-theme-color.mjs
function parseThemeColor({
  color,
  theme,
  colorScheme
}) {
  if (typeof color !== "string") {
    throw new Error(
      `[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof color}`
    );
  }
  if (color === "bright") {
    return {
      color,
      value: colorScheme === "dark" ? theme.white : theme.black,
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        colorScheme === "dark" ? theme.white : theme.black,
        theme.luminanceThreshold
      ),
      variable: "--mantine-color-bright"
    };
  }
  if (color === "dimmed") {
    return {
      color,
      value: colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[7],
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
        theme.luminanceThreshold
      ),
      variable: "--mantine-color-dimmed"
    };
  }
  if (color === "white" || color === "black") {
    return {
      color,
      value: color === "white" ? theme.white : theme.black,
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        color === "white" ? theme.white : theme.black,
        theme.luminanceThreshold
      ),
      variable: `--mantine-color-${color}`
    };
  }
  const [_color, shade] = color.split(".");
  const colorShade = shade ? Number(shade) : void 0;
  const isThemeColor = _color in theme.colors;
  if (isThemeColor) {
    const colorValue = colorShade !== void 0 ? theme.colors[_color][colorShade] : theme.colors[_color][getPrimaryShade(theme, colorScheme || "light")];
    return {
      color: _color,
      value: colorValue,
      shade: colorShade,
      isThemeColor,
      isLight: isLightColor(colorValue, theme.luminanceThreshold),
      variable: shade ? `--mantine-color-${_color}-${colorShade}` : `--mantine-color-${_color}-filled`
    };
  }
  return {
    color,
    value: color,
    isThemeColor,
    isLight: isLightColor(color, theme.luminanceThreshold),
    shade: colorShade,
    variable: void 0
  };
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-theme-color/get-theme-color.mjs
function getThemeColor(color, theme) {
  const parsed = parseThemeColor({ color: color || theme.primaryColor, theme });
  return parsed.variable ? `var(${parsed.variable})` : color;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-gradient/get-gradient.mjs
function getGradient(gradient, theme) {
  var _a, _b;
  const merged = {
    from: (gradient == null ? void 0 : gradient.from) || theme.defaultGradient.from,
    to: (gradient == null ? void 0 : gradient.to) || theme.defaultGradient.to,
    deg: (_b = (_a = gradient == null ? void 0 : gradient.deg) != null ? _a : theme.defaultGradient.deg) != null ? _b : 0
  };
  const fromColor = getThemeColor(merged.from, theme);
  const toColor = getThemeColor(merged.to, theme);
  return `linear-gradient(${merged.deg}deg, ${fromColor} 0%, ${toColor} 100%)`;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/rgba/rgba.mjs
function rgba(color, alpha2) {
  if (typeof color !== "string" || alpha2 > 1 || alpha2 < 0) {
    return "rgba(0, 0, 0, 1)";
  }
  if (color.startsWith("var(")) {
    const mixPercentage = (1 - alpha2) * 100;
    return `color-mix(in srgb, ${color}, transparent ${mixPercentage}%)`;
  }
  if (color.startsWith("oklch")) {
    if (color.includes("/")) {
      return color.replace(/\/\s*[\d.]+\s*\)/, `/ ${alpha2})`);
    }
    return color.replace(")", ` / ${alpha2})`);
  }
  const { r: r2, g, b } = toRgba(color);
  return `rgba(${r2}, ${g}, ${b}, ${alpha2})`;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/default-variant-colors-resolver/default-variant-colors-resolver.mjs
var defaultVariantColorsResolver = ({
  color,
  theme,
  variant,
  gradient,
  autoContrast
}) => {
  const parsed = parseThemeColor({ color, theme });
  const _autoContrast = typeof autoContrast === "boolean" ? autoContrast : theme.autoContrast;
  if (variant === "none") {
    return {
      background: "transparent",
      hover: "transparent",
      color: "inherit",
      border: "none"
    };
  }
  if (variant === "filled") {
    const textColor = _autoContrast ? parsed.isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)" : "var(--mantine-color-white)";
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: `var(--mantine-color-${color}-filled)`,
          hover: `var(--mantine-color-${color}-filled-hover)`,
          color: textColor,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        hover: `var(--mantine-color-${parsed.color}-${parsed.shade === 9 ? 8 : parsed.shade + 1})`,
        color: textColor,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: color,
      hover: darken(color, 0.1),
      color: textColor,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "light") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: `var(--mantine-color-${color}-light)`,
          hover: `var(--mantine-color-${color}-light-hover)`,
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      const parsedColor = theme.colors[parsed.color][parsed.shade];
      return {
        background: rgba(parsedColor, 0.1),
        hover: rgba(parsedColor, 0.12),
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: rgba(color, 0.1),
      hover: rgba(color, 0.12),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "outline") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: `var(--mantine-color-${color}-outline-hover)`,
          color: `var(--mantine-color-${color}-outline)`,
          border: `${rem(1)} solid var(--mantine-color-${color}-outline)`
        };
      }
      return {
        background: "transparent",
        hover: rgba(theme.colors[parsed.color][parsed.shade], 0.05),
        color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid var(--mantine-color-${parsed.color}-${parsed.shade})`
      };
    }
    return {
      background: "transparent",
      hover: rgba(color, 0.05),
      color,
      border: `${rem(1)} solid ${color}`
    };
  }
  if (variant === "subtle") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: `var(--mantine-color-${color}-light-hover)`,
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      const parsedColor = theme.colors[parsed.color][parsed.shade];
      return {
        background: "transparent",
        hover: rgba(parsedColor, 0.12),
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: rgba(color, 0.12),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "transparent") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: "transparent",
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: "transparent",
        hover: "transparent",
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: "transparent",
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "white") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "var(--mantine-color-white)",
          hover: darken(theme.white, 0.01),
          color: `var(--mantine-color-${color}-filled)`,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: "var(--mantine-color-white)",
        hover: darken(theme.white, 0.01),
        color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "var(--mantine-color-white)",
      hover: darken(theme.white, 0.01),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "gradient") {
    return {
      background: getGradient(gradient, theme),
      hover: getGradient(gradient, theme),
      color: "var(--mantine-color-white)",
      border: "none"
    };
  }
  if (variant === "default") {
    return {
      background: "var(--mantine-color-default)",
      hover: "var(--mantine-color-default-hover)",
      color: "var(--mantine-color-default-color)",
      border: `${rem(1)} solid var(--mantine-color-default-border)`
    };
  }
  return {};
};

// node_modules/@mantine/core/esm/core/MantineProvider/default-colors.mjs
var DEFAULT_COLORS = {
  dark: [
    "#C9C9C9",
    "#b8b8b8",
    "#828282",
    "#696969",
    "#424242",
    "#3b3b3b",
    "#2e2e2e",
    "#242424",
    "#1f1f1f",
    "#141414"
  ],
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#868e96",
    "#495057",
    "#343a40",
    "#212529"
  ],
  red: [
    "#fff5f5",
    "#ffe3e3",
    "#ffc9c9",
    "#ffa8a8",
    "#ff8787",
    "#ff6b6b",
    "#fa5252",
    "#f03e3e",
    "#e03131",
    "#c92a2a"
  ],
  pink: [
    "#fff0f6",
    "#ffdeeb",
    "#fcc2d7",
    "#faa2c1",
    "#f783ac",
    "#f06595",
    "#e64980",
    "#d6336c",
    "#c2255c",
    "#a61e4d"
  ],
  grape: [
    "#f8f0fc",
    "#f3d9fa",
    "#eebefa",
    "#e599f7",
    "#da77f2",
    "#cc5de8",
    "#be4bdb",
    "#ae3ec9",
    "#9c36b5",
    "#862e9c"
  ],
  violet: [
    "#f3f0ff",
    "#e5dbff",
    "#d0bfff",
    "#b197fc",
    "#9775fa",
    "#845ef7",
    "#7950f2",
    "#7048e8",
    "#6741d9",
    "#5f3dc4"
  ],
  indigo: [
    "#edf2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
    "#364fc7"
  ],
  blue: [
    "#e7f5ff",
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#339af0",
    "#228be6",
    "#1c7ed6",
    "#1971c2",
    "#1864ab"
  ],
  cyan: [
    "#e3fafc",
    "#c5f6fa",
    "#99e9f2",
    "#66d9e8",
    "#3bc9db",
    "#22b8cf",
    "#15aabf",
    "#1098ad",
    "#0c8599",
    "#0b7285"
  ],
  teal: [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b"
  ],
  green: [
    "#ebfbee",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e"
  ],
  lime: [
    "#f4fce3",
    "#e9fac8",
    "#d8f5a2",
    "#c0eb75",
    "#a9e34b",
    "#94d82d",
    "#82c91e",
    "#74b816",
    "#66a80f",
    "#5c940d"
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700"
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffc078",
    "#ffa94d",
    "#ff922b",
    "#fd7e14",
    "#f76707",
    "#e8590c",
    "#d9480f"
  ]
};

// node_modules/@mantine/core/esm/core/MantineProvider/default-theme.mjs
var DEFAULT_FONT_FAMILY = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";
var DEFAULT_THEME = {
  scale: 1,
  fontSmoothing: true,
  focusRing: "auto",
  white: "#fff",
  black: "#000",
  colors: DEFAULT_COLORS,
  primaryShade: { light: 6, dark: 8 },
  primaryColor: "blue",
  variantColorResolver: defaultVariantColorsResolver,
  autoContrast: false,
  luminanceThreshold: 0.3,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  respectReducedMotion: false,
  cursorType: "default",
  defaultGradient: { from: "blue", to: "cyan", deg: 45 },
  defaultRadius: "sm",
  activeClassName: "mantine-active",
  focusClassName: "",
  headings: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: "700",
    textWrap: "wrap",
    sizes: {
      h1: { fontSize: rem(34), lineHeight: "1.3" },
      h2: { fontSize: rem(26), lineHeight: "1.35" },
      h3: { fontSize: rem(22), lineHeight: "1.4" },
      h4: { fontSize: rem(18), lineHeight: "1.45" },
      h5: { fontSize: rem(16), lineHeight: "1.5" },
      h6: { fontSize: rem(14), lineHeight: "1.5" }
    }
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20)
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65"
  },
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(16),
    xl: rem(32)
  },
  spacing: {
    xs: rem(10),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(32)
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  shadows: {
    xs: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), 0 ${rem(1)} ${rem(2)} rgba(0, 0, 0, 0.1)`,
    sm: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(10)} ${rem(
      15
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(7)} ${rem(7)} ${rem(-5)}`,
    md: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(20)} ${rem(
      25
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(10)} ${rem(10)} ${rem(-5)}`,
    lg: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(28)} ${rem(
      23
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(12)} ${rem(12)} ${rem(-7)}`,
    xl: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(36)} ${rem(
      28
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(17)} ${rem(17)} ${rem(-7)}`
  },
  other: {},
  components: {}
};

// node_modules/@mantine/core/esm/core/MantineProvider/MantineThemeProvider/MantineThemeProvider.mjs
import { jsx as jsx10 } from "react/jsx-runtime";
import { createContext as createContext2, useContext as useContext2, useMemo as useMemo2 } from "react";

// node_modules/@mantine/core/esm/core/MantineProvider/merge-mantine-theme/merge-mantine-theme.mjs
import "react";
import "react/jsx-runtime";
var INVALID_PRIMARY_COLOR_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more \u2013 https://mantine.dev/theming/colors/#primary-color";
var INVALID_PRIMARY_SHADE_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function isValidPrimaryShade(shade) {
  if (shade < 0 || shade > 9) {
    return false;
  }
  return parseInt(shade.toString(), 10) === shade;
}
function validateMantineTheme(theme) {
  if (!(theme.primaryColor in theme.colors)) {
    throw new Error(INVALID_PRIMARY_COLOR_ERROR);
  }
  if (typeof theme.primaryShade === "object") {
    if (!isValidPrimaryShade(theme.primaryShade.dark) || !isValidPrimaryShade(theme.primaryShade.light)) {
      throw new Error(INVALID_PRIMARY_SHADE_ERROR);
    }
  }
  if (typeof theme.primaryShade === "number" && !isValidPrimaryShade(theme.primaryShade)) {
    throw new Error(INVALID_PRIMARY_SHADE_ERROR);
  }
}
function mergeMantineTheme(currentTheme, themeOverride) {
  var _a;
  if (!themeOverride) {
    validateMantineTheme(currentTheme);
    return currentTheme;
  }
  const result = deepMerge(currentTheme, themeOverride);
  if (themeOverride.fontFamily && !((_a = themeOverride.headings) == null ? void 0 : _a.fontFamily)) {
    result.headings.fontFamily = themeOverride.fontFamily;
  }
  validateMantineTheme(result);
  return result;
}

// node_modules/@mantine/core/esm/core/MantineProvider/MantineThemeProvider/MantineThemeProvider.mjs
var MantineThemeContext = createContext2(null);
var useSafeMantineTheme = () => useContext2(MantineThemeContext) || DEFAULT_THEME;
function useMantineTheme() {
  const ctx = useContext2(MantineThemeContext);
  if (!ctx) {
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  }
  return ctx;
}
function MantineThemeProvider({
  theme,
  children,
  inherit = true
}) {
  const parentTheme = useSafeMantineTheme();
  const mergedTheme = useMemo2(
    () => mergeMantineTheme(inherit ? parentTheme : DEFAULT_THEME, theme),
    [theme, parentTheme, inherit]
  );
  return /* @__PURE__ */ jsx10(MantineThemeContext.Provider, { value: mergedTheme, children });
}
MantineThemeProvider.displayName = "@mantine/core/MantineThemeProvider";

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-global-class-names/get-global-class-names.mjs
var FOCUS_CLASS_NAMES = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function getGlobalClassNames({ theme, options, unstyled }) {
  return clsx_default(
    (options == null ? void 0 : options.focusable) && !unstyled && (theme.focusClassName || FOCUS_CLASS_NAMES[theme.focusRing]),
    (options == null ? void 0 : options.active) && !unstyled && theme.activeClassName
  );
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs
import "react";
import "react/jsx-runtime";

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-options-class-names/get-options-class-names.mjs
function getOptionsClassNames({
  selector,
  stylesCtx,
  options,
  props,
  theme
}) {
  return resolveClassNames({
    theme,
    classNames: options == null ? void 0 : options.classNames,
    props: (options == null ? void 0 : options.props) || props,
    stylesCtx
  })[selector];
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-resolved-class-names/get-resolved-class-names.mjs
function getResolvedClassNames({
  selector,
  stylesCtx,
  theme,
  classNames,
  props
}) {
  return resolveClassNames({ theme, classNames, props, stylesCtx })[selector];
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-root-class-name/get-root-class-name.mjs
function getRootClassName({ rootSelector, selector, className }) {
  return rootSelector === selector ? className : void 0;
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-selector-class-name/get-selector-class-name.mjs
function getSelectorClassName({ selector, classes: classes2, unstyled }) {
  return unstyled ? void 0 : classes2[selector];
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-static-class-names/get-static-class-names.mjs
function getStaticClassNames({
  themeName,
  classNamesPrefix,
  selector,
  withStaticClass
}) {
  if (withStaticClass === false) {
    return [];
  }
  return themeName.map((n) => `${classNamesPrefix}-${n}-${selector}`);
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-theme-class-names/get-theme-class-names.mjs
function getThemeClassNames({
  themeName,
  theme,
  selector,
  props,
  stylesCtx
}) {
  return themeName.map(
    (n) => {
      var _a, _b;
      return (_b = resolveClassNames({
        theme,
        classNames: (_a = theme.components[n]) == null ? void 0 : _a.classNames,
        props,
        stylesCtx
      })) == null ? void 0 : _b[selector];
    }
  );
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-variant-class-name/get-variant-class-name.mjs
function getVariantClassName({
  options,
  classes: classes2,
  selector,
  unstyled
}) {
  return (options == null ? void 0 : options.variant) && !unstyled ? classes2[`${selector}--${options.variant}`] : void 0;
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-class-name.mjs
function getClassName({
  theme,
  options,
  themeName,
  selector,
  classNamesPrefix,
  classNames,
  classes: classes2,
  unstyled,
  className,
  rootSelector,
  props,
  stylesCtx,
  withStaticClasses,
  headless,
  transformedStyles
}) {
  return clsx_default(
    getGlobalClassNames({ theme, options, unstyled: unstyled || headless }),
    getThemeClassNames({ theme, themeName, selector, props, stylesCtx }),
    getVariantClassName({ options, classes: classes2, selector, unstyled }),
    getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }),
    getResolvedClassNames({ selector, stylesCtx, theme, classNames: transformedStyles, props }),
    getOptionsClassNames({ selector, stylesCtx, options, props, theme }),
    getRootClassName({ rootSelector, selector, className }),
    getSelectorClassName({ selector, classes: classes2, unstyled: unstyled || headless }),
    withStaticClasses && !headless && getStaticClassNames({
      themeName,
      classNamesPrefix,
      selector,
      withStaticClass: options == null ? void 0 : options.withStaticClass
    }),
    options == null ? void 0 : options.className
  );
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/get-theme-styles/get-theme-styles.mjs
function getThemeStyles({
  theme,
  themeName,
  props,
  stylesCtx,
  selector
}) {
  return themeName.map(
    (n) => {
      var _a;
      return resolveStyles({
        theme,
        styles: (_a = theme.components[n]) == null ? void 0 : _a.styles,
        props,
        stylesCtx
      })[selector];
    }
  ).reduce((acc, val) => __spreadValues(__spreadValues({}, acc), val), {});
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-style/resolve-style.mjs
function resolveStyle({ style, theme }) {
  if (Array.isArray(style)) {
    return [...style].reduce(
      (acc, item) => __spreadValues(__spreadValues({}, acc), resolveStyle({ style: item, theme })),
      {}
    );
  }
  if (typeof style === "function") {
    return style(theme);
  }
  if (style == null) {
    return {};
  }
  return style;
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-vars/merge-vars.mjs
import "react";
import "react/jsx-runtime";
function mergeVars(vars) {
  return vars.reduce((acc, current) => {
    if (current) {
      Object.keys(current).forEach((key) => {
        acc[key] = __spreadValues(__spreadValues({}, acc[key]), filterProps(current[key]));
      });
    }
    return acc;
  }, {});
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-vars/resolve-vars.mjs
function resolveVars({
  vars,
  varsResolver: varsResolver2,
  theme,
  props,
  stylesCtx,
  selector,
  themeName,
  headless
}) {
  var _a;
  return (_a = mergeVars([
    headless ? {} : varsResolver2 == null ? void 0 : varsResolver2(theme, props, stylesCtx),
    ...themeName.map((name) => {
      var _a2, _b, _c;
      return (_c = (_b = (_a2 = theme.components) == null ? void 0 : _a2[name]) == null ? void 0 : _b.vars) == null ? void 0 : _c.call(_b, theme, props, stylesCtx);
    }),
    vars == null ? void 0 : vars(theme, props, stylesCtx)
  ])) == null ? void 0 : _a[selector];
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/get-style.mjs
function getStyle({
  theme,
  themeName,
  selector,
  options,
  props,
  stylesCtx,
  rootSelector,
  styles,
  style,
  vars,
  varsResolver: varsResolver2,
  headless,
  withStylesTransform
}) {
  return __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, !withStylesTransform && getThemeStyles({ theme, themeName, props, stylesCtx, selector })), !withStylesTransform && resolveStyles({ theme, styles, props, stylesCtx })[selector]), !withStylesTransform && resolveStyles({ theme, styles: options == null ? void 0 : options.styles, props: (options == null ? void 0 : options.props) || props, stylesCtx })[selector]), resolveVars({ theme, props, stylesCtx, vars, varsResolver: varsResolver2, selector, themeName, headless })), rootSelector === selector ? resolveStyle({ style, theme }) : null), resolveStyle({ style: options == null ? void 0 : options.style, theme }));
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/use-transformed-styles.mjs
import "react";
import "react/jsx-runtime";
function useStylesTransform({ props, stylesCtx, themeName }) {
  var _a;
  const theme = useMantineTheme();
  const stylesTransform = (_a = useMantineStylesTransform()) == null ? void 0 : _a();
  const getTransformedStyles = (styles) => {
    if (!stylesTransform) {
      return [];
    }
    const transformedStyles = styles.map(
      (style) => stylesTransform(style, { props, theme, ctx: stylesCtx })
    );
    return [
      ...transformedStyles,
      ...themeName.map(
        (n) => {
          var _a2;
          return stylesTransform((_a2 = theme.components[n]) == null ? void 0 : _a2.styles, { props, theme, ctx: stylesCtx });
        }
      )
    ].filter(Boolean);
  };
  return {
    getTransformedStyles,
    withStylesTransform: !!stylesTransform
  };
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs
function useStyles({
  name,
  classes: classes2,
  props,
  stylesCtx,
  className,
  style,
  rootSelector = "root",
  unstyled,
  classNames,
  styles,
  vars,
  varsResolver: varsResolver2
}) {
  const theme = useMantineTheme();
  const classNamesPrefix = useMantineClassNamesPrefix();
  const withStaticClasses = useMantineWithStaticClasses();
  const headless = useMantineIsHeadless();
  const themeName = (Array.isArray(name) ? name : [name]).filter((n) => n);
  const { withStylesTransform, getTransformedStyles } = useStylesTransform({
    props,
    stylesCtx,
    themeName
  });
  return (selector, options) => ({
    className: getClassName({
      theme,
      options,
      themeName,
      selector,
      classNamesPrefix,
      classNames,
      classes: classes2,
      unstyled,
      className,
      rootSelector,
      props,
      stylesCtx,
      withStaticClasses,
      headless,
      transformedStyles: getTransformedStyles([options == null ? void 0 : options.styles, styles])
    }),
    style: getStyle({
      theme,
      themeName,
      selector,
      options,
      props,
      stylesCtx,
      rootSelector,
      styles,
      style,
      vars,
      varsResolver: varsResolver2,
      headless,
      withStylesTransform
    })
  });
}

// node_modules/@mantine/core/esm/core/MantineProvider/use-props/use-props.mjs
import "react";
import "react/jsx-runtime";
function useProps(component, defaultProps2, props) {
  var _a;
  const theme = useMantineTheme();
  const contextPropsPayload = (_a = theme.components[component]) == null ? void 0 : _a.defaultProps;
  const contextProps = typeof contextPropsPayload === "function" ? contextPropsPayload(theme) : contextPropsPayload;
  return __spreadValues(__spreadValues(__spreadValues({}, defaultProps2), contextProps), filterProps(props));
}

// node_modules/@mantine/core/esm/core/InlineStyles/InlineStyles.mjs
import { jsx as jsx11 } from "react/jsx-runtime";
import "react";

// node_modules/@mantine/core/esm/core/InlineStyles/css-object-to-string/css-object-to-string.mjs
import "react";
import "react/jsx-runtime";
function cssObjectToString(css) {
  return keys(css).reduce(
    (acc, rule) => css[rule] !== void 0 ? `${acc}${camelToKebabCase(rule)}:${css[rule]};` : acc,
    ""
  ).trim();
}

// node_modules/@mantine/core/esm/core/InlineStyles/styles-to-string/styles-to-string.mjs
function stylesToString({ selector, styles, media, container }) {
  const baseStyles = styles ? cssObjectToString(styles) : "";
  const mediaQueryStyles = !Array.isArray(media) ? [] : media.map((item) => `@media${item.query}{${selector}{${cssObjectToString(item.styles)}}}`);
  const containerStyles = !Array.isArray(container) ? [] : container.map(
    (item) => `@container ${item.query}{${selector}{${cssObjectToString(item.styles)}}}`
  );
  return `${baseStyles ? `${selector}{${baseStyles}}` : ""}${mediaQueryStyles.join("")}${containerStyles.join("")}`.trim();
}

// node_modules/@mantine/core/esm/core/InlineStyles/InlineStyles.mjs
function InlineStyles(props) {
  const nonce = useMantineStyleNonce();
  return /* @__PURE__ */ jsx11(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: nonce == null ? void 0 : nonce(),
      dangerouslySetInnerHTML: { __html: stylesToString(props) }
    }
  );
}

// node_modules/@mantine/core/esm/core/Box/style-props/extract-style-props/extract-style-props.mjs
import "react";
import "react/jsx-runtime";
function extractStyleProps(others) {
  const _a = others, {
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    me,
    ms,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    pe,
    ps,
    bd,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    flex,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    sx
  } = _a, rest = __objRest(_a, [
    "m",
    "mx",
    "my",
    "mt",
    "mb",
    "ml",
    "mr",
    "me",
    "ms",
    "p",
    "px",
    "py",
    "pt",
    "pb",
    "pl",
    "pr",
    "pe",
    "ps",
    "bd",
    "bg",
    "c",
    "opacity",
    "ff",
    "fz",
    "fw",
    "lts",
    "ta",
    "lh",
    "fs",
    "tt",
    "td",
    "w",
    "miw",
    "maw",
    "h",
    "mih",
    "mah",
    "bgsz",
    "bgp",
    "bgr",
    "bga",
    "pos",
    "top",
    "left",
    "bottom",
    "right",
    "inset",
    "display",
    "flex",
    "hiddenFrom",
    "visibleFrom",
    "lightHidden",
    "darkHidden",
    "sx"
  ]);
  const styleProps = filterProps({
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    me,
    ms,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    pe,
    ps,
    bd,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    flex,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    sx
  });
  return { styleProps, rest };
}

// node_modules/@mantine/core/esm/core/Box/style-props/style-props-data.mjs
var STYlE_PROPS_DATA = {
  m: { type: "spacing", property: "margin" },
  mt: { type: "spacing", property: "marginTop" },
  mb: { type: "spacing", property: "marginBottom" },
  ml: { type: "spacing", property: "marginLeft" },
  mr: { type: "spacing", property: "marginRight" },
  ms: { type: "spacing", property: "marginInlineStart" },
  me: { type: "spacing", property: "marginInlineEnd" },
  mx: { type: "spacing", property: "marginInline" },
  my: { type: "spacing", property: "marginBlock" },
  p: { type: "spacing", property: "padding" },
  pt: { type: "spacing", property: "paddingTop" },
  pb: { type: "spacing", property: "paddingBottom" },
  pl: { type: "spacing", property: "paddingLeft" },
  pr: { type: "spacing", property: "paddingRight" },
  ps: { type: "spacing", property: "paddingInlineStart" },
  pe: { type: "spacing", property: "paddingInlineEnd" },
  px: { type: "spacing", property: "paddingInline" },
  py: { type: "spacing", property: "paddingBlock" },
  bd: { type: "border", property: "border" },
  bdrs: { type: "radius", property: "borderRadius" },
  bg: { type: "color", property: "background" },
  c: { type: "textColor", property: "color" },
  opacity: { type: "identity", property: "opacity" },
  ff: { type: "fontFamily", property: "fontFamily" },
  fz: { type: "fontSize", property: "fontSize" },
  fw: { type: "identity", property: "fontWeight" },
  lts: { type: "size", property: "letterSpacing" },
  ta: { type: "identity", property: "textAlign" },
  lh: { type: "lineHeight", property: "lineHeight" },
  fs: { type: "identity", property: "fontStyle" },
  tt: { type: "identity", property: "textTransform" },
  td: { type: "identity", property: "textDecoration" },
  w: { type: "spacing", property: "width" },
  miw: { type: "spacing", property: "minWidth" },
  maw: { type: "spacing", property: "maxWidth" },
  h: { type: "spacing", property: "height" },
  mih: { type: "spacing", property: "minHeight" },
  mah: { type: "spacing", property: "maxHeight" },
  bgsz: { type: "size", property: "backgroundSize" },
  bgp: { type: "identity", property: "backgroundPosition" },
  bgr: { type: "identity", property: "backgroundRepeat" },
  bga: { type: "identity", property: "backgroundAttachment" },
  pos: { type: "identity", property: "position" },
  top: { type: "size", property: "top" },
  left: { type: "size", property: "left" },
  bottom: { type: "size", property: "bottom" },
  right: { type: "size", property: "right" },
  inset: { type: "size", property: "inset" },
  display: { type: "identity", property: "display" },
  flex: { type: "identity", property: "flex" }
};

// node_modules/@mantine/core/esm/core/Box/style-props/parse-style-props/parse-style-props.mjs
import "react";
import "react/jsx-runtime";

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/border-resolver/border-resolver.mjs
import "react";
import "react/jsx-runtime";

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/color-resolver/color-resolver.mjs
import "react";
import "react/jsx-runtime";
function colorResolver(color, theme) {
  const parsedColor = parseThemeColor({ color, theme });
  if (parsedColor.color === "dimmed") {
    return "var(--mantine-color-dimmed)";
  }
  if (parsedColor.color === "bright") {
    return "var(--mantine-color-bright)";
  }
  return parsedColor.variable ? `var(${parsedColor.variable})` : parsedColor.color;
}
function textColorResolver(color, theme) {
  const parsedColor = parseThemeColor({ color, theme });
  if (parsedColor.isThemeColor && parsedColor.shade === void 0) {
    return `var(--mantine-color-${parsedColor.color}-text)`;
  }
  return colorResolver(color, theme);
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/border-resolver/border-resolver.mjs
function borderResolver(value, theme) {
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    const [size, style, ...colorTuple] = value.split(" ").filter((val) => val.trim() !== "");
    let result = `${rem(size)}`;
    style && (result += ` ${style}`);
    colorTuple.length > 0 && (result += ` ${colorResolver(colorTuple.join(" "), theme)}`);
    return result.trim();
  }
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/font-family-resolver/font-family-resolver.mjs
var values = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function fontFamilyResolver(fontFamily) {
  if (typeof fontFamily === "string" && fontFamily in values) {
    return values[fontFamily];
  }
  return fontFamily;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/font-size-resolver/font-size-resolver.mjs
import "react";
import "react/jsx-runtime";
var headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
function fontSizeResolver(value, theme) {
  if (typeof value === "string" && value in theme.fontSizes) {
    return `var(--mantine-font-size-${value})`;
  }
  if (typeof value === "string" && headings.includes(value)) {
    return `var(--mantine-${value}-font-size)`;
  }
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    return rem(value);
  }
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/identity-resolver/identity-resolver.mjs
function identityResolver(value) {
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/line-height-resolver/line-height-resolver.mjs
var headings2 = ["h1", "h2", "h3", "h4", "h5", "h6"];
function lineHeightResolver(value, theme) {
  if (typeof value === "string" && value in theme.lineHeights) {
    return `var(--mantine-line-height-${value})`;
  }
  if (typeof value === "string" && headings2.includes(value)) {
    return `var(--mantine-${value}-line-height)`;
  }
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/radius-resolver/radius-resolver.mjs
import "react";
import "react/jsx-runtime";
function radiusResolver(value, theme) {
  if (typeof value === "string" && value in theme.radius) {
    return `var(--mantine-radius-${value})`;
  }
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    return rem(value);
  }
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/size-resolver/size-resolver.mjs
import "react";
import "react/jsx-runtime";
function sizeResolver(value) {
  if (typeof value === "number") {
    return rem(value);
  }
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/spacing-resolver/spacing-resolver.mjs
import "react";
import "react/jsx-runtime";
function spacingResolver(value, theme) {
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    const mod = value.replace("-", "");
    if (!(mod in theme.spacing)) {
      return rem(value);
    }
    const variable = `--mantine-spacing-${mod}`;
    return value.startsWith("-") ? `calc(var(${variable}) * -1)` : `var(${variable})`;
  }
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/index.mjs
var resolvers = {
  color: colorResolver,
  textColor: textColorResolver,
  fontSize: fontSizeResolver,
  spacing: spacingResolver,
  radius: radiusResolver,
  identity: identityResolver,
  size: sizeResolver,
  lineHeight: lineHeightResolver,
  fontFamily: fontFamilyResolver,
  border: borderResolver
};

// node_modules/@mantine/core/esm/core/Box/style-props/parse-style-props/sort-media-queries.mjs
function replaceMediaQuery(query) {
  return query.replace("(min-width: ", "").replace("em)", "");
}
function sortMediaQueries(_a) {
  var _b = _a, {
    media
  } = _b, props = __objRest(_b, [
    "media"
  ]);
  const breakpoints = Object.keys(media);
  const sortedMedia = breakpoints.sort((a, b) => Number(replaceMediaQuery(a)) - Number(replaceMediaQuery(b))).map((query) => ({ query, styles: media[query] }));
  return __spreadProps(__spreadValues({}, props), { media: sortedMedia });
}

// node_modules/@mantine/core/esm/core/Box/style-props/parse-style-props/parse-style-props.mjs
function hasResponsiveStyles(styleProp) {
  if (typeof styleProp !== "object" || styleProp === null) {
    return false;
  }
  const breakpoints = Object.keys(styleProp);
  if (breakpoints.length === 1 && breakpoints[0] === "base") {
    return false;
  }
  return true;
}
function getBaseValue(value) {
  if (typeof value === "object" && value !== null) {
    if ("base" in value) {
      return value.base;
    }
    return void 0;
  }
  return value;
}
function getBreakpointKeys(value) {
  if (typeof value === "object" && value !== null) {
    return keys(value).filter((key) => key !== "base");
  }
  return [];
}
function getBreakpointValue(value, breakpoint) {
  if (typeof value === "object" && value !== null && breakpoint in value) {
    return value[breakpoint];
  }
  return value;
}
function parseStyleProps({
  styleProps,
  data,
  theme
}) {
  return sortMediaQueries(
    keys(styleProps).reduce(
      (acc, styleProp) => {
        if (styleProp === "hiddenFrom" || styleProp === "visibleFrom" || styleProp === "sx") {
          return acc;
        }
        const propertyData = data[styleProp];
        const properties = Array.isArray(propertyData.property) ? propertyData.property : [propertyData.property];
        const baseValue = getBaseValue(styleProps[styleProp]);
        if (!hasResponsiveStyles(styleProps[styleProp])) {
          properties.forEach((property) => {
            acc.inlineStyles[property] = resolvers[propertyData.type](baseValue, theme);
          });
          return acc;
        }
        acc.hasResponsiveStyles = true;
        const breakpoints = getBreakpointKeys(styleProps[styleProp]);
        properties.forEach((property) => {
          if (baseValue) {
            acc.styles[property] = resolvers[propertyData.type](baseValue, theme);
          }
          breakpoints.forEach((breakpoint) => {
            const bp = `(min-width: ${theme.breakpoints[breakpoint]})`;
            acc.media[bp] = __spreadProps(__spreadValues({}, acc.media[bp]), {
              [property]: resolvers[propertyData.type](
                getBreakpointValue(styleProps[styleProp], breakpoint),
                theme
              )
            });
          });
        });
        return acc;
      },
      {
        hasResponsiveStyles: false,
        styles: {},
        inlineStyles: {},
        media: {}
      }
    )
  );
}

// node_modules/@mantine/core/esm/core/Box/use-random-classname/use-random-classname.mjs
import { useId } from "react";
function useRandomClassName() {
  const id = useId().replace(/:/g, "");
  return `__m__-${id}`;
}

// node_modules/@mantine/core/esm/core/Box/Box.mjs
import { jsxs as jsxs6, Fragment as Fragment3, jsx as jsx12 } from "react/jsx-runtime";
import { forwardRef } from "react";

// node_modules/@mantine/core/esm/core/factory/create-polymorphic-component.mjs
function createPolymorphicComponent(component) {
  return component;
}

// node_modules/@mantine/core/esm/core/Box/get-box-mod/get-box-mod.mjs
function transformModKey(key) {
  return key.startsWith("data-") ? key : `data-${key}`;
}
function getMod(props) {
  return Object.keys(props).reduce((acc, key) => {
    const value = props[key];
    if (value === void 0 || value === "" || value === false || value === null) {
      return acc;
    }
    acc[transformModKey(key)] = props[key];
    return acc;
  }, {});
}
function getBoxMod(mod) {
  if (!mod) {
    return null;
  }
  if (typeof mod === "string") {
    return { [transformModKey(mod)]: true };
  }
  if (Array.isArray(mod)) {
    return [...mod].reduce(
      (acc, value) => __spreadValues(__spreadValues({}, acc), getBoxMod(value)),
      {}
    );
  }
  return getMod(mod);
}

// node_modules/@mantine/core/esm/core/Box/get-box-style/get-box-style.mjs
function mergeStyles(styles, theme) {
  if (Array.isArray(styles)) {
    return [...styles].reduce(
      (acc, item) => __spreadValues(__spreadValues({}, acc), mergeStyles(item, theme)),
      {}
    );
  }
  if (typeof styles === "function") {
    return styles(theme);
  }
  if (styles == null) {
    return {};
  }
  return styles;
}
function getBoxStyle({
  theme,
  style,
  vars,
  styleProps
}) {
  const _style = mergeStyles(style, theme);
  const _vars = mergeStyles(vars, theme);
  return __spreadValues(__spreadValues(__spreadValues({}, _style), _vars), styleProps);
}

// node_modules/@mantine/core/esm/core/Box/Box.mjs
var _Box = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      component,
      style,
      __vars,
      className,
      variant,
      mod,
      size,
      hiddenFrom,
      visibleFrom,
      lightHidden,
      darkHidden,
      renderRoot,
      __size
    } = _b, others = __objRest(_b, [
      "component",
      "style",
      "__vars",
      "className",
      "variant",
      "mod",
      "size",
      "hiddenFrom",
      "visibleFrom",
      "lightHidden",
      "darkHidden",
      "renderRoot",
      "__size"
    ]);
    var _a2;
    const theme = useMantineTheme();
    const Element = component || "div";
    const { styleProps, rest } = extractStyleProps(others);
    const useSxTransform = useMantineSxTransform();
    const transformedSx = (_a2 = useSxTransform == null ? void 0 : useSxTransform()) == null ? void 0 : _a2(styleProps.sx);
    const responsiveClassName = useRandomClassName();
    const parsedStyleProps = parseStyleProps({
      styleProps,
      theme,
      data: STYlE_PROPS_DATA
    });
    const props = __spreadValues(__spreadValues({
      ref,
      style: getBoxStyle({
        theme,
        style,
        vars: __vars,
        styleProps: parsedStyleProps.inlineStyles
      }),
      className: clsx_default(className, transformedSx, {
        [responsiveClassName]: parsedStyleProps.hasResponsiveStyles,
        "mantine-light-hidden": lightHidden,
        "mantine-dark-hidden": darkHidden,
        [`mantine-hidden-from-${hiddenFrom}`]: hiddenFrom,
        [`mantine-visible-from-${visibleFrom}`]: visibleFrom
      }),
      "data-variant": variant,
      "data-size": isNumberLike(size) ? void 0 : size || void 0,
      size: __size
    }, getBoxMod(mod)), rest);
    return /* @__PURE__ */ jsxs6(Fragment3, { children: [
      parsedStyleProps.hasResponsiveStyles && /* @__PURE__ */ jsx12(
        InlineStyles,
        {
          selector: `.${responsiveClassName}`,
          styles: parsedStyleProps.styles,
          media: parsedStyleProps.media
        }
      ),
      typeof renderRoot === "function" ? renderRoot(props) : /* @__PURE__ */ jsx12(Element, __spreadValues({}, props))
    ] });
  }
);
_Box.displayName = "@mantine/core/Box";
var Box = createPolymorphicComponent(_Box);

// node_modules/@mantine/core/esm/core/factory/factory.mjs
import { jsx as jsx13 } from "react/jsx-runtime";
import { forwardRef as forwardRef2 } from "react";
function identity(value) {
  return value;
}
function factory(ui) {
  const Component = forwardRef2(ui);
  Component.extend = identity;
  Component.withProps = (fixedProps) => {
    const Extended = forwardRef2((props, ref) => /* @__PURE__ */ jsx13(Component, __spreadProps(__spreadValues(__spreadValues({}, fixedProps), props), { ref })));
    Extended.extend = Component.extend;
    Extended.displayName = `WithProps(${Component.displayName})`;
    return Extended;
  };
  return Component;
}

// node_modules/@mantine/core/esm/components/Divider/Divider.mjs
import { jsx as jsx14 } from "react/jsx-runtime";
import "react";

// node_modules/@mantine/core/esm/components/Divider/Divider.module.css.mjs
var classes = { "root": "m_3eebeb36", "label": "m_9e365f20" };

// node_modules/@mantine/core/esm/components/Divider/Divider.mjs
var defaultProps = {
  orientation: "horizontal"
};
var varsResolver = createVarsResolver((theme, { color, variant, size }) => ({
  root: {
    "--divider-color": color ? getThemeColor(color, theme) : void 0,
    "--divider-border-style": variant,
    "--divider-size": getSize(size, "divider-size")
  }
}));
var Divider = factory((_props, ref) => {
  const props = useProps("Divider", defaultProps, _props);
  const _a = props, {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    color,
    orientation,
    label,
    labelPosition,
    mod
  } = _a, others = __objRest(_a, [
    "classNames",
    "className",
    "style",
    "styles",
    "unstyled",
    "vars",
    "color",
    "orientation",
    "label",
    "labelPosition",
    "mod"
  ]);
  const getStyles = useStyles({
    name: "Divider",
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver
  });
  return /* @__PURE__ */ jsx14(
    Box,
    __spreadProps(__spreadValues(__spreadValues({
      ref,
      mod: [{ orientation, "with-label": !!label }, mod]
    }, getStyles("root")), others), {
      role: "separator",
      children: label && /* @__PURE__ */ jsx14(Box, __spreadProps(__spreadValues({ component: "span", mod: { position: labelPosition } }, getStyles("label")), { children: label }))
    })
  );
});
Divider.classes = classes;
Divider.displayName = "@mantine/core/Divider";

// package/features/header/Header.module.css
var Header_default = {};

// package/features/header/HeaderButton.module.css
var HeaderButton_default = {};

// package/features/header/HeaderButton.tsx
import { jsx as jsx15 } from "react/jsx-runtime";
function HeaderButton({
  isGroupButton,
  active = false,
  onClick = () => null,
  variant,
  children
}) {
  return /* @__PURE__ */ jsx15(
    "button",
    {
      type: "button",
      onClick,
      "data-group": isGroupButton,
      "data-active": active,
      "data-variant": variant,
      className: HeaderButton_default.button,
      children
    }
  );
}

// package/features/header/Controls.tsx
import { jsx as jsx16, jsxs as jsxs7 } from "react/jsx-runtime";
function Controls({ hideViewToggle, views, setView, view, children }) {
  if (views.length < 1 && !children) return;
  const viewsToDisplay = CALENDAR_VIEWS.filter((validView) => views.includes(validView));
  return /* @__PURE__ */ jsxs7("div", { className: Header_default.controls, children: [
    !hideViewToggle && viewsToDisplay.length > 1 && /* @__PURE__ */ jsx16("div", { className: Header_default.buttonGroup, children: viewsToDisplay.map((viewLabel) => /* @__PURE__ */ jsx16(HeaderButton, { isGroupButton: true, active: view === viewLabel, onClick: () => setView(viewLabel), children: viewLabel }, viewLabel)) }),
    children
  ] });
}

// package/features/header/Navigation.tsx
import dayjs5 from "dayjs";

// package/features/icons/IconChevronLeft.tsx
import { jsx as jsx17, jsxs as jsxs8 } from "react/jsx-runtime";
function IconChevronLeft({ size = "24", stroke = "2" }) {
  return /* @__PURE__ */ jsxs8(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "icon icon-tabler icons-tabler-outline icon-tabler-chevron-left",
      children: [
        /* @__PURE__ */ jsx17("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx17("path", { d: "M15 6l-6 6l6 6" })
      ]
    }
  );
}

// package/features/icons/IconChevronRight.tsx
import { jsx as jsx18, jsxs as jsxs9 } from "react/jsx-runtime";
function IconChevronRight({ size = "24", stroke = "2" }) {
  return /* @__PURE__ */ jsxs9(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "icon icon-tabler icons-tabler-outline icon-tabler-chevron-right",
      children: [
        /* @__PURE__ */ jsx18("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx18("path", { d: "M9 6l6 6l-6 6" })
      ]
    }
  );
}

// package/features/header/Navigation.tsx
import { jsx as jsx19, jsxs as jsxs10 } from "react/jsx-runtime";
var getHeaderTitle = (currDate, view) => {
  const weekStart = currDate.startOf("week");
  const weekEnd = currDate.endOf("week");
  return view === "year" ? currDate.format("YYYY") : view === "month" ? currDate.format("MMMM YYYY") : view === "week" ? `${weekStart.format("MMM DD")} - ${weekEnd.format("MMM DD, YYYY")}` : currDate.format("D MMMM, YYYY");
};
function Navigation({ activeDate, setActiveDate, view }) {
  const handleToday = () => setActiveDate(dayjs5());
  const handleNext = (increment) => setActiveDate((currDate) => currDate.add(1, increment));
  const handlePrev = (increment) => setActiveDate((currDate) => currDate.subtract(1, increment));
  return /* @__PURE__ */ jsxs10("div", { className: Header_default.navigation, children: [
    /* @__PURE__ */ jsx19(HeaderButton, { variant: "outline", onClick: handleToday, children: "Today" }),
    /* @__PURE__ */ jsxs10("div", { className: Header_default.actions, children: [
      /* @__PURE__ */ jsx19(HeaderButton, { variant: "subtle", onClick: () => handlePrev(view), children: /* @__PURE__ */ jsx19(IconChevronLeft, { size: "1.5rem" }) }),
      /* @__PURE__ */ jsx19(HeaderButton, { variant: "subtle", onClick: () => handleNext(view), children: /* @__PURE__ */ jsx19(IconChevronRight, { size: "1.5rem" }) })
    ] }),
    /* @__PURE__ */ jsx19("span", { className: Header_default.date, children: getHeaderTitle(activeDate, view) })
  ] });
}

// package/features/header/Header.tsx
import { Fragment as Fragment4, jsx as jsx20, jsxs as jsxs11 } from "react/jsx-runtime";
function Header({
  activeDate,
  onClick = () => null,
  hideViewToggle,
  setActiveDate,
  setView = () => null,
  views = [...CALENDAR_VIEWS],
  view = "month",
  customControls
}) {
  return /* @__PURE__ */ jsxs11(Fragment4, { children: [
    /* @__PURE__ */ jsxs11("div", { className: Header_default.header, onClick, children: [
      /* @__PURE__ */ jsx20(Navigation, { activeDate, setActiveDate, view }),
      /* @__PURE__ */ jsx20(Controls, { hideViewToggle, views, setView, view, children: customControls })
    ] }),
    /* @__PURE__ */ jsx20(Divider, {})
  ] });
}

// package/features/time-view/TimeView.tsx
import { useMemo as useMemo3 } from "react";

// package/features/time-view/TimeView.module.css
var TimeView_default = {};

// package/features/time-view/hooks/useSetInitialScroll.tsx
import dayjs6 from "dayjs";
import { useEffect as useEffect4, useRef as useRef5 } from "react";
var PIXELS_PER_HOUR = 48;
var MINUTES_PER_HOUR = 60;
var NOW_IN_MINUTES = dayjs6().diff(dayjs6().startOf("day"), "m");
var pixelsPerMinute = PIXELS_PER_HOUR / MINUTES_PER_HOUR;
function useSetInitialScroll({ minutesToScroll = NOW_IN_MINUTES, offset: offset3 = 140 } = {}) {
  const viewportRef = useRef5(null);
  useEffect4(() => {
    if (!viewportRef.current) return;
    const offset8am = pixelsPerMinute * minutesToScroll - offset3;
    viewportRef.current.scrollTo({ top: offset8am });
  }, [minutesToScroll, offset3]);
  return viewportRef;
}

// package/features/time-view/utils/getWeekDates.ts
var getWeekDates = (activeDate, view) => {
  if (view === "day") return [{ date: activeDate }];
  const startOfWeek = activeDate.startOf("week");
  const startOfCalendarWeek = startOfWeek.subtract(startOfWeek.day(), "d");
  let tempDate = startOfCalendarWeek;
  const datesArray = [];
  for (let index = 0; index < 7; index++) {
    datesArray.push({ date: tempDate, isCurrentMonth: tempDate.month() === activeDate.month() });
    tempDate = tempDate.add(1, "day");
  }
  return datesArray;
};

// package/features/time-view/utils/getEventsByDayMap.ts
function getEventsByDayMap(weekDays, events) {
  return weekDays.reduce((a, c, i) => __spreadProps(__spreadValues({}, a), { [i]: arrangeWeekdayEvents(filterByDate(events, c.date), c.date) }), {});
}

// package/features/time-view/components/HoursColumn.module.css
var HoursColumn_default = {};

// package/features/time-view/components/HoursColumn.tsx
import { jsx as jsx21 } from "react/jsx-runtime";
function HoursColumn() {
  return /* @__PURE__ */ jsx21("div", { className: HoursColumn_default.hoursColumn, children: HOURS.map((hour) => /* @__PURE__ */ jsx21("div", { className: HoursColumn_default.hour, children: /* @__PURE__ */ jsx21("span", { className: HoursColumn_default.hourLabel, children: hour }) }, hour)) });
}

// package/features/time-view/components/TimeIndicator.tsx
import dayjs7 from "dayjs";

// package/features/time-view/components/TimeIndicator.module.css
var TimeIndicator_default = {};

// package/features/time-view/components/TimeIndicator.tsx
import { jsx as jsx22, jsxs as jsxs12 } from "react/jsx-runtime";
var NOW = dayjs7();
function TimeIndicator({ activeDate, isDayView }) {
  if (!activeDate.isSame(NOW, "day")) return;
  const gridColumn = isDayView ? 1 : NOW.day() + 1;
  const gridRow = NOW.hour() * 4 + Math.round(NOW.minute() / 15) + 1;
  return /* @__PURE__ */ jsxs12("div", { className: TimeIndicator_default.wrapper, style: { gridColumn, gridRow }, children: [
    /* @__PURE__ */ jsx22("div", { className: TimeIndicator_default.dot }),
    /* @__PURE__ */ jsx22("div", { className: TimeIndicator_default.line })
  ] });
}

// package/features/time-view/components/TimeBackground.module.css
var TimeBackground_default = {};

// package/features/time-view/components/TimeBackground.tsx
import { Fragment as Fragment5, jsx as jsx23 } from "react/jsx-runtime";
var buildIndexArr = (l) => {
  return Array(l).fill(0).map((_, i) => i);
};
var getActiveDateTime = (activeDate, day, hour, timeBlock, view) => {
  const startDate = view === "day" ? activeDate : activeDate.startOf("week").add(day, "d");
  return startDate.hour(hour).minute(timeBlock * 15);
};
function TimeBackground({
  view,
  activeDate,
  handleMouseEvent,
  placeholderRef,
  state,
  dispatch,
  onEventReschedule
}) {
  const daysArray = view === "day" ? [0] : buildIndexArr(7);
  const hoursArray = buildIndexArr(24);
  const timeBlocksArray = buildIndexArr(4);
  const openPopover = () => dispatch({ type: "open_popover" });
  const reset = () => dispatch({ type: "reset_calendar" });
  return /* @__PURE__ */ jsx23(Fragment5, { children: daysArray.map(
    (day) => hoursArray.map(
      (hour) => timeBlocksArray.map((timeBlock) => {
        const date = getActiveDateTime(activeDate, day, hour, timeBlock, view);
        return /* @__PURE__ */ jsx23(
          "div",
          {
            className: TimeBackground_default.gridCell,
            "data-isweekview": view === "week",
            onMouseDown: (e) => handleMouseEvent(e, date, true, placeholderRef),
            onMouseEnter: (e) => {
              if (state.eventDragActive) updateEvent({ state, dispatch, date, view });
              handleMouseEvent(e, date, true, placeholderRef);
            },
            onMouseUp: (e) => {
              if (state.eventDragActive) {
                dispatch({ type: "event_reschedule_end", anchor: placeholderRef.current });
                onEventReschedule == null ? void 0 : onEventReschedule({
                  clickedEvent: state.clickedEvent,
                  newEvent: state.placeholderEvent,
                  eventRef: placeholderRef.current,
                  openPopover,
                  reset
                });
              }
              handleMouseEvent(e, date, true, placeholderRef);
            },
            style: {
              gridColumnStart: day + 1,
              gridRow: `${hour * 4 + timeBlock + 1} / ${hour * 4 + timeBlock + 2}`,
              cursor: state.eventDragActive ? "grabbing" : "auto"
            }
          },
          `${day}${hour}${timeBlock}`
        );
      })
    )
  ) });
}

// package/features/time-view/components/TimeViewHeader.module.css
var TimeViewHeader_default = {};

// package/features/time-view/components/TimeViewHeader.tsx
import dayjs8 from "dayjs";
import { jsx as jsx24, jsxs as jsxs13 } from "react/jsx-runtime";
var EVENT_LIMIT = 2;
function TimeViewHeader({
  view,
  enableRescheduling,
  compact,
  allDayEvents,
  dispatch,
  handleMouseEvent,
  handleStopDrag,
  minMaxDatesInView,
  onEventClick,
  onEventReschedule,
  placeholderRef,
  renderContextMenu,
  state,
  weekDatesArray
}) {
  const filteredEvents = view === "day" ? filterByDate(allDayEvents, weekDatesArray[0].date) : filterByWeek(allDayEvents, weekDatesArray[0].date);
  const orderedEvents = arrangeWeekEvents(filteredEvents);
  const totalEventsOnThisDate = orderedEvents.length > 0 ? Math.max(...orderedEvents.map((x) => x.order + 1)) : 0;
  const numEventsToShow = Math.min(totalEventsOnThisDate, EVENT_LIMIT + 1);
  const heightOfEvent = compact ? 20 : 23;
  const bottomPadding = numEventsToShow > 0 ? 8 : 0;
  const headerHeight = heightOfEvent * numEventsToShow + bottomPadding;
  return /* @__PURE__ */ jsx24("div", { className: TimeViewHeader_default.headerRow, "data-isweekview": view === "week", onMouseLeave: handleStopDrag, children: weekDatesArray.map((dayRecord, dayIndex) => {
    const { date } = dayRecord;
    const withHeaderBorder = view === "week" || filteredEvents.length > 0;
    return /* @__PURE__ */ jsxs13("div", { className: TimeViewHeader_default.headerCell, "data-border": withHeaderBorder, children: [
      view === "week" && /* @__PURE__ */ jsx24("div", { className: TimeViewHeader_default.headerLabel, "data-today": date.isSame(dayjs8(), "day"), onMouseEnter: handleStopDrag, children: `${date.format("ddd")} ${date.format("DD")}` }),
      /* @__PURE__ */ jsx24(
        CellContainer,
        {
          isInDayHeader: view === "day",
          isInWeekHeader: view === "week",
          EVENT_LIMIT,
          enableRescheduling,
          compact,
          dayRecord,
          dispatch,
          handleMouseEvent,
          headerHeight,
          minMaxDatesInView,
          onEventClick,
          onEventReschedule,
          orderedEvents,
          placeholderRef,
          renderContextMenu,
          state
        }
      )
    ] }, dayIndex);
  }) });
}

// package/features/time-view/TimeView.tsx
import { jsx as jsx25, jsxs as jsxs14 } from "react/jsx-runtime";
function TimeView({
  view,
  activeDate,
  compact,
  dispatch,
  enableRescheduling,
  events,
  handleMouseEvent,
  handleStopDrag,
  onEventClick,
  onEventReschedule,
  placeholderRef,
  renderContextMenu,
  state
}) {
  const isDayView = view === "day";
  const isWeekView = view === "week";
  const allDayEvents = events.filter((event) => event.isAllDay);
  const timeEvents = events.filter((event) => !event.isAllDay);
  const viewportRef = useSetInitialScroll();
  const weekDatesArray = useMemo3(() => getWeekDates(activeDate, view), [activeDate, view]);
  const minMaxDatesInView = {
    first: isDayView ? activeDate : weekDatesArray[0].date,
    last: isDayView ? activeDate : weekDatesArray[6].date
  };
  const dayMap = useMemo3(() => getEventsByDayMap(weekDatesArray, timeEvents), [timeEvents, weekDatesArray]);
  return /* @__PURE__ */ jsxs14("div", { className: TimeView_default.timeView, children: [
    /* @__PURE__ */ jsx25(
      TimeViewHeader,
      {
        allDayEvents,
        compact,
        dispatch,
        enableRescheduling,
        handleMouseEvent,
        handleStopDrag,
        minMaxDatesInView,
        onEventClick,
        onEventReschedule,
        placeholderRef,
        renderContextMenu,
        state,
        view,
        weekDatesArray
      }
    ),
    /* @__PURE__ */ jsx25("div", { ref: viewportRef, className: TimeView_default.scrollWrapper, children: /* @__PURE__ */ jsxs14("div", { className: TimeView_default.gridWrapper, children: [
      /* @__PURE__ */ jsx25(HoursColumn, {}),
      /* @__PURE__ */ jsxs14(
        "div",
        {
          className: TimeView_default.grid,
          "data-isweekview": isWeekView,
          onMouseEnter: handleStopDrag,
          onMouseLeave: handleStopDrag,
          children: [
            /* @__PURE__ */ jsx25(
              TimeBackground,
              {
                activeDate,
                dispatch,
                handleMouseEvent,
                onEventReschedule,
                placeholderRef,
                state,
                view
              }
            ),
            /* @__PURE__ */ jsx25(TimeIndicator, { activeDate, isDayView }),
            weekDatesArray.map(({ date }, dayIndex) => {
              const orderedEvents = dayMap[dayIndex];
              const { isActive, isAllDay, start, end } = state.placeholderEvent;
              const showPlaceholder = isActive && !isAllDay && isBetween(date, start, end);
              if (showPlaceholder) orderedEvents.push(state.placeholderEvent);
              return orderedEvents.map((event) => /* @__PURE__ */ jsx25(
                Event,
                {
                  date,
                  dispatch,
                  enableRescheduling,
                  event,
                  onEventClick,
                  placeholderRef,
                  renderContextMenu,
                  state,
                  view
                },
                event.id
              ));
            })
          ]
        }
      )
    ] }) })
  ] });
}

// package/features/year-view/YearView.module.css
var YearView_default = {};

// package/features/year-view/components/MonthDate.tsx
import { useRef as useRef6 } from "react";

// package/features/year-view/components/MonthDate.module.css
var MonthDate_default = {};

// package/features/year-view/components/MonthDate.tsx
import { jsx as jsx26 } from "react/jsx-runtime";
function MonthDate({ date, handleClick, isToday, isDimmed, isActive }) {
  const ref = useRef6(null);
  return /* @__PURE__ */ jsx26(
    "div",
    {
      ref,
      "data-date": date.format("DD-MMM-YYYY"),
      className: MonthDate_default.date,
      "data-today": isToday,
      "data-dimmed": isDimmed,
      "data-active": isActive,
      onMouseDown: (e) => e.stopPropagation(),
      onClick: (e) => handleClick(e, date, ref),
      children: date.format("D")
    }
  );
}

// package/features/year-view/utils/generateYearDates.ts
import dayjs9 from "dayjs";
function generateYearDates(activeDate, events) {
  const result = {};
  const activeDates = /* @__PURE__ */ new Set();
  events.forEach(({ start, end }) => {
    let current = start.clone().startOf("day");
    const endOfDay = end.clone().startOf("day");
    while (current.isBefore(endOfDay, "day") || current.isSame(endOfDay, "day")) {
      activeDates.add(current.format("YYYY-MM-DD"));
      current = current.add(1, "day");
    }
  });
  let currentDate = activeDate.startOf("year");
  MONTHS.forEach((month, i) => {
    const startOfMonth = currentDate.clone().day(0);
    const dateArray = Array.from({ length: DAYS_IN_FULL_MONTH }, (_, i2) => {
      const date = startOfMonth.clone().add(i2, "day");
      const isToday = date.isSame(dayjs9(), "day");
      const isCurrentMonth = currentDate.isSame(date, "month");
      const isActive = isCurrentMonth && activeDates.has(date.format("YYYY-MM-DD"));
      return { date, isToday, isActive, isCurrentMonth };
    });
    result[month] = dateArray;
    currentDate = currentDate.month(i + 1);
  });
  return result;
}

// package/features/year-view/YearView.tsx
import { jsx as jsx27, jsxs as jsxs15 } from "react/jsx-runtime";
function YearView({ activeDate, dispatch, events, state }) {
  const yearDates = generateYearDates(activeDate, events);
  const handleMouseDown = () => dispatch({ type: "reset_calendar" });
  const handleClick = (e, date, ref) => {
    if (state.overflowIsOpen && e.target === state.overflowAnchor) {
      dispatch({ type: "reset_calendar" });
    } else {
      dispatch({ type: "open_overflow", date, anchor: ref.current });
    }
  };
  return /* @__PURE__ */ jsx27("div", { className: YearView_default.scrollWrapper, children: /* @__PURE__ */ jsx27("div", { className: YearView_default.yearView, onMouseDown: handleMouseDown, children: MONTHS.map((month) => {
    return /* @__PURE__ */ jsxs15("div", { className: YearView_default.month, children: [
      /* @__PURE__ */ jsx27("div", { className: YearView_default.monthLabel, children: month }),
      /* @__PURE__ */ jsxs15("div", { className: YearView_default.monthDates, children: [
        DAY_LABELS_SHORT.map((day, i) => /* @__PURE__ */ jsx27("div", { className: YearView_default.monthHeaderDay, children: day }, `${month}-${i}`)),
        yearDates[month].map(({ date, isToday, isCurrentMonth, isActive }, i) => /* @__PURE__ */ jsx27(
          MonthDate,
          {
            date,
            handleClick,
            isToday,
            isActive,
            isDimmed: !isCurrentMonth
          },
          i
        ))
      ] })
    ] }, month);
  }) }) });
}

// package/features/month-view/MonthView.tsx
import { useMemo as useMemo4 } from "react";

// package/features/month-view/MonthView.module.css
var MonthView_default = {};

// package/features/month-view/components/MonthHeader.module.css
var MonthHeader_default = {};

// package/features/month-view/components/MonthHeader.tsx
import { jsx as jsx28 } from "react/jsx-runtime";
var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function MonthHeader({ isCompact }) {
  return /* @__PURE__ */ jsx28("div", { className: MonthHeader_default.monthHeader, "data-sm": isCompact, children: DAYS.map((day, i) => /* @__PURE__ */ jsx28("div", { className: MonthHeader_default.headerCell, children: day }, i)) });
}

// package/features/month-view/utils/getMaxEvents.ts
var getMaxEvents = (ROW_HEIGHT, isCompact) => {
  if (ROW_HEIGHT === 0) return 0;
  const PADDING = 2;
  const CELL_BOTTOM = 8;
  const CELL_HEADER = 26;
  const ENTRY_HEIGHT = isCompact ? 18 : 20;
  return Math.max(
    Math.floor((ROW_HEIGHT - CELL_HEADER - CELL_BOTTOM) / (ENTRY_HEIGHT + PADDING)),
    0
  );
};

// package/features/month-view/utils/getMonthDates.ts
var getMonthDates = (activeDate) => {
  const startOfMonth = activeDate.startOf("month").day(0);
  let tempDate = startOfMonth;
  const nextMonth = activeDate.add(1, "month").month();
  let weekDates = [];
  const allDates = [];
  let dayOfWeekIndex = 1;
  while (tempDate.subtract(tempDate.day(), "d").month() !== nextMonth) {
    weekDates.push({ date: tempDate, isCurrentMonth: tempDate.month() === activeDate.month() });
    if (dayOfWeekIndex === 7) {
      allDates.push(weekDates);
      weekDates = [];
      dayOfWeekIndex = 0;
    }
    dayOfWeekIndex++;
    tempDate = tempDate.add(1, "day");
  }
  return { weeks: allDates, first: startOfMonth, last: tempDate };
};

// package/features/month-view/utils/getEventsByWeekMap.ts
function getEventsByWeekMap(weeks, events) {
  return weeks.reduce((a, c, i) => __spreadProps(__spreadValues({}, a), { [i]: arrangeWeekEvents(filterByWeek(events, c[0].date)) }), {});
}

// package/features/month-view/MonthView.tsx
import { jsx as jsx29, jsxs as jsxs16 } from "react/jsx-runtime";
function MonthView({
  enableRescheduling,
  compact,
  activeDate,
  dispatch,
  events,
  handleMouseEvent,
  handleStopDrag,
  onEventClick,
  onEventReschedule,
  placeholderRef,
  renderContextMenu,
  state
}) {
  const monthDates = useMemo4(() => getMonthDates(activeDate), [activeDate]);
  const minMaxDatesInView = { first: monthDates.first, last: monthDates.last };
  const { ref: gridRef, height: gridHeight } = useElementSize();
  const ROW_HEIGHT = gridHeight / monthDates.weeks.length;
  const EVENT_LIMIT2 = getMaxEvents(ROW_HEIGHT, compact);
  const weekMap = useMemo4(() => getEventsByWeekMap(monthDates.weeks, events), [events, monthDates.weeks]);
  return /* @__PURE__ */ jsxs16("div", { className: MonthView_default.monthView, children: [
    /* @__PURE__ */ jsx29(MonthHeader, { isCompact: compact }),
    /* @__PURE__ */ jsx29("div", { className: MonthView_default.grid, onMouseLeave: handleStopDrag, ref: gridRef, children: monthDates.weeks.map((week, weekIndex) => {
      const orderedEvents = gridHeight > 0 ? weekMap[weekIndex] : [];
      return /* @__PURE__ */ jsx29("div", { className: MonthView_default.row, children: week.map((dayRecord, dayIndex) => /* @__PURE__ */ jsx29(
        CellContainer,
        {
          EVENT_LIMIT: EVENT_LIMIT2,
          enableRescheduling,
          compact,
          dayRecord,
          dispatch,
          handleMouseEvent,
          isInWeekHeader: false,
          minMaxDatesInView,
          onEventClick,
          onEventReschedule,
          orderedEvents,
          placeholderRef,
          renderContextMenu,
          state
        },
        dayIndex
      )) }, weekIndex);
    }) })
  ] });
}

// package/features/overflow-card/OverflowCard.tsx
import dayjs10 from "dayjs";

// package/features/overflow-card/OverflowCard.module.css
var OverflowCard_default = {};

// package/features/overflow-card/OverflowCard.tsx
import { Fragment as Fragment6, jsx as jsx30, jsxs as jsxs17 } from "react/jsx-runtime";
var tryDate = (dateString) => dateString ? dayjs10(dateString) : void 0;
function OverflowCard({
  compact,
  dispatch,
  events,
  colorScheme,
  onEventClick,
  placeholderRef,
  renderContextMenu,
  state,
  enableRescheduling
}) {
  var _a;
  const date = tryDate((_a = state.overflowAnchor) == null ? void 0 : _a.dataset.date);
  if (!date || !state.overflowAnchor) return /* @__PURE__ */ jsx30(Fragment6, {});
  const orderedEvents = arrangeWeekEvents(filterByDate(events, date));
  return /* @__PURE__ */ jsx30(
    EventsCalendarPopover,
    {
      zIndex: 2,
      anchor: state.overflowAnchor,
      isOpen: state.overflowIsOpen,
      colorScheme,
      children: /* @__PURE__ */ jsxs17("div", { className: OverflowCard_default.overflowCard, children: [
        /* @__PURE__ */ jsx30("span", { className: OverflowCard_default.label, children: date.format("dddd, MMMM D") }),
        !orderedEvents.length && /* @__PURE__ */ jsx30("div", { className: OverflowCard_default.empty, children: "No events scheduled for this date" }),
        /* @__PURE__ */ jsx30("div", { className: OverflowCard_default.eventsWrapper, children: orderedEvents.map((event) => /* @__PURE__ */ jsx30(
          Event,
          {
            view: "month",
            isInOverflow: true,
            enableRescheduling,
            compact,
            date,
            dispatch,
            event,
            onEventClick,
            placeholderRef,
            renderContextMenu,
            state
          },
          event.id
        )) })
      ] })
    }
  );
}

// package/EventsCalendar.tsx
import { jsx as jsx31, jsxs as jsxs18 } from "react/jsx-runtime";
function EventsCalendar({
  calendar,
  compact = false,
  colorScheme = "light",
  enableDragCreation = false,
  enableRescheduling = false,
  events = [],
  popoverZIndex = 101,
  isFetching = false,
  noHeader = false,
  onEventClick,
  onEventCreate,
  onEventReschedule,
  renderPopover,
  renderContextMenu,
  views = [...CALENDAR_VIEWS]
}) {
  const { activeDate, setActiveDate, view, setView, state, dispatch } = useInitEventsCalendar(calendar);
  const parsed = useMemo5(() => parseRawEvents(events), [events]);
  const calendarEvents = useMemo5(() => filterByView(parsed, activeDate, view), [parsed, activeDate, view]);
  const isTimeView = view === "week" || view === "day";
  const overflowEvents = isTimeView ? calendarEvents.filter((event) => event.isAllDay) : calendarEvents;
  const { eventAnchor, dragActive, eventDragActive, popoverIsOpen, clickedEvent, placeholderEvent } = state;
  const onClose = () => dispatch({ type: "reset_calendar" });
  const handleStopDrag = () => {
    if (dragActive || eventDragActive) dispatch({ type: "event_create_stop" });
  };
  const placeholderRef = useRef7(null);
  const handleMouseEvent = useMouseEvent({ enableDragCreation, dispatch, state, onEventCreate });
  const basicProps = {
    activeDate,
    dispatch,
    state,
    events: calendarEvents
  };
  const sharedViewProps = __spreadProps(__spreadValues({}, basicProps), {
    compact,
    onEventClick,
    handleStopDrag,
    placeholderRef,
    handleMouseEvent,
    onEventReschedule,
    renderContextMenu,
    enableRescheduling
  });
  const renderCurrentView = () => {
    switch (view) {
      case "year":
        return /* @__PURE__ */ jsx31(YearView, __spreadValues({}, basicProps));
      case "month":
        return /* @__PURE__ */ jsx31(MonthView, __spreadValues({}, sharedViewProps));
      case "week":
      case "day":
        return /* @__PURE__ */ jsx31(TimeView, __spreadProps(__spreadValues({}, sharedViewProps), { view }));
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs18("div", { className: EventsCalendar_default.root, "data-ec-color-scheme": colorScheme, children: [
    noHeader ? null : /* @__PURE__ */ jsx31(Header, { view, setActiveDate, setView, activeDate, views }),
    /* @__PURE__ */ jsxs18("div", { className: EventsCalendar_default.calendar, "data-withheader": !noHeader, onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx31(CircularLoader, { visible: isFetching }),
      renderCurrentView(),
      renderPopover && eventAnchor && /* @__PURE__ */ jsx31(
        EventsCalendarPopover,
        {
          isOpen: popoverIsOpen,
          anchor: eventAnchor,
          zIndex: popoverZIndex,
          colorScheme,
          children: renderPopover({ onClose, clickedEvent, newEvent: placeholderEvent })
        }
      ),
      /* @__PURE__ */ jsx31(
        OverflowCard,
        {
          state,
          compact,
          dispatch,
          events: overflowEvents,
          colorScheme,
          onEventClick,
          placeholderRef,
          renderContextMenu,
          enableRescheduling
        }
      )
    ] })
  ] });
}
export {
  EventsCalendar,
  Header,
  useEventsCalendar
};
//# sourceMappingURL=index.mjs.map