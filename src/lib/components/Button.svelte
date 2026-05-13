<script lang="ts">
    let { class: className = '', href = '#', text = 'add message', ...rest } = $props();
</script>

<a
    {href}
    class={`bg-accent group font-display outline-accent hover:outline-accent flex items-center gap-4 self-end py-4 pr-4 pl-7 text-lg font-bold uppercase outline-2 -outline-offset-2 transition-all ease-in-out hover:bg-black ${className}`}
    {...rest}
>
    {text}
    <img src="/images/arrow-default.png" alt="arrow pointing right" />
</a>
