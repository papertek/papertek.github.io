<script lang="ts">
    import Textbox from '$lib/components/Textbox.svelte';
    import Button from '$lib/components/Button.svelte';
</script>

<h1 class="text-5xl font-bold">CONTACT US</h1>
<div class="border-t-accent mt-6 h-auto border-t-11 bg-black/50 p-8 xl:w-301">
    <div class="grid gap-4 font-sans text-2xl xl:grid-cols-2">
        <div class="flex w-full flex-col gap-6 xl:mb-35">
            <div class="flex items-center gap-4">
                <img src="/images/@placeholder.png" alt="Contact Us" class="h-18 w-18 object-cover" />
                <div class="font-display flex flex-col">
                    <span class="text-accent">Email</span>
                    <a href="mailto:hello@netro.works" class="hover:text-white/70 hover:underline">hello@netro.works</a>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <img src="/images/@placeholder.png" alt="Contact Us" class="h-18 w-18 object-cover" />
                <div class="font-display flex flex-col">
                    <span class="text-accent">Discord</span>
                    <a
                        href="https://discord.gg/HdKeWtV"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:text-white/70 hover:underline"
                    >
                        Click to join our server!
                    </a>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <img src="/images/@placeholder.png" alt="Contact Us" class="h-18 w-18 object-cover" />
                <div class="font-display flex flex-col">
                    <span class="text-accent">GitHub</span>
                    <a
                        href="https://github.com/NetroSoftware"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:text-white/70 hover:underline"
                    >
                        Click to visit our GitHub!
                    </a>
                </div>
            </div>
        </div>

        <!-- wip -->
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
                <Textbox rows="1" placeholder="Your name" />
                <Textbox rows="1" placeholder="Your email" />
            </div>
            <div class="flex flex-col gap-1 text-xl">
                <span>Reason for contact</span>
                <!-- todo: make this work -->
                <select class="border-accent/50 focus:ring-accent border bg-black px-5 py-4 text-white placeholder:text-white/50">
                    <option value="" disabled selected>Please select one</option>
                    <option value="support">Support</option>
                    <option value="question">Questions</option>
                    <option value="partners">Partners</option>
                    <option value="trust-and-safety">Trust and Safety</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="flex-1">
                <Textbox class="h-full w-full" placeholder="Message content" />
            </div>

            <!-- wip -->
            <Button href="/submit" text="send message" />
        </div>
    </div>
</div>
