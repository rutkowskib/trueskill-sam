export const buildResponse = (status: number, body?: object) => ({
    statusCode: 200,
    body: JSON.stringify(body),
    headers: {
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
    },
});