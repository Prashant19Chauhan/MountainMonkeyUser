import { z } from "zod";

export const searchJourneysSchema = z.object({
  sourceCityId: z.string().min(1, "Origin city is required"),
  destinationCityId: z.string().min(1, "Destination city is required"),
  travelDate: z.string().min(1, "Departure date is required"),
  passengers: z.number().min(1, "Passenger count must be at least 1").default(1),
  preferences: z.object({
    sortBy: z.enum(["CHEAPEST", "FASTEST", "RECOMMENDED"]).default("RECOMMENDED"),
    maxTransfers: z.number().min(0).max(5).default(3)
  }).default({ sortBy: "RECOMMENDED", maxTransfers: 3 })
});

export type SearchJourneysInput = z.infer<typeof searchJourneysSchema>;
