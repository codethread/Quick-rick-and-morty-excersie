declare module 'request-promise' {
    function rp<T>({ uri: string, json: boolean }): T;
    export default rp;
}
