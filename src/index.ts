import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Define types for EventRecord and EventPayload
type EventRecord = Record<{
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type EventPayload = Record<{
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
}>

// Create a map to store event records
const eventStorage = new StableBTreeMap<string, EventRecord>(0, 44, 1024);

$update;
export function addEvent(payload: EventPayload): Result<EventRecord, string> {
    const record: EventRecord = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    eventStorage.insert(record.id, record);
    return Result.Ok(record);
}

$update;
export function updateEvent(id: string, payload: EventPayload): Result<EventRecord, string> {
    return match(eventStorage.get(id), {
        Some: (record) => {
            const updatedRecord: EventRecord = {...record, ...payload, updatedAt: Opt.Some(ic.time())};
            eventStorage.insert(record.id, updatedRecord);
            return Result.Ok<EventRecord, string>(updatedRecord);
        },
        None: () => Result.Err<EventRecord, string>(`Event with id=${id} not found`)
    });
}

$update;
export function deleteEvent(id: string): Result<EventRecord, string> {
    return match(eventStorage.remove(id), {
        Some: (deletedRecord) => Result.Ok<EventRecord, string>(deletedRecord),
        None: () => Result.Err<EventRecord, string>(`Event with id=${id} not found`)
    });
}

$query;
export function getEvent(id: string): Result<EventRecord, string> {
    return match(eventStorage.get(id), {
        Some: (record) => Result.Ok<EventRecord, string>(record),
        None: () => Result.Err<EventRecord, string>(`Event with id=${id} not found`)
    });
}

$query;
export function getEvents(): Result<Vec<EventRecord>, string> {
    return Result.Ok(eventStorage.values());
}

// Additional functions for event management can be added here, such as searching by date, filtering by location, etc.

// Function to search events by date
$query;
export function searchEventsByDate(date: string): Result<Vec<EventRecord>, string> {
    const records = eventStorage.values();
    const filteredEvents = records.filter(event => event.date === date);
    return Result.Ok(filteredEvents);
}

// Function to filter events by location
$query;
export function filterEventsByLocation(location: string): Result<Vec<EventRecord>, string> {
    const records = eventStorage.values();
    const filteredEvents = records.filter(event => event.location === location);
    return Result.Ok(filteredEvents);
}

// Function to perform pagination on event records
$query;
export function paginateEvents(page: number, pageSize: number): Result<Vec<EventRecord>, string> {
    const records = eventStorage.values();
    const startIndex = (page - 1) * pageSize;
    const paginatedEvents = records.slice(startIndex, startIndex + pageSize);
    return Result.Ok(paginatedEvents);
}

// Function to get upcoming events
$query;
export function getUpcomingEvents(currentDate: string): Result<Vec<EventRecord>, string> {
    const records = eventStorage.values();
    const upcomingEvents = records.filter(event => event.date >= currentDate);
    return Result.Ok(upcomingEvents);
}

// Function to update event start time
$update;
export function updateEventStartTime(id: string, startTime: string): Result<EventRecord, string> {
    return match(eventStorage.get(id), {
        Some: (record) => {
            const updatedRecord: EventRecord = {...record, startTime, updatedAt: Opt.Some(ic.time())};
            eventStorage.insert(record.id, updatedRecord);
            return Result.Ok<EventRecord, string>(updatedRecord);
        },
        None: () => Result.Err<EventRecord, string>(`Event with id=${id} not found`)
    });
}

// Function to update event end time
$update;
export function updateEventEndTime(id: string, endTime: string): Result<EventRecord, string> {
    return match(eventStorage.get(id), {
        Some: (record) => {
            const updatedRecord: EventRecord = {...record, endTime, updatedAt: Opt.Some(ic.time())};
            eventStorage.insert(record.id, updatedRecord);
            return Result.Ok<EventRecord, string>(updatedRecord);
        },
        None: () => Result.Err<EventRecord, string>(`Event with id=${id} not found`)
    });
}

$query;
export function searchEventsByTitle(title: string): Result<Vec<EventRecord>, string> {
    const records = eventStorage.values();
    const filteredEvents = records.filter(event => event.title.toLowerCase().includes(title.toLowerCase()));
    return Result.Ok(filteredEvents);
}

$query;
export function filterEventsByDateRange(startDate: string, endDate: string): Result<Vec<EventRecord>, string> {
    const records = eventStorage.values();
    const filteredEvents = records.filter(event => event.date >= startDate && event.date <= endDate);
    return Result.Ok(filteredEvents);
}

$query;
export function getEventsCreatedAfter(timestamp: nat64): Result<Vec<EventRecord>, string> {
    const records = eventStorage.values();
    const filteredEvents = records.filter(event => event.createdAt > timestamp);
    return Result.Ok(filteredEvents);
}

// A workaround to make the uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    },
};
