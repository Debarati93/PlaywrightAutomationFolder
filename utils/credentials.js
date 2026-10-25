function getPlaywrightCredentials() {
    const username = "dey.debarati066@gmail.com";
    const password = "Welcome@123";

    if (!username || !password) {
        throw new Error('Set PLAYWRIGHT_EMAIL and PLAYWRIGHT_PASSWORD before running authenticated tests.');
    }

    return {username, password};
}

module.exports = {getPlaywrightCredentials};
