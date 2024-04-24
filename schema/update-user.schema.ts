import {z} from "zod";
import {ValidationText} from "@constants/text";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const UpdateUserInfoSchema = z.object({
        email: z
            .string({required_error: ValidationText.requiredEmail})
            .email({message: ValidationText.invalidEmail}),
        displayName: z
            .string({
                required_error: ValidationText.requiredDisplayName,
            })
            .max(35, {message: ValidationText.maxLengthDisplayName}),
        avatar: z
            .custom<FileList>()
            .refine(
                (files) =>
                    files.length === 1
                        ? files[0].size <= MAX_FILE_SIZE
                        : true,
                {message: ValidationText.maxFileSize}
            )
            .refine(
                (files) =>
                    files.length === 1
                        ? ACCEPTED_IMAGE_TYPES.includes(files[0].type)
                        : true,
                {message: ValidationText.invalidAvatarFileType}
            )
            .optional(),
    })
;

export const ChangeUserPasswordSchema = z
    .object({
        oldPassword: z.string({required_error: ValidationText.requiredPassword}),
        newPassword: z
            .string({
                required_error: ValidationText.requiredPassword,
            })
            .min(6, {message: ValidationText.minLengthPassword}),
        confirmNewPassword: z.string({
            required_error: ValidationText.requiredPassword,
        }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: ValidationText.confirmPasswordNotMatch,
        path: ['confirmNewPassword'],
    });

export const UpdateUserSystemSettingSchema = z.object({
    animationEnable: z.boolean({invalid_type_error: ValidationText.invalidValue}),
    ecoMode: z.boolean({invalid_type_error: ValidationText.invalidValue}),
});

export type IUpdateUserSystemSettingSchema = z.infer<typeof UpdateUserSystemSettingSchema>
export type IChangeUserPasswordSchema = z.infer<typeof ChangeUserPasswordSchema>
export type IUpdateUserInfoSchema = z.infer<typeof UpdateUserInfoSchema>;