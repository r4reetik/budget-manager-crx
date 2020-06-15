chrome.contextMenus.create({
    type: "normal",
    id: "spendSelected",
    title: "Spend Selected Amount",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "spendSelected" && Number.isInteger(parseInt(info.selectionText))) {
        const spendAmount = parseInt(info.selectionText);
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
    } else {
        alert("This amount is Invalid!");
    }
});

chrome.storage.onChanged.addListener((changes, areaName) => {
    chrome.storage.local.get("badge", (option) => {
        if (option.badge === true) {
            chrome.browserAction.setBadgeText({ text: changes.spendTotal.newValue.toString() });
        }
    });
});
