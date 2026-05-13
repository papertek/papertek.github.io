<script>
    import OurPartners from '$lib/components/about/OurPartners.svelte';
    import OurTeam from '$lib/components/about/OurTeam.svelte';
</script>

<h1 class="text-5xl font-bold">ABOUT US</h1>
<div class="mt-6 flex max-w-200 flex-col gap-4 text-xl">
    <p>
        <span class="text-accent font-bold">NETRO</span> is a software collective driven by simple principles: putting users first, challenging
        tradition with originality, and constantly improving. We don't sell out, make empty promises, or cut corners for profit. What we create
        is a direct reflection of that commitment.
    </p>
    <p>
        We iterate quickly and thoughtfully, refining what works and fixing what doesn't. Continuous growth means owning our impact and
        staying open to radical feedback, ensuring we meet our own standards.
    </p>
</div>

<div class="mt-24 flex max-w-301 flex-col gap-4 text-xl">
    <h1 class="text-5xl font-bold">OUR PARTNERS</h1>
    <p class="text-lg opacity-90">
        By partnering with Netro, we share resources, talent, and expertise to create cool stuff. We collaborate on projects, exchange
        ideas, and support one another.
    </p>
    <p class="text-lg opacity-90">The partner program is currently closed, but we will reopen applications in the near future.</p>
    <OurPartners />
</div>

<div class="mt-24 flex max-w-301 flex-col gap-4 text-xl">
    <h1 class="text-5xl font-bold">OUR TEAM</h1>
    <p class="text-lg opacity-90">
        Our company is flat by design! We prioritize collectivism, empathy, and mutual respect to ensure that every member has a direct say
        in what we make.
    </p>
    <OurTeam />
</div>
