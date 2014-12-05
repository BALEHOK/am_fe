declare module AppDispatcher {
    export function register(callback:any);
    export function waitFor(ids:string[]);
}