import { apiGetEntries } from "./api";
import { Entry } from "./models";

export function shiftMonth(month: string, delta: number): string {
    const [y, m] = month.split("-").map(Number);
    const d = new Date(y, m - 1 + delta);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export interface CompareRow {
    category: string;
    currency: string;
    amount1: number;
    amount2: number;
}

export interface CurrencyTotal {
    currency: string;
    amount1: number;
    amount2: number;
}

export interface CompareResult {
    income: CompareRow[];
    expenses: CompareRow[];

    incomeTotals: CurrencyTotal[];
    expenseTotals: CurrencyTotal[];
}

export async function compareMonths(
    date1: string,
    date2: string
): Promise<CompareResult> {

    const [e1, e2] = await Promise.all([
        apiGetEntries(date1),
        apiGetEntries(date2),
    ]);

    const income = createCompMap(
        e1.filter(isIncome),
        e2.filter(isIncome),
    );

    const expenses = createCompMap(
        e1.filter(isExpense),
        e2.filter(isExpense),
    );

    return {
        income,
        expenses,

        incomeTotals: totalsCount(income),
        expenseTotals: totalsCount(expenses),
    };
}

function isIncome(e: Entry) {
    return e.AccFrom === "" && e.AccTo !== "";
}

function isExpense(e: Entry) {
    return e.AccFrom !== "" && e.AccTo === "";
}

function createCompMap(
    e1: Entry[],
    e2: Entry[],
): CompareRow[] {

    const totals1: Record<string, number> = {};
    const totals2: Record<string, number> = {};

    for (const entry of e1) {
        const key = `${entry.Category}\0${entry.Currency}`;
        totals1[key] = (totals1[key] ?? 0) + entry.Amount;
    }

    for (const entry of e2) {
        const key = `${entry.Category}\0${entry.Currency}`;
        totals2[key] = (totals2[key] ?? 0) + entry.Amount;
    }

    return [...new Set([
        ...Object.keys(totals1),
        ...Object.keys(totals2),
    ])]
        .map(key => {
            const [category, currency] = key.split("\0");

            return {
                category,
                currency,
                amount1: totals1[key] ?? 0,
                amount2: totals2[key] ?? 0,
            };
        })
        .sort((a, b) =>
            b.amount2 - a.amount2 ||
            a.category.localeCompare(b.category) ||
            a.currency.localeCompare(b.currency)
        );
}

function totalsCount(rows: CompareRow[]): CurrencyTotal[] {

    const totals: Record<string, CurrencyTotal> = {};

    for (const row of rows) {
        totals[row.currency] ??= {
            currency: row.currency,
            amount1: 0,
            amount2: 0,
        };

        totals[row.currency].amount1 += row.amount1;
        totals[row.currency].amount2 += row.amount2;
    }

    return Object.values(totals)
        .sort((a, b) => a.currency.localeCompare(b.currency));
}