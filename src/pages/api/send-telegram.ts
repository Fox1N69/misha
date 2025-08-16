import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();

        const name = data.get("name") || "-";
        const event = data.get("event") || "-";
        const city = data.get("city") || "-";
        const phone = data.get("phone") || "-";
        const about = data.get("about") || "-";

        const message = `
 Новая заявка:
 Имя: ${name}
 Мероприятие: ${event}
 Город: ${city}
 Телефон: ${phone}
 Описание: ${about}
`;

        const TELEGRAM_TOKEN = import.meta.env.TELEGRAM_TOKEN;
        const CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

        if (!TELEGRAM_TOKEN || !CHAT_ID) {
            throw new Error("Telegram credentials not configured");
        }

        const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
            }),
        });

        if (!telegramResponse.ok) {
            const errorText = await telegramResponse.text();
            throw new Error(`Telegram API error: ${errorText}`);
        }

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: String(err) }), {
            status: 500,
        });
    }
};
