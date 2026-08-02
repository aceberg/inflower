import { configStore } from "../store/configs";

export function formatDate(date:string): string {
    switch (date) {
        case "today":
            return configStore.today();

        case "month":
            return configStore.today().slice(0, 7);

        case "prevm": {
            const d = new Date(configStore.today());
            d.setMonth(d.getMonth() - 1);
            return d.toISOString().slice(0, 7);
        }

        case "year":
            return configStore.today().slice(0, 4);

        case "decade": {
            return configStore.today().slice(0, 9);
        }

        default:
            return "";
    }
}

export function formatMoney(amount: number): string {
    return (amount / 100).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).replace(/,/g, " ");
}