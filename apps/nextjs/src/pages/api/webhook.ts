import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/api";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const event = req.body as WebhookEvent; // Extract `data` from the request body
      const userJSON = event.data as UserJSON;
      const { id } = userJSON;

      // Basic validation
      if (!userJSON || !id) {
        return res.status(400).json({ error: "User data with id is required" });
      }

      if (event.type != "user.created") {
        return;
      }

      // Run a Prisma transaction to ensure atomic operations
      await prisma.$transaction(async (tx) => {
        // Check if the user already exists
        const existingUser = await tx.user.findUnique({
          where: {
            id: userJSON.id,
          },
        });

        // If the user doesn't exist, create a new user and proceed
        if (!existingUser) {
          const { username } = userJSON || null;
          const emailAddress = userJSON.email_addresses[0]?.email_address;

          if (!emailAddress) {
            return res.status(400).json({
              error:
                "Invalid webhook data. Id, Username, or Email not provided.",
            });
          }
          const createdUser = await prisma?.user.create({
            data: {
              id: id,
              username: username,
              email: emailAddress,
              createdAt: new Date(),
            },
          });

          // Return success response
          return res.status(201).json({ message: "User created successfully" });
        } else {
          // If user already exists
          return res.status(400).json({ error: "User already exists" });
        }
      });
    } catch (err) {
      console.error("Error creating user and mapping reviewableCards:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Method Not Allowed
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
