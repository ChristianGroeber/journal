export interface JournalEntry {
    raw_content: string,
    content: string,
    id: string,
    url: string,
    hidden: boolean,
    meta: EntryMeta,
    file: string,
}

export interface JournalMonth {
    name: string,
    days: JournalEntry[],
}

export interface EntryMeta {
    title: string,
    date: string,
    time: number,
    date_formatted: string,
    description: string | null,
    author: string | null,
}

export interface Gallery {
    // TODO
}
