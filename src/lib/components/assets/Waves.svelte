<script>
    export let style = '';
    export let className = '';
    export let wavesType = '';
</script>

<div
    class={`unicorn-embed ${className}`}
    data-us-project-src={wavesType}
    data-us-lazyload="true"
    data-us-scale="0.8"
    data-us-dpi="1"
    data-us-fps="60"
    style={`width: 100%; background-image: url(/images/waves.png); background-size: cover; ${style}`}
></div>
