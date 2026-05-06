// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }

    interface UnicornStudioNamespace {
        init(): Promise<any>;
        destroy(): void;
    }

    const UnicornStudio: UnicornStudioNamespace;
}

export {};
