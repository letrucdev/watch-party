import {z} from "zod";

export const RegisterSchema = z
    .object({
        email: z
            .string({required_error: "Email là bắt buộc"})
            .email({message: "Email không hợp lệ"}),
        displayName: z
            .string({
                required_error: "Tên hiển thị là bắt buộc",
            })
            .max(35, {message: "Tên hiển thị không được vượt quá 35 ký tự"}),
        password: z
            .string({
                required_error: "Mật khẩu là bắt buộc",
            })
            .min(6, {message: "Mật khẩu cần có độ dài tối thiểu là 6 ký tự"}),
        confirmPassword: z
            .string({
                required_error: "Nhập lại mật khẩu là bắt buộc",
            })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Nhập lại mật khẩu không khớp",
        path: ['confirmPassword'],
    })
    .refine(
        (data) => !data.displayName.toLowerCase().concat().includes('admin'),
        {
            message: "Tên hiển thị không hợp lệ",
            path: ['displayName'],
        },
    );

export type IRegisterSchema = z.infer<typeof RegisterSchema>