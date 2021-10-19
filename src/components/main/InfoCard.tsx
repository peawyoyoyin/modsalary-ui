import { Box, Text } from "grommet";

export const InfoCard: React.FC<{ label: string; value?: any, helperText?: any }> = ({
    label,
    value,
    helperText,
    children
}) => {
    return (
        <Box>
            <Box>
                <Text size="small" color="gray">
                    {label}
                </Text>
            </Box>
            <Box>
                {
                    value && (
                        <Text size="medium" color="black" wordBreak="break-all">
                            {value}
                        </Text>
                    )
                }
                {
                    helperText && (
                        <Box>
                            <Text size="xsmall" color="gray" wordBreak="break-word">
                                {helperText}
                            </Text>
                        </Box>
                    )
                }
                {children}
            </Box>
        </Box>
    );
};
