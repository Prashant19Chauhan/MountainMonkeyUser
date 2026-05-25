import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required"),
})

export type LoginType = z.infer<typeof loginSchema>


export const signupSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
})

export type SignupType = z.infer<typeof signupSchema>

export const SignupFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  countriesVisited: z.array(z.string()),
  dreamDestination: z.array(z.string()),
  travelTypes: z.array(z.string()),
  frequency: z.string(),
  adventureLevel: z.number(),
  bio: z.string(),
  phone: z.string().min(10, "Phone number is required").max(15, "Phone number is invalid"),
  language: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  pincode: z.string(),
  address: z.string(),
  role: z.enum(["user", "creator"]),
  isProfileCompleted: z.boolean(),
  isVerified: z.boolean(),
  isBlocked: z.boolean(),
  isDeleted: z.boolean()
})

export type SignupFormType = z.infer<typeof SignupFormSchema>