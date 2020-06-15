document.getElementById("buttonLimit").addEventListener("click", () => {
    const limitUpdate = parseInt(document.getElementById("inputLimit").value);
    chrome.storage.local.set({ limit: limitUpdate });
    chrome.notifications.create("setLimit", {
        type: "basic",
        iconUrl: "/icons/budget_48p.png",
        title: "Limit Set Successfully!",
        message: "Your Limit set to ₹" + limitUpdate,
    });
});

document.getElementById("buttonResetSpend").addEventListener("click", () => {
    chrome.storage.local.set({ spendTotal: 0 });
    close();
});

document.getElementById("checkBadge").addEventListener("click", () => {
    if (document.getElementById("checkBadge").checked === true) {
        chrome.storage.local.set({ badge: true });
        chrome.storage.local.get("spendTotal", (budget) => {
            chrome.browserAction.setBadgeText({ text: budget.spendTotal.toString() });
        });
    } else {
        chrome.storage.local.set({ badge: false });
        chrome.browserAction.setBadgeText({ text: "" });
    }
});
