## Event Management System Documentation

This document outlines an Event Management System implemented in TypeScript using the Azle framework. The system provides functionalities for managing events, including adding, updating, deleting, and retrieving events, as well as additional features such as searching, filtering, and pagination.

### Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Functions](#functions)
   - [addEvent](#addevent)
   - [updateEvent](#updateevent)
   - [deleteEvent](#deleteevent)
   - [getEvent](#getevent)
   - [getEvents](#getevents)
   - [searchEventsByDate](#searcheventsbydate)
   - [filterEventsByLocation](#filtereventsbylocation)
   - [paginateEvents](#paginateevents)
   - [getUpcomingEvents](#getupcomingevents)
   - [updateEventStartTime](#updateeventstarttime)
   - [updateEventEndTime](#updateeventendtime)
   - [searchEventsByTitle](#searcheventsbytitle)
   - [filterEventsByDateRange](#filtereventsbydaterange)
   - [getEventsCreatedAfter](#geteventscreatedafter)
5. [Global Configuration](#global-configuration)
6. [Dependencies](#dependencies)

### Introduction <a name="introduction"></a>

This Event Management System allows users to perform various operations on events, including creating, updating, and deleting events. It also provides functionalities for querying events based on different criteria such as date, location, and title.

### Installation <a name="installation"></a>

To use this system, ensure you have TypeScript installed and set up in your project. Additionally, install the `azle` and `uuid` packages using npm:

```bash
npm install azle uuid
```

### Usage <a name="usage"></a>

1. Import the necessary modules and functions:

```typescript
import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';
```

2. Define types for `EventRecord` and `EventPayload`.

3. Initialize a map to store event records:

```typescript
const eventStorage = new StableBTreeMap<string, EventRecord>(0, 44, 1024);
```

4. Use the provided functions to manage events as per your requirements.

### Functions <a name="functions"></a>

#### `addEvent(payload: EventPayload): Result<EventRecord, string>`

Adds a new event to the event storage.

#### `updateEvent(id: string, payload: EventPayload): Result<EventRecord, string>`

Updates an existing event with the provided payload.

#### `deleteEvent(id: string): Result<EventRecord, string>`

Deletes an event based on its ID.

#### `getEvent(id: string): Result<EventRecord, string>`

Retrieves an event based on its ID.

#### `getEvents(): Result<Vec<EventRecord>, string>`

Retrieves all events.

#### `searchEventsByDate(date: string): Result<Vec<EventRecord>, string>`

Searches events by date.

#### `filterEventsByLocation(location: string): Result<Vec<EventRecord>, string>`

Filters events by location.

#### `paginateEvents(page: number, pageSize: number): Result<Vec<EventRecord>, string>`

Performs pagination on event records.

#### `getUpcomingEvents(currentDate: string): Result<Vec<EventRecord>, string>`

Retrieves upcoming events based on the current date.

#### `updateEventStartTime(id: string, startTime: string): Result<EventRecord, string>`

Updates the start time of an event.

#### `updateEventEndTime(id: string, endTime: string): Result<EventRecord, string>`

Updates the end time of an event.

#### `searchEventsByTitle(title: string): Result<Vec<EventRecord>, string>`

Searches events by title.

#### `filterEventsByDateRange(startDate: string, endDate: string): Result<Vec<EventRecord>, string>`

Filters events by date range.

#### `getEventsCreatedAfter(timestamp: nat64): Result<Vec<EventRecord>, string>`

Retrieves events created after a specific time.

### Global Configuration <a name="global-configuration"></a>

A workaround is provided to make the `uuid` package work with Azle by configuring the `globalThis.crypto` object.

### Dependencies <a name="dependencies"></a>

- `azle`: A framework for building distributed applications.
- `uuid`: A package for generating universally unique identifiers.

