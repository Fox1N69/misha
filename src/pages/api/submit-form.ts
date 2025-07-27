import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();

        const name = formData.get("name")?.toString().trim();
        const event = formData.get("event")?.toString().trim();
        const city = formData.get("city")?.toString().trim();
        const phone = formData.get("phone")?.toString().trim();
        const about = formData.get("about")?.toString().trim();

        if (!name || !event || !city || !phone || !about) {
            return new Response(
                JSON.stringify({
                    error: "All fields are required",
                    missing: [
                        !name && "name",
                        !event && "event",
                        !city && "city",
                        !phone && "phone",
                        !about && "about"
                    ].filter(Boolean)
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }


        const strapiUrl = import.meta.env.STRAPI_URL || "http://localhost:1337";
        const strapiToken = import.meta.env.STRAPI_TOKEN
        if (!strapiToken) {
            console.warn("STRAPI_API_TOKEN not found in environment variables");
        }

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (strapiToken) {
            headers["Authorization"] = `Bearer ${strapiToken}`;
        }

        const data = {
            data: {
                name,
                event,
                city,
                phone,
                about,
                submittedAt: new Date().toISOString()
            },
        };

        console.log("Sending to Strapi:", { url: `${strapiUrl}/api/forms`, data });

        const res = await fetch(`${strapiUrl}/api/forms`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Strapi error:", {
                status: res.status,
                statusText: res.statusText,
                body: errorText
            });

            return new Response(
                JSON.stringify({
                    error: "Failed to submit application",
                    ...(import.meta.env.DEV && { details: errorText })
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        const responseData = await res.json();
        console.log("Strapi response:", responseData);

        return new Response(
            JSON.stringify({
                success: true,
                message: "Application submitted successfully",
                id: responseData.data?.id
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" }
            }
        );

    } catch (error) {
        console.error("API error:", error);

        return new Response(
            JSON.stringify({
                error: "Internal server error",
                ...(import.meta.env.DEV && {
                    details: error instanceof Error ? error.message : String(error)
                })
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
};
