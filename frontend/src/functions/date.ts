import { today } from "./exports";

export function getDateFromCurrent(date:string) {
    switch (date) {
        case "today":
            return today();

        case "month":
            return today().slice(0, 7);

        case "prevm": {
            const d = new Date(today());
            d.setMonth(d.getMonth() - 1);
            return d.toISOString().slice(0, 7);
        }

        case "year":
            return today().slice(0, 4);

        case "decade": {
            return today().slice(0, 9);
        }

        default:
            return "";
    }
}