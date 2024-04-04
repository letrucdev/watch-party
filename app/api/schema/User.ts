import { z } from "zod";

export const UpdateUserInfoSchema = z.object({
    email: z
        .string({
            required_error: "Email không được bỏ trống",
        })
        .email({ message: "Email không hợp lệ" })
        .min(1, { message: "Email không được bỏ trống" }),
    displayName: z
        .string({
            required_error: "Tên hiển thị không được bỏ trống",
        })
        .min(1, { message: "Tên hiển thị không được bỏ trống" })
        .max(25, { message: "Tên hiển thị không được dài quá 25 ký tự" }),
});

export const ChangeUserPasswordSchema = z
    .object({
        oldPassword: z
            .string()
            .min(6, { message: "Mật khẩu cần tối thiểu 6 ký tự" }),
        newPassword: z
            .string()
            .min(6, { message: "Mật khẩu cần tối thiểu 6 ký tự" }),
        confirmNewPassword: z
            .string()
            .min(6, { message: "Mật khẩu cần tối thiểu 6 ký tự" }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Nhập lại mật khẩu mới không khớp",
        path: ["confirmNewPassword"],
    });

export const UpdateSystemSettingSchema = z.object({
    animationEnable: z.boolean(),
    ecoMode: z.boolean(),
});

export type IUpdateUserInfo = z.infer<typeof UpdateUserInfoSchema>;
export type IChangeUserPassword = z.infer<typeof ChangeUserPasswordSchema>;
export type IUpdateSystemSetting = z.infer<typeof UpdateSystemSettingSchema>;
