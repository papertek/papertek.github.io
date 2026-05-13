<script lang="ts">
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
    import Waves from './assets/Waves.svelte';
    import NetroLogo from './NetroLogo.svelte';

    let footerSections = $state([
        {
            title: 'NETRO',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Work at Netro', href: '/apply' },
                { name: 'Contact us', href: '/contact' },
                { name: 'Our Blog', href: '/blog' }
            ]
        },
        {
            title: 'SERVICES',
            links: [
                { name: 'NetroHost', href: 'https://netro.host/', external: true },
                { name: 'Theaceae Collective', href: 'https://theaceae.org/', external: true },
                { name: 'Gardens Wiki', href: 'https://alpha.potaro.wiki/news/gardens-wiki', external: true }
                // { name: 'myNetro', href: 'https://my.netro.works/' }
            ]
        },
        {
            title: 'MORE',
            links: [
                { name: 'Privacy Policy', href: '/legal/privacy' },
                { name: 'Terms of Service', href: '/legal/terms' },
                { name: 'NetroHost Terms', href: '/legal/netrohost/terms' },
                { name: 'GitHub Sponsors', href: 'https://github.com/sponsors/NetroSoftware', external: true }
            ]
        }
    ]);

    let socials = $state([
        { icon: SiDiscord, href: 'https://discord.gg/HdKeWtV' },
        { icon: SiYoutube, href: 'https://youtube.com/@NetroCorp' },
        { icon: SiBluesky, href: 'https://bsky.app/profile/netrocorp.net' },
        { icon: SiGithub, href: 'https://github.com/NetroSoftware' }
    ]);
</script>

<footer class="border-accent relative overflow-hidden border-t-8">
    <div
        class="pointer-events-none absolute inset-0 z-0 opacity-40"
        style="background-image: radial-gradient(circle, rgb(0 0 0) 0%, rgba(0, 0, 0, 0) 67%);"
    ></div>

    <div class="col-start-1 row-start-1 h-full w-full">
        <Waves
            className="lg:h-screen h-full"
            style="position: absolute; top: 0; left: 0; width: 100vw; z-index: -1;"
            wavesType="/netro_footer.json"
            backgroundImage="/images/static-footer.jpg"
            backgroundSize="contain"
        />
    </div>
    <!-- the actual footer -->
    <div
        class="3xl:max-w-560 3xl:mx-auto col-start-1 row-start-1 flex flex-col justify-between gap-7 px-5 py-9 text-xl font-bold text-white/70 lg:px-16 xl:flex-row"
    >
        <!-- logo with text and love -->
        <div>
            <a href="/" class="group flex justify-center xl:block">
                <NetroLogo
                    class="hover:fill-accent mb-8 w-70 fill-white transition-all duration-300 ease-in-out group-hover:scale-102 lg:w-135 lg:md:h-29.5"
                />
            </a>
            <div class="border-accent flex flex-col items-center gap-7 text-center xl:items-start xl:border-l-4 xl:pl-6 xl:text-left">
                <p class="max-w-[42ch]">
                    Home of the future. We're a independent software collective creating user-first experiences. We collaborate to create
                    what's next.
                </p>

                <span>
                    Made with
                    <span class="heart text-error inline-block">&#10084;</span>
                    in Texas.
                </span>
                <span class="text-xs tracking-[24%] text-white/40">
                    &copy; 2022-2026 NETRO LLC // Design assistance by
                    <a href="https://untone.org/" target="_blank" rel="noopener noreferrer" class="underline hover:text-white">UNTONE</a>.
                </span>
            </div>
        </div>
        <div class="flex flex-col justify-between">
            <div class="flex flex-row flex-wrap gap-14 md:justify-center xl:justify-start">
                {#each footerSections as section}
                    <div class="flex flex-col gap-4">
                        <span class="bg-accent font-display w-fit px-2 py-1 font-bold text-black">
                            {section.title}
                        </span>
                        <nav class="border-accent flex flex-col gap-4 border-l-2 pl-4">
                            {#each section.links as link}
                                <a
                                    href={link.href}
                                    class="footer-links transition-colors"
                                    target={link.external ? '_blank' : undefined}
                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                >
                                    {link.name}
                                </a>
                            {/each}
                        </nav>
                    </div>
                {/each}
            </div>
            <div>
                <ul class="mt-7 flex flex-row items-center justify-center gap-4 text-white xl:mt-0 xl:justify-end">
                    {#each socials as { icon: Icon, href }}
                        <li>
                            <a
                                {href}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="border-accent flex items-center justify-center border-2 bg-black p-3 transition hover:border-white"
                            >
                                <Icon class="text-white" />
                            </a>
                        </li>
                    {/each}
                </ul>
                <div class="mt-4 flex justify-center gap-2 xl:justify-end">
                    <img src="/images/badges/csshard.gif" alt="css is hard" />
                    <a href="https://netro.works/" rel="noopener noreferrer">
                        <img src="/images/badges/netrov1.gif" alt="NetroWorks 1" />
                    </a>
                    <a href="https://netro.works/" rel="noopener noreferrer">
                        <img src="/images/badges/netrov2.gif" alt="NetroWorks 2" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>

<style scoped>
    a.footer-links {
        &:hover {
            color: #ffffff;
        }
    }

    a:hover {
        color: #bbbbbb;
    }

    .heart {
        animation: pulse 2s ease infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }

        50% {
            opacity: 0.727;
            transform: scale(1.2);
        }
    }
</style>
