<script lang="ts">
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
    import Waves from '$lib/components/assets/Waves.svelte';
</script>

<footer class="border-accent relative overflow-hidden border-t-8">
    <div class="col-start-1 row-start-1 h-full w-full">
        <Waves style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1;" wavesType="/netro_footer.json" />
    </div>
    <div class="col-start-1 row-start-1 flex flex-col gap-7 px-16 py-9">
        <div class=" flex flex-row justify-between">
            <div class="flex flex-col gap-18 text-lg">
                <div class="flex flex-col gap-6">
                    <div>
                        <span
                            >&copy; 2022-2026 Netro LLC. All rights reserved. Design assistance by <a
                                href="https://untone.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="underline">UNTONE</a
                            >.</span
                        >
                        <br />
                        <span>
                            Made with
                            <span class="heart text-error inline-block">&#10084;</span>
                            in Texas.
                        </span>
                    </div>
                    <ul class="flex flex-row items-center gap-6">
                        <li>
                            <a href="https://discord.gg/HdKeWtV">
                                <SiDiscord class="text-3xl" />
                            </a>
                        </li>
                        <li>
                            <a href="https://youtube.com/@NetroCorp">
                                <SiYoutube class="text-3xl" />
                            </a>
                        </li>
                        <li>
                            <a href="https://bsky.app/profile/netrocorp.net">
                                <SiBluesky class="text-3xl" />
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/NetroSoftware">
                                <SiGithub class="text-3xl" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex flex-row gap-17 text-2xl">
                <div class="flex flex-col gap-4">
                    <span class="font-display font-semibold">NETRO</span>
                    <a href="/about" class="footer-links">About Us</a>
                    <a href="/apply" class="footer-links">Work at Netro</a>
                    <a href="/contact" class="footer-links">Customer Support</a>
                </div>
                <div class="flex flex-col gap-4">
                    <span class="font-display font-semibold">LEGAL</span>
                    <a href="/legal/privacy" class="footer-links">Privacy Policy</a>
                    <a href="/legal/terms" class="footer-links">Terms of Service</a>
                    <a href="/legal/netrohost/terms" class="footer-links">NetroHost Terms</a>
                </div>
                <div class="flex flex-col gap-4">
                    <span class="font-display font-semibold">MORE</span>
                    <a href="https://netro.host/" class="footer-links">NetroHost</a>
                    <!-- <a href="https://gardens.wiki/" class="footer-links">Gardens Wiki</a> -->
                    <a href="https://theaceae.org/" class="footer-links">Theaceae Collective</a>
                    <a href="https://my.netro.works/" class="footer-links">myNetro Account</a>
                </div>
            </div>
        </div>
    </div>
</footer>

<style scoped>
    a.footer-links {
        color: #9ca3af;
        &:hover {
            color: #e5e7eb;
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
