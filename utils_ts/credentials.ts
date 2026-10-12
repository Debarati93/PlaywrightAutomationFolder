export function getPlaywrightCredentials():{
    username: string;
    password: string;
} {
    const username = process.env.PLAYWRIGHT_EMAIL;
    const password = process.env.PLAYWRIGHT_PASSWORD;

    if (!username || !password) {
        throw new Error('Set PLAYWRIGHT_EMAIL and PLAYWRIGHT_PASSWORD before running authenticated tests.');
    }

    return {username, password};
}

