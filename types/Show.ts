export type Show = {
    id: number;
    title?: string;
    image?: string;
    rating?: number;
    genres?: string[];
    link?: string;
    status?: string;
    showSchedule?: { time?: string; days?: string[] };
    showSummary?: string;
};
