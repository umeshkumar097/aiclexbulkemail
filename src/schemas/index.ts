import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export const EmailAccountSchema = z.object({
    label: z.string().min(1, "Label is required"),
    email: z.string().email("Invalid email address"),
    provider: z.enum(["SMTP", "GMAIL", "SES"]),

    // SMTP fields
    smtpHost: z.optional(z.string()),
    smtpPort: z.optional(z.coerce.number()),
    smtpUser: z.optional(z.string()),
    smtpPassword: z.optional(z.string()),

    // AWS fields
    awsAccessKey: z.optional(z.string()),
    awsSecretKey: z.optional(z.string()),
    awsRegion: z.optional(z.string()),

    dailyLimit: z.optional(z.coerce.number().min(1)),
});

export const CampaignSchema = z.object({
    name: z.string().min(1, "Name is required"),
    subject: z.string().min(1, "Subject is required"),
    body: z.string().optional(),
    emailAccountId: z.string().min(1, "Sender account is required"),
    // status and scheduledAt are handled separately or optional on creation
});

export const RecipientSchema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.optional(z.string()),
    // metadata in JSON string format or object if handled by form
    metadata: z.optional(z.string()),
});
export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum(["ADMIN", "USER"]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
});
