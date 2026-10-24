export const fail = (message: string) => {
    console.error(message);
    process.exitCode = 1;
}
