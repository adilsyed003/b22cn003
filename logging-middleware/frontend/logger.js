const LOG_SERVER = "http://20.244.56.144/evaluation-service/logs";

// replace this with your real token
const ACCESS_TOKEN = import.meta.env.VITE_LOG_ACCESS_TOKEN;

export async function log(stack, level, pkg, message) {
    try {
        const res = await fetch(LOG_SERVER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ stack, level, package: pkg, message }),
        });

        if (!res.ok) {
            console.error("Log server error:", res.status, await res.text());
        }
    } catch (err) {
        console.error("Failed to send log:", err);
    }
}