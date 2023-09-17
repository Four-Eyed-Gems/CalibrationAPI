export interface SuccessResponseType {
    success: Boolean,
    data: {
        email?: string;
        accessToken?: string;
        refreshToken?: string;
        otp?: number
    },
}
