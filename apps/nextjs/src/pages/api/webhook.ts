import type { IncomingHttpHeaders } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WebhookRequiredHeaders } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { prisma } from '@acme/db';

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export default async function handler(
    req: NextApiRequestWithSvixRequiredHeaders,
    res: NextApiResponse
) {
    const payload = JSON.stringify(req.body);
    const headers = req.headers;
    // Create a new Webhook instance with your webhook secret
    const wh = new Webhook(webhookSecret);

    let evt: WebhookEvent;
    try {
        // Verify the webhook payload and headers
        evt = wh.verify(payload, headers) as WebhookEvent;
    } catch (_) {
        // If the verification fails, return a 400 error
        return res.status(400).json({});
    }
    const { id } = evt.data;

    const eventType = evt.type;
    if (eventType === 'user.created') {
        await prisma?.user.create({
            data: {
                id: id,
                username: evt.data.username,
                email: evt.data.email_addresses[0].email_address
            }
        })
        return res.status(201).json({});
    }
    return res.status(404).json({})
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};