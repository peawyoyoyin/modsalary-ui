import { Box, Text } from "grommet";

export const InfoCard: React.FC<{ label: string; value: any }> = ({
    label,
    value,
}) => {
    return (
        <Box>
            <Box>
                <Text size="small" color="gray">
                    {label}
                </Text>
            </Box>
            <Box>
                <Text size="medium" color="black" wordBreak="break-all">
                    {value}
                </Text>
            </Box>
        </Box>
    );
};