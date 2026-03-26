import { Typography } from "@mui/material";

export const RatingCell = ({ rating }: { rating: number }) => {
    const formatRating = (rating: number): string => {
        const roundedRating = Math.round(rating * 10) / 10;
        const formattedRating = Number.isInteger(roundedRating)
            ? roundedRating.toString()
            : roundedRating.toFixed(1);
        return `${formattedRating}/5`;
    };

    const isLowRating = rating < 3.5;

    return (
        <Typography
            variant="body2"
            sx={{
                color: isLowRating ? 'error.main' : 'text.primary',
                fontWeight: isLowRating ? 600 : 400,
            }}
        >
            {formatRating(rating)}
        </Typography>
    );
};