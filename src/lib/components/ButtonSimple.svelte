<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';

    let { class: className = '', href = '#', text = 'add message', ...rest }: HTMLAnchorAttributes & { text?: string } = $props();
</script>

<div>
    <!-- mimic the width of the expanded button for the container -->
    <span class="pointer-events-none invisible block h-0 pr-8 pl-4 tracking-[10%]">{text}</span>
    <!-- actual button: -->
    <a {href} class={['group relative flex flex-row items-center gap-4 transition-all', className]} {...rest}>
        <span class="relative z-10 mx-auto inline-flex w-max flex-nowrap items-center gap-4">
            <span
                class="whitespace-nowrap transition-all duration-300
                   group-hover:tracking-[10%]"
            >
                {text}
            </span>
            <span
                class="group-hover:border-accent absolute -inset-2 -z-10 border-2
                   border-white/0 transition-all duration-300
                   ease-in-out group-hover:bg-black"
            >
            </span>
            <img src="/images/arrow-default.png" alt="arrow pointing right" class="h-8 w-8 shrink-0 transition-all duration-800" />
        </span>
    </a>
</div>
