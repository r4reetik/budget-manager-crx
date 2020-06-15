chrome.storage.local.get(["spendTotal", "limit"], (budget) => {
    if (budget.spendTotal) {
        document.getElementById("displaySpend").innerText = budget.spendTotal;
    }
    if (budget.limit) {
        document.getElementById("displayLimit").innerText = budget.limit;
    }
});

document.getElementById("buttonSpend").addEventListener("click", () => {
    const spendAmount = parseInt(document.getElementById("inputSpend").value);
    if (spendAmount) {
        chrome.storage.local.get(["spendTotal", "limit"], (budget) => {
            if (budget.spendTotal) {
                const spendTotal = parseInt(budget.spendTotal);
                const spendUpdate = spendTotal + spendAmount;
                if (spendUpdate <= parseInt(budget.limit)) {
                    chrome.storage.local.set({ spendTotal: spendUpdate });
                } else {
                    chrome.notifications.create("limitExceed", {
                        type: "basic",
                        iconUrl: "/icons/budget_48p.png",
                        title: "Oh! Limit Exceeded",
                        message: "You're spending more than your limit.",
                    });
                }
            } else {
                if (spendAmount <= parseInt(budget.limit)) {
                    chrome.storage.local.set({ spendTotal: spendAmount });
                } else {
                    chrome.notifications.create("limitExceed", {
                        type: "basic",
                        iconUrl: "/icons/budget_48p.png",
                        title: "Oh! Limit Exceeded",
                        message: "You're spending more than your limit.",
                    });
                }
            }
        });
    }
});
