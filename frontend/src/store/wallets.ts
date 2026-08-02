import { createStore } from "solid-js/store";
import { apiDelWallet, apiGetWallets, apiHideWallet } from "../functions/api";
import { Wallet } from "../functions/models";
import { createMemo } from "solid-js";


const [wallets, setWallets] = createStore<Wallet[]>([]);
const [list, setList] = createStore<string[]>([]);

async function reload() {

    const data = await apiGetWallets();
    
    if (data !== null) {
        setWallets(data);

        setList(wallets.filter(w => !w.Hide).map(w => w.Name));
    }
}

async function remove(id: number) {
    await apiDelWallet(id);

    await reload();
}

async function hide(id: number) {
    await apiHideWallet(id);

    await reload();
}

const totalsMain = createMemo(() =>
    wallets.reduce<Record<string, number>>((acc, w) => {
        if (w.Hide) return acc;
        acc[w.Currency] = (acc[w.Currency] ?? 0) + w.Amount;
        return acc;
    }, {})
);

const totalsAll = createMemo(() =>
    wallets.reduce<Record<string, number>>((acc, w) => {
        acc[w.Currency] = (acc[w.Currency] ?? 0) + w.Amount;
        return acc;
    }, {})
);

export const walletStore = {
    wallets,
    list,

    reload,
    remove,
    hide,

    totalsAll,
    totalsMain,
};
