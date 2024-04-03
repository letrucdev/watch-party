import { z } from "zod";

export const RegisterSchema = z
    .object({
        email: z.string().email({ message: "Email không hợp lệ" }),
        displayName: z
            .string()
            .min(3, { message: "Tên hiển thị cần tối thiểu 3 ký tự" })
            .max(25, { message: "Tên hiển thị không được vượt quá 25 ký tự" }),
        password: z
            .string()
            .min(6, { message: "Mật khẩu cần tối thiểu 6 ký tự" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Nhập lại mật khẩu không khớp",
        path: ["confirmPassword"],
    });

export const LoginSchema = z.object({
    email: z
        .string({
            required_error: "Email không được bỏ trống",
        })
        .email({ message: "Email không hợp lệ" })
        .min(1, { message: "Email không được bỏ trống" }),
    password: z
        .string({
            required_error: "Mật khẩu không được bỏ trống",
        })
        .min(1, { message: "Mật khẩu không được bỏ trống" }),
});

export type IRegister = z.infer<typeof RegisterSchema>;
export type ILogin = z.infer<typeof LoginSchema>;
