<template>
    <div class="bg-black fixed h-full px-4 py-4 w-full z-10 block max-h-full overflow-auto">
        <div class="max-w-xl m-auto">
            <TopLabels class="mb-4"></TopLabels>

            <div class="flex items-stretch justify-between">
                <div class="text-3xl">Terms of Service</div>
                <router-link to="/about" class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded">Close</router-link>
            </div>

            <h1 class="mt-4 text-2xl">Some info regarding your privacy, protection and your expected behavior</h1>

            <div class="mt-4">
                DISCLAIMER: This is meant to be an informal description about the privacy and protection practices we try to implement in this project. The purpose is to inform the users about how their data is handled. It is not legal-speak and should thus not be interpreted as such. We will try to keep this file up to date with information as accurate as possible, but we cannot guarantee that it is completely accurate at all times. If you have suggestions for improvements please <a href="https://github.com/vikvanderlinden/darts/issues" target="_blank" class="underline">submit an issue on Github</a>, you will be thanked!
            </div>

            <div class="mt-4">
                <span class="block"><b>TL;DR</b></span>
                This site is hosted on Github Pages. They may have different privacy practices and are in control of the backend. The rest of this info is valid for this project on itself.
                <b>NO</b> data is being collected. <b>NO</b> tracking is being done. <b>NO</b> cookies are stored. Only settings and game history may be stored <b>LOCALLY</b> on <b>YOUR</b> device, <b>NO</b> data is sent elsewhere. You can clear this data at any time in the settings under the "data" tab. This site is completely <b>FREE</b> and open-source. There are <b>NO ADS</b> or ad networks on this page.
                <span class="block"><b>End of TL;DR</b></span>
            </div>

            <div class="my-4">
                <ol class="list-decimal ml-4">
                    <li>This project is hosted on Github Pages. They have their <a href="https://docs.github.com/en/github/site-policy/github-terms-of-service" target="_blank" class="underline">own terms of service</a> and each point below is only valid for this project and may be different for the Github Pages backend (for example, it would be possible that they track ip addresses, we do not).</li>
                    <li>This project is fully open-source, the <a href="https://github.com/vikvanderlinden/darts/" target="_blank" class="underline">code is hosted on Github</a> and is covered under the <a href="https://github.com/vikvanderlinden/darts/blob/main/LICENSE" target="_blank" class="underline">MIT license</a>. Feel free to contribute.</li>
                    <li>This project is <b>FREE</b> to use by anyone, without restrictions, whomever you may be, enjoy it. There are no paid plans available and there will not be any paid plans in the future. If you want to support the project, just reach out to contribute in any way possible, that is the most valuable support possible for this project.</li>
                    <li>It is not allowed to exploit other users using the code or website of this project. However, if you find a security vulnerability, please <a href="https://github.com/vikvanderlinden/darts/issues" target="_blank" class="underline">submit an issue on Github</a>, you will be thanked.</li>
                    <li>The creator of this project has the right at any moment in time to take this webpage offline without any prior notification. This may for example happen if Github Pages changes its payment terms or in case of critical vulnerabilities.</li>
                    <li>We do <b>NOT</b> collect <b>ANY</b> data on/of the user.</li>
                    <li>There are <b>NO</b> trackers embedded on this page for analytical or any other purposes. We value your privacy!</li>
                    <li>There are <b>NO ADS</b> shown on this page. a) Ad networks such as those of Google often invade users their privacy by collecting information on them and even for the networks that don't collect information, b) Ads are so annoying. If you want to support the project, just reach out to contribute in any way possible, that is the most valuable support possible for this project.</li>
                    <li>We do <b>NOT</b> store any cookies or information pertaining to the identity of the user or for tracking purposes.</li>
                    <li>We may store the settings (i.e. everything set in the settings page) and game history <b>LOCALLY</b> on <b>YOUR</b> device. <b>NO DATA AT ALL</b> is sent to any backend of any sort.</li>
                    <li>Your locally stored data can be cleared at any point in time by you, without intervention of anyone else, it can be cleared using the browser settings or via the settings page under the "data" tab.</li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    import TopLabels from "@/components/TopLabels.vue";

    export default {
        name: "tos-screen",
        components: {
            TopLabels,
        }
    }
</script>

<style scoped>
</style>
