import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// import type { Cocktail } from "@prisma/client";

export const cocktailsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const cocktails = await ctx.prisma.cocktail.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return cocktails;
  }),
});
