import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
  privateProcedure,
} from "~/server/api/trpc";

// import type { Cocktail } from "@prisma/client";

export const cocktailsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const cocktails = await ctx.prisma.cocktail.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return cocktails;
  }),
  create: adminProcedure
    .input(
      z.object({
        name: z.string().nonempty({ message: "Name cannot be empty" }),
        base: z.string().nonempty({ message: "Base cannot be empty" }),
        story: z.string(),
        ingredients: z.string(),
        recipe: z.string(),
        imageUrl: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("I am here");
      const cocktail = await ctx.prisma.cocktail.create({
        data: {
          name: input.name,
          base: input.base,
          story: input.story,
          ingredients: input.ingredients,
          recipe: input.recipe,
          imageUrl: input.imageUrl,
        },
      });
      return cocktail;
    }),
});
