import { ISearchVideoForm, SearchVideoSchema } from "@app/api/schema/Api";
import { InputSearch } from "@components/ui/input-search";
import { routePath } from "@constants/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export const SearchForm = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const search = searchParams.get("q");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISearchVideoForm>({
        resolver: zodResolver(SearchVideoSchema),
        values: { query: search ?? "" },
    });

    const onSubmit: SubmitHandler<ISearchVideoForm> = (data) =>
        router.push(`${routePath.search}?q=${data.query}`);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={"md:flex justify-center w-full hidden"}
        >
            <InputSearch
                {...register("query")}
                type="text"
                placeholder="Đường dẫn video hoặc từ khóa"
                className={"w-96"}
            />
        </form>
    );
};