export const formatNumberSocialStyle = (number: number) =>
    new Intl.NumberFormat("vi", {
        notation: "compact",
    }).format(number);
