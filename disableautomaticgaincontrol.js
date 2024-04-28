// ==UserScript==
// @name         DAGC & YT Adblocker
// @version      2.5.6
// @description  Disables automatic gain control and blocks youtube ads
// @author       Viper
// @namespace    https://raw.githubusercontent.com/LittleYoungBlud/Disable-automatic-gain-control-tampermonkey/main/disableautomaticgaincontrol.js
// @updateURL    https://raw.githubusercontent.com/LittleYoungBlud/Disable-automatic-gain-control-tampermonkey/main/disableautomaticgaincontrol.js
// @match *://*/*
// @icon https://cdn.discordapp.com/attachments/1222736104357236828/1232906936824107008/image.png?ex=662b2990&is=6629d810&hm=7f47e3efb9c8a3fbe83708dc008e80593a4e17053fc13e51d5fbe614c842bfb6&
// @downloadURL https://raw.githubusercontent.com/LittleYoungBlud/Disable-automatic-gain-control-tampermonkey/main/disableautomaticgaincontrol.js
// ==/UserScript==


(function() {
    function setLegacyChromeConstraint(constraint, name, value) {
        if (constraint.mandatory && name in constraint.mandatory) {
            constraint.mandatory[name] = value;
            return;
        }
        if (constraint.optional) {
            const element = constraint.optional.find(opt => name in opt);
            if (element) {
                element[name] = value;
                return;
            }
        }
        // `mandatory` options throw errors for unknown keys, so avoid that by
        // setting it under optional.
        if (!constraint.optional) {
            constraint.optional = [];
        }
        constraint.optional.push({ [name]: value });
    }
    function setConstraint(constraint, name, value) {
        if (constraint.advanced) {
            const element = constraint.advanced.find(opt => name in opt);
            if (element) {
                element[name] = value;
                return;
            }
        }
        constraint[name] = value;
    }
    function disableAutogain(constraints) {
        console.log("Automatically unsetting gain!", constraints);
        if (constraints && constraints.audio) {
            if (typeof constraints.audio !== "object") {
                constraints.audio = {};
            }
            if (constraints.audio.optional || constraints.audio.mandatory) {
                setLegacyChromeConstraint(constraints.audio, "googAutoGainControl", false);
                setLegacyChromeConstraint(constraints.audio, "googAutoGainControl2", false);
            } else {
                setConstraint(constraints.audio, "autoGainControl", false);
            }
        }
    }

    function patchFunction(object, name, createNewFunction) {
        if (name in object) {
            var original = object[name];
            object[name] = createNewFunction(original);
        }
    }

    patchFunction(navigator.mediaDevices, "getUserMedia", function (original) {
        return function getUserMedia(constraints) {
            disableAutogain(constraints);
            return original.call(this, constraints);
        };
    });
    function patchDeprecatedGetUserMedia(original) {
        return function getUserMedia(constraints, success, error) {
            disableAutogain(constraints);
            return original.call(this, constraints, success, error);
        };
    }
    patchFunction(navigator, "getUserMedia", patchDeprecatedGetUserMedia);
    patchFunction(navigator, "mozGetUserMedia", patchDeprecatedGetUserMedia);
    patchFunction(navigator, "webkitGetUserMedia", patchDeprecatedGetUserMedia);
    patchFunction(MediaStreamTrack.prototype, "applyConstraints", function (original) {
        return function applyConstraints(constraints) {
            disableAutogain(constraints);
            return original.call(this, constraints);
        };
    });
    console.log(
        "Disable Autogain by Joey Watts!",
        navigator.mediaDevices.getUserMedia
    );
})();
//
function spamConsole() {
    let counter = 1;
    setInterval(() => {
        console.log(`LOGGING ${counter} COMPLETE`);
        counter++;
    }, 900); // interval
}

spamConsole();

    let counter = 4;
    setInterval(() => {
        console.log(`ERROR ${counter} CAUGHT`);
        counter++;
    }, 900); // interval


spamConsole();
//
const WEBSTORE_LINK = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}`;

const UPDATE_POPUP_RESTRICTION_KEY = "updatePopupRestriction";
const UPDATE_POPUP_DO_NOT_SHOW_KEY = "updatePopupDoNotShow";
const CONFIGURABLE_POPUP_RESTRICTION_KEY = "configurablePopupRestriction";
const CONFIGURABLE_POPUP_DO_NOT_SHOW_KEY = "configurablePopupDoNotShow";
const ANTI_ADBLOCK_POPUP_RESTRICTION_KEY = "antiAdblockPopupRestriction";
const ANTI_ADBLOCK_RELOAD_KEY = "antiAdblockReload";
const ANTI_ADBLOCK_POPUP_DO_NOT_SHOW_KEY = "antiAdblockPopupDoNotShow";
const OTHER_STREAMING_RESTRICTION_KEY = "otherStreamingPopupRestriction";
const OTHER_STREAMING_POPUP_DO_NOT_SHOW_KEY = "otherStreamingPopupDoNotShow";
const POPUP_GENERAL_RESTRICTION_KEY = "popupGeneralRestriction";
const RATING_POPUP_RESTRICTION_KEY = "ratingDialogShown";

const IS_ADDITIONAL_BLOCKING_ENABLED = "isAdditionalBlockingEnabled";

const INSTALLED_AT_KEY = "installedAt";

const MIN_USER_LIVE_FOR_POPUP = 1000 * 60 * 60 * 24 * 3; // 3 days
const GENERAL_POPUPS_RESTRICTION_TIME = 1000 * 60 * 60 * 24; // 1 day
const ANTI_ADBLOCK_POPUP_RESTRICTION_TIME = 1000 * 60 * 60 * 24; // 1 day
const OTHER_STREAMING_RESTRICTION_TIME = 1000 * 60 * 60 * 24; // 1 day

const commonStyles = `
  box-sizing: border-box;
  background: #FFF;
  z-index: 99999999999;
  position: fixed;
  right: 23px;
  top: 68px;
  box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;

const fontCss = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Poppins:wght@500&display=swap');
`;

const popupSvg = `
  <svg width="184" height="158" viewBox="0 0 184 158" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_726_1058)">
    <g clip-path="url(#clip0_726_1058)">
    <rect x="17" y="22" width="120.105" height="114.94" rx="5.81154" fill="#FDFFFD"/>
    <rect width="120.105" height="12.9146" transform="translate(17 22.0096)" fill="#D61717"/>
    <circle cx="26.0417" cy="28.4668" r="1.93718" fill="#FDFFFD"/>
    <circle cx="33.7902" cy="28.4668" r="1.93718" fill="#D61717"/>
    <circle cx="41.5392" cy="28.4668" r="1.93718" fill="#FDFFFD"/>
    <rect x="24.1045" y="69.9996" width="105.254" height="7.74873" rx="1.93718" fill="#D61717" fill-opacity="0.12"/>
    <rect x="24" y="83" width="106" height="44" rx="1.93718" fill="#D61717" fill-opacity="0.12"/>
    <path d="M49.0422 47.6844C48.7593 46.6272 47.9284 45.7964 46.8712 45.5134C44.9571 45 37.2778 45 37.2778 45C37.2778 45 29.5986 45 27.6844 45.5134C26.6272 45.7964 25.7964 46.6272 25.5134 47.6844C25 49.5986 25 53.5949 25 53.5949C25 53.5949 25 57.5912 25.5134 59.5054C25.7964 60.5626 26.6272 61.3934 27.6844 61.6763C29.5986 62.1898 37.2778 62.1898 37.2778 62.1898C37.2778 62.1898 44.9571 62.1898 46.8712 61.6763C47.9284 61.3934 48.7593 60.5626 49.0422 59.5054C49.5557 57.5912 49.5557 53.5949 49.5557 53.5949C49.5557 53.5949 49.5536 49.5986 49.0422 47.6844Z" fill="#FF0000"/>
    <path d="M34.8198 57.2782L41.1993 53.5953L34.8198 49.9123V57.2782Z" fill="white"/>
    <path d="M54.7406 56.1764L51.9834 46.2191H54.3888L55.3551 50.7328C55.6017 51.8446 55.7816 52.7926 55.8988 53.5769H55.9695C56.0504 53.0149 56.2324 52.073 56.5133 50.749L57.5139 46.2191H59.9193L57.1278 56.1764V60.9529H54.7386V56.1764H54.7406Z" fill="#282828"/>
    <path d="M60.643 60.6372C60.1579 60.3098 59.8122 59.8003 59.606 59.109C59.4019 58.4178 59.2988 57.5001 59.2988 56.3519V54.7893C59.2988 53.6311 59.4161 52.6993 59.6505 51.9979C59.885 51.2965 60.2509 50.783 60.7481 50.4616C61.2454 50.1402 61.8983 49.9785 62.7069 49.9785C63.5033 49.9785 64.14 50.1422 64.621 50.4697C65.1001 50.7972 65.4518 51.3106 65.6742 52.006C65.8965 52.7033 66.0077 53.6311 66.0077 54.7893V56.3519C66.0077 57.5001 65.8986 58.4218 65.6823 59.1171C65.466 59.8145 65.1143 60.3239 64.6291 60.6453C64.144 60.9667 63.4851 61.1284 62.6543 61.1284C61.7972 61.1304 61.1282 60.9647 60.643 60.6372ZM63.3638 58.9514C63.4972 58.5997 63.5659 58.0276 63.5659 57.2312V53.8778C63.5659 53.1056 63.4992 52.5396 63.3638 52.1838C63.2283 51.8261 62.9919 51.6482 62.6522 51.6482C62.3248 51.6482 62.0923 51.8261 61.9589 52.1838C61.8235 52.5416 61.7568 53.1056 61.7568 53.8778V57.2312C61.7568 58.0276 61.8214 58.6017 61.9509 58.9514C62.0802 59.3031 62.3126 59.479 62.6522 59.479C62.9919 59.479 63.2283 59.3031 63.3638 58.9514Z" fill="#282828"/>
    <path d="M73.8326 60.955H71.9365L71.7263 59.637H71.6738C71.1583 60.6316 70.3861 61.1288 69.3552 61.1288C68.6417 61.1288 68.1141 60.8943 67.7746 60.4274C67.435 59.9584 67.2651 59.2267 67.2651 58.2322V50.1891H69.6888V58.0906C69.6888 58.5718 69.7413 58.9133 69.8464 59.1176C69.9516 59.3217 70.1274 59.4247 70.374 59.4247C70.5842 59.4247 70.7864 59.3601 70.9804 59.2308C71.1745 59.1013 71.316 58.9376 71.411 58.7396V50.1871H73.8326V60.955Z" fill="#282828"/>
    <path d="M80.4159 48.1694H78.0104V60.9545H75.6393V48.1694H73.2339V46.2208H80.4159V48.1694Z" fill="#282828"/>
    <path d="M86.2618 60.955H84.3657L84.1555 59.637H84.103C83.5876 60.6316 82.8154 61.1288 81.7844 61.1288C81.0709 61.1288 80.5433 60.8943 80.2038 60.4274C79.8642 59.9584 79.6943 59.2267 79.6943 58.2322V50.1891H82.118V58.0906C82.118 58.5718 82.1705 58.9133 82.2756 59.1176C82.3808 59.3217 82.5566 59.4247 82.8033 59.4247C83.0134 59.4247 83.2156 59.3601 83.4096 59.2308C83.6037 59.1013 83.7452 58.9376 83.8402 58.7396V50.1871H86.2618V60.955Z" fill="#282828"/>
    <path d="M94.2825 51.9091C94.1349 51.2299 93.8984 50.7387 93.571 50.4335C93.2435 50.1283 92.7927 49.9767 92.2187 49.9767C91.774 49.9767 91.3576 50.102 90.9715 50.3547C90.5854 50.6073 90.2862 50.9368 90.076 51.3471H90.0579V45.6752H87.7231V60.9527H89.7243L89.9709 59.934H90.0235C90.2114 60.2978 90.4924 60.5828 90.8664 60.7951C91.2403 61.0053 91.6568 61.1104 92.1136 61.1104C92.9322 61.1104 93.5366 60.7324 93.9227 59.9784C94.3088 59.2224 94.5028 58.0439 94.5028 56.439V54.735C94.5028 53.5322 94.428 52.5883 94.2825 51.9091ZM92.061 56.3015C92.061 57.0858 92.0287 57.7003 91.9639 58.145C91.8993 58.5897 91.7921 58.9071 91.6385 59.093C91.4869 59.281 91.2807 59.374 91.024 59.374C90.8239 59.374 90.64 59.3275 90.4702 59.2325C90.3004 59.1395 90.163 58.9981 90.0579 58.8121V52.7015C90.1387 52.4084 90.2802 52.1698 90.4803 51.9819C90.6784 51.7939 90.8967 51.7009 91.1291 51.7009C91.3758 51.7009 91.5657 51.7979 91.6992 51.9899C91.8346 52.184 91.9276 52.5074 91.9802 52.9642C92.0327 53.4211 92.059 54.0699 92.059 54.9128V56.3015H92.061Z" fill="#282828"/>
    <path d="M97.9413 56.9221C97.9413 57.6134 97.9615 58.1309 98.002 58.4766C98.0424 58.8222 98.1273 59.0729 98.2566 59.2326C98.386 59.3902 98.5841 59.469 98.8529 59.469C99.2148 59.469 99.4654 59.3275 99.5988 59.0466C99.7343 58.7656 99.807 58.2967 99.8192 57.6417L101.909 57.765C101.921 57.858 101.927 57.9873 101.927 58.1511C101.927 59.1456 101.655 59.8895 101.111 60.3807C100.567 60.8719 99.7969 61.1185 98.8024 61.1185C97.6078 61.1185 96.7709 60.7445 96.2918 59.9946C95.8108 59.2447 95.5723 58.0864 95.5723 56.5178V54.6379C95.5723 53.0229 95.8209 51.8424 96.3181 51.0985C96.8154 50.3547 97.6664 49.9827 98.8731 49.9827C99.7039 49.9827 100.343 50.1343 100.787 50.4396C101.232 50.7448 101.545 51.2178 101.727 51.8626C101.909 52.5074 102 53.3968 102 54.5328V56.3763H97.9413V56.9221ZM98.2485 51.8485C98.1252 52.0001 98.0444 52.2487 98.002 52.5943C97.9615 52.94 97.9413 53.4635 97.9413 54.167V54.9392H99.7141V54.167C99.7141 53.4757 99.6898 52.9521 99.6433 52.5943C99.5968 52.2366 99.5119 51.9859 99.3886 51.8384C99.2653 51.6928 99.0753 51.618 98.8186 51.618C98.5598 51.62 98.3698 51.6969 98.2485 51.8485Z" fill="#282828"/>
    </g>
    </g>
    <g filter="url(#filter1_d_726_1058)">
    <g clip-path="url(#clip1_726_1058)">
    <rect x="106" y="13" width="60.8642" height="88.9554" rx="4.21367" fill="#FDFFFD"/>
    <rect width="60.8642" height="9.36373" transform="translate(106.001 12.9994)" fill="#D61717"/>
    <ellipse cx="112.554" cy="17.6833" rx="1.40456" ry="1.40456" fill="#FDFFFD"/>
    <ellipse cx="118.172" cy="17.6832" rx="1.40456" ry="1.40456" fill="#D61717"/>
    <ellipse cx="123.79" cy="17.6832" rx="1.40456" ry="1.40456" fill="#FDFFFD"/>
    <rect x="112.555" y="26.108" width="47.755" height="5.61823" rx="1.40456" fill="#D61717" fill-opacity="0.12"/>
    <rect x="112.555" y="35.4743" width="47.755" height="61.8006" rx="1.40456" fill="#D61717" fill-opacity="0.12"/>
    <path d="M122.388 79.7807L128 67.6078H130.878L136.509 79.7807H133.451L128.846 69.0338H129.997L125.374 79.7807H122.388ZM125.194 77.1722L125.967 75.0332H132.443L133.235 77.1722H125.194Z" fill="#D61717"/>
    <path d="M137.815 79.7807V67.6078H143.535C144.902 67.6078 146.108 67.8629 147.151 68.373C148.194 68.8715 149.01 69.5729 149.597 70.4771C150.185 71.3814 150.479 72.4538 150.479 73.6942C150.479 74.9231 150.185 75.9955 149.597 76.9113C149.01 77.8156 148.194 78.5228 147.151 79.0329C146.108 79.5314 144.902 79.7807 143.535 79.7807H137.815ZM140.729 77.4678H143.391C144.231 77.4678 144.956 77.3171 145.568 77.0157C146.192 76.7027 146.671 76.2621 147.007 75.6941C147.355 75.126 147.529 74.4594 147.529 73.6942C147.529 72.9175 147.355 72.2509 147.007 71.6944C146.671 71.1263 146.192 70.6916 145.568 70.3902C144.956 70.0772 144.231 69.9207 143.391 69.9207H140.729V77.4678Z" fill="#D61717"/>
    <path d="M122.388 89.0512V83.6192H125.055C125.742 83.6192 126.256 83.7485 126.6 84.0072C126.948 84.2658 127.122 84.6073 127.122 85.0315C127.122 85.316 127.052 85.5644 126.911 85.7765C126.771 85.9834 126.579 86.1438 126.334 86.2576C126.09 86.3714 125.809 86.4283 125.492 86.4283L125.64 86.1101C125.983 86.1101 126.288 86.167 126.553 86.2809C126.818 86.3895 127.023 86.5525 127.169 86.7697C127.32 86.987 127.395 87.2534 127.395 87.569C127.395 88.0346 127.21 88.3993 126.841 88.6632C126.472 88.9218 125.929 89.0512 125.211 89.0512H122.388ZM123.643 88.1045H125.118C125.445 88.1045 125.692 88.0527 125.859 87.9493C126.03 87.8406 126.116 87.6699 126.116 87.4371C126.116 87.2095 126.03 87.0413 125.859 86.9327C125.692 86.8189 125.445 86.762 125.118 86.762H123.55V85.8463H124.899C125.206 85.8463 125.44 85.7946 125.601 85.6911C125.768 85.5825 125.851 85.4195 125.851 85.2022C125.851 84.9901 125.768 84.8323 125.601 84.7289C125.44 84.6202 125.206 84.5659 124.899 84.5659H123.643V88.1045Z" fill="#D61717"/>
    <path d="M128.352 89.0512V83.6192H129.615V88.0269H132.353V89.0512H128.352Z" fill="#D61717"/>
    <path d="M135.619 89.1443C135.188 89.1443 134.787 89.0745 134.418 88.9348C134.054 88.7951 133.737 88.5985 133.467 88.345C133.201 88.0915 132.993 87.7941 132.843 87.4526C132.697 87.1112 132.624 86.7387 132.624 86.3352C132.624 85.9317 132.697 85.5592 132.843 85.2177C132.993 84.8763 133.204 84.5788 133.474 84.3253C133.745 84.0718 134.062 83.8753 134.426 83.7356C134.79 83.5959 135.185 83.5261 135.612 83.5261C136.043 83.5261 136.438 83.5959 136.797 83.7356C137.161 83.8753 137.476 84.0718 137.741 84.3253C138.011 84.5788 138.222 84.8763 138.373 85.2177C138.523 85.554 138.599 85.9265 138.599 86.3352C138.599 86.7387 138.523 87.1138 138.373 87.4604C138.222 87.8018 138.011 88.0993 137.741 88.3528C137.476 88.6011 137.161 88.7951 136.797 88.9348C136.438 89.0745 136.046 89.1443 135.619 89.1443ZM135.612 88.0734C135.856 88.0734 136.08 88.032 136.282 87.9493C136.49 87.8665 136.672 87.7475 136.828 87.5923C136.984 87.4371 137.104 87.2534 137.187 87.0413C137.276 86.8292 137.32 86.5938 137.32 86.3352C137.32 86.0765 137.276 85.8411 137.187 85.629C137.104 85.4169 136.984 85.2333 136.828 85.0781C136.678 84.9229 136.498 84.8039 136.29 84.7211C136.082 84.6383 135.856 84.5969 135.612 84.5969C135.367 84.5969 135.141 84.6383 134.933 84.7211C134.73 84.8039 134.551 84.9229 134.395 85.0781C134.239 85.2333 134.117 85.4169 134.028 85.629C133.945 85.8411 133.903 86.0765 133.903 86.3352C133.903 86.5887 133.945 86.8241 134.028 87.0413C134.117 87.2534 134.236 87.4371 134.387 87.5923C134.543 87.7475 134.725 87.8665 134.933 87.9493C135.141 88.032 135.367 88.0734 135.612 88.0734Z" fill="#D61717"/>
    <path d="M142.161 89.1443C141.74 89.1443 141.348 89.077 140.984 88.9425C140.625 88.8029 140.313 88.6063 140.048 88.3528C139.782 88.0993 139.574 87.8018 139.424 87.4604C139.278 87.1189 139.205 86.7439 139.205 86.3352C139.205 85.9265 139.278 85.5514 139.424 85.21C139.574 84.8685 139.782 84.5711 140.048 84.3176C140.318 84.0641 140.633 83.8701 140.991 83.7356C141.35 83.5959 141.743 83.5261 142.169 83.5261C142.642 83.5261 143.069 83.6088 143.448 83.7744C143.833 83.9348 144.155 84.1727 144.415 84.4883L143.604 85.2333C143.417 85.0212 143.209 84.8634 142.98 84.7599C142.752 84.6513 142.502 84.5969 142.232 84.5969C141.977 84.5969 141.743 84.6383 141.53 84.7211C141.316 84.8039 141.132 84.9229 140.976 85.0781C140.82 85.2333 140.698 85.4169 140.609 85.629C140.526 85.8411 140.484 86.0765 140.484 86.3352C140.484 86.5938 140.526 86.8292 140.609 87.0413C140.698 87.2534 140.82 87.4371 140.976 87.5923C141.132 87.7475 141.316 87.8665 141.53 87.9493C141.743 88.032 141.977 88.0734 142.232 88.0734C142.502 88.0734 142.752 88.0217 142.98 87.9182C143.209 87.8096 143.417 87.6466 143.604 87.4293L144.415 88.1743C144.155 88.4899 143.833 88.7304 143.448 88.896C143.069 89.0615 142.64 89.1443 142.161 89.1443Z" fill="#D61717"/>
    <path d="M146.4 87.8096L146.329 86.3585L148.942 83.6192H150.346L147.991 86.1412L147.289 86.8861L146.4 87.8096ZM145.269 89.0512V83.6192H146.524V89.0512H145.269ZM149.005 89.0512L147.063 86.6844L147.889 85.792L150.479 89.0512H149.005Z" fill="#D61717"/>
    <rect x="118.641" y="41.6405" width="34.9996" height="17.0568" rx="8.52839" fill="#D61717"/>
    <rect x="120.855" y="43.4127" width="13.423" height="13.423" rx="6.71149" fill="white"/>
    <path d="M126.719 50.6749C126.719 51.0221 126.654 51.3195 126.524 51.567C126.395 51.8135 126.218 52.0023 125.995 52.1334C125.773 52.2645 125.52 52.33 125.238 52.33C124.956 52.33 124.703 52.2645 124.48 52.1334C124.258 52.0012 124.081 51.8119 123.951 51.5654C123.822 51.3179 123.758 51.0211 123.758 50.6749C123.758 50.3278 123.822 50.031 123.951 49.7845C124.081 49.5369 124.258 49.3476 124.48 49.2165C124.703 49.0854 124.956 49.0199 125.238 49.0199C125.52 49.0199 125.773 49.0854 125.995 49.2165C126.218 49.3476 126.395 49.5369 126.524 49.7845C126.654 50.031 126.719 50.3278 126.719 50.6749ZM126.132 50.6749C126.132 50.4306 126.094 50.2245 126.017 50.0567C125.942 49.8878 125.837 49.7604 125.702 49.6743C125.568 49.5873 125.413 49.5438 125.238 49.5438C125.063 49.5438 124.908 49.5873 124.774 49.6743C124.64 49.7604 124.535 49.8878 124.458 50.0567C124.382 50.2245 124.345 50.4306 124.345 50.6749C124.345 50.9193 124.382 51.126 124.458 51.2948C124.535 51.4626 124.64 51.5901 124.774 51.6771C124.908 51.7631 125.063 51.8061 125.238 51.8061C125.413 51.8061 125.568 51.7631 125.702 51.6771C125.837 51.5901 125.942 51.4626 126.017 51.2948C126.094 51.126 126.132 50.9193 126.132 50.6749ZM127.271 52.286V49.0639H129.335V49.5532H127.854V50.4279H129.193V50.9172H127.854V52.286H127.271ZM129.867 52.286V49.0639H131.931V49.5532H130.45V50.4279H131.789V50.9172H130.45V52.286H129.867Z" fill="#D61717"/>
    </g>
    </g>
    <defs>
    <filter id="filter0_d_726_1058" x="0" y="9" width="154.105" height="148.94" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="8.5"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_726_1058"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_726_1058" result="shape"/>
    </filter>
    <filter id="filter1_d_726_1058" x="89" y="0" width="94.8643" height="122.955" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="8.5"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_726_1058"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_726_1058" result="shape"/>
    </filter>
    <clipPath id="clip0_726_1058">
    <rect x="17" y="22" width="120.105" height="114.94" rx="5.81154" fill="white"/>
    </clipPath>
    <clipPath id="clip1_726_1058">
    <rect x="106" y="13" width="60.8642" height="88.9554" rx="4.21367" fill="white"/>
    </clipPath>
    </defs>
  </svg>
`;

const checkboxHtml = `
  <div class="checkbox">
    <input
      class="checkbox-input"
      type="checkbox"
      id="checkbox"
    />
    <label class="label" for='checkbox'>
      <span></span>
      Don’t show this message again
    </label>
  </div>
`;

// language=CSS
const checkboxCss = `
  .checkbox {
      display: flex;
      align-items: center;
      justify-content: center;
  }

  .checkbox-input {
      display: none;
  }

  .label {
      max-width: 250px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      gap: 6px;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      text-align: left;
      color: #C4C4C4;
      transition: all 0.3s ease-in-out;
  }

  .label > span {
      content: "";
      position: relative;
      display: block;
      min-width: 10px;
      height: 10px;
      border: 1px solid #D4D4D4;
      border-radius: 2px;
      background: transparent;
      transition: all 0.3s ease-in-out;
  }

  .label:hover > span {
    border-color: #F97474;
  }

  .checkbox-input:checked + label:hover > span {
    background-color: #F97474;
    border-color: #F97474;
  }

  .checkbox-input:checked + label {
    color: #828282;
  }

  .checkbox-input:checked + label:hover {
      color: #C4C4C4;
  }

  .checkbox-input:checked + label > span {
      background: #828282;
      border: 1px solid #828282;
  }

  .checkbox-input:checked + label > span::after {
      content: "";
      position: absolute;
      left: 3px;
      top: 0;
      width: 3px;
      height: 7px;
      border: solid #fff;
      border-width: 0 1px 1px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
  }

  .label:hover {
      cursor: pointer;
  }
`;

const closeHtml = `
  <div class='close'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path d="M19 6.91L17.59 5.5L12 11.09L6.41 5.5L5 6.91L10.59 12.5L5 18.09L6.41 19.5L12 13.91L17.59 19.5L19 18.09L13.41 12.5L19 6.91Z" fill="#D9D9D9"/>
    </svg>
  </div>
`;

const headerHtml = `
  <div class="top-block">
    <div class='logo'>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
        <path d="M6.55379 1.84377C3.52404 2.05865 3.09428 2.20906 2.21329 3.5198C1.41825 4.68013 1.26784 5.99088 1.13891 12.6735C0.967012 22.4289 1.31081 24.9644 2.98685 26.3826C3.65296 26.9413 3.56701 26.9198 8.91742 27.3281C11.6678 27.5429 15.8364 27.5429 18.5868 27.3281C24.2166 26.8983 23.8298 26.9628 24.7323 26.1677C25.8926 25.1363 26.1505 24.062 26.4513 19.2702C26.8166 13.2322 26.3868 5.58261 25.5918 4.01402C24.9042 2.6603 24.2166 2.18757 22.7125 1.99418C20.4563 1.73633 9.49759 1.62889 6.55379 1.84377ZM20.9075 4.7446C21.9174 4.9165 22.8844 5.84047 23.2282 6.93633C23.5505 8.01071 23.7224 17.3363 23.4645 19.7644C23.2497 21.9347 22.7984 23.1165 21.9819 23.6322C21.1224 24.2124 14.934 24.5132 10.0992 24.2339C5.75875 23.9975 5.39346 23.8686 4.66288 22.4074C4.03974 21.1611 3.71742 15.2091 4.03974 10.7396C4.40503 5.41071 4.77032 4.89501 8.29428 4.61567C10.572 4.42228 19.5538 4.52972 20.9075 4.7446Z" fill="#D61717"/>
        <path d="M7.7356 14.2851V21.0537L10.9158 17.8735C12.6563 16.133 14.1604 14.7149 14.2463 14.7149C14.3323 14.7149 14.3968 16.133 14.3968 17.8735V21.0537L17.7703 17.6587L21.1653 14.2851L17.7703 10.9116L14.3968 7.51652V10.6967C14.3968 12.4372 14.3323 13.8554 14.2463 13.8554C14.1604 13.8554 12.6563 12.4372 10.9158 10.6967L7.7356 7.51652V14.2851Z" fill="#D61717"/>
      </svg>
      <span>Adblock for YouTube™</span>
    </div>
    ${closeHtml}
  </div>
`;

// language=CSS
const headerCss = `
    .top-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FCFCFC;
        border-bottom: 1px solid #BDBDBD;
        padding: 16px;
        margin: -16px -16px 16px -16px;
        color: #313131;
        font-variant-numeric: lining-nums proportional-nums;
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 12.694px;
    }

    .logo {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .close {
        cursor: pointer;
    }
`;

const antiAdblockDetectedHtml = `
  <div class='aby-popup'>
    ${headerHtml}
    <div class="detected">
      ${popupSvg}
      <p>We’ve detected that a YouTube ad block warning could have appeared for you:</p>
    </div>
    <div class='info'>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <path d="M11 7.93951H13V9.93951H11V7.93951ZM11 11.9395H13V17.9395H11V11.9395ZM12 2.93951C6.48 2.93951 2 7.41951 2 12.9395C2 18.4595 6.48 22.9395 12 22.9395C17.52 22.9395 22 18.4595 22 12.9395C22 7.41951 17.52 2.93951 12 2.93951ZM12 20.9395C7.59 20.9395 4 17.3495 4 12.9395C4 8.52951 7.59 4.93951 12 4.93951C16.41 4.93951 20 8.52951 20 12.9395C20 17.3495 16.41 20.9395 12 20.9395Z" fill="#D61717"/>
        </svg>
      </div>
      <p>Adblock for Youtube does not cause such warnings because of a different approach of skipping ads</p>
    </div>
    <p class="disable">To fix this, please <span>disable all other ad blockers</span> besides Adblock for Youtube and reload the page</p>
    <a class="link" target='_blank' href="https://get.adblock-for-youtube.com/disable-adblockers">Find detailed instructions for whitelisting Youtube in most popular ad blocking extensions on our website.</a>
    ${checkboxHtml}
  </div>
`;

// language=CSS
const antiAdblockDetectedCss = `
  ${fontCss}

  .aby-popup > * {
      box-sizing: border-box;
  }

  .aby-popup > .top-block {
      margin-bottom: 8px;
  }

  .aby-popup {
      width: 390px;
      padding: 16px;
      font-family: Montserrat, sans-serif;
      overflow: hidden;
      color: #000;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      ${commonStyles}
  }

  ${headerCss}

  .detected {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
  }

  .detected > p {
      font-size: 16px;
  }

  .detected > svg {
      margin-left: -16px;
  }

  .detected > * {
      flex: 1;
  }

  .info {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding-bottom: 14px;
  }

  .disable {
      padding-bottom: 14px;
  }

  .disable > span {
      font-weight: 500;
  }

  .link {
      display: inline-block;
      color: #D61717;
      font-weight: 600;
      line-height: 20px;
      padding-bottom: 14px;
      transition: color 0.3s ease-in-out;
  }

  ${checkboxCss}

  .checkbox {
      justify-content: flex-start;
  }
`;

const updatePopupHtml = `
  <div class='aby-popup'>
    ${headerHtml}
    <div>
      <div class='image'>
        <svg xmlns="http://www.w3.org/2000/svg" width="63" height="62" viewBox="0 0 63 62" fill="none">
          <path d="M15.2735 2.47029C8.4438 2.95467 7.47505 3.29373 5.48911 6.24842C3.69692 8.86404 3.35786 11.8187 3.06724 26.8828C2.67974 48.8734 3.45474 54.589 7.23286 57.7859C8.73442 59.0453 8.54067 58.9969 20.6016 59.9172C26.8016 60.4016 36.1985 60.4016 42.3985 59.9172C55.0891 58.9484 54.2172 59.0937 56.2516 57.3015C58.8672 54.9765 59.4485 52.5547 60.1266 41.7531C60.95 28.1422 59.9813 10.8984 58.1891 7.36248C56.6391 4.31092 55.0891 3.2453 51.6985 2.80936C46.6125 2.22811 21.9094 1.98592 15.2735 2.47029ZM47.6297 9.00936C49.9063 9.39686 52.086 11.4797 52.861 13.95C53.5875 16.3719 53.975 37.3937 53.3938 42.8672C52.9094 47.7594 51.8922 50.4234 50.0516 51.5859C48.1141 52.8937 34.1641 53.5719 23.2657 52.9422C13.4813 52.4094 12.6579 52.1187 11.011 48.825C9.6063 46.0156 8.87974 32.5984 9.6063 22.5234C10.4297 10.5109 11.2532 9.34842 19.1969 8.71873C24.3313 8.28279 44.5782 8.52498 47.6297 9.00936Z" fill="#D61717"/>
          <path d="M17.9375 30.5156V45.7734L25.1062 38.6047C29.0297 34.6813 32.4203 31.4844 32.6141 31.4844C32.8078 31.4844 32.9531 34.6813 32.9531 38.6047V45.7734L40.5578 38.1203L48.2109 30.5156L40.5578 22.9109L32.9531 15.2578V22.4266C32.9531 26.35 32.8078 29.5469 32.6141 29.5469C32.4203 29.5469 29.0297 26.35 25.1062 22.4266L17.9375 15.2578V30.5156Z" fill="#D61717"/>
        </svg>
      </div>
      <h1 class='headline'><span>Adblock for Youtube has been updated</span></h1>
      <p class='info'>
        We’re excited to announce the release of our latest extension,
        now upgraded to version  ${chrome.runtime.getManifest().version}!
        Explore the latest features and enhancements by visiting our update page.
      </p>
      <div class='links'>
        <a class='link' target='_blank' href='https://get.adblock-for-youtube.com/update'>See what's new</a>
      </div>
      ${checkboxHtml}
    </div>
  </div>
`;

// language=CSS
const updatePopupCss = `
  ${fontCss}

  .aby-popup > * {
    box-sizing: border-box;
  }

  .aby-popup {
    width: 305px;
    padding: 16px;
    font-family: Montserrat, sans-serif;
    overflow: hidden;
    ${commonStyles}
  }

  ${headerCss}

  .image {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }

  .headline {
    color: #313131;
    text-align: center;
    font-family: Montserrat, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: 12px;
  }

  .headline > span {
    display: inline-block;
    max-width: 200px;
  }

  .info {
    color: #313131;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 16px;
  }

  .links {
    text-align: center;
    margin-bottom: 24px;
  }

  .link {
    color: #D61717;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
    text-decoration-line: underline;
    transition: color 0.3s ease-in-out;
  }

  .link:hover {
    color: #F97474;
  }

  ${checkboxCss}
`;

const windowsPopupHtml = `
  <div class='aby-popup'>
    ${headerHtml}
    <div>
      <p class='info'>
        Do you know that we also have windows application that can keep you protected even when our extension can't? Visit our page to know more.
      </p>
      <a class='link' target='_blank' href='https://get.adblock-for-youtube.com/windows'>Go to our website</a>
    </div>
    ${checkboxHtml}
  </div>
`;

// language=CSS
const windowsPopupCss = `
  ${fontCss}

  .aby-popup > * {
      box-sizing: border-box;
  }

  .aby-popup {
      width: 350px;
      padding: 15px;
      font-family: Montserrat, sans-serif;
      overflow: hidden;
      ${commonStyles}
  }

  ${headerCss}

  .info {
      color: #000;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      margin-bottom: 14px;
  }

  .link {
    font-size: 16px;
    font-weight: 600;
    background: #F2C94C;
    color: #000;
    display: block;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    margin-bottom: 18px;
    transition: background-color 0.3s ease-in-out;
  }

  .link:hover {
    background-color: #F8E095;
  }

  ${checkboxCss}
`;

const mobilePopupHtml = `
  <div class='aby-popup'>
  ${headerHtml}
    <div>
      <p class='info'>
        We also offer you a unique opportunity to install our new ad blocker on your mobile phone
      </p>
      <div class='links'>
        <a class='link' target='_blank' href='https://get.adblock-for-youtube.com/android'>
          <img src='data:image/png;base64,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' alt='Google Play' height='45px'>
        </a>
        <a class='link' target='_blank' href='https://get.adblock-for-youtube.com/iphone'>
          <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAk8AAAC0CAMAAAC60zivAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2Njg4ODIyNTc4OTExRTQ5RDUyQTU0Rjk3NjJGODQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2Njg4ODIzNTc4OTExRTQ5RDUyQTU0Rjk3NjJGODQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjY2ODg4MjA1Nzg5MTFFNDlENTJBNTRGOTc2MkY4NDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjY2ODg4MjE1Nzg5MTFFNDlENTJBNTRGOTc2MkY4NDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz692hVEAAADAFBMVEUAAAD////w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' alt='App Store' height='45px'>
        </a>
      </div>
      ${checkboxHtml}
    </div>
  </div>
`;

// language=CSS
const mobilePopupCss = `
  ${fontCss}

  .aby-popup > * {
      box-sizing: border-box;
  }

  .aby-popup {
      width: 343px;
      padding: 16px;
      font-family: Montserrat, sans-serif;
      overflow: hidden;
      ${commonStyles}
  }

  ${headerCss}

  .info {
      color: #000;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      margin-bottom: 14px;
  }

  .links {
      display: flex;
      justify-content: space-between;
      margin-bottom: 18px;
  }

  .link > img {
    border-radius: 9px;
  }

  .link {
    border-radius: 9px;
    height: 45px;
    transition: all 0.3s ease-in-out;
  }

  .link:hover {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  }

  ${checkboxCss}
`;

const otherStreamingPopupHtml = `
  <div class='aby-popup'>
    ${headerHtml}
    <div>
      <h3 class='headline'>Do you want to also block ads on other video streaming websites?</h3>
      <p class='info'>
        Visit our website to opt-in into experimental feature.
      </p>
      <a class='link' target='_blank' href='https://get.adblock-for-youtube.com/enable-additional-blocking?key=VZg4e13bFF1WkoDw9DNH'>Go to our website</a>
    </div>
    ${checkboxHtml}
  </div>
`;

// language=CSS
const otherStreamingPopupCss = `
    ${fontCss}

    .aby-popup > * {
        box-sizing: border-box;
    }

    .aby-popup {
        width: 350px;
        padding: 15px;
        font-family: Montserrat, sans-serif;
        overflow: hidden;
        color: #000;
        ${commonStyles}
    }

    ${headerCss}

    .headline {
        font-size: 18px;
        font-weight: 600;
        line-height: 20px;
        margin-bottom: 8px;
    }

    .info {
        text-align: left;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        margin-bottom: 14px;
    }

    .link {
        font-size: 16px;
        font-weight: 600;
        background: #F2C94C;
        color: #000;
        display: block;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        margin-bottom: 18px;
        transition: background-color 0.3s ease-in-out;
    }

    .link:hover {
        background-color: #F8E095;
    }

    ${checkboxCss}

    .aby-popup .checkbox {
        justify-content: flex-start;
    }
`;

const POPUPS_MAP = {
  windows: {
    html: windowsPopupHtml,
    css: windowsPopupCss,
    restrictionKey: CONFIGURABLE_POPUP_RESTRICTION_KEY,
    doNotShowKey: CONFIGURABLE_POPUP_DO_NOT_SHOW_KEY,
    needSetDoNotShow: true,
  },
  mobile: {
    html: mobilePopupHtml,
    css: mobilePopupCss,
    restrictionKey: CONFIGURABLE_POPUP_RESTRICTION_KEY,
    doNotShowKey: CONFIGURABLE_POPUP_DO_NOT_SHOW_KEY,
    needSetDoNotShow: true,
  },
  update: {
    html: updatePopupHtml,
    css: updatePopupCss,
    restrictionKey: UPDATE_POPUP_RESTRICTION_KEY,
    doNotShowKey: UPDATE_POPUP_DO_NOT_SHOW_KEY,
    needSetDoNotShow: false,
  },
  "anti-adblock": {
    html: antiAdblockDetectedHtml,
    css: antiAdblockDetectedCss,
    restrictionKey: ANTI_ADBLOCK_POPUP_RESTRICTION_KEY,
    doNotShowKey: ANTI_ADBLOCK_POPUP_DO_NOT_SHOW_KEY,
    needSetDoNotShow: false,
  },
  "other-streaming": {
    html: otherStreamingPopupHtml,
    css: otherStreamingPopupCss,
    restrictionKey: OTHER_STREAMING_RESTRICTION_KEY,
    doNotShowKey: OTHER_STREAMING_POPUP_DO_NOT_SHOW_KEY,
    needSetDoNotShow: false,
  },
};

const minutesToMilliseconds = (minutes) => {
  return minutes * 60000;
};

const isIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

class YoutubeBlocker {
  constructor(enabled, adBlockSelectors, popupConfig) {
    const filters = [
      new CosmeticFilter(adBlockSelectors),
      new Dialog(popupConfig),
      new SkipVideoAds(),
    ];

    if (enabled) {
      filters.forEach((filter) => {
        filter.start();
      });
    }
  }
}

const getIsCommonPopupRestrictionsExpired = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(
      [INSTALLED_AT_KEY, POPUP_GENERAL_RESTRICTION_KEY],
      (result) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          resolve(false);
        }

        const now = Date.now();
        const installedAt = result[INSTALLED_AT_KEY];
        const popupGeneralRestriction = result[POPUP_GENERAL_RESTRICTION_KEY];

        if (!installedAt || now - installedAt < MIN_USER_LIVE_FOR_POPUP) {
          console.log("User is too new");
          resolve(false);
        }

        if (
          popupGeneralRestriction &&
          now - popupGeneralRestriction < GENERAL_POPUPS_RESTRICTION_TIME
        ) {
          console.log("General popup restriction");

          resolve(false);
        }

        resolve(true);
      }
    );
  });
};

class Dialog {
  popupConfig = {};

  constructor(popupConfig) {
    this.popupConfig = popupConfig;
  }

  appendPopup(dialog) {
    domReady(() => {
      document.body.appendChild(dialog);
    });
  }

  addCloseButtonListener(dialog, dateRestrictionKey, doNotShowKey) {
    dialog.querySelector(".close").addEventListener("click", () => {
      const isInputChecked = document.querySelector(".checkbox-input").checked;

      const storageKeyRestriction = {
        [dateRestrictionKey]: Date.now(),
      };

      if (dateRestrictionKey !== ANTI_ADBLOCK_POPUP_RESTRICTION_KEY) {
        storageKeyRestriction[POPUP_GENERAL_RESTRICTION_KEY] = Date.now()
      }

      if (isInputChecked) {
        storageKeyRestriction[doNotShowKey] = true;
      }

      this.handlePopupClose(dialog, storageKeyRestriction);
    });
  }

  addLinkClickListener(
    dialog,
    dateRestrictionKey,
    doNotShowKey,
    needSetDoNotShow
  ) {
    dialog.querySelectorAll(".link").forEach((link) => {
      link.addEventListener("click", () => {
        const restrictionConfig = {
          [dateRestrictionKey]: Date.now(),
          [POPUP_GENERAL_RESTRICTION_KEY]: Date.now(),
        };

        if (needSetDoNotShow) {
          restrictionConfig[doNotShowKey] = true;
        }

        this.handlePopupClose(dialog, restrictionConfig);
      });
    });
  }

  handlePopupClose(dialog, storageKeyRestriction) {
    document.body.removeChild(dialog);

    chrome.storage.local.set(storageKeyRestriction, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  }

  createConfigurablePopup(popupType) {
    const popupLayout = POPUPS_MAP[popupType];

    if (!popupLayout) {
      return;
    }
    const { html, css, restrictionKey, doNotShowKey, needSetDoNotShow } =
      popupLayout;

    const configurablePopup = document.createElement("DIV");
    configurablePopup.classList.add("ab4yt-popup");
    configurablePopup.innerHTML = html;

    this.addLinkClickListener(
      configurablePopup,
      restrictionKey,
      doNotShowKey,
      needSetDoNotShow
    );

    this.addCloseButtonListener(
      configurablePopup,
      restrictionKey,
      doNotShowKey
    );

    const stylesheet = document.createElement("style");
    stylesheet.setAttribute("type", "text/css");
    stylesheet.innerText = css;

    configurablePopup.appendChild(stylesheet);

    this.appendPopup(configurablePopup);
  }

  createRateUsPopup() {
    const handleClose = () => {
      this.handlePopupClose(dialog, {
        [RATING_POPUP_RESTRICTION_KEY]: true,
        [POPUP_GENERAL_RESTRICTION_KEY]: Date.now(),
      });
    };

    // Create dialog
    const dialog = document.createElement("DIV");
    dialog.classList.add("ab4yt-dialog");

    // Create closeIcon
    const closeIcon = document.createElement("A");
    closeIcon.classList.add("ab4yt-close-icon");
    closeIcon.appendChild(document.createTextNode(" "));
    closeIcon.addEventListener("click", handleClose);
    dialog.appendChild(closeIcon);

    // Create header
    const header = document.createElement("DIV");
    header.appendChild(
      document.createTextNode(chrome.i18n.getMessage("extension_name"))
    );
    header.classList.add("ab4yt-dialog-header");
    dialog.appendChild(header);

    // Create ShareLink
    const webstoreLink = document.createElement("A");
    webstoreLink.classList.add("ab4yt-webstore-link");
    webstoreLink.setAttribute("href", `${WEBSTORE_LINK}/reviews`);
    webstoreLink.setAttribute("target", "_blank");
    webstoreLink.appendChild(
      document.createTextNode(chrome.i18n.getMessage("rate_this_extension"))
    );
    webstoreLink.addEventListener("click", handleClose);
    dialog.appendChild(webstoreLink);

    const stylesheet = document.createElement("style");
    stylesheet.type = "text/css";
    stylesheet.appendChild(
      document.createTextNode(`
      .ab4yt-dialog {
        display: none;
        background-color: #000000c7;
        position: fixed;
        right: 10px;
        z-index: 99999999999;
        top: 68px;
        padding: 0;
        margin: 0;
        border-radius: 4px;
        border: 1px solid white;
        text-align: center;
      }

      .ab4yt-close-icon {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
        width: 10px;
        height: 10px;
        opacity: 0.8;
      }
      .ab4yt-close-icon:hover {
        opacity: 1;
      }
      .ab4yt-close-icon:before, .ab4yt-close-icon:after {
        position: absolute;
        left: 5px;
        content: ' ';
        height: 10px;
        width: 2px;
        background-color: white;
      }
      .ab4yt-close-icon:before {
        transform: rotate(45deg);
      }
      .ab4yt-close-icon:after {
        transform: rotate(-45deg);
      }

      .ab4yt-dialog-header {
        font-size: 16px;
        padding: 16px 24px;
        color: white;
      }

      .ab4yt-webstore-link {
        display: block;
        font-size: 13px;
        color: white;
        padding: 16px 24px;
        text-decoration: none;
        opacity: 0.8;
        border-top: 1px solid white;
        text-transform: uppercase;
      }

      .ab4yt-webstore-link:hover {
        opacity: 1;
      }
    `)
    );
    dialog.appendChild(stylesheet);
    dialog.style.display = "block";

    this.appendPopup(dialog);
  }

  checkAntiAdBlock() {
    document.addEventListener("yt-navigate-finish", () => {
      chrome.storage.local.get(
        [
          ANTI_ADBLOCK_POPUP_DO_NOT_SHOW_KEY,
          ANTI_ADBLOCK_POPUP_RESTRICTION_KEY,
          ANTI_ADBLOCK_RELOAD_KEY,
        ],
        async (result) => {
          const now = Date.now();

          const antiAdblockPopupRestriction =
            result[ANTI_ADBLOCK_POPUP_RESTRICTION_KEY];
          const antiAdblockPopupDoNotShow =
            result[ANTI_ADBLOCK_POPUP_DO_NOT_SHOW_KEY];

          setTimeout(() => {
            if (
              window.location.href.includes("/watch") &&
              document.querySelector("#error-screen>#container")?.children.length
            ) {
              const currentVideoHref = window.location.href;
              if (result[ANTI_ADBLOCK_RELOAD_KEY] !== currentVideoHref) {
                window.location.reload();
                chrome.storage.local.set({ [ANTI_ADBLOCK_RELOAD_KEY]: currentVideoHref }, () => {
                  if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                  }
                });
              } else if (
                !antiAdblockPopupDoNotShow &&
                (!antiAdblockPopupRestriction ||
                  now - antiAdblockPopupRestriction >
                  ANTI_ADBLOCK_POPUP_RESTRICTION_TIME)
              ) {
                document
                  .querySelectorAll(".ab4yt-dialog,.ab4yt-popup")
                  .forEach((dialog) => dialog.remove());
                this.createConfigurablePopup("anti-adblock");
              }
            }
          }, 100);
        }
      );
    });
  }

  start() {
    if (isIframe()) {
      return;
    }
    // this.createConfigurablePopup('update');
    if (this.popupConfig.isAntiAdblockPopupEnabled) {
      this.checkAntiAdBlock();
    }

    chrome.storage.local.get(
      [
        UPDATE_POPUP_RESTRICTION_KEY,
        UPDATE_POPUP_DO_NOT_SHOW_KEY,
        CONFIGURABLE_POPUP_RESTRICTION_KEY,
        CONFIGURABLE_POPUP_DO_NOT_SHOW_KEY,
        RATING_POPUP_RESTRICTION_KEY,
      ],
      async (result) => {
        const isCommonRestrictionsExpired =
          await getIsCommonPopupRestrictionsExpired();

        const now = Date.now();

        const updatePopupRestriction = result[UPDATE_POPUP_RESTRICTION_KEY];
        const updatePopupDoNotShow = result[UPDATE_POPUP_DO_NOT_SHOW_KEY];

        const configurablePopupRestriction =
          result[CONFIGURABLE_POPUP_RESTRICTION_KEY];
        const configurablePopupDoNotShow =
          result[CONFIGURABLE_POPUP_DO_NOT_SHOW_KEY];
        const configurablePopupDoNotShowAgainMilliseconds =
          minutesToMilliseconds(
            this.popupConfig.configurablePopup.doNotShowAgainMinutes
          );

        const ratingPopupRestriction = result[RATING_POPUP_RESTRICTION_KEY];

        if (!isCommonRestrictionsExpired) {
          return;
        }

        if (
          !updatePopupRestriction &&
          !updatePopupDoNotShow &&
          this.popupConfig.isUpdatePopupEnabled
        ) {
          this.createConfigurablePopup("update");
          return;
        }

        if (
          !configurablePopupDoNotShow &&
          this.popupConfig.configurablePopup.isEnabled &&
          (!configurablePopupRestriction ||
            now - configurablePopupRestriction >
              configurablePopupDoNotShowAgainMilliseconds)
        ) {
          this.createConfigurablePopup(this.popupConfig.configurablePopup.type);
          return;
        }

        if (!ratingPopupRestriction && this.popupConfig.isRateUsPopupEnabled) {
          try {
            this.createRateUsPopup();
            return;
          } catch (e) {
            console.error(e);
          }
        }

        console.log("No popup to show");
      }
    );
  }
}

class CosmeticFilter {
  adBlockSelectors = "";

  constructor(adBlockSelectors) {
    this.adBlockSelectors = adBlockSelectors;
  }

  start() {
    if (!this.adBlockSelectors) {
      return;
    }

    const cssContent = `${this.adBlockSelectors} { display: none !important; }`;

    const styleEl = document.createElement("style");
    styleEl.setAttribute("type", "text/css");
    styleEl.textContent = cssContent;
    (document.head || document.documentElement).appendChild(styleEl);
  }
}

class SkipVideoAds {
  constructor() {
    this.start().catch((e) => {
      console.error(e);
    });
  }

  runSkipping() {
    document.querySelector(".ytp-ad-skip-button")?.click();
    document.querySelector(".ytp-skip-ad-button")?.click();
    document.querySelector(".ytp-ad-skip-button-modern")?.click();
    document.querySelector(".ytp-ad-survey")?.click();
  }

  runRewind() {
    try {
      const videoPlayer = document.querySelector(".video-stream");
      videoPlayer.currentTime = videoPlayer.duration - 0.1;
      videoPlayer.paused && videoPlayer.play();
    } catch (e) {
      console.error(e);
    }
  }

  async start() {
    const playerContainer = await waitForElement("#movie_player");

    const observer = new MutationObserver(() => {
      try {
        const isAd =
          playerContainer.classList.contains("ad-interrupting") ||
          playerContainer.classList.contains("ad-showing");

        if (isAd) {
          this.runSkipping();
          this.runRewind();
        }
      } catch (e) {
        console.error(e);
      }
    });

    observer.observe(playerContainer, {
      subtree: !0,
      childList: !0,
      attributes: !0,
    });
  }
}

class DailymotionDialog {
  popupConfig = {};

  constructor(popupConfig) {
    this.popupConfig = popupConfig;
  }

  appendPopup(dialog) {
    domReady(() => {
      document.body.appendChild(dialog);
    });
  }

  addCloseButtonListener(dialog, dateRestrictionKey, doNotShowKey) {
    dialog.querySelector(".close").addEventListener("click", () => {
      const isInputChecked = document.querySelector(".checkbox-input").checked;

      const storageKeyRestriction = {
        [dateRestrictionKey]: Date.now(),
        [POPUP_GENERAL_RESTRICTION_KEY]: Date.now(),
      };

      if (isInputChecked) {
        storageKeyRestriction[doNotShowKey] = true;
      }

      this.handlePopupClose(dialog, storageKeyRestriction);
    });
  }

  addLinkClickListener(
    dialog,
    dateRestrictionKey,
    doNotShowKey,
    needSetDoNotShow
  ) {
    dialog.querySelectorAll(".link").forEach((link) => {
      link.addEventListener("click", () => {
        const restrictionConfig = {
          [dateRestrictionKey]: Date.now(),
          [POPUP_GENERAL_RESTRICTION_KEY]: Date.now(),
        };

        if (needSetDoNotShow) {
          restrictionConfig[doNotShowKey] = true;
        }

        this.handlePopupClose(dialog, restrictionConfig);
      });
    });
  }

  handlePopupClose(dialog, storageKeyRestriction) {
    document.body.removeChild(dialog);

    chrome.storage.local.set(storageKeyRestriction, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  }

  createConfigurablePopup(popupType) {
    const popupLayout = POPUPS_MAP[popupType];

    if (!popupLayout) {
      return;
    }
    const { html, css, restrictionKey, doNotShowKey, needSetDoNotShow } =
      popupLayout;

    const configurablePopup = document.createElement("DIV");
    configurablePopup.classList.add("ab4yt-popup");
    configurablePopup.innerHTML = html;

    this.addLinkClickListener(
      configurablePopup,
      restrictionKey,
      doNotShowKey,
      needSetDoNotShow
    );

    this.addCloseButtonListener(
      configurablePopup,
      restrictionKey,
      doNotShowKey
    );

    const stylesheet = document.createElement("style");
    stylesheet.setAttribute("type", "text/css");
    stylesheet.innerText = css;

    configurablePopup.appendChild(stylesheet);

    this.appendPopup(configurablePopup);
  }

  start() {
    if (isIframe()) {
      return;
    }
    // this.createConfigurablePopup('update');

    chrome.storage.local.get(
      [
        OTHER_STREAMING_RESTRICTION_KEY,
        OTHER_STREAMING_POPUP_DO_NOT_SHOW_KEY,
        IS_ADDITIONAL_BLOCKING_ENABLED,
      ],
      async (result) => {
        const isCommonRestrictionsExpired =
          await getIsCommonPopupRestrictionsExpired();
        const now = Date.now();

        const otherStreamingRestriction =
          result[OTHER_STREAMING_RESTRICTION_KEY];
        const otherStreamingPopupDoNotShow =
          result[OTHER_STREAMING_POPUP_DO_NOT_SHOW_KEY];

        const isAdditionalBlockingEnabled =
          result[IS_ADDITIONAL_BLOCKING_ENABLED];

        if (!isCommonRestrictionsExpired) {
          return;
        }

        if (
          !otherStreamingPopupDoNotShow &&
          !isAdditionalBlockingEnabled &&
          this.popupConfig.isOtherStreamingPopupEnabled &&
          (!otherStreamingRestriction ||
            now - otherStreamingRestriction > OTHER_STREAMING_RESTRICTION_TIME)
        ) {
          this.createConfigurablePopup("other-streaming");
          return;
        }

        console.log("No popup to show");
      }
    );
  }
}

class DailymotionBlocker {
  constructor(enabled, adBlockSelectors, isDailymotionTab, popupConfig) {
    const filters = [new CosmeticFilter(adBlockSelectors)];

    if (enabled) {
      new DailymotionDialog(popupConfig).start();
    }

    if (enabled && isDailymotionTab) {
      filters.forEach((filter) => {
        filter.start();
      });
    }
  }
}

class AdditionalBlockingEnableHandler {
  constructor(enabled) {
    if (enabled) {
      this.init().catch((error) => {
        console.error(error);
      });
    }
  }

  async init() {
    const additionalActivateButtons = await waitForElement(
      ".activate_additional_blocking_X3patIvPJ8"
    );

    additionalActivateButtons.addEventListener("click", () => {
      chrome.runtime.sendMessage(
        {
          action: "ENABLE_ADDITIONAL_BLOCKING",
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          }
        }
      );
    });
  }
}

function domReady(callback) {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback, {
      once: true,
    });
  }
}

const waitForElement = async (selector) => {
  return new Promise((resolve) => {
    let observedElement = document.querySelector(selector);
    if (observedElement) return resolve(observedElement);

    let observer = new MutationObserver(() => {
      let observedElement = document.querySelector(selector);
      if (observedElement) {
        observer.disconnect();
        resolve(observedElement);
      }
    });

    observer.observe(document.documentElement, {
      childList: !0,
      subtree: !0,
    });
  });
};

// Notify background so it can inject cosmetic filter
chrome.runtime.sendMessage(
  {
    action: "PAGE_READY",
  },
  ({
    yt,
    enabled,
    adBlockSelectors,
    popupConfig,
    isDailymotionTab,
    dailymotionAdBlockingSelectors,
  }) => {
    const pageUrl = new URL(window.location.href);

    if (/youtube\.com/.test(window.location.origin) && yt) {
      new YoutubeBlocker(enabled, adBlockSelectors, popupConfig);
    } else if (/dailymotion\.com/.test(window.location.origin)) {
      new DailymotionBlocker(
        enabled,
        dailymotionAdBlockingSelectors,
        isDailymotionTab,
        popupConfig
      );
    } else if (pageUrl.searchParams.get("key") === "VZg4e13bFF1WkoDw9DNH") {
      new AdditionalBlockingEnableHandler(enabled);
    }
  }
);


var e;
if (!window.__idm_init__ && navigator.platform.startsWith("Win") && "html" == document.documentElement.localName) {
    window.__idm_init__ = !0;
    Array.prototype.includes || (Array.prototype.includes = function(a, b) {
        return 0 <= this.indexOf(a, b)
    }
    );
    Array.prototype.F || (Array.prototype.F = function(a) {
        0 > a && (a += this.length);
        return this[a]
    }
    );
    NodeList.prototype[Symbol.iterator] || (NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]);
    HTMLCollection.prototype[Symbol.iterator] || (HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]);
    "undefined" == typeof browser && (browser = chrome);
    navigator.userAgent.includes("Edge/");
    navigator.userAgent.includes("Firefox/");
    navigator.userAgent.includes("OPR/");
    var w = Object.values
      , y = RegExp.prototype.test
      , E = Array.from
      , F = Array.prototype.includes
      , G = Function.call.bind(Array.prototype.slice)
      , I = Function.apply.bind(Array.prototype.push)
      , J = Function.call.bind(Array.prototype.forEach)
      , K = "dotAll"in RegExp.prototype ? "s" : ""
      , L = {
        16: !0,
        17: !0,
        18: !0,
        45: !0,
        46: !0
    }
      , M = F.bind(["video", "audio", "object", "embed"])
      , N = /(?!)/
      , O = / *[$~]([<>{}&*+=@|!#%:?^~-])(\d*) */
      , T = y.bind(/^rgba?\(\d+,\s*\d+,\s*\d+,\s*0\)/)
      , U = window.self === window.top
      , V = window.origin || document.origin || location.origin
      , W = location.hostname.toLowerCase() + location.pathname + location.search
      , X = location.hostname.toLowerCase().split(".").F(-2)
      , Y = "idmrs://" + X + "/"
      , aa = X ? RegExp("^(?:\\(\\d+\\)\\s+)?(.+?)\\s+[-|@]+\\s*" + X + "$", "i") : N;
    function P() {
        browser.runtime.Wa ? this.$ = browser.runtime.Wa(window) : U && (this.$ = 0);
        this.ea = [];
        this.aa = [];
        this.u = new Map;
        this.c = {};
        this.Ta();
        window.__idm_connect__ = this.Ta.bind(this, !0);
        this.b(1, window, "resize", this.Vb);
        this.b(1, window, "scroll", this.Wb);
        this.b(1, window, "blur", this.Nb);
        this.b(1, window, "keydown", this.ab, !0);
        this.b(1, window, "keyup", this.ab, !0);
        this.b(1, window, "mousedown", this.Pb, !0);
        this.b(1, window, "mouseup", this.Rb, !0);
        this.b(1, window, "mousemove", this.Qb, !0);
        this.b(1, window, "click", this.Ob, !0);
        this.b(1, document, "beforeload", this.Lb, !0);
        this.b(1, document, "DOMContentLoaded", this.$a);
        "interactive" != document.readyState && "complete" != document.readyState || this.$a()
    }
    e = P.prototype;
    e.i = 0;
    e.s = 0;
    e.ha = -1;
    e.ia = -1;
    e.hb = 1;
    e.P = 0;
    e.g = "";
    e.Da = "";
    e.H = "";
    e.Ja = N;
    e.Oa = N;
    e.I = N;
    e.Qa = /^\/(?:watch\?(?:.*?&)?v=|shorts\/|embed\/)([\w-]{10,12})(?:[/?&#]|$)/;
    e.D = {};
    e.Ka = N;
    e.La = N;
    e.Ma = N;
    e.Na = N;
    e.Pa = '$> *[role="main"]:not(hidden) video';
    e.S = "$< div#inline-preview-player $< a#media-container-link";
    e.Ra = RegExp('"PLAYER_JS_URL":\\s*"(.*?)"', K);
    e.ra = N;
    e.ma = ":root:empty";
    e.pa = 'div[id^="mount_0_"] >div:is([class=""],:not([class])) >div[class=""] >div:first-child';
    e.m = ":root:empty";
    e.qa = ":root:empty";
    e.B = ":root:empty";
    e.o = "$< div >:not(:only-child):not(video:first-child,img:first-child:nth-last-child(2)) <";
    e.sa = "$> div[data-video-id] $= data-video-id";
    e.la = "a:not([target])";
    e.C = ":root:empty";
    e.oa = 4;
    e.na = N;
    e.ua = N;
    e.Ba = ":root:empty";
    e.va = '$& div.xxzkxad $& section main[role="main"] $& div.xw7yly9 >div >div[style]:only-child $& div >article <';
    e.ya = '$& div.xxzkxad $& section main[role="main"] $& div:first-child >div[role="button"][aria-hidden], article[role="presentation"] $& div:first-child >div[style]:first-child:empty < $& div[role="presentation"] >div >ul';
    e.Ca = "$& div.xxzkxad $& section.x5qyhuo $& :scope >div >div:only-child $& section >div";
    e.ta = '$+ article:scope $* main[role="main"] article';
    e.xa = '$& div[role="dialog"] div[role="dialog"] >div $& div:first-child >div[style]:first-child:empty < $& div[role="presentation"] >div >ul';
    e.R = "$* video";
    e.za = '$= poster ${ div[role="presentation"] >div >ul $<< $>:scope >div[data-instancekey] img $= src';
    e.Aa = "*.return.return.memoizedProps.videoFBID";
    e.wa = /\/(?:p|reel)\/([\w-]{11})(?:[/?#]|$)/;
    e.Ea = N;
    e.Fa = /^(?:[^/]+|player\.vimeo\.com\/video)\/(\d{2,})/;
    e.Ia = "$| video:scope $| video";
    e.Ga = "$> :scope >div.player";
    e.Ha = "$& div.vp-video $& div.vp-telecine";
    e.Ta = function(a) {
        this.cb(-1);
        this.a = a = browser.runtime.connect({
            name: (U ? "top" : "sub") + (a ? ":retry" : "") + ("file:" == location.protocol ? ":file" : "")
        });
        this.b(-1, a, "onMessage", this.Tb);
        this.b(-1, a, "onDisconnect", this.Sb)
    }
    ;
    e.Sb = function() {
        browser.runtime.lastError;
        this.cb();
        this.a = this.ba = null;
        window.__idm_init__ = !1;
        window.__idm_connect__ = null
    }
    ;
    e.Tb = function(a) {
        switch (a.shift()) {
        case 11:
            this.vb.apply(this, a);
            break;
        case 17:
            this.wb.apply(this, a);
            break;
        case 12:
            this.xb.apply(this, a);
            break;
        case 13:
            this.nb = a.shift();
            break;
        case 14:
            this.Ab.apply(this, a);
            break;
        case 15:
            this.Bb.apply(this, a);
            break;
        case 16:
            this.Cb.apply(this, a);
            break;
        case 18:
            this.zb.apply(this, a)
        }
    }
    ;
    e.Yb = function(a, b) {
        var c = 94 <= this.lb;
        switch (this.f = a) {
        case 1:
            this.h = this.ob = !0;
            if (a = b.shift())
                this.g = a;
            if (a = b.shift())
                this.Ja = RegExp(a, K);
            if (a = b.shift())
                this.I = RegExp(a);
            if (a = b.shift())
                this.Qa = RegExp(a);
            if (a = b.shift())
                this.D = a.split(/[|:]/).reduce(ba, {});
            if (a = b.shift())
                this.Ka = RegExp(a);
            if (a = b.shift())
                this.La = RegExp(a, K);
            if (a = b.shift())
                this.Ma = RegExp(a, K);
            if (a = b.shift())
                this.Na = RegExp(a, K);
            if (a = b.shift())
                this.Oa = RegExp(a, K);
            if (a = b.shift())
                this.Pa = a;
            if (a = b.shift())
                this.S = a;
            if (a = b.shift())
                this.Ra = RegExp(a, K);
            break;
        case 2:
            this.h = !0;
            if (a = b.shift())
                this.g = a;
            if (a = b.shift())
                this.H = a;
            if (a = b.shift())
                this.ra = RegExp(a);
            if (a = b.shift())
                this.ma = a;
            (a = b.shift()) && c && (this.pa = a);
            b.shift();
            if (a = b.shift())
                this.m = a;
            if (a = b.shift())
                this.qa = a;
            if (a = b.shift())
                this.B = a;
            if (a = b.shift())
                this.o = a;
            if (a = b.shift())
                this.sa = a;
            if (a = b.shift())
                this.la = a;
            if (a = b.shift())
                this.C = a;
            (a = b.shift()) && c && (this.oa = a);
            if (a = b.shift())
                this.jb = a;
            if (a = b.shift())
                this.na = RegExp(a);
            break;
        case 4:
            this.h = !0;
            if (a = b.shift())
                this.g = a;
            if (a = b.shift())
                this.Da = a;
            if (a = b.shift())
                this.H = a;
            if (a = b.shift())
                this.ua = RegExp(a);
            if (a = b.shift())
                this.Ba = a;
            if (!c)
                break;
            if (a = b.shift())
                this.va = a;
            if (a = b.shift())
                this.ya = a;
            if (a = b.shift())
                this.Ca = a;
            if (a = b.shift())
                this.ta = a;
            if (a = b.shift())
                this.xa = a;
            if (a = b.shift())
                this.R = a;
            if (a = b.shift())
                this.za = a;
            b.shift();
            if (a = b.shift())
                this.Aa = a;
            if (a = b.shift())
                this.wa = RegExp(a);
            break;
        case 3:
            if (a = b.shift())
                this.Ea = RegExp(a);
            if (a = b.shift())
                this.Fa = RegExp(a);
            if (a = b.shift())
                this.Ia = a;
            if (a = b.shift())
                this.Ga = a;
            if (a = b.shift())
                this.Ha = a;
            break;
        case 5:
            this.h = !0;
            if (a = b.shift())
                this.g = a;
            if (a = b.shift())
                this.H = a;
            if (a = b.shift())
                this.mb = a;
            break;
        default:
            this.h = !0;
            if (a = b.shift())
                this.g = a;
            if (a = b.shift())
                this.ka = a
        }
        this.g.includes("^/") && ((b = this.Da) ? b = "https?://" + b.slice(+b.startsWith("^"), -b.endsWith("$") || void 0) : b = V.replaceAll(".", "\\."),
        this.g = this.g.replaceAll("^/", "^(?:" + b + ")?/"))
    }
    ;
    e.Y = function(a) {
        if (this.f && this.O(arguments))
            switch (this.f) {
            case 1:
                this.Kb(a);
                break;
            case 2:
                this.Gb(a);
                break;
            case 4:
                this.Hb(a);
                break;
            case 3:
                this.Jb(a);
                break;
            case 5:
                this.Ib(a)
            }
    }
    ;
    e.U = function(a) {
        var b = this.a, c;
        for (c of document.getElementsByTagName("script"))
            !c.src && a.test(c.textContent) && b.postMessage([34, null, -1, c.textContent]);
        b.postMessage([34, this.G()])
    }
    ;
    e.bb = function(a, b, c) {
        if (this.ib && b) {
            var d = this.M(a);
            if (d) {
                this.u.set(a, c);
                window.postMessage([1229212980, d, b], "/");
                return
            }
        }
        c(a)
    }
    ;
    e.Ub = function(a, b) {
        if (a = this.c[a]) {
            var c = this.u.get(a);
            c && (this.u.delete(a),
            c(a, b))
        }
    }
    ;
    e.Xb = function(a) {
        var b = a.data;
        if (Array.isArray(b) && a.origin == V)
            switch (b[0]) {
            case 1229212977:
                window.postMessage([1229212978, this.ba, this.h, this.ob, this.g, this.H], "/");
                this.ib = !0;
                break;
            case 1229212979:
                this.a.postMessage([36, b[1], b[2]]);
                break;
            case 1229212981:
                this.Ub(b[1], b[2])
            }
    }
    ;
    e.V = function() {
        var a = window.devicePixelRatio
          , b = document.width
          , c = document.body.scrollWidth;
        b && c && (a = b == c ? 0 : b / c);
        return a
    }
    ;
    e.M = function(a) {
        var b = a.l;
        b || (b = a.l = this.ba << 13 | this.hb++,
        a.setAttribute("__idm_id__", b),
        this.c[b] = a);
        return b
    }
    ;
    e.K = function(a) {
        a.v && (window.clearTimeout(a.v),
        a.v = null);
        a.f && (a.f.disconnect(),
        a.f = null);
        this.N && this.N.unobserve(a);
        this.j && this.j.unobserve(a);
        delete this.c[a.l];
        a.l = a.c = a.a = null
    }
    ;
    e.Sa = function(a, b, c) {
        var d = this.M(a);
        if (b || c) {
            for (var f of w(this.c))
                if (b ? b == f.c : c == f.a)
                    return;
            a.a = c || Y + a.localName + "/" + b;
            a.c = b
        }
        a.f || (b = a.f = new MutationObserver(this.ca.bind(this)),
        b.observe(a, {
            attributes: !0,
            attributeFilter: ["style"]
        }),
        b.observe(a.parentElement, {
            childList: !0
        }),
        this.N && this.N.observe(a));
        1 == this.f && t(a, this.S) && (a.j = !0,
        a.u = 10);
        return d
    }
    ;
    e.A = function(a, b, c, d) {
        if (b = this.Sa(a, b, c))
            d && this.j && this.j.observe(a),
            d = this.L(a),
            this.a.postMessage([41, b, a.localName, a.src || a.data, a.a, a.c, d])
    }
    ;
    e.ub = function(a, b, c, d, f, h) {
        var m, l, p, k = window.getComputedStyle.bind(window);
        try {
            var g = 0;
            var q = document.activeElement;
            q && M(q.localName) || (q = document.elementFromPoint(this.ha, this.ia)) && !M(q.localName) && (q = null);
            for (var n of document.querySelectorAll("video,audio,object,embed")) {
                var r = n.localName, u, v = "object" == r || "embed" == r;
                if (v) {
                    var C = n.type.toLowerCase();
                    if (C.startsWith("text/") || C.startsWith("image/"))
                        continue;
                    if ("embed" == r && "application/x-shockwave-flash" != C)
                        continue
                }
                if (n.a && !n.j && (f || h))
                    if (f ? f == n.c : h == n.a)
                        var x = n;
                    else
                        continue;
                else if (u = n.src || n.data)
                    u != a && u != b || (x = n);
                else if (!v)
                    for (var H of n.getElementsByTagName("source"))
                        if ((u = H.src) && (u == a || u == b) && (x = n))
                            break;
                if (x)
                    if ("cover" == k(n).objectFit) {
                        var z = n;
                        x = null
                    } else
                        break;
                if (!(z || q || m)) {
                    if (u) {
                        if ((u == c || u == d) && (m = n))
                            continue;
                        if ("video" == r && u.startsWith("data:audio/"))
                            continue
                    }
                    var A = n.clientWidth
                      , D = n.clientHeight;
                    if (A && D) {
                        var Q = n.getBoundingClientRect();
                        if (!(0 >= Q.right + window.scrollX || 0 >= Q.bottom + window.scrollY))
                            if ("hidden" == k(n).visibility || n.W)
                                "video" == r && (p || (p = n));
                            else {
                                v = A * D;
                                if (g < v && 1.35 * A > D && A < 3 * D) {
                                    g = v;
                                    var ca = n
                                }
                                l || (l = n)
                            }
                    }
                }
            }
        } catch (da) {}
        (n = x || z || q || m) ? "video" != n.localName && "hidden" == k(n).visibility && (n = null) : n = ca || l || p;
        n && ("embed" != n.localName || n.clientWidth || n.clientHeight || (a = n.parentElement,
        "object" == a.localName && (n = a)),
        this.Sa(n, f, h));
        return n
    }
    ;
    e.tb = function(a, b, c) {
        var d = null, f, h = browser.runtime.Wa, m;
        for (m of document.getElementsByTagName("iframe")) {
            var l = m.h;
            null == l && h && (l = m.h = h(m));
            if (l == a) {
                d = m;
                break
            } else
                d || !(f = m.src) || f != b && f != c || (d = m)
        }
        return d && this.M(d)
    }
    ;
    e.L = function(a) {
        var b = null;
        try {
            var c = window.getComputedStyle(a)
              , d = a.getBoundingClientRect()
              , f = this.P
              , h = Math.round(d.width)
              , m = Math.round(d.height);
            if ("hidden" == c.visibility && !a.contentWindow)
                return h > 5 * m ? null : !1;
            if (0 == c.opacity || a.W)
                return !1;
            if (1 == this.f && 0 == a.offsetTop + a.offsetHeight) {
                for (var l = a; l = l.parentElement; ) {
                    var p = window.getComputedStyle(l);
                    if ("block" != p.display)
                        break;
                    if (0 == p.opacity)
                        return !1
                }
                d = a.parentElement.parentElement.getBoundingClientRect();
                f = 0
            }
            var k = Math.round(d.left) + a.clientLeft
              , g = Math.round(d.top) + a.clientTop
              , q = d = 0;
            l = a;
            p = c;
            for (var n, r; f-- && "block" == p.display && (n = l.parentElement) && "div" == n.localName; l = n,
            p = r) {
                r = window.getComputedStyle(n);
                d -= l.offsetLeft;
                q -= l.offsetTop;
                if ("hidden" == r.overflowX) {
                    var u = h - n.offsetWidth - d;
                    0 < d && (h -= d,
                    k += d);
                    0 < u && (h -= u);
                    f = 0
                }
                if ("hidden" == r.overflowY) {
                    var v = m - n.offsetHeight - q;
                    0 < q && (m -= q,
                    g += q);
                    0 < v && (m -= v);
                    f = 0
                }
            }
            switch (a.localName) {
            case "video":
                document.contains(a) && (a.videoWidth || a.a || 1 > a.readyState && 2 == a.networkState) && (b = !1);
                if (15 > h || 10 > m)
                    return b;
                break;
            case "audio":
                if (1 > h && 1 > m)
                    return b;
                var C = !0
            }
            var x = document.documentElement
              , H = x.scrollWidth || x.clientWidth
              , z = x.scrollHeight || x.clientHeight;
            if (k >= H || g >= z || C && !k && !g)
                return b;
            0 == k && g == -z && h == H && m == z && (g = 0);
            var A = this.V();
            q = a.u || 0;
            b = [k, g + q, k + h, g + m - q, A]
        } catch (D) {}
        return b
    }
    ;
    e.pb = function(a) {
        var b = a.Db;
        if (b) {
            b = document.elementsFromPoint((b.left + b.right) / 2, (b.top + b.bottom) / 2);
            for (var c, d; (c = b.shift()) && !c.isSameNode(a); ) {
                var f = window.getComputedStyle(c);
                if ("visible" == f.visibility && "0" != f.opacity && !T(f.backgroundColor)) {
                    d = !0;
                    break
                }
            }
            a.W = d
        }
    }
    ;
    e.G = function() {
        var a = U ? 80 : 90;
        try {
            var b = window.top.document.title
        } catch (c) {}
        b || (b = (b = document.head.querySelector('meta[property="og:title"]')) && b.getAttribute("content"),
        a = 70);
        b && (b = b.replace(/^\(\d+\)/, "").replace(/[ \t\r\n\u25B6]+/g, " "),
        b = new String(b.trim()),
        b.src = a);
        return b
    }
    ;
    e.yb = function() {
        if (!document.elementsFromPoint)
            return 0;
        var a = document.documentElement
          , b = a.clientWidth || a.offsetWidth;
        a = (a.clientHeight || window.innerHeight) / 4;
        var c = document.elementsFromPoint(0, 0), d = 0, f = 0, h = 0, m;
        for (m of c)
            if (m.offsetWidth >= b) {
                var l = window.getComputedStyle(m);
                .95 <= l.opacity && (c = l.zIndex,
                "fixed" == l.position ? (l = m.offsetHeight + m.offsetTop,
                d < l && l < a && (d = l,
                f = c)) : h < c && (h = c))
            }
        f < h && (d = 0);
        return d
    }
    ;
    e.vb = function(a, b, c, d, f, h, m, l, p) {
        l && R("text/javascript", l);
        this.lb = a;
        this.ba = b;
        if (d) {
            this.$ = d;
            try {
                window.frameElement && (window.frameElement.h = d)
            } catch (k) {}
        }
        this.Xa(h);
        f && this.Yb(f, G(arguments, 9));
        p && (this.b(2, window, "message", this.Xb),
        R("text/javascript", p));
        "loading" == document.readyState ? this.fa = !0 : this.Y()
    }
    ;
    e.wb = function(a) {
        this.ga && this.i && (this.i = 0,
        this.ja = window.setTimeout(this.da.bind(this, !1), 3E3));
        this.Y(!0);
        a && this.Xa();
        for (var b of w(this.c))
            this.pb(b)
    }
    ;
    e.Xa = function(a) {
        if (this.O(arguments)) {
            var b = [21, this.ac || location.href, document.referrer];
            a && b.push(document.getElementsByTagName("video").length, document.getElementsByTagName("audio").length);
            this.a.postMessage(b)
        }
    }
    ;
    e.Ab = function(a) {
        var b = a ? this.O(arguments) : 1;
        if (0 < b || 0 > b && 1 != this.f) {
            b = this.G();
            var c = this.V()
              , d = this.yb();
            this.a.postMessage([24, b, b && b.src, c, d])
        }
    }
    ;
    e.Cb = function(a, b, c, d, f) {
        c || (c = this.tb(b, d, f));
        d = (d = c && this.c[c]) && this.L(d);
        this.a.postMessage([22, a, b, c, d])
    }
    ;
    e.zb = function(a, b) {
        var c = document.getElementsByTagName("a"), d;
        for (d of c)
            try {
                if (d.href == b) {
                    var f = d.download || null;
                    var h = d.innerText.trim() || d.title || null;
                    break
                }
            } catch (m) {}
        this.a.postMessage([35, a, f, h])
    }
    ;
    e.Bb = function(a, b, c, d, f, h, m, l) {
        if (this.O(arguments)) {
            var p = [23, a, b, !1], k, g, q;
            if (b)
                b && ((k = this.c[b]) || (p[3] = !0));
            else {
                if (k = this.ub(c, d, f, h, l, m)) {
                    if (this.ka && (g = t(k, this.ka)))
                        var n = 200;
                    else if (g = k.getAttribute("operadetachedviewtitle"))
                        n = 130;
                    p[2] = b = k.l;
                    p[5] = k.localName;
                    p[6] = k.src || k.data
                } else if (l || m)
                    p[3] = !0;
                !g && (g = this.G()) && (n = g.src,
                (q = aa.exec(g)) && (g = q[1]));
                p[7] = g;
                p[8] = n
            }
            k && (g = this.L(k),
            null != g || document.contains(k) ? p[4] = g : (this.K(k),
            p[3] = !0));
            this.a.postMessage(p)
        }
    }
    ;
    e.xb = function(a, b, c, d) {
        var f = d ? RegExp(d, "i") : null;
        d = this.Va(document, f, b);
        var h = document.getElementsByTagName("iframe"), m;
        for (m of h)
            try {
                var l = m.contentDocument;
                l && !m.src && I(d, this.Va(l, f, b))
            } catch (p) {}
        a = [27, a, this.$, d.length];
        c || (a[4] = d,
        a[5] = location.href,
        U && (a[6] = location.href,
        a[7] = document.title));
        this.a.postMessage(a)
    }
    ;
    e.Va = function(a, b, c) {
        var d = []
          , f = {}
          , h = ""
          , m = ""
          , l = !c;
        if (c) {
            var p = a.getSelection();
            if (!p || p.isCollapsed && !p.toString().trim())
                return d
        }
        for (var k of a.getElementsByTagName("a"))
            if (l || p.containsNode(k, !0))
                try {
                    var g = k.href;
                    g && !f[g] && b.test(g) && (f[g] = d.push([g, 2, k.download || null, k.innerText.trim() || k.title]));
                    c && f[g] && (m += k.innerText,
                    m += "\n")
                } catch (n) {}
        for (k of a.getElementsByTagName("area"))
            if (l || p.containsNode(k, !0))
                try {
                    (g = k.href) && !f[g] && b.test(g) && (f[g] = d.push([g, 2, null, k.alt]))
                } catch (n) {}
        for (k of a.getElementsByTagName("img"))
            if (l || p.containsNode(k, !0))
                try {
                    (g = k.src) && !f[g] && b.test(g) && (f[g] = d.push([g, 3, null, "<<<=IDMTRANSMITIMGPREFIX=>>>" + k.alt])),
                    l && k.onclick && (h += k.onclick,
                    h += "\n")
                } catch (n) {}
        if (c) {
            if (h = p.toString()) {
                c = this.J(m);
                for (g of this.J(h))
                    g && !f[g] && b.test(g) && !c.includes(g) && (f[g] = d.push([g, 1]))
            }
            for (k of a.getElementsByTagName("textarea"))
                if (a = k.selectionStart,
                h = k.selectionEnd,
                (c = p.isCollapsed && a < h) || p.containsNode(k, !0))
                    try {
                        var q = c ? k.value.substring(a, h) : k.value;
                        for (g of this.J(q))
                            g && !f[g] && b.test(g) && (f[g] = d.push([g, 1]))
                    } catch (n) {}
        } else {
            for (k of a.getElementsByTagName("iframe"))
                try {
                    (g = k.src) && !f[g] && b.test(g) && (f[g] = d.push([g, 4]))
                } catch (n) {}
            for (k of a.getElementsByTagName("script"))
                h += k.innerText,
                h += "\n";
            if (h)
                for (g of this.J(h))
                    g && !f[g] && b.test(g) && (f[g] = d.push([g, 5]))
        }
        return d
    }
    ;
    e.J = function(a) {
        if (!this.gb) {
            var b = "\\b\\w+://(?:[%T]*(?::[%T]*)?@)?[%H.]+\\.[%H]+(?::\\d+)?(?:/(?:(?: +(?!\\w+:))?[%T/~;])*)?(?:\\?[%Q]*)?(?:#[%T]*)?".replace(/%\w/g, function(d) {
                return this[d]
            }
            .bind({
                "%H": "\\w\\-\u00a0-\ufeff",
                "%T": "\\w\\-.+*()$!,%\u00a0-\ufeff",
                "%Q": "^\\s\\[\\]{}()"
            }));
            this.gb = RegExp(b, "gi")
        }
        for (var c = []; b = this.gb.exec(a); )
            c.push(b.shift());
        return c
    }
    ;
    e.O = function(a) {
        var b = this.i;
        b || (a = E(a && a.callee ? a : arguments),
        a.unshift(arguments.callee.caller),
        this.aa.push(a));
        return b
    }
    ;
    e.$a = function(a) {
        try {
            var b = window.top.document.getElementsByTagName("title")[0]
        } catch (c) {}
        this.i = a && b ? -1 : 1;
        b && (a = this.ga,
        a || (this.ga = a = new MutationObserver(this.da.bind(this))),
        a.observe(b, {
            childList: !0
        }));
        try {
            this.N = new ResizeObserver(this.ca.bind(this))
        } catch (c) {}
        try {
            this.j = new IntersectionObserver(this.ca.bind(this),{
                threshold: .2
            })
        } catch (c) {}
        this.fa && (this.fa = !1,
        this.Y());
        for (a = this.aa; b = a.shift(); )
            b.shift().apply(this, b)
    }
    ;
    e.ca = function(a) {
        if (this.a)
            for (var b of a)
                if (a = b.target,
                a.l)
                    if (document.contains(a)) {
                        var c = b.isIntersecting;
                        null != c && (a.W = !c,
                        a.Db = c ? b.intersectionRect : null);
                        a.v && window.clearTimeout(a.v);
                        a.v = window.setTimeout(this.Mb.bind(this, a), 200)
                    } else
                        this.a.postMessage([23, null, a.l, !0]),
                        this.K(a)
    }
    ;
    e.Mb = function(a) {
        if (!this.a)
            return this.K(a);
        a.v = null;
        var b = document.contains(a);
        if (b) {
            var c = this.L(a);
            if (1 == this.f && a.j)
                if (c) {
                    var d = t(a, this.S);
                    d && d.href && d.href != a.a && this.A(a, null, d.href)
                } else
                    a.a = a.c = null,
                    b = !1
        } else
            this.K(a);
        this.a.postMessage([23, null, a.l, !b, c])
    }
    ;
    e.da = function(a) {
        if (a)
            window.clearTimeout(this.ja),
            this.ja = window.setTimeout(this.da.bind(this, !1), 1E3);
        else {
            0 > this.i ? this.i = 1 : ++this.i;
            for (var b = this.aa; a = b.shift(); )
                a.shift().apply(this, a)
        }
    }
    ;
    e.Lb = function(a) {
        var b = a.target
          , c = b.localName;
        M(c) && a.url && (b = this.M(b),
        this.a.postMessage([25, b, c, a.url]))
    }
    ;
    e.ab = function(a) {
        !a.repeat && L[a.keyCode] && this.a.postMessage([31, a.keyCode, "keydown" == a.type])
    }
    ;
    e.Pb = function(a) {
        this.nb && this.a.postMessage([28]);
        if (0 == a.button) {
            var b = a.view.getSelection();
            b && b.isCollapsed && !b.toString().trim() && (this.s = 1);
            this.a.postMessage([32, a.button, !0])
        }
    }
    ;
    e.Rb = function(a) {
        if (0 == a.button) {
            this.ha = a.clientX;
            this.ia = a.clientY;
            this.a.postMessage([32, a.button, !1]);
            var b = a.view.getSelection();
            b && this.s && (this.s = b.isCollapsed && !b.toString().trim() ? 0 : 2) && this.a.postMessage([26, a.clientX, a.clientY, this.V()])
        }
    }
    ;
    e.Qb = function() {
        2 == this.s && (this.s = 0)
    }
    ;
    e.Ob = function(a) {
        a = a.target;
        "a" == a.localName && this.a.postMessage([39, a.hasAttribute("download"), a.href, a.download])
    }
    ;
    e.Wb = function() {
        this.a.postMessage([29])
    }
    ;
    e.Vb = function(a) {
        a = a.target;
        this.a.postMessage([30, a.innerWidth, a.innerHeight])
    }
    ;
    e.Nb = function() {
        this.s = 0;
        this.a.postMessage([33])
    }
    ;
    e.b = function(a, b, c, d, f) {
        var h = E(arguments);
        h[3] = d.bind(this);
        this.ea.push(h);
        0 > a ? (b = b[c],
        b.addListener.apply(b, h.slice(3))) : b.addEventListener.apply(b, h.slice(2))
    }
    ;
    e.cb = function(a) {
        for (var b = this.ea, c = 0; c < b.length; c++) {
            var d = b[c][0];
            if (!a || a == d) {
                var f = b.splice(c--, 1).pop()
                  , h = f.splice(0, 2).pop();
                0 > d ? (h = h[f.shift()],
                h.removeListener.apply(h, f)) : h.removeEventListener.apply(h, f)
            }
        }
    }
    ;
    e.Kb = function(a) {
        X = "youtube";
        Y = "idmrs://youtube/";
        var b = this.Qa.exec(location.pathname + location.search);
        if (b) {
            var c = t(document.body, this.Pa);
            c && this.A(c, b[1])
        }
        if (!a) {
            a = this.a;
            var d, f, h, m = 0, l;
            for (l of document.getElementsByTagName("script")) {
                if (l.src) {
                    if (b = this.I.exec(l.src))
                        m |= 1,
                        this.D[b[1]] ? f = b[1] : c = l.src
                } else if (b = this.Oa.exec(l.textContent))
                    m |= 2,
                    (h = parseInt(b[1], 10)) && !this.D[h] && (b = this.Ra.exec(l.textContent)) && (b = this.I.exec(b[1])) && (d = V + b[0]);
                else if (this.Ja.test(l.textContent)) {
                    m |= 4;
                    var p = l.outerHTML
                }
                if (7 == m)
                    break
            }
            if (h || f)
                b = {},
                b[118] = h,
                b[124] = f,
                a.postMessage([37, 1, 2, b]);
            a.postMessage([34, this.G(), null, p]);
            if (c || (c = d))
                d = new XMLHttpRequest,
                d.responseType = "text",
                d.timeout = 1E4,
                d.onreadystatechange = this.$b.bind(this, c, d),
                d.open("GET", c, !0),
                d.send();
            this.P = 2
        }
    }
    ;
    e.$b = function(a, b) {
        if (4 == b.readyState) {
            var c = this.I.exec(a);
            if ((a = (a = this.Ka.exec(b.response)) && parseInt(a[1] || a[2], 10)) && (!this.D[a] || !this.D[c[1]])) {
                var d = this.La.exec(b.response)
                  , f = this.Ma.exec(b.response);
                b = this.Na.exec(b.response);
                if (d && f && d[2] == f[1]) {
                    c = c && c[1];
                    var h = {};
                    h[118] = a;
                    h[119] = d[0];
                    h[120] = f[0];
                    h[135] = b && b[0];
                    h[124] = c;
                    this.a.postMessage([37, 1, 1, h])
                }
            }
        }
    }
    ;
    e.Gb = function d(b, c) {
        b ? (c && b.shift().disconnect(),
        this.Z.disconnect(),
        this.fb.disconnect(),
        this.eb.clear()) : (this.U(this.ra),
        this.Z = new MutationObserver(this.rb.bind(this)),
        this.fb = new MutationObserver(this.qb.bind(this)),
        this.eb = new Set,
        this.P = 3,
        this.m.startsWith("$") || (this.m = "$<" + this.m.slice(1) + "<"),
        this.o.startsWith("$") || (this.o = "$<" + this.o.slice(1) + "<"),
        this.B.startsWith("$") || (this.B = "$*" + this.B),
        this.C.startsWith("$") || (this.C = "$*" + this.C));
        if (c = this.kb = t(document.body, this.pa)) {
            if (b = this.Z,
            b.observe(c, {
                childList: !0
            }),
            !this.Ua(c, !0) && (c = t(c, this.qa))) {
                var f = t(c, this.m);
                f && b.observe(c, {
                    childList: !0
                });
                b.observe(f || c.parentNode, {
                    childList: !0
                })
            }
        } else
            !b && (c = t(document.body, this.ma)) && (f = new MutationObserver(d.bind(this, b = [])),
            b.push(f),
            f.observe(c, {
                childList: !0
            }))
    }
    ;
    e.Ua = function(b, c) {
        var d = this.Z, f = this.m, h = this.B, m = this.fb, l = this.eb, p = 0, k;
        for (k of t(b, h, []))
            l.has(k) || t(k, h) || (l.add(k),
            m.observe(k, {
                childList: !0,
                subtree: !0
            }),
            c && (b = t(k, f)) && (d.observe(b, {
                childList: !0
            }),
            p++),
            J(k.getElementsByTagName("video"), this.T.bind(this)));
        return p
    }
    ;
    e.rb = function(b) {
        var c = this.kb, d;
        for (d of b) {
            b = d.target.isSameNode(c);
            for (var f of d.addedNodes)
                1 == f.nodeType && this.Ua(f, b)
        }
    }
    ;
    e.qb = function(b) {
        var c = this.u, d = this.o, f;
        for (f of b)
            for (var h of f.addedNodes)
                if (1 == h.nodeType)
                    if (b = h.getElementsByTagName("video"),
                    b.length)
                        J(b, this.T.bind(this));
                    else
                        for (var m of c) {
                            b = m.shift();
                            var l = t(b, d);
                            l && l.contains(h) && this.T(b)
                        }
    }
    ;
    e.T = function(b) {
        if (!b.a) {
            var c = t(b, this.o), d, f = c && t(c, this.sa);
            if (!f) {
                for (var h = this.la, m = this.oa, l = F.bind(["div", "span", "a"]), p, k, g, q, n, r = c; r && m-- && l(r.localName); r = r.parentNode) {
                    var u = k = r
                      , v = h + ":scope:first-child:only-of-type";
                    for (d = 0; "<" == v[d]; d++)
                        ;
                    d && (v = v.slice(d));
                    for (u = u.closest(v); u && d--; u = u.parentElement)
                        ;
                    if (d = u)
                        break;
                    if ((g = r.previousSibling) && "div" == g.localName) {
                        p || (p = r.querySelector('div[role="slider"]'));
                        1 == (n = r.querySelectorAll(h)).length ? d = n[0] : (q = r.nextSibling) && 1 == (n = q.querySelectorAll("ul:scope " + h)).length ? d = n[0] : p && 1 < (n = g.querySelectorAll(h)).length && (d = n[n.length - 1]);
                        break
                    }
                }
                !d && k && 1 == (n = t(k, this.C, [])).length && (d = n[0]);
                !d && c && (d = c.querySelector(":scope >" + h));
                d && (d = d.href);
                !d && 1 == document.getElementsByTagName("video").length && (f = this.na.exec(location.href)) && (f = f[1])
            }
            f || d ? this.A(b, f, d) : this.bb(b, this.jb, this.sb.bind(this))
        }
    }
    ;
    e.sb = function(b, c) {
        c && this.A(b, c)
    }
    ;
    e.Hb = function(b) {
        !b && (this.U(this.ua),
        b = t(document.body, this.Ba)) && (B(b, this.va, this.Eb.bind(this)),
        B(b, this.ya, this.X.bind(this)),
        B(b, this.Ca, this.X.bind(this)),
        B(document.body, this.xa, this.X.bind(this)))
    }
    ;
    e.Ya = function(b, c, d) {
        !c && 1 == document.getElementsByTagName("video").length && (c = this.wa.exec(location.href)) && (c = c[1]);
        this.A(b, c, d, !0)
    }
    ;
    e.Eb = function(b) {
        for (var c of t(b, this.ta, []))
            J(t(c, this.R, []), this.Za.bind(this))
    }
    ;
    e.X = function(b) {
        J(t(b, this.R, []), this.Za.bind(this))
    }
    ;
    e.Za = function(b) {
        if (!b.a) {
            var c = t(b, this.za);
            c ? this.Ya(b, null, c) : this.bb(b, this.Aa, this.Fb.bind(this))
        }
    }
    ;
    e.Fb = function(b, c) {
        c && this.Ya(b, c)
    }
    ;
    e.Jb = function(b) {
        b || (this.U(this.Ea),
        (b = t(document.body, this.Ga)) && B(b, this.Ha, this.Zb.bind(this)))
    }
    ;
    e.Zb = function(b) {
        if (b = t(b, this.Ia)) {
            var c = this.Fa.exec(W);
            c && this.A(b, c[1])
        }
    }
    ;
    e.Ib = function(b) {
        if (!b) {
            var c = t(document.body, this.mb);
            c && (b = this.G(),
            c = c.outerHTML,
            this.a.postMessage([34, b, null, c.slice(0, c.indexOf(">") + 1)]))
        }
    }
    ;
    function R(b, c) {
        var d = b.startsWith("image/") ? "img" : "script";
        d = document.createElement(d);
        d.src = "data:" + b + ";base64," + c;
        d.onload = d.remove.bind(d);
        document.documentElement.appendChild(d)
    }
    function t(b, c, d) {
        function f(q, n, r) {
            for (; r && n--; )
                r = r.parentElement;
            r && (isNaN(q) || this.push(q),
            this.push(r));
            return r
        }
        if (!c)
            return d;
        var h, m, l = !0, p = d || [], k = c.split(O);
        1 == k.length ? (k[0].startsWith("<") && k.unshift(k.shift().slice(1) + "<"),
        k.unshift(">", NaN)) : k.shift();
        for (; b && (h = k.shift()); ) {
            c = parseInt(k.shift(), 10);
            var g = k.shift().trim();
            for (m = 1; "<" == g[g.length - m]; m++)
                ;
            --m && (g = g.slice(0, -m).trim());
            switch (h) {
            case "<":
                b = S(g ? b.closest(g) : b, m);
                l = !0;
                break;
            case ">":
                b = S(b.querySelector(g), m);
                l = !0;
                break;
            case "{":
                b.closest(g) && (b = null);
                break;
            case "}":
                b.querySelector(g) && (b = null);
                break;
            case "|":
                if (g = g.endsWith(":scope") ? b.closest(g) : b.querySelector(g))
                    return g;
                l = !1;
                break;
            case "&":
                b = f.call(p, c, m, b.querySelector(g));
                l = !1;
                break;
            case "*":
                b.querySelectorAll(g).forEach(f.bind(p, c, m));
                l = !1;
                break;
            case "+":
                g = g ? g.endsWith(":scope") ? b.closest(g) : b.querySelector(g) : b;
                f.call(p, c, m, g);
                l = !1;
                break;
            case "=":
                if (g = b.getAttribute(g))
                    return g;
                l = !1;
                break;
            case "@":
                if (g = b.textContent.trim())
                    return g;
                l = !1
            }
        }
        return p.length ? p : l && b || d
    }
    function B(b, c, d, f, h, m) {
        if (null == f) {
            f = t(b, c, []);
            m = new MutationObserver(B.bind(null, b, c, d, f));
            m.observe(b, {
                childList: !0
            });
            for (var l of f)
                m.observe(l, {
                    childList: !0
                });
            f.length && d(f.F(-1))
        } else
            for (var p of h) {
                for (var k of p.addedNodes)
                    if (1 == k.nodeType) {
                        h = t(b, c, []).slice(f.length);
                        var g = h.F(-1);
                        if (g && k.contains(g)) {
                            I(f, h);
                            for (l of h)
                                m.observe(l, {
                                    childList: !0
                                });
                            for (var q of g.children)
                                d(q)
                        } else
                            p.target.isSameNode(f.F(-1) || b) && d(k)
                    }
                for (k of p.removedNodes)
                    if (1 == k.nodeType)
                        for (h = 0; h < f.length; h++)
                            if (k.contains(f[h])) {
                                f.splice(h);
                                break
                            }
            }
    }
    function S(b, c) {
        for (; b && c--; b = b.parentElement)
            ;
        return b
    }
    function ba(b, c) {
        c && (b[c] = !0);
        return b
    }
    var Z = Object.isExtensible;
    try {
        Z(null)
    } catch (b) {
        Z = function(c) {
            return c instanceof Object
        }
    }
    String.prototype.replaceAll || (String.prototype.replaceAll = function(b, c) {
        return this.split(b).join(c)
    }
    );
    new P
}
!0;

/* Copyright 2014 Google */
(function() {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var k, aa = function(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }, ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    , da = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("Cannot find global object");
    }, ea = da(this), fa = function(a, b) {
        if (b)
            a: {
                var c = ea;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c))
                        break a;
                    c = c[e]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && ba(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    };
    fa("Symbol", function(a) {
        if (a)
            return a;
        var b = function(f, h) {
            this.g = f;
            ba(this, "description", {
                configurable: !0,
                writable: !0,
                value: h
            })
        };
        b.prototype.toString = function() {
            return this.g
        }
        ;
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_"
          , d = 0
          , e = function(f) {
            if (this instanceof e)
                throw new TypeError("Symbol is not a constructor");
            return new b(c + (f || "") + "_" + d++,f)
        };
        return e
    });
    fa("Symbol.iterator", function(a) {
        if (a)
            return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = ea[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ha(aa(this))
                }
            })
        }
        return a
    });
    var ha = function(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }, ia = function(a) {
        return a.raw = a
    }, ja = function(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b)
            return b.call(a);
        if ("number" == typeof a.length)
            return {
                next: aa(a)
            };
        throw Error(String(a) + " is not an iterable or ArrayLike");
    }, ka = function(a) {
        if (!(a instanceof Array)) {
            a = ja(a);
            for (var b, c = []; !(b = a.next()).done; )
                c.push(b.value);
            a = c
        }
        return a
    }, la = "function" == typeof Object.create ? Object.create : function(a) {
        var b = function() {};
        b.prototype = a;
        return new b
    }
    , ma;
    if ("function" == typeof Object.setPrototypeOf)
        ma = Object.setPrototypeOf;
    else {
        var na;
        a: {
            var oa = {
                a: !0
            }
              , pa = {};
            try {
                pa.__proto__ = oa;
                na = pa.a;
                break a
            } catch (a) {}
            na = !1
        }
        ma = na ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
                throw new TypeError(a + " is not extensible");
            return a
        }
        : null
    }
    var qa = ma
      , m = function(a, b) {
        a.prototype = la(b.prototype);
        a.prototype.constructor = a;
        if (qa)
            qa(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else
                        a[c] = b[c];
        a.I = b.prototype
    }
      , sa = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    fa("WeakMap", function(a) {
        function b() {}
        function c(l) {
            var n = typeof l;
            return "object" === n && null !== l || "function" === n
        }
        function d(l) {
            if (!sa(l, f)) {
                var n = new b;
                ba(l, f, {
                    value: n
                })
            }
        }
        function e(l) {
            var n = Object[l];
            n && (Object[l] = function(p) {
                if (p instanceof b)
                    return p;
                Object.isExtensible(p) && d(p);
                return n(p)
            }
            )
        }
        if (function() {
            if (!a || !Object.seal)
                return !1;
            try {
                var l = Object.seal({})
                  , n = Object.seal({})
                  , p = new a([[l, 2], [n, 3]]);
                if (2 != p.get(l) || 3 != p.get(n))
                    return !1;
                p.delete(l);
                p.set(n, 4);
                return !p.has(l) && 4 == p.get(n)
            } catch (q) {
                return !1
            }
        }())
            return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var h = 0
          , g = function(l) {
            this.W = (h += Math.random() + 1).toString();
            if (l) {
                l = ja(l);
                for (var n; !(n = l.next()).done; )
                    n = n.value,
                    this.set(n[0], n[1])
            }
        };
        g.prototype.set = function(l, n) {
            if (!c(l))
                throw Error("Invalid WeakMap key");
            d(l);
            if (!sa(l, f))
                throw Error("WeakMap key fail: " + l);
            l[f][this.W] = n;
            return this
        }
        ;
        g.prototype.get = function(l) {
            return c(l) && sa(l, f) ? l[f][this.W] : void 0
        }
        ;
        g.prototype.has = function(l) {
            return c(l) && sa(l, f) && sa(l[f], this.W)
        }
        ;
        g.prototype.delete = function(l) {
            return c(l) && sa(l, f) && sa(l[f], this.W) ? delete l[f][this.W] : !1
        }
        ;
        return g
    });
    fa("Map", function(a) {
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var g = Object.seal({
                    x: 4
                })
                  , l = new a(ja([[g, "s"]]));
                if ("s" != l.get(g) || 1 != l.size || l.get({
                    x: 4
                }) || l.set({
                    x: 4
                }, "t") != l || 2 != l.size)
                    return !1;
                var n = l.entries()
                  , p = n.next();
                if (p.done || p.value[0] != g || "s" != p.value[1])
                    return !1;
                p = n.next();
                return p.done || 4 != p.value[0].x || "t" != p.value[1] || !n.next().done ? !1 : !0
            } catch (q) {
                return !1
            }
        }())
            return a;
        var b = new WeakMap
          , c = function(g) {
            this.l = {};
            this.g = f();
            this.size = 0;
            if (g) {
                g = ja(g);
                for (var l; !(l = g.next()).done; )
                    l = l.value,
                    this.set(l[0], l[1])
            }
        };
        c.prototype.set = function(g, l) {
            g = 0 === g ? 0 : g;
            var n = d(this, g);
            n.list || (n.list = this.l[n.id] = []);
            n.entry ? n.entry.value = l : (n.entry = {
                next: this.g,
                previous: this.g.previous,
                head: this.g,
                key: g,
                value: l
            },
            n.list.push(n.entry),
            this.g.previous.next = n.entry,
            this.g.previous = n.entry,
            this.size++);
            return this
        }
        ;
        c.prototype.delete = function(g) {
            g = d(this, g);
            return g.entry && g.list ? (g.list.splice(g.index, 1),
            g.list.length || delete this.l[g.id],
            g.entry.previous.next = g.entry.next,
            g.entry.next.previous = g.entry.previous,
            g.entry.head = null,
            this.size--,
            !0) : !1
        }
        ;
        c.prototype.clear = function() {
            this.l = {};
            this.g = this.g.previous = f();
            this.size = 0
        }
        ;
        c.prototype.has = function(g) {
            return !!d(this, g).entry
        }
        ;
        c.prototype.get = function(g) {
            return (g = d(this, g).entry) && g.value
        }
        ;
        c.prototype.entries = function() {
            return e(this, function(g) {
                return [g.key, g.value]
            })
        }
        ;
        c.prototype.keys = function() {
            return e(this, function(g) {
                return g.key
            })
        }
        ;
        c.prototype.values = function() {
            return e(this, function(g) {
                return g.value
            })
        }
        ;
        c.prototype.forEach = function(g, l) {
            for (var n = this.entries(), p; !(p = n.next()).done; )
                p = p.value,
                g.call(l, p[1], p[0], this)
        }
        ;
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(g, l) {
            var n = l && typeof l;
            "object" == n || "function" == n ? b.has(l) ? n = b.get(l) : (n = "" + ++h,
            b.set(l, n)) : n = "p_" + l;
            var p = g.l[n];
            if (p && sa(g.l, n))
                for (g = 0; g < p.length; g++) {
                    var q = p[g];
                    if (l !== l && q.key !== q.key || l === q.key)
                        return {
                            id: n,
                            list: p,
                            index: g,
                            entry: q
                        }
                }
            return {
                id: n,
                list: p,
                index: -1,
                entry: void 0
            }
        }
          , e = function(g, l) {
            var n = g.g;
            return ha(function() {
                if (n) {
                    for (; n.head != g.g; )
                        n = n.previous;
                    for (; n.next != n.head; )
                        return n = n.next,
                        {
                            done: !1,
                            value: l(n)
                        };
                    n = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }
          , f = function() {
            var g = {};
            return g.previous = g.next = g.head = g
        }
          , h = 0;
        return c
    });
    fa("Array.prototype.find", function(a) {
        return a ? a : function(b, c) {
            a: {
                var d = this;
                d instanceof String && (d = String(d));
                for (var e = d.length, f = 0; f < e; f++) {
                    var h = d[f];
                    if (b.call(c, h, f, d)) {
                        b = h;
                        break a
                    }
                }
                b = void 0
            }
            return b
        }
    });
    var ta = function(a, b) {
        a instanceof String && (a += "");
        var c = 0
          , d = !1
          , e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
        e[Symbol.iterator] = function() {
            return e
        }
        ;
        return e
    };
    fa("Array.prototype.values", function(a) {
        return a ? a : function() {
            return ta(this, function(b, c) {
                return c
            })
        }
    });
    fa("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return ta(this, function(b) {
                return b
            })
        }
    });
    fa("String.prototype.startsWith", function(a) {
        return a ? a : function(b, c) {
            if (null == this)
                throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");
            if (b instanceof RegExp)
                throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");
            var d = this + "";
            b += "";
            var e = d.length
              , f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var h = 0; h < f && c < e; )
                if (d[c++] != b[h++])
                    return !1;
            return h >= f
        }
    });
    fa("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(g) {
                return g
            }
            ;
            var e = []
              , f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var h = 0; !(f = b.next()).done; )
                    e.push(c.call(d, f.value, h++))
            } else
                for (f = b.length,
                h = 0; h < f; h++)
                    e.push(c.call(d, b[h], h));
            return e
        }
    });
    fa("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return ta(this, function(b, c) {
                return [b, c]
            })
        }
    });
    fa("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                sa(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    var ua = ua || {}
      , r = this || self
      , va = function(a) {
        a.Da = void 0;
        a.Z = function() {
            return a.Da ? a.Da : a.Da = new a
        }
    }
      , wa = function(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }
      , xa = function(a) {
        var b = wa(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
      , t = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
      , Aa = function(a) {
        return Object.prototype.hasOwnProperty.call(a, ya) && a[ya] || (a[ya] = ++za)
    }
      , ya = "closure_uid_" + (1E9 * Math.random() >>> 0)
      , za = 0
      , Ba = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
      , Ca = function(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
      , v = function(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? v = Ba : v = Ca;
        return v.apply(null, arguments)
    }
      , w = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }
      , y = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.I = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Ue = function(d, e, f) {
            for (var h = Array(arguments.length - 2), g = 2; g < arguments.length; g++)
                h[g - 2] = arguments[g];
            return b.prototype[e].apply(d, h)
        }
    }
      , Da = function(a) {
        return a
    };
    function Ea(a, b) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, Ea);
        else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }
    y(Ea, Error);
    Ea.prototype.name = "CustomError";
    var Fa;
    function Ga(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++)
            c += a[e] + (e < b.length ? b[e] : "%s");
        Ea.call(this, c + a[d])
    }
    y(Ga, Ea);
    Ga.prototype.name = "AssertionError";
    function Ha(a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var f = d
        } else
            a && (e += ": " + a,
            f = b);
        throw new Ga("" + e,f || []);
    }
    var A = function(a, b, c) {
        a || Ha("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    }
      , B = function(a, b) {
        throw new Ga("Failure" + (a ? ": " + a : ""),Array.prototype.slice.call(arguments, 1));
    }
      , Ia = function(a, b, c) {
        "number" !== typeof a && Ha("Expected number but got %s: %s.", [wa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }
      , Ja = function(a, b, c) {
        "string" !== typeof a && Ha("Expected string but got %s: %s.", [wa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }
      , Ka = function(a, b, c) {
        t(a) || Ha("Expected object but got %s: %s.", [wa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }
      , La = function(a, b, c) {
        Array.isArray(a) || Ha("Expected array but got %s: %s.", [wa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }
      , Ma = function(a, b, c) {
        t(a) && 1 == a.nodeType || Ha("Expected Element but got %s: %s.", [wa(a), a], b, Array.prototype.slice.call(arguments, 2))
    }
      , Oa = function(a, b, c, d) {
        a instanceof b || Ha("Expected instanceof %s but got %s.", [Na(b), Na(a)], c, Array.prototype.slice.call(arguments, 3));
        return a
    };
    function Na(a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    }
    ;var Pa = function(a) {
        return function() {
            return a
        }
    }
      , Qa = function(a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2);
            d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
            d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
            a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
        }
        return a
    }
      , Ra = null
      , Sa = function(a) {
        if (null !== Ra)
            var b = Ra;
        else {
            b = Pa(String.fromCharCode(84));
            var c = Pa(String.fromCharCode(75));
            b = [b(), b()];
            b[1] = c();
            b = (Ra = window[b.join(c())] || "") || ""
        }
        var d = Pa(String.fromCharCode(116));
        c = Pa(String.fromCharCode(107));
        d = [d(), d()];
        d[1] = c();
        c = "&" + d.join("") + "=";
        d = b.split(".");
        b = Number(d[0]) || 0;
        for (var e = [], f = 0, h = 0; h < a.length; h++) {
            var g = a.charCodeAt(h);
            128 > g ? e[f++] = g : (2048 > g ? e[f++] = g >> 6 | 192 : (55296 == (g & 64512) && h + 1 < a.length && 56320 == (a.charCodeAt(h + 1) & 64512) ? (g = 65536 + ((g & 1023) << 10) + (a.charCodeAt(++h) & 1023),
            e[f++] = g >> 18 | 240,
            e[f++] = g >> 12 & 63 | 128) : e[f++] = g >> 12 | 224,
            e[f++] = g >> 6 & 63 | 128),
            e[f++] = g & 63 | 128)
        }
        a = b;
        for (f = 0; f < e.length; f++)
            a += e[f],
            a = Qa(a, "+-a^+6");
        a = Qa(a, "+-3^+b+-f");
        a ^= Number(d[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
        return c + (a.toString() + "." + (a ^ b))
    };
    var Ta = function() {}
      , Ua = function(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    };
    var Va = Array.prototype.indexOf ? function(a, b) {
        A(null != a.length);
        return Array.prototype.indexOf.call(a, b, void 0)
    }
    : function(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , Wa = Array.prototype.forEach ? function(a, b) {
        A(null != a.length);
        Array.prototype.forEach.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            e in d && b.call(void 0, d[e], e, a)
    }
      , Xa = Array.prototype.some ? function(a, b) {
        A(null != a.length);
        return Array.prototype.some.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a))
                return !0;
        return !1
    }
    ;
    function Ya(a, b) {
        return 0 <= Va(a, b)
    }
    function Za(a, b) {
        b = Va(a, b);
        var c;
        if (c = 0 <= b)
            A(null != a.length),
            Array.prototype.splice.call(a, b, 1);
        return c
    }
    function $a(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
    ;function ab(a, b, c) {
        for (var d in a)
            b.call(c, a[d], d, a)
    }
    function bb(a, b) {
        for (var c in a)
            if (b.call(void 0, a[c], c, a))
                return !0;
        return !1
    }
    function cb(a, b) {
        for (var c in a)
            if (a[c] == b)
                return !0;
        return !1
    }
    var db = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function eb(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < db.length; f++)
                c = db[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }
    function fb(a) {
        var b = arguments.length;
        if (1 == b && Array.isArray(arguments[0]))
            return fb.apply(null, arguments[0]);
        if (b % 2)
            throw Error("Uneven number of arguments");
        for (var c = {}, d = 0; d < b; d += 2)
            c[arguments[d]] = arguments[d + 1];
        return c
    }
    ;var gb = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        command: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    };
    var hb;
    var kb = function(a, b) {
        this.g = a === ib && b || "";
        this.l = jb
    };
    kb.prototype.sa = !0;
    kb.prototype.ea = function() {
        return this.g
    }
    ;
    kb.prototype.toString = function() {
        return "Const{" + this.g + "}"
    }
    ;
    var lb = function(a) {
        if (a instanceof kb && a.constructor === kb && a.l === jb)
            return a.g;
        B("expected object of type Const, got '" + a + "'");
        return "type_error:Const"
    }
      , jb = {}
      , ib = {};
    var nb = function(a, b) {
        this.g = b === mb ? a : ""
    };
    nb.prototype.toString = function() {
        return this.g + ""
    }
    ;
    nb.prototype.sa = !0;
    nb.prototype.ea = function() {
        return this.g.toString()
    }
    ;
    var mb = {};
    var ob = function(a) {
        return /^[\s\xa0]*$/.test(a)
    }
      , pb = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }
      , xb = function(a) {
        if (!qb.test(a))
            return a;
        -1 != a.indexOf("&") && (a = a.replace(rb, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(sb, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(tb, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(ub, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(vb, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(wb, "&#0;"));
        return a
    }
      , rb = /&/g
      , sb = /</g
      , tb = />/g
      , ub = /"/g
      , vb = /'/g
      , wb = /\x00/g
      , qb = /[\x00&<>"']/
      , zb = function(a, b) {
        var c = 0;
        a = pb(String(a)).split(".");
        b = pb(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || ""
              , h = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                if (0 == f[0].length && 0 == h[0].length)
                    break;
                c = yb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || yb(0 == f[2].length, 0 == h[2].length) || yb(f[2], h[2]);
                f = f[3];
                h = h[3]
            } while (0 == c)
        }
        return c
    }
      , yb = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var Bb = function(a, b) {
        this.g = b === Ab ? a : ""
    };
    Bb.prototype.toString = function() {
        return this.g.toString()
    }
    ;
    Bb.prototype.sa = !0;
    Bb.prototype.ea = function() {
        return this.g.toString()
    }
    ;
    var Cb = function(a) {
        if (a instanceof Bb && a.constructor === Bb)
            return a.g;
        B("expected object of type SafeUrl, got '" + a + "' of type " + wa(a));
        return "type_error:SafeUrl"
    }
      , Db = /^data:(.*);base64,[a-z0-9+\/]+=*$/i
      , Eb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i
      , Fb = function(a) {
        if (a instanceof Bb)
            return a;
        a = "object" == typeof a && a.sa ? a.ea() : String(a);
        Eb.test(a) ? a = new Bb(a,Ab) : (a = String(a).replace(/(%0A|%0D)/g, ""),
        a = a.match(Db) ? new Bb(a,Ab) : null);
        return a
    }
      , Ab = {}
      , Gb = new Bb("about:invalid#zClosurez",Ab);
    var Hb = {}
      , Ib = function(a, b) {
        this.g = b === Hb ? a : "";
        this.sa = !0
    };
    Ib.prototype.ea = function() {
        return this.g
    }
    ;
    Ib.prototype.toString = function() {
        return this.g.toString()
    }
    ;
    var Jb = function(a) {
        if (a instanceof Ib && a.constructor === Ib)
            return a.g;
        B("expected object of type SafeStyle, got '" + a + "' of type " + wa(a));
        return "type_error:SafeStyle"
    }
      , Mb = function(a) {
        var b = "", c;
        for (c in a)
            if (Object.prototype.hasOwnProperty.call(a, c)) {
                if (!/^[-_a-zA-Z0-9]+$/.test(c))
                    throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
                var d = a[c];
                null != d && (d = Array.isArray(d) ? d.map(Kb).join(" ") : Kb(d),
                b += c + ":" + d + ";")
            }
        return b ? new Ib(b,Hb) : Lb
    }
      , Lb = new Ib("",Hb);
    function Kb(a) {
        if (a instanceof Bb)
            return 'url("' + Cb(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
        a = a instanceof kb ? lb(a) : Nb(String(a));
        if (/[{;}]/.test(a))
            throw new Ga("Value does not allow [{;}], got: %s.",[a]);
        return a
    }
    function Nb(a) {
        var b = a.replace(Ob, "$1").replace(Ob, "$1").replace(Pb, "url");
        if (Qb.test(b)) {
            if (Rb.test(a))
                return B("String value disallows comments, got: " + a),
                "zClosurez";
            for (var c = b = !0, d = 0; d < a.length; d++) {
                var e = a.charAt(d);
                "'" == e && c ? b = !b : '"' == e && b && (c = !c)
            }
            if (!b || !c)
                return B("String value requires balanced quotes, got: " + a),
                "zClosurez";
            if (!Sb(a))
                return B("String value requires balanced square brackets and one identifier per pair of brackets, got: " + a),
                "zClosurez"
        } else
            return B("String value allows only [-+,.\"'%_!#/ a-zA-Z0-9\\[\\]] and simple functions, got: " + a),
            "zClosurez";
        return Tb(a)
    }
    function Sb(a) {
        for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if ("]" == e) {
                if (b)
                    return !1;
                b = !0
            } else if ("[" == e) {
                if (!b)
                    return !1;
                b = !1
            } else if (!b && !c.test(e))
                return !1
        }
        return b
    }
    var Qb = RegExp("^[-+,.\"'%_!#/ a-zA-Z0-9\\[\\]]+$")
      , Pb = RegExp("\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))", "g")
      , Ob = RegExp("\\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|radial-gradient|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?|steps|var)\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)", "g")
      , Rb = /\/\*/;
    function Tb(a) {
        return a.replace(Pb, function(b, c, d, e) {
            var f = "";
            d = d.replace(/^(['"])(.*)\1$/, function(h, g, l) {
                f = g;
                return l
            });
            b = (Fb(d) || Gb).ea();
            return c + f + b + f + e
        })
    }
    ;var Ub, Vb;
    a: {
        for (var Wb = ["CLOSURE_FLAGS"], Xb = r, Yb = 0; Yb < Wb.length; Yb++)
            if (Xb = Xb[Wb[Yb]],
            null == Xb) {
                Vb = null;
                break a
            }
        Vb = Xb
    }
    var Zb = Vb && Vb[610401301];
    Ub = null != Zb ? Zb : !1;
    function $b() {
        var a = r.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
    var ac, bc = r.navigator;
    ac = bc ? bc.userAgentData || null : null;
    function cc(a) {
        return Ub ? ac ? ac.brands.some(function(b) {
            return (b = b.brand) && -1 != b.indexOf(a)
        }) : !1 : !1
    }
    function C(a) {
        return -1 != $b().indexOf(a)
    }
    ;function dc() {
        return Ub ? !!ac && 0 < ac.brands.length : !1
    }
    function ec() {
        return dc() ? !1 : C("Opera")
    }
    function fc() {
        return C("Firefox") || C("FxiOS")
    }
    function gc() {
        return dc() ? cc("Chromium") : (C("Chrome") || C("CriOS")) && !(dc() ? 0 : C("Edge")) || C("Silk")
    }
    ;var hc = {}
      , D = function(a, b) {
        this.g = b === hc ? a : "";
        this.sa = !0
    };
    D.prototype.ea = function() {
        return this.g.toString()
    }
    ;
    D.prototype.toString = function() {
        return this.g.toString()
    }
    ;
    var ic = function(a) {
        if (a instanceof D && a.constructor === D)
            return a.g;
        B("expected object of type SafeHtml, got '" + a + "' of type " + wa(a));
        return "type_error:SafeHtml"
    }
      , kc = function(a) {
        return a instanceof D ? a : jc(xb("object" == typeof a && a.sa ? a.ea() : String(a)))
    }
      , lc = function(a) {
        if (a instanceof D)
            return a;
        a = kc(a);
        return jc(ic(a).toString().replace(/(\r\n|\r|\n)/g, "<br>"))
    }
      , nc = function(a) {
        var b = kc(mc)
          , c = []
          , d = function(e) {
            Array.isArray(e) ? e.forEach(d) : (e = kc(e),
            c.push(ic(e).toString()))
        };
        a.forEach(d);
        return jc(c.join(ic(b).toString()))
    }
      , oc = function(a) {
        return nc(Array.prototype.slice.call(arguments))
    }
      , jc = function(a) {
        if (void 0 === hb) {
            var b = null;
            var c = r.trustedTypes;
            if (c && c.createPolicy) {
                try {
                    b = c.createPolicy("goog#html", {
                        createHTML: Da,
                        createScript: Da,
                        createScriptURL: Da
                    })
                } catch (d) {
                    r.console && r.console.error(d.message)
                }
                hb = b
            } else
                hb = b
        }
        a = (b = hb) ? b.createHTML(a) : a;
        return new D(a,hc)
    }
      , pc = /^[a-zA-Z0-9-]+$/
      , qc = {
        action: !0,
        cite: !0,
        data: !0,
        formaction: !0,
        href: !0,
        manifest: !0,
        poster: !0,
        src: !0
    }
      , rc = {
        APPLET: !0,
        BASE: !0,
        EMBED: !0,
        IFRAME: !0,
        LINK: !0,
        MATH: !0,
        META: !0,
        OBJECT: !0,
        SCRIPT: !0,
        STYLE: !0,
        SVG: !0,
        TEMPLATE: !0
    }
      , mc = new D(r.trustedTypes && r.trustedTypes.emptyHTML || "",hc);
    var sc = function(a, b) {
        Ja(lb(a), "must provide justification");
        A(!ob(lb(a)), "must provide non-empty justification");
        return jc(b)
    };
    var tc = {
        MATH: !0,
        SCRIPT: !0,
        STYLE: !0,
        SVG: !0,
        TEMPLATE: !0
    }
      , uc = Ua(function() {
        if ("undefined" === typeof document)
            return !1;
        var a = document.createElement("div")
          , b = document.createElement("div");
        b.appendChild(document.createElement("div"));
        a.appendChild(b);
        if (!a.firstChild)
            return !1;
        b = a.firstChild.firstChild;
        a.innerHTML = ic(mc);
        return !b.parentElement
    })
      , vc = function(a, b) {
        if (uc())
            for (; a.lastChild; )
                a.removeChild(a.lastChild);
        a.innerHTML = ic(b)
    }
      , wc = function(a, b) {
        if (a.tagName && tc[a.tagName.toUpperCase()])
            throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
        vc(a, b)
    };
    var zc = function(a) {
        return -1 != a.indexOf("&") ? "document"in r ? xc(a) : yc(a) : a
    }
      , xc = function(a) {
        var b = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"'
        };
        var c = r.document.createElement("div");
        return a.replace(Ac, function(d, e) {
            var f = b[d];
            if (f)
                return f;
            "#" == e.charAt(0) && (e = Number("0" + e.slice(1)),
            isNaN(e) || (f = String.fromCharCode(e)));
            f || (wc(c, sc(new kb(ib,"Single HTML entity."), d + " ")),
            f = c.firstChild.nodeValue.slice(0, -1));
            return b[d] = f
        })
    }
      , yc = function(a) {
        return a.replace(/&([^;]+);/g, function(b, c) {
            switch (c) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                return "#" != c.charAt(0) || (c = Number("0" + c.slice(1)),
                isNaN(c)) ? b : String.fromCharCode(c)
            }
        })
    }
      , Ac = /&([^;\s<&]+);?/g
      , Bc = function(a) {
        return null == a ? "" : String(a)
    }
      , Cc = function(a) {
        return String(a).replace(/\-([a-z])/g, function(b, c) {
            return c.toUpperCase()
        })
    }
      , Dc = function(a) {
        return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function(b, c, d) {
            return c + d.toUpperCase()
        })
    };
    var Ec = function(a) {
        if (a.ra && "function" == typeof a.ra)
            return a.ra();
        if ("undefined" !== typeof Map && a instanceof Map || "undefined" !== typeof Set && a instanceof Set)
            return Array.from(a.values());
        if ("string" === typeof a)
            return a.split("");
        if (xa(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b
        }
        b = [];
        c = 0;
        for (d in a)
            b[c++] = a[d];
        return b
    }
      , Fc = function(a) {
        if (a.Kb && "function" == typeof a.Kb)
            return a.Kb();
        if (!a.ra || "function" != typeof a.ra) {
            if ("undefined" !== typeof Map && a instanceof Map)
                return Array.from(a.keys());
            if (!("undefined" !== typeof Set && a instanceof Set)) {
                if (xa(a) || "string" === typeof a) {
                    var b = [];
                    a = a.length;
                    for (var c = 0; c < a; c++)
                        b.push(c);
                    return b
                }
                b = [];
                c = 0;
                for (var d in a)
                    b[c++] = d;
                return b
            }
        }
    }
      , Gc = function(a, b, c) {
        if (a.forEach && "function" == typeof a.forEach)
            a.forEach(b, c);
        else if (xa(a) || "string" === typeof a)
            Array.prototype.forEach.call(a, b, c);
        else
            for (var d = Fc(a), e = Ec(a), f = e.length, h = 0; h < f; h++)
                b.call(c, e[h], d && d[h], a)
    };
    var Hc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$")
      , Ic = function(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    };
    var Jc = function(a) {
        this.l = this.g = null;
        this.o = a || null
    }
      , Kc = function(a) {
        a.g || (a.g = new Map,
        a.l = 0,
        a.o && Ic(a.o, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    };
    Jc.prototype.add = function(a, b) {
        Kc(this);
        this.o = null;
        a = String(a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.l = Ia(this.l) + 1;
        return this
    }
    ;
    Jc.prototype.remove = function(a) {
        Kc(this);
        a = String(a);
        return this.g.has(a) ? (this.o = null,
        this.l = Ia(this.l) - this.g.get(a).length,
        this.g.delete(a)) : !1
    }
    ;
    Jc.prototype.clear = function() {
        this.g = this.o = null;
        this.l = 0
    }
    ;
    var Lc = function(a, b) {
        Kc(a);
        b = String(b);
        return a.g.has(b)
    };
    k = Jc.prototype;
    k.forEach = function(a, b) {
        Kc(this);
        this.g.forEach(function(c, d) {
            c.forEach(function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    }
    ;
    k.Kb = function() {
        Kc(this);
        for (var a = Array.from(this.g.values()), b = Array.from(this.g.keys()), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]);
        return c
    }
    ;
    k.ra = function(a) {
        Kc(this);
        var b = [];
        if ("string" === typeof a)
            Lc(this, a) && (b = b.concat(this.g.get(String(a))));
        else {
            a = Array.from(this.g.values());
            for (var c = 0; c < a.length; c++)
                b = b.concat(a[c])
        }
        return b
    }
    ;
    k.set = function(a, b) {
        Kc(this);
        this.o = null;
        a = String(a);
        Lc(this, a) && (this.l = Ia(this.l) - this.g.get(a).length);
        this.g.set(a, [b]);
        this.l = Ia(this.l) + 1;
        return this
    }
    ;
    k.get = function(a, b) {
        if (!a)
            return b;
        a = this.ra(a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    k.toString = function() {
        if (this.o)
            return this.o;
        if (!this.g)
            return "";
        for (var a = [], b = Array.from(this.g.keys()), c = 0; c < b.length; c++) {
            var d = b[c]
              , e = encodeURIComponent(String(d));
            d = this.ra(d);
            for (var f = 0; f < d.length; f++) {
                var h = e;
                "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
                a.push(h)
            }
        }
        return this.o = a.join("&")
    }
    ;
    k.zc = function(a) {
        for (var b = 0; b < arguments.length; b++)
            Gc(arguments[b], function(c, d) {
                this.add(d, c)
            }, this)
    }
    ;
    /*

 SPDX-License-Identifier: Apache-2.0
*/
    var Mc = "src srcdoc codebase data href rel action formaction sandbox cite poster icon".split(" ");
    var Nc = {};
    var Oc = function() {}
      , Pc = function(a, b) {
        if (b !== Nc)
            throw Error("Bad secret");
        this.g = a
    };
    m(Pc, Oc);
    Pc.prototype.toString = function() {
        return this.g
    }
    ;
    function Qc(a, b, c) {
        if (!Array.isArray(a) || !Array.isArray(a.raw) || !b && 1 !== a.length)
            throw new TypeError(c);
    }
    ;function Rc(a, b) {
        if (void 0 !== a.tagName) {
            if ("script" === a.tagName.toLowerCase())
                throw Error("Use safeScriptEl.setTextContent with a SafeScript.");
            if ("style" === a.tagName.toLowerCase())
                throw Error("Use safeStyleEl.setTextContent with a SafeStyleSheet.");
        }
        a.innerHTML = ic(b)
    }
    function Sc(a, b) {
        var c = Tc;
        if (0 === c.length)
            throw Error("No prefixes are provided");
        if (c.map(function(d) {
            if (d instanceof Pc)
                d = d.g;
            else
                throw Error("Unexpected type when unwrapping SafeAttributePrefix");
            return d
        }).every(function(d) {
            return 0 !== "value".indexOf(d)
        }))
            throw Error('Attribute "value" does not match any of the allowed prefixes.');
        a.setAttribute("value", b)
    }
    ;var Uc = Object.freeze || function(a) {
        return a
    }
    ;
    var Vc = function(a, b) {
        this.name = a;
        this.value = b
    };
    Vc.prototype.toString = function() {
        return this.name
    }
    ;
    var Wc = new Vc("OFF",Infinity), Xc = new Vc("SEVERE",1E3), Yc = new Vc("WARNING",900), Zc = new Vc("CONFIG",700), $c = new Vc("FINE",500), ad = function() {
        this.clear()
    }, bd;
    ad.prototype.clear = function() {}
    ;
    var cd = function(a, b, c) {
        this.reset(a || Wc, b, c, void 0, void 0)
    };
    cd.prototype.reset = function(a, b) {
        this.g = b
    }
    ;
    cd.prototype.getMessage = function() {
        return this.g
    }
    ;
    var dd = function(a, b) {
        this.g = null;
        this.B = [];
        this.l = (void 0 === b ? null : b) || null;
        this.u = [];
        this.o = {
            g: function() {
                return a
            }
        }
    }
      , ed = function(a) {
        if (a.g)
            return a.g;
        if (a.l)
            return ed(a.l);
        B("Root logger has no level set.");
        return Wc
    };
    dd.prototype.publish = function(a) {
        for (var b = this; b; )
            b.B.forEach(function(c) {
                c(a)
            }),
            b = b.l
    }
    ;
    var fd = function() {
        this.entries = {};
        var a = new dd("");
        a.g = Zc;
        this.entries[""] = a
    }, gd, hd = function(a, b) {
        var c = a.entries[b];
        if (c)
            return c;
        c = hd(a, b.slice(0, Math.max(b.lastIndexOf("."), 0)));
        var d = new dd(b,c);
        a.entries[b] = d;
        c.u.push(d);
        return d
    }, id = function() {
        gd || (gd = new fd);
        return gd
    }, jd = function(a, b, c) {
        var d;
        if (d = a)
            if (d = a && b) {
                d = b.value;
                var e = a ? ed(hd(id(), a.g())) : Wc;
                d = d >= e.value
            }
        d && (b = b || Wc,
        d = hd(id(), a.g()),
        "function" === typeof c && (c = c()),
        bd || (bd = new ad),
        a = new cd(b,c,a.g()),
        d.publish(a))
    }, kd = function(a, b) {
        a && jd(a, Xc, b)
    }, ld = function(a, b) {
        a && jd(a, $c, b)
    };
    var md;
    try {
        new URL("s://g"),
        md = !0
    } catch (a) {
        md = !1
    }
    var nd = md
      , od = []
      , pd = function() {};
    qd(function(a) {
        var b = hd(id(), "safevalues").o;
        b && jd(b, Yc, "A URL with content '" + a + "' was sanitized away.")
    });
    function qd(a) {
        -1 === od.indexOf(a) && od.push(a);
        pd = function(b) {
            od.forEach(function(c) {
                c(b)
            })
        }
    }
    ;function rd(a) {
        Qc(a, !1, "safeStyle is a template literal tag function that only accepts template literals without expressions. For example, safeStyle`foo`;");
        a = a[0];
        if (/[<>]/.test(a))
            throw Error("Forbidden characters in style string: " + a);
        if (!/;$/.test(a))
            throw Error('Style string does not end with ";": ' + a);
        if (!/:/.test(a))
            throw Error('Style string should contain one or more ":": ' + a);
        return new Ib(a,Hb)
    }
    ;var sd = function(a) {
        this.Nc = a
    };
    function td(a) {
        return new sd(function(b) {
            return b.substr(0, a.length + 1).toLowerCase() === a + ":"
        }
        )
    }
    var ud = [td("data"), td("http"), td("https"), td("mailto"), td("ftp"), new sd(function(a) {
        return /^[^:]*([/?#]|$)/.test(a)
    }
    )];
    function vd(a) {
        var b = void 0 === b ? ud : b;
        a: {
            b = void 0 === b ? ud : b;
            for (var c = 0; c < b.length; ++c) {
                var d = b[c];
                if (d instanceof sd && d.Nc(a)) {
                    a = new Bb(a,Ab);
                    break a
                }
            }
            a = void 0
        }
        return a || Gb
    }
    ;var wd = {
        Ye: !0
    }
      , xd = {
        Xe: !0
    }
      , yd = function() {
        throw Error("Do not instantiate directly");
    };
    yd.prototype.Bb = null;
    yd.prototype.getContent = function() {
        return this.content
    }
    ;
    yd.prototype.toString = function() {
        return this.content
    }
    ;
    yd.prototype.ac = function() {
        if (this.za !== wd)
            throw Error("Sanitized content was not of kind HTML.");
        return sc(new kb(ib,"Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value."), this.toString())
    }
    ;
    var zd = function() {
        yd.call(this)
    };
    y(zd, yd);
    zd.prototype.za = wd;
    var Ad = function() {
        yd.call(this)
    };
    y(Ad, yd);
    Ad.prototype.za = xd;
    Ad.prototype.Bb = 1;
    var Bd = function(a, b, c) {
        (b = null != a && a.za === b) && A(a.constructor === c);
        return b
    };
    function Cd() {
        return Ub ? !!ac && !!ac.platform : !1
    }
    function Dd() {
        return C("iPhone") && !C("iPod") && !C("iPad")
    }
    function Ed() {
        return Dd() || C("iPad") || C("iPod")
    }
    function Fd() {
        return Cd() ? "macOS" === ac.platform : C("Macintosh")
    }
    ;var Gd = function(a) {
        Gd[" "](a);
        return a
    };
    Gd[" "] = function() {}
    ;
    var Hd = function(a, b) {
        try {
            return Gd(a[b]),
            !0
        } catch (c) {}
        return !1
    };
    var Id = ec(), F = dc() ? !1 : C("Trident") || C("MSIE"), Jd = C("Edge"), Kd = Jd || F, G = C("Gecko") && !(-1 != $b().toLowerCase().indexOf("webkit") && !C("Edge")) && !(C("Trident") || C("MSIE")) && !C("Edge"), H = -1 != $b().toLowerCase().indexOf("webkit") && !C("Edge"), Ld = H && C("Mobile"), Md = Fd(), Nd = Cd() ? "Windows" === ac.platform : C("Windows"), Od = Cd() ? "Android" === ac.platform : C("Android"), Pd = Dd(), Qd = C("iPad"), Rd = C("iPod"), Sd = Ed(), Td = function() {
        var a = r.document;
        return a ? a.documentMode : void 0
    }, Ud;
    a: {
        var Vd = ""
          , Wd = function() {
            var a = $b();
            if (G)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Jd)
                return /Edge\/([\d\.]+)/.exec(a);
            if (F)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (H)
                return /WebKit\/(\S+)/.exec(a);
            if (Id)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Wd && (Vd = Wd ? Wd[1] : "");
        if (F) {
            var Xd = Td();
            if (null != Xd && Xd > parseFloat(Vd)) {
                Ud = String(Xd);
                break a
            }
        }
        Ud = Vd
    }
    var Yd = Ud, Zd;
    if (r.document && F) {
        var $d = Td();
        Zd = $d ? $d : parseInt(Yd, 10) || void 0
    } else
        Zd = void 0;
    var ae = Zd;
    var be = function(a) {
        if (null != a)
            switch (a.Bb) {
            case 1:
                return 1;
            case -1:
                return -1;
            case 0:
                return 0
            }
        return null
    }
      , fe = function(a) {
        return Bd(a, wd, zd) ? a : a instanceof D ? ce(ic(a).toString()) : a instanceof D ? ce(ic(a).toString()) : ce(String(String(a)).replace(de, ee), be(a))
    }
      , ce = function(a) {
        function b(c) {
            this.content = c
        }
        b.prototype = a.prototype;
        return function(c, d) {
            c = new b(String(c));
            void 0 !== d && (c.Bb = d);
            return c
        }
    }(zd)
      , ge = {}
      , he = function(a, b) {
        return a && b && a.Mc && b.Mc ? a.za !== b.za ? !1 : a.toString() === b.toString() : a instanceof yd && b instanceof yd ? a.za != b.za ? !1 : a.toString() == b.toString() : a == b
    }
      , I = function(a) {
        Bd(a, wd, zd) ? (a = a.getContent(),
        a = String(a).replace(ie, "").replace(je, "&lt;"),
        a = String(a).replace(ke, ee)) : a = String(a).replace(de, ee);
        return a
    }
      , le = {}
      , me = function() {
        A(le === le, "found an incorrect call marker, was an internal function called from the top level?")
    }
      , ne = {
        "\x00": "&#0;",
        "\t": "&#9;",
        "\n": "&#10;",
        "\v": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "-": "&#45;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
        "\u0085": "&#133;",
        "\u00a0": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;"
    }
      , ee = function(a) {
        return ne[a]
    }
      , de = /[\x00\x22\x26\x27\x3c\x3e]/g
      , ke = /[\x00\x22\x27\x3c\x3e]/g
      , oe = /^(?!on|src|(?:action|archive|background|cite|classid|codebase|content|data|dsync|href|http-equiv|longdesc|style|usemap)\s*$)(?:[a-z0-9_$:-]*)$/i
      , ie = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g
      , je = /</g;
    var J = function(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    J.prototype.toString = function() {
        return "(" + this.x + ", " + this.y + ")"
    }
    ;
    var pe = function(a, b) {
        return new J(a.x - b.x,a.y - b.y)
    };
    J.prototype.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    }
    ;
    J.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    J.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    J.prototype.translate = function(a, b) {
        a instanceof J ? (this.x += a.x,
        this.y += a.y) : (this.x += Number(a),
        "number" === typeof b && (this.y += b));
        return this
    }
    ;
    var qe = function(a, b) {
        this.width = a;
        this.height = b
    };
    k = qe.prototype;
    k.toString = function() {
        return "(" + this.width + " x " + this.height + ")"
    }
    ;
    k.aspectRatio = function() {
        return this.width / this.height
    }
    ;
    k.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    k.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    k.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    var te = function(a) {
        return a ? new re(se(a)) : Fa || (Fa = new re)
    }
      , ue = function(a, b) {
        return "string" === typeof b ? a.getElementById(b) : b
    }
      , we = function(a) {
        var b = a || document;
        return b.querySelectorAll && b.querySelector ? b.querySelectorAll(".jfk-tooltip-data") : ve(document, "jfk-tooltip-data", a)
    }
      , xe = function(a, b) {
        var c = b || document;
        if (c.getElementsByClassName)
            a = c.getElementsByClassName(a)[0];
        else {
            c = document;
            var d = b || c;
            a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? "." + a : "") : ve(c, a, b)[0] || null
        }
        return a || null
    }
      , ve = function(a, b, c) {
        var d;
        a = c || a;
        if (a.querySelectorAll && a.querySelector && b)
            return a.querySelectorAll(b ? "." + b : "");
        if (b && a.getElementsByClassName) {
            var e = a.getElementsByClassName(b);
            return e
        }
        e = a.getElementsByTagName("*");
        if (b) {
            var f = {};
            for (c = d = 0; a = e[c]; c++) {
                var h = a.className;
                "function" == typeof h.split && Ya(h.split(/\s+/), b) && (f[d++] = a)
            }
            f.length = d;
            return f
        }
        return e
    }
      , ze = function(a, b) {
        ab(b, function(c, d) {
            c && "object" == typeof c && c.sa && (c = c.ea());
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : ye.hasOwnProperty(d) ? a.setAttribute(ye[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
        })
    }
      , ye = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    }
      , Ce = function(a) {
        var b = Ae(a);
        a = Be(a);
        return F && a.pageYOffset != b.scrollTop ? new J(b.scrollLeft,b.scrollTop) : new J(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
    }
      , Ae = function(a) {
        return a.scrollingElement ? a.scrollingElement : !H && De(a) ? a.documentElement : a.body || a.documentElement
    }
      , Be = function(a) {
        return a.parentWindow || a.defaultView
    }
      , Ee = function(a, b, c, d) {
        function e(g) {
            g && b.appendChild("string" === typeof g ? a.createTextNode(g) : g)
        }
        for (; d < c.length; d++) {
            var f = c[d];
            if (!xa(f) || t(f) && 0 < f.nodeType)
                e(f);
            else {
                a: {
                    if (f && "number" == typeof f.length) {
                        if (t(f)) {
                            var h = "function" == typeof f.item || "string" == typeof f.item;
                            break a
                        }
                        if ("function" === typeof f) {
                            h = "function" == typeof f.item;
                            break a
                        }
                    }
                    h = !1
                }
                Wa(h ? $a(f) : f, e)
            }
        }
    }
      , Fe = function(a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    }
      , De = function(a) {
        return "CSS1Compat" == a.compatMode
    }
      , Ge = function(a, b) {
        A(null != a && null != b, "goog.dom.appendChild expects non-null arguments");
        a.appendChild(b)
    }
      , He = function(a) {
        for (var b; b = a.firstChild; )
            a.removeChild(b)
    }
      , Ie = function(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    }
      , Je = function(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
      , se = function(a) {
        A(a, "Node cannot be null or undefined.");
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }
      , Ke = function(a, b) {
        A(null != a, "goog.dom.setTextContent expects a non-null value for node");
        if ("textContent"in a)
            a.textContent = b;
        else if (3 == a.nodeType)
            a.data = String(b);
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild; )
                a.removeChild(A(a.lastChild));
            a.firstChild.data = String(b)
        } else {
            He(a);
            var c = se(a);
            a.appendChild(c.createTextNode(String(b)))
        }
    }
      , Le = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    }
      , Me = {
        IMG: " ",
        BR: "\n"
    }
      , Ne = function(a, b) {
        b ? a.tabIndex = 0 : (a.tabIndex = -1,
        a.removeAttribute("tabIndex"))
    }
      , Oe = function(a) {
        a = a.tabIndex;
        return "number" === typeof a && 0 <= a && 32768 > a
    }
      , Qe = function(a) {
        var b = [];
        Pe(a, b, !1);
        return b.join("")
    }
      , Pe = function(a, b, c) {
        if (!(a.nodeName in Le))
            if (3 == a.nodeType)
                c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
            else if (a.nodeName in Me)
                b.push(Me[a.nodeName]);
            else
                for (a = a.firstChild; a; )
                    Pe(a, b, c),
                    a = a.nextSibling
    }
      , Re = function(a, b) {
        for (var c = 0; a; ) {
            A("parentNode" != a.name);
            if (b(a))
                return a;
            a = a.parentNode;
            c++
        }
        return null
    }
      , re = function(a) {
        this.g = a || r.document || document
    };
    k = re.prototype;
    k.A = function(a) {
        return ue(this.g, a)
    }
    ;
    k.setProperties = ze;
    k.wa = function(a, b, c) {
        var d = this.g
          , e = arguments
          , f = e[1]
          , h = Fe(d, String(e[0]));
        f && ("string" === typeof f ? h.className = f : Array.isArray(f) ? h.className = f.join(" ") : ze(h, f));
        2 < e.length && Ee(d, h, e, 2);
        return h
    }
    ;
    k.Ac = function(a, b) {
        Ee(se(a), a, arguments, 1)
    }
    ;
    k.getChildren = function(a) {
        return void 0 != a.children ? a.children : Array.prototype.filter.call(a.childNodes, function(b) {
            return 1 == b.nodeType
        })
    }
    ;
    k.contains = Je;
    /*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    function Te(a, b, c) {
        a = a(b || Ue, void 0);
        c = c || te();
        if (a && a.g)
            c = a.g();
        else {
            c = Fe(c.g, "DIV");
            a = Ve(a);
            b = a.ea();
            var d = b.match(We);
            A(!d, "This template starts with a %s, which cannot be a child of a <div>, as required by soy internals. Consider using goog.soy.renderElement instead.\nTemplate output: %s", d && d[0], b);
            vc(c, a)
        }
        1 == c.childNodes.length && (a = c.firstChild,
        1 == a.nodeType && (c = a));
        return c
    }
    function Ve(a) {
        if (!t(a))
            return kc(String(a));
        if (a.ac) {
            var b = a.ac();
            if (b instanceof D)
                return b
        }
        B("Soy template output is unsafe for use as HTML: " + a);
        return kc("zSoyz")
    }
    var We = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i
      , Ue = {};
    var Xe = function(a, b) {
        if (ge["jfk.templates.button.strict"])
            return ge["jfk.templates.button.strict"](a, b);
        a = a || {};
        var c = a.attributes
          , d = a.content
          , e = a.disabled
          , f = a.id
          , h = a.df
          , g = a.title
          , l = a.Rc
          , n = a.value
          , p = ce;
        f = '<div role="button"' + (f ? ' id="' + I(f) + '"' : "") + ' class="';
        var q = a || {};
        a = q.Dc;
        var u = q.disabled
          , x = q.checked
          , E = q.style;
        q = q.width;
        me();
        if (ge["jfk.templates.button.classes_"])
            b = ge["jfk.templates.button.classes_"]({
                Dc: a,
                disabled: u,
                checked: x,
                style: E,
                width: q
            }, b);
        else {
            b = "goog-inline-block jfk-button ";
            switch (t(E) ? E.toString() : E) {
            case 0:
                b += "jfk-button-standard";
                break;
            case 2:
                b += "jfk-button-action";
                break;
            case 3:
                b += "jfk-button-primary";
                break;
            case 1:
                b += "jfk-button-default";
                break;
            case 4:
                b += "jfk-button-flat";
                break;
            case 5:
                b += "jfk-button-mini";
                break;
            case 6:
                b += "jfk-button-contrast";
                break;
            default:
                b += "jfk-button-standard"
            }
            b += (he(q, 1) ? " jfk-button-narrow" : "") + (x ? " jfk-button-checked" : "") + (a ? " " + a : "") + (u ? " jfk-button-disabled" : "")
        }
        e = f + I(b) + '"' + (e ? ' aria-disabled="true"' : ' tabindex="' + (h ? I(h) : "0") + '"') + (g ? l ? ' data-tooltip="' + I(g) + '"' : ' title="' + I(g) + '"' : "") + (n ? ' value="' + I(n) + '"' : "");
        c ? (Bd(c, xd, Ad) ? c = c.getContent() : (c = String(c),
        oe.test(c) || (B("Bad value `%s` for |filterHtmlAttributes", [c]),
        c = "zSoyz")),
        Bd(c, xd, Ad) && (c = c.getContent()),
        c = (c && !c.startsWith(" ") ? " " : "") + c) : c = "";
        return p(e + c + ">" + fe(null != d ? d : "") + "</div>")
    };
    var Ye = fc()
      , Ze = Dd() || C("iPod")
      , $e = C("iPad")
      , af = C("Android") && !(gc() || fc() || ec() || C("Silk"))
      , bf = gc()
      , cf = C("Safari") && !(gc() || (dc() ? 0 : C("Coast")) || ec() || (dc() ? 0 : C("Edge")) || (dc() ? cc("Microsoft Edge") : C("Edg/")) || (dc() ? cc("Opera") : C("OPR")) || fc() || C("Silk") || C("Android")) && !Ed();
    var df = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol("INTERNAL_ARRAY_STATE") : void 0
      , ef = Object.getOwnPropertyDescriptor(Array.prototype, "Oc");
    Object.defineProperties(Array.prototype, {
        Oc: {
            get: function() {
                function a(e, f) {
                    e & b && c.push(f)
                }
                var b = ff(this)
                  , c = [];
                a(1, "IS_REPEATED_FIELD");
                a(2, "IS_IMMUTABLE_ARRAY");
                a(4, "IS_API_FORMATTED");
                a(8, "ONLY_MUTABLE_VALUES");
                a(16, "MUTABLE_REFERENCES_ARE_OWNED");
                a(32, "CONSTRUCTED");
                a(64, "TRANSFERRED");
                a(128, "IS_FIXED_GROUP");
                var d = c.join(",");
                return ef ? ef.get.call(this) + "|" + d : d
            },
            configurable: !0,
            enumerable: !1
        }
    });
    function ff(a) {
        La(a, "state is only maintained on arrays.");
        var b;
        df ? b = a[df] : b = a.We;
        return null == b ? 0 : b
    }
    ;var gf = function() {
        throw Error("please construct maps as mutable then call toImmutable");
    };
    if ("undefined" != typeof Symbol && "undefined" != typeof Symbol.hasInstance) {
        var hf = function() {
            throw Error("Cannot perform instanceof checks on ImmutableMap: please use isImmutableMap or isMutableMap to assert on the mutability of a map. See go/jspb-api-gotchas#immutable-classes for more information");
        }
          , jf = {};
        Object.defineProperties(gf, (jf[Symbol.hasInstance] = {
            value: hf,
            configurable: !1,
            writable: !1,
            enumerable: !1
        },
        jf));
        A(gf[Symbol.hasInstance] === hf, "defineProperties did not work: was it monkey-patched?")
    }
    ;if ("undefined" !== typeof Proxy) {
        var lf = kf;
        new Proxy({},{
            getPrototypeOf: lf,
            setPrototypeOf: lf,
            isExtensible: lf,
            preventExtensions: lf,
            getOwnPropertyDescriptor: lf,
            defineProperty: lf,
            has: lf,
            get: lf,
            set: lf,
            deleteProperty: lf,
            apply: lf,
            construct: lf
        })
    }
    function kf() {
        throw Error("this array or object is owned by JSPB and should not be reused, did you mean to copy it with copyJspbArray? See go/jspb-api-gotchas#construct_from_array");
        throw Error();
    }
    ;A(!0);
    function mf() {}
    ;(function() {
        var a = r.jspbGetTypeName;
        r.jspbGetTypeName = a ? function(b) {
            return a(b) || void 0
        }
        : mf
    }
    )();
    var nf = function(a) {
        return "string" == typeof a.className ? a.className : a.getAttribute && a.getAttribute("class") || ""
    }
      , of = function(a) {
        return a.classList ? a.classList : nf(a).match(/\S+/g) || []
    }
      , pf = function(a, b) {
        "string" == typeof a.className ? a.className = b : a.setAttribute && a.setAttribute("class", b)
    }
      , qf = function(a, b) {
        return a.classList ? a.classList.contains(b) : Ya(of(a), b)
    }
      , rf = function(a, b) {
        if (a.classList)
            a.classList.add(b);
        else if (!qf(a, b)) {
            var c = nf(a);
            pf(a, c + (0 < c.length ? " " + b : b))
        }
    }
      , sf = function(a, b) {
        if (a.classList)
            Array.prototype.forEach.call(b, function(e) {
                rf(a, e)
            });
        else {
            var c = {};
            Array.prototype.forEach.call(of(a), function(e) {
                c[e] = !0
            });
            Array.prototype.forEach.call(b, function(e) {
                c[e] = !0
            });
            b = "";
            for (var d in c)
                b += 0 < b.length ? " " + d : d;
            pf(a, b)
        }
    }
      , tf = function(a, b) {
        a.classList ? a.classList.remove(b) : qf(a, b) && pf(a, Array.prototype.filter.call(of(a), function(c) {
            return c != b
        }).join(" "))
    }
      , uf = function(a, b) {
        a.classList ? Array.prototype.forEach.call(b, function(c) {
            tf(a, c)
        }) : pf(a, Array.prototype.filter.call(of(a), function(c) {
            return !Ya(b, c)
        }).join(" "))
    };
    var vf = function() {};
    vf.prototype.u = function() {}
    ;
    var wf = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    k = wf.prototype;
    k.toString = function() {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    }
    ;
    k.contains = function(a) {
        return this && a ? a instanceof wf ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    }
    ;
    k.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    }
    ;
    k.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    }
    ;
    k.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    }
    ;
    k.translate = function(a, b) {
        a instanceof J ? (this.left += a.x,
        this.right += a.x,
        this.top += a.y,
        this.bottom += a.y) : (Ia(a),
        this.left += a,
        this.right += a,
        "number" === typeof b && (this.top += b,
        this.bottom += b));
        return this
    }
    ;
    var xf = function(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    k = xf.prototype;
    k.toString = function() {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
    }
    ;
    k.contains = function(a) {
        return a instanceof J ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    }
    ;
    k.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    k.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    k.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    k.translate = function(a, b) {
        a instanceof J ? (this.left += a.x,
        this.top += a.y) : (this.left += Ia(a),
        "number" === typeof b && (this.top += b));
        return this
    }
    ;
    var zf = function(a, b, c) {
        if ("string" === typeof b)
            (b = yf(a, b)) && (a.style[b] = c);
        else
            for (var d in b) {
                c = a;
                var e = b[d]
                  , f = yf(c, d);
                f && (c.style[f] = e)
            }
    }
      , Af = {}
      , yf = function(a, b) {
        var c = Af[b];
        if (!c) {
            var d = Cc(b);
            c = d;
            void 0 === a.style[d] && (d = (H ? "Webkit" : G ? "Moz" : F ? "ms" : null) + Dc(d),
            void 0 !== a.style[d] && (c = d));
            Af[b] = c
        }
        return c
    }
      , Bf = function(a, b) {
        a: {
            var c = se(a);
            if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
                c = c[b] || c.getPropertyValue(b) || "";
                break a
            }
            c = ""
        }
        return c || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }
      , Df = function(a, b, c) {
        if (b instanceof J) {
            var d = b.x;
            b = b.y
        } else
            d = b,
            b = c;
        a.style.left = Cf(d);
        a.style.top = Cf(b)
    }
      , Ef = function(a) {
        try {
            return a.getBoundingClientRect()
        } catch (b) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
    }
      , Ff = function(a) {
        if (F && !(8 <= Number(ae)))
            return A(a && "offsetParent"in a),
            a.offsetParent;
        var b = se(a)
          , c = Bf(a, "position")
          , d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode)
            if (11 == a.nodeType && a.host && (a = a.host),
            c = Bf(a, "position"),
            d = d && "static" == c && a != b.documentElement && a != b.body,
            !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c))
                return a;
        return null
    }
      , Hf = function(a) {
        for (var b = new wf(0,Infinity,Infinity,0), c = te(a), d = c.g.body, e = c.g.documentElement, f = Ae(c.g); a = Ff(a); )
            if (!(F && 0 == a.clientWidth || H && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != Bf(a, "overflow")) {
                var h = Gf(a)
                  , g = new J(a.clientLeft,a.clientTop);
                h.x += g.x;
                h.y += g.y;
                b.top = Math.max(b.top, h.y);
                b.right = Math.min(b.right, h.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, h.y + a.clientHeight);
                b.left = Math.max(b.left, h.x)
            }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = (Be(c.g) || window).document;
        c = De(c) ? c.documentElement : c.body;
        c = new qe(c.clientWidth,c.clientHeight);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    }
      , Gf = function(a) {
        var b = se(a);
        Ka(a, "Parameter is required");
        var c = new J(0,0);
        var d = b ? se(b) : document;
        d = !F || 9 <= Number(ae) || De(te(d).g) ? d.documentElement : d.body;
        if (a == d)
            return c;
        a = Ef(a);
        b = Ce(te(b).g);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }
      , Jf = function(a, b) {
        a = If(a);
        b = If(b);
        return new J(a.x - b.x,a.y - b.y)
    }
      , Kf = function(a) {
        a = Ef(a);
        return new J(a.left,a.top)
    }
      , If = function(a) {
        A(a);
        if (1 == a.nodeType)
            return Kf(a);
        a = a.changedTouches ? a.changedTouches[0] : a;
        return new J(a.clientX,a.clientY)
    }
      , Cf = function(a) {
        "number" == typeof a && (a += "px");
        return a
    }
      , Mf = function(a) {
        var b = Lf;
        if ("none" != Bf(a, "display"))
            return b(a);
        var c = a.style
          , d = c.display
          , e = c.visibility
          , f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    }
      , Lf = function(a) {
        var b = a.offsetWidth
          , c = a.offsetHeight
          , d = H && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect ? (a = Ef(a),
        new qe(a.right - a.left,a.bottom - a.top)) : new qe(b,c)
    }
      , Nf = function(a) {
        var b = Gf(a);
        a = Mf(a);
        return new xf(b.x,b.y,a.width,a.height)
    }
      , Of = function(a, b) {
        a.style.display = b ? "" : "none"
    }
      , Pf = function(a) {
        return "rtl" == Bf(a, "direction")
    }
      , Qf = G ? "MozUserSelect" : H || Jd ? "WebkitUserSelect" : null;
    var Rf = function() {
        if (Nd) {
            var a = /Windows NT ([0-9.]+)/;
            return (a = a.exec($b())) ? a[1] : "0"
        }
        return Md ? (a = /1[0|1][_.][0-9_.]+/,
        (a = a.exec($b())) ? a[0].replace(/_/g, ".") : "10") : Od ? (a = /Android\s+([^\);]+)(\)|;)/,
        (a = a.exec($b())) ? a[1] : "") : Pd || Qd || Rd ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/,
        (a = a.exec($b())) ? a[1].replace(/_/g, ".") : "") : ""
    }();
    var Sf = function(a) {
        return (a = a.exec($b())) ? a[1] : ""
    }
      , Tf = function() {
        if (Ye)
            return Sf(/Firefox\/([0-9.]+)/);
        if (F || Jd || Id)
            return Yd;
        if (bf) {
            if (Ed() || Fd()) {
                var a = Sf(/CriOS\/([0-9.]+)/);
                if (a)
                    return a
            }
            return Sf(/Chrome\/([0-9.]+)/)
        }
        if (cf && !Ed())
            return Sf(/Version\/([0-9.]+)/);
        if (Ze || $e) {
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec($b()))
                return a[1] + "." + a[2]
        } else if (af)
            return (a = Sf(/Android\s+([0-9.]+)/)) ? a : Sf(/Version\/([0-9.]+)/);
        return ""
    }();
    var Uf = function(a, b) {
        return (b & 8 && Pf(a) ? b ^ 4 : b) & -9
    };
    var Vf = function(a, b) {
        this.o = a;
        this.F = !!b;
        this.N = {
            0: this.o + "-arrowright",
            1: this.o + "-arrowup",
            2: this.o + "-arrowdown",
            3: this.o + "-arrowleft"
        }
    };
    m(Vf, vf);
    var Wf = function(a, b, c, d, e) {
        null != b && (a.Ab = b);
        null != c && (a.zb = c);
        "number" === typeof d && (a.ic = Math.max(d, 15));
        "number" === typeof e && (a.Yb = e)
    };
    Vf.prototype.u = function(a) {
        A(this.B, "Must call setElements first.");
        var b = this.zb;
        2 == b && (b = 0);
        Xf(this, this.Ab, b, 2 == this.zb ? Yf(this.Ab) ? this.g.offsetHeight / 2 : this.g.offsetWidth / 2 : this.ic, 0, a)
    }
    ;
    var Xf = function(a, b, c, d, e, f) {
        if (a.l) {
            var h = Zf(b, c)
              , g = a.l;
            var l = Mf(g);
            l = (Yf(b) ? l.height / 2 : l.width / 2) - d;
            var n = Uf(g, h), p;
            if (p = Hf(g))
                g = Nf(g),
                g = new wf(g.top,g.left + g.width,g.top + g.height,g.left),
                Yf(b) ? g.top < p.top && !(n & 1) ? l -= p.top - g.top : g.bottom > p.bottom && n & 1 && (l -= g.bottom - p.bottom) : g.left < p.left && !(n & 4) ? l -= p.left - g.left : g.right > p.right && n & 4 && (l -= g.right - p.right);
            p = Yf(b) ? new J(a.Yb,l) : new J(l,a.Yb);
            n = Yf(b) ? 6 : 9;
            a.Za && 2 == e && (n = Yf(b) ? 4 : 1);
            l = b ^ 3;
            Yf(b) && "rtl" == a.l.dir && (l = b);
            g = a.l;
            var q = Zf(l, c);
            l = a.g;
            n = a.sc ? n : 0;
            A(l);
            var u = l.offsetParent;
            if (u) {
                var x = "HTML" == u.tagName || "BODY" == u.tagName;
                if (!x || "static" != Bf(u, "position")) {
                    var E = Gf(u);
                    if (!x) {
                        x = Pf(u);
                        var P;
                        if (P = x) {
                            P = cf && 0 <= zb(Tf, 10);
                            var ca;
                            if (ca = Sd)
                                ca = 0 <= zb(Rf, 10);
                            var Q = bf && 0 <= zb(Tf, 85);
                            P = G || P || ca || Q
                        }
                        x = P ? -u.scrollLeft : x && !Kd && "visible" != Bf(u, "overflowX") ? u.scrollWidth - u.clientWidth - u.scrollLeft : u.scrollLeft;
                        E = pe(E, new J(x,u.scrollTop))
                    }
                }
            }
            E = E || new J;
            u = Nf(g);
            if (x = Hf(g))
                Q = new xf(x.left,x.top,x.right - x.left,x.bottom - x.top),
                x = Math.max(u.left, Q.left),
                P = Math.min(u.left + u.width, Q.left + Q.width),
                x <= P && (ca = Math.max(u.top, Q.top),
                Q = Math.min(u.top + u.height, Q.top + Q.height),
                ca <= Q && (u.left = x,
                u.top = ca,
                u.width = P - x,
                u.height = Q - ca));
            x = te(g);
            ca = te(l);
            if (x.g != ca.g) {
                P = x.g.body;
                ca = Be(ca.g);
                Q = new J(0,0);
                var ra = (ra = se(P)) ? Be(ra) : window;
                if (Hd(ra, "parent")) {
                    var Se = P;
                    do {
                        var Uh = ra == ca ? Gf(Se) : Kf(A(Se));
                        Q.x += Uh.x;
                        Q.y += Uh.y
                    } while (ra && ra != ca && ra != ra.parent && (Se = ra.frameElement) && (ra = ra.parent))
                }
                P = pe(Q, Gf(P));
                !F || 9 <= Number(ae) || De(x.g) || (P = pe(P, Ce(x.g)));
                u.left += P.x;
                u.top += P.y
            }
            g = Uf(g, q);
            q = u.left;
            g & 4 ? q += u.width : g & 2 && (q += u.width / 2);
            q = new J(q,u.top + (g & 1 ? u.height : 0));
            q = pe(q, E);
            p && (q.x += (g & 4 ? -1 : 1) * p.x,
            q.y += (g & 1 ? -1 : 1) * p.y);
            var z;
            n && (z = Hf(l)) && (z.top -= E.y,
            z.right -= E.x,
            z.bottom -= E.y,
            z.left -= E.x);
            p = q;
            p = new J(p.x,p.y);
            q = Uf(l, h);
            h = Mf(l);
            g = new qe(h.width,h.height);
            p = new J(p.x,p.y);
            g = new qe(g.width,g.height);
            E = 0;
            if (f || 0 != q)
                q & 4 ? p.x -= g.width + (f ? f.right : 0) : q & 2 ? p.x -= g.width / 2 : f && (p.x += f.left),
                q & 1 ? p.y -= g.height + (f ? f.bottom : 0) : f && (p.y += f.top);
            n && (z ? (q = p,
            E = g,
            u = 0,
            65 == (n & 65) && (q.x < z.left || q.x >= z.right) && (n &= -2),
            132 == (n & 132) && (q.y < z.top || q.y >= z.bottom) && (n &= -5),
            q.x < z.left && n & 1 && (q.x = z.left,
            u |= 1),
            n & 16 && (x = q.x,
            q.x < z.left && (q.x = z.left,
            u |= 4),
            q.x + E.width > z.right && (E.width = Math.min(z.right - q.x, x + E.width - z.left),
            E.width = Math.max(E.width, 0),
            u |= 4)),
            q.x + E.width > z.right && n & 1 && (q.x = Math.max(z.right - E.width, z.left),
            u |= 1),
            n & 2 && (u |= (q.x < z.left ? 16 : 0) | (q.x + E.width > z.right ? 32 : 0)),
            q.y < z.top && n & 4 && (q.y = z.top,
            u |= 2),
            n & 32 && (x = q.y,
            q.y < z.top && (q.y = z.top,
            u |= 8),
            q.y + E.height > z.bottom && (E.height = Math.min(z.bottom - q.y, x + E.height - z.top),
            E.height = Math.max(E.height, 0),
            u |= 8)),
            q.y + E.height > z.bottom && n & 4 && (q.y = Math.max(z.bottom - E.height, z.top),
            u |= 2),
            n & 8 && (u |= (q.y < z.top ? 64 : 0) | (q.y + E.height > z.bottom ? 128 : 0)),
            z = u) : z = 256,
            E = z);
            n = new xf(0,0,0,0);
            n.left = p.x;
            n.top = p.y;
            n.width = g.width;
            n.height = g.height;
            z = E;
            z & 496 || (Df(l, new J(n.left,n.top)),
            g = new qe(n.width,n.height),
            h == g || h && g && h.width == g.width && h.height == g.height || (h = g,
            l = l.style,
            G ? l.MozBoxSizing = "border-box" : H ? l.WebkitBoxSizing = "border-box" : l.boxSizing = "border-box",
            l.width = Math.max(h.width, 0) + "px",
            l.height = Math.max(h.height, 0) + "px"));
            if (2 != e && z & 496) {
                Xf(a, b ^ 3, c, d, a.Za && 0 == e ? 1 : 2, f);
                return
            }
            !a.F || z & 496 || (e = parseFloat(a.g.style.left),
            f = parseFloat(a.g.style.top),
            A(!isNaN(e) && !isNaN(f), "Could not parse position."),
            isFinite(e) && 0 == e % 1 && isFinite(f) && 0 == f % 1 || Df(a.g, Math.round(e), Math.round(f)))
        }
        $f(a, b, c, d)
    }
      , $f = function(a, b, c, d) {
        var e = a.B;
        ab(a.N, function(f) {
            tf(e, f)
        }, a);
        rf(e, a.N[b]);
        e.style.top = e.style.left = e.style.right = e.style.bottom = "";
        a.l ? (c = Jf(a.l, a.g),
        d = ag(a.l, b),
        Yf(b) ? e.style.top = bg(c.y + d.y, a.g.offsetHeight - 15) + "px" : e.style.left = bg(c.x + d.x, a.g.offsetWidth - 15) + "px") : e.style[0 == c ? Yf(b) ? "top" : "left" : Yf(b) ? "bottom" : "right"] = d + "px"
    }
      , bg = function(a, b) {
        return 15 > b ? 15 : Math.min(Math.max(a, 15), b)
    }
      , Zf = function(a, b) {
        switch (a) {
        case 2:
            return 0 == b ? 1 : 5;
        case 1:
            return 0 == b ? 0 : 4;
        case 0:
            return 0 == b ? 12 : 13;
        default:
            return 0 == b ? 8 : 9
        }
    }
      , ag = function(a, b) {
        var c = 0
          , d = 0;
        a = Mf(a);
        switch (b) {
        case 2:
            c = a.width / 2;
            break;
        case 1:
            c = a.width / 2;
            d = a.height;
            break;
        case 0:
            d = a.height / 2;
            break;
        case 3:
            c = a.width,
            d = a.height / 2
        }
        return new J(c,d)
    }
      , Yf = function(a) {
        return 0 == a || 3 == a
    };
    k = Vf.prototype;
    k.sc = !1;
    k.zb = 2;
    k.ic = 20;
    k.Ab = 3;
    k.Yb = -5;
    k.Za = !1;
    var cg = {
        Sc: "activedescendant",
        Xc: "atomic",
        Yc: "autocomplete",
        ad: "busy",
        dd: "checked",
        ed: "colindex",
        kd: "controls",
        ld: "current",
        nd: "describedby",
        DISABLED: "disabled",
        rd: "dropeffect",
        sd: "expanded",
        td: "flowto",
        vd: "grabbed",
        zd: "haspopup",
        Bd: "hidden",
        Dd: "invalid",
        Ed: "label",
        Fd: "labelledby",
        Gd: "level",
        Ld: "live",
        ae: "multiline",
        be: "multiselectable",
        ge: "orientation",
        he: "owns",
        ie: "posinset",
        ke: "pressed",
        pe: "readonly",
        re: "relevant",
        se: "required",
        xe: "rowindex",
        ze: "selected",
        Be: "setsize",
        De: "sort",
        Qe: "valuemax",
        Re: "valuemin",
        Se: "valuenow",
        Te: "valuetext"
    };
    var dg;
    var eg = {
        Tc: "alert",
        Uc: "alertdialog",
        Vc: "application",
        Wc: "article",
        Zc: "banner",
        bd: "button",
        cd: "checkbox",
        fd: "columnheader",
        gd: "combobox",
        hd: "complementary",
        jd: "contentinfo",
        md: "definition",
        od: "dialog",
        pd: "directory",
        qd: "document",
        ud: "form",
        wd: "grid",
        xd: "gridcell",
        yd: "group",
        Ad: "heading",
        Cd: "img",
        Hd: "link",
        Id: "list",
        Jd: "listbox",
        Kd: "listitem",
        Md: "log",
        Nd: "main",
        Od: "marquee",
        Pd: "math",
        Qd: "menu",
        Rd: "menubar",
        Sd: "menuitem",
        Td: "menuitemcheckbox",
        Ud: "menuitemradio",
        ce: "navigation",
        ee: "note",
        fe: "option",
        je: "presentation",
        le: "progressbar",
        me: "radio",
        oe: "radiogroup",
        qe: "region",
        ue: "row",
        ve: "rowgroup",
        we: "rowheader",
        ye: "scrollbar",
        SEARCH: "search",
        Ae: "separator",
        Ce: "slider",
        Ee: "spinbutton",
        Fe: "status",
        TAB: "tab",
        Ge: "tablist",
        He: "tabpanel",
        Ie: "textbox",
        Je: "textinfo",
        Ke: "timer",
        Le: "toolbar",
        Me: "tooltip",
        Ne: "tree",
        Oe: "treegrid",
        Pe: "treeitem"
    };
    var fg = "combobox grid group listbox menu menubar radiogroup row rowgroup tablist textbox toolbar tree treegrid".split(" ")
      , gg = function(a, b) {
        b ? (A(cb(eg, b), "No such ARIA role " + b),
        a.setAttribute("role", b)) : a.removeAttribute("role")
    }
      , ig = function(a, b, c) {
        Array.isArray(c) && (c = c.join(" "));
        var d = hg(b);
        "" === c || void 0 == c ? (dg || (c = {},
        dg = (c.atomic = !1,
        c.autocomplete = "none",
        c.dropeffect = "none",
        c.haspopup = !1,
        c.live = "off",
        c.multiline = !1,
        c.multiselectable = !1,
        c.orientation = "vertical",
        c.readonly = !1,
        c.relevant = "additions text",
        c.required = !1,
        c.sort = "none",
        c.busy = !1,
        c.disabled = !1,
        c.hidden = !1,
        c.invalid = "false",
        c)),
        c = dg,
        b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
    }
      , jg = function(a) {
        var b = a.getAttribute(hg("activedescendant"));
        b = null == b || void 0 == b ? "" : String(b);
        return se(a).getElementById(b)
    }
      , hg = function(a) {
        A(a, "ARIA attribute cannot be empty.");
        A(cb(cg, a), "No such ARIA attribute " + a);
        return "aria-" + a
    };
    function kg(a) {
        a && "function" == typeof a.na && a.na()
    }
    ;var lg = function() {
        this.N = this.N;
        this.aa = this.aa
    };
    lg.prototype.N = !1;
    lg.prototype.na = function() {
        this.N || (this.N = !0,
        this.H())
    }
    ;
    var mg = function(a, b) {
        a.N ? b() : (a.aa || (a.aa = []),
        a.aa.push(b))
    };
    lg.prototype.H = function() {
        if (this.aa)
            for (; this.aa.length; )
                this.aa.shift()()
    }
    ;
    var ng = function(a) {
        lg.call(this);
        this.dom = a || te()
    };
    m(ng, lg);
    ng.prototype.u = function() {
        gg(this.A(), "tooltip");
        ig(this.A(), "live", "polite")
    }
    ;
    var og = function(a) {
        ng.call(this, a);
        this.g = this.dom.wa("DIV", "jfk-tooltip-contentId");
        this.o = this.dom.wa("DIV", "jfk-tooltip-arrow", this.dom.wa("DIV", "jfk-tooltip-arrowimplbefore"), this.dom.wa("DIV", "jfk-tooltip-arrowimplafter"));
        this.l = this.dom.wa("DIV", {
            "class": "jfk-tooltip",
            role: "tooltip"
        }, this.g, this.o);
        this.u()
    };
    m(og, ng);
    og.prototype.A = function() {
        return this.l
    }
    ;
    og.prototype.H = function() {
        ng.prototype.H.call(this);
        this.l && Ie(this.l)
    }
    ;
    var pg = function(a) {
        og.call(this, a)
    };
    m(pg, og);
    pg.prototype.u = function() {
        gg(this.A(), "tooltip")
    }
    ;
    var qg = function(a, b) {
        this.type = a;
        this.g = this.target = b;
        this.defaultPrevented = this.l = !1
    };
    qg.prototype.o = function() {
        this.l = !0
    }
    ;
    qg.prototype.preventDefault = function() {
        this.defaultPrevented = !0
    }
    ;
    var rg = function() {
        if (!r.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        try {
            r.addEventListener("test", function() {}, b),
            r.removeEventListener("test", function() {}, b)
        } catch (c) {}
        return a
    }();
    var tg = function(a, b) {
        qg.call(this, a ? a.type : "");
        this.relatedTarget = this.g = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.u = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.ka = null;
        if (a) {
            var c = this.type = a.type
              , d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.g = b;
            (b = a.relatedTarget) ? G && (Hd(b, "nodeName") || (b = null)) : "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
            this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
            this.screenX = d.screenX || 0,
            this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
            this.screenX = a.screenX || 0,
            this.screenY = a.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.u = Md ? a.metaKey : a.ctrlKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : sg[a.pointerType] || "";
            this.state = a.state;
            this.ka = a;
            a.defaultPrevented && tg.I.preventDefault.call(this)
        }
    };
    y(tg, qg);
    var sg = Uc({
        2: "touch",
        3: "pen",
        4: "mouse"
    });
    tg.prototype.o = function() {
        tg.I.o.call(this);
        this.ka.stopPropagation ? this.ka.stopPropagation() : this.ka.cancelBubble = !0
    }
    ;
    tg.prototype.preventDefault = function() {
        tg.I.preventDefault.call(this);
        var a = this.ka;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
    ;
    var ug = "closure_listenable_" + (1E6 * Math.random() | 0)
      , vg = function(a) {
        return !(!a || !a[ug])
    };
    var wg = 0;
    var xg = function(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.gb = e;
        this.key = ++wg;
        this.removed = this.ab = !1
    }
      , yg = function(a) {
        a.removed = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.gb = null
    };
    var zg = function(a) {
        this.src = a;
        this.g = {};
        this.l = 0
    };
    zg.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [],
        this.l++);
        var h = Ag(a, b, d, e);
        -1 < h ? (b = a[h],
        c || (b.ab = !1)) : (b = new xg(b,this.src,f,!!d,e),
        b.ab = c,
        a.push(b));
        return b
    }
    ;
    zg.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.g))
            return !1;
        var e = this.g[a];
        b = Ag(e, b, c, d);
        return -1 < b ? (yg(e[b]),
        A(null != e.length),
        Array.prototype.splice.call(e, b, 1),
        0 == e.length && (delete this.g[a],
        this.l--),
        !0) : !1
    }
    ;
    var Bg = function(a, b) {
        var c = b.type;
        if (!(c in a.g))
            return !1;
        var d = Za(a.g[c], b);
        d && (yg(b),
        0 == a.g[c].length && (delete a.g[c],
        a.l--));
        return d
    };
    zg.prototype.removeAll = function(a) {
        a = a && a.toString();
        var b = 0, c;
        for (c in this.g)
            if (!a || c == a) {
                for (var d = this.g[c], e = 0; e < d.length; e++)
                    ++b,
                    yg(d[e]);
                delete this.g[c];
                this.l--
            }
        return b
    }
    ;
    zg.prototype.eb = function(a, b) {
        a = this.g[a.toString()];
        var c = [];
        if (a)
            for (var d = 0; d < a.length; ++d) {
                var e = a[d];
                e.capture == b && c.push(e)
            }
        return c
    }
    ;
    zg.prototype.Pa = function(a, b, c, d) {
        a = this.g[a.toString()];
        var e = -1;
        a && (e = Ag(a, b, c, d));
        return -1 < e ? a[e] : null
    }
    ;
    zg.prototype.hasListener = function(a, b) {
        var c = void 0 !== a
          , d = c ? a.toString() : ""
          , e = void 0 !== b;
        return bb(this.g, function(f) {
            for (var h = 0; h < f.length; ++h)
                if (!(c && f[h].type != d || e && f[h].capture != b))
                    return !0;
            return !1
        })
    }
    ;
    var Ag = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.removed && f.listener == b && f.capture == !!c && f.gb == d)
                return e
        }
        return -1
    };
    var Cg = "closure_lm_" + (1E6 * Math.random() | 0)
      , Dg = {}
      , Eg = 0
      , Gg = function(a, b, c, d, e) {
        if (d && d.once)
            return Fg(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                Gg(a, b[f], c, d, e);
            return null
        }
        c = Hg(c);
        return vg(a) ? a.listen(b, c, t(d) ? !!d.capture : !!d, e) : Ig(a, b, c, !1, d, e)
    }
      , Ig = function(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var h = t(e) ? !!e.capture : !!e
          , g = Jg(a);
        g || (a[Cg] = g = new zg(a));
        c = g.add(b, c, d, h, f);
        if (c.proxy)
            return c;
        d = Kg();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            rg || (e = h),
            void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(Lg(b.toString()), d);
        else if (a.addListener && a.removeListener)
            A("change" === b, "MediaQueryList only has a change event"),
            a.addListener(d);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        Eg++;
        return c
    }
      , Kg = function() {
        var a = Mg
          , b = function(c) {
            return a.call(b.src, b.listener, c)
        };
        return b
    }
      , Fg = function(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                Fg(a, b[f], c, d, e);
            return null
        }
        c = Hg(c);
        return vg(a) ? a.Xb(b, c, t(d) ? !!d.capture : !!d, e) : Ig(a, b, c, !0, d, e)
    }
      , Ng = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                Ng(a, b[f], c, d, e);
        else
            d = t(d) ? !!d.capture : !!d,
            c = Hg(c),
            vg(a) ? a.fa(b, c, d, e) : a && (a = Jg(a)) && (b = a.Pa(b, c, d, e)) && Og(b)
    }
      , Og = function(a) {
        if ("number" === typeof a || !a || a.removed)
            return !1;
        var b = a.src;
        if (vg(b))
            return Bg(b.V, a);
        var c = a.type
          , d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Lg(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        Eg--;
        (c = Jg(b)) ? (Bg(c, a),
        0 == c.l && (c.src = null,
        b[Cg] = null)) : yg(a);
        return !0
    }
      , Pg = function(a) {
        if (a)
            if (vg(a))
                a.V && a.V.removeAll(void 0);
            else if (a = Jg(a)) {
                var b = 0, c;
                for (c in a.g)
                    for (var d = a.g[c].concat(), e = 0; e < d.length; ++e)
                        Og(d[e]) && ++b
            }
    }
      , Lg = function(a) {
        return a in Dg ? Dg[a] : Dg[a] = "on" + a
    }
      , Mg = function(a, b) {
        if (a.removed)
            a = !0;
        else {
            b = new tg(b,this);
            var c = a.listener
              , d = a.gb || a.src;
            a.ab && Og(a);
            a = c.call(d, b)
        }
        return a
    }
      , Jg = function(a) {
        a = a[Cg];
        return a instanceof zg ? a : null
    }
      , Qg = "__closure_events_fn_" + (1E9 * Math.random() >>> 0)
      , Hg = function(a) {
        A(a, "Listener can not be null.");
        if ("function" === typeof a)
            return a;
        A(a.handleEvent, "An object listener must have handleEvent method.");
        a[Qg] || (a[Qg] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[Qg]
    };
    var K = function() {
        lg.call(this);
        this.V = new zg(this);
        this.Cc = this;
        this.Zb = null
    };
    y(K, lg);
    K.prototype[ug] = !0;
    k = K.prototype;
    k.addEventListener = function(a, b, c, d) {
        Gg(this, a, b, c, d)
    }
    ;
    k.removeEventListener = function(a, b, c, d) {
        Ng(this, a, b, c, d)
    }
    ;
    k.dispatchEvent = function(a) {
        Rg(this);
        var b = this.Zb;
        if (b) {
            var c = [];
            for (var d = 1; b; b = b.Zb)
                c.push(b),
                A(1E3 > ++d, "infinite loop")
        }
        b = this.Cc;
        d = a.type || a;
        if ("string" === typeof a)
            a = new qg(a,b);
        else if (a instanceof qg)
            a.target = a.target || b;
        else {
            var e = a;
            a = new qg(d,b);
            eb(a, e)
        }
        e = !0;
        if (c)
            for (var f = c.length - 1; !a.l && 0 <= f; f--) {
                var h = a.g = c[f];
                e = Sg(h, d, !0, a) && e
            }
        a.l || (h = a.g = b,
        e = Sg(h, d, !0, a) && e,
        a.l || (e = Sg(h, d, !1, a) && e));
        if (c)
            for (f = 0; !a.l && f < c.length; f++)
                h = a.g = c[f],
                e = Sg(h, d, !1, a) && e;
        return e
    }
    ;
    k.H = function() {
        K.I.H.call(this);
        this.V && this.V.removeAll(void 0);
        this.Zb = null
    }
    ;
    k.listen = function(a, b, c, d) {
        Rg(this);
        return this.V.add(String(a), b, !1, c, d)
    }
    ;
    k.Xb = function(a, b, c, d) {
        return this.V.add(String(a), b, !0, c, d)
    }
    ;
    k.fa = function(a, b, c, d) {
        return this.V.remove(String(a), b, c, d)
    }
    ;
    var Sg = function(a, b, c, d) {
        b = a.V.g[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.removed && h.capture == c) {
                var g = h.listener
                  , l = h.gb || h.src;
                h.ab && Bg(a.V, h);
                e = !1 !== g.call(l, d) && e
            }
        }
        return e && !d.defaultPrevented
    };
    K.prototype.eb = function(a, b) {
        return this.V.eb(String(a), b)
    }
    ;
    K.prototype.Pa = function(a, b, c, d) {
        return this.V.Pa(String(a), b, c, d)
    }
    ;
    K.prototype.hasListener = function(a, b) {
        return this.V.hasListener(void 0 !== a ? String(a) : void 0, b)
    }
    ;
    var Rg = function(a) {
        A(a.V, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    };
    r.console && r.console.createTask && r.console.createTask.bind(r.console);
    var Tg = function(a, b, c) {
        if ("function" === typeof a)
            c && (a = v(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = v(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : r.setTimeout(a, b || 0)
    };
    var Ug = function(a, b, c) {
        lg.call(this);
        this.Wa = a;
        this.o = b || 0;
        this.g = c;
        this.l = v(this.Ec, this)
    };
    y(Ug, lg);
    k = Ug.prototype;
    k.W = 0;
    k.H = function() {
        Ug.I.H.call(this);
        this.stop();
        delete this.Wa;
        delete this.g
    }
    ;
    k.start = function(a) {
        this.stop();
        this.W = Tg(this.l, void 0 !== a ? a : this.o)
    }
    ;
    k.stop = function() {
        this.isActive() && r.clearTimeout(this.W);
        this.W = 0
    }
    ;
    k.isActive = function() {
        return 0 != this.W
    }
    ;
    k.Ec = function() {
        this.W = 0;
        this.Wa && this.Wa.call(this.g)
    }
    ;
    var L = function(a) {
        lg.call(this);
        this.J = a;
        this.u = {}
    };
    y(L, lg);
    var Vg = [];
    L.prototype.listen = function(a, b, c, d) {
        Array.isArray(b) || (b && (Vg[0] = b.toString()),
        b = Vg);
        for (var e = 0; e < b.length; e++) {
            var f = Gg(a, b[e], c || this.handleEvent, d || !1, this.J || this);
            if (!f)
                break;
            this.u[f.key] = f
        }
        return this
    }
    ;
    L.prototype.Xb = function(a, b, c, d) {
        return Wg(this, a, b, c, d)
    }
    ;
    var Wg = function(a, b, c, d, e, f) {
        if (Array.isArray(c))
            for (var h = 0; h < c.length; h++)
                Wg(a, b, c[h], d, e, f);
        else {
            b = Fg(b, c, d || a.handleEvent, e, f || a.J || a);
            if (!b)
                return a;
            a.u[b.key] = b
        }
        return a
    };
    L.prototype.fa = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                this.fa(a, b[f], c, d, e);
        else
            c = c || this.handleEvent,
            d = t(d) ? !!d.capture : !!d,
            e = e || this.J || this,
            c = Hg(c),
            d = !!d,
            b = vg(a) ? a.Pa(b, c, d, e) : a ? (a = Jg(a)) ? a.Pa(b, c, d, e) : null : null,
            b && (Og(b),
            delete this.u[b.key]);
        return this
    }
    ;
    L.prototype.removeAll = function() {
        ab(this.u, function(a, b) {
            this.u.hasOwnProperty(b) && Og(a)
        }, this);
        this.u = {}
    }
    ;
    L.prototype.H = function() {
        L.I.H.call(this);
        this.removeAll()
    }
    ;
    L.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    }
    ;
    var Zg = function(a) {
        return zc(pb(a.replace(Xg, function(b, c) {
            return Yg.test(c) ? "" : " "
        }).replace(/[\t\n ]+/g, " ")))
    }
      , Yg = /^(?:abbr|acronym|address|b|em|i|small|strong|su[bp]|u)$/i
      , Xg = /<[!\/]?([a-z0-9]+)([\/ ][^>]*)?>/gi;
    function $g(a, b) {
        if (b instanceof Bb)
            b = Cb(b);
        else {
            b: if (nd) {
                try {
                    var c = new URL(b)
                } catch (d) {
                    c = "https:";
                    break b
                }
                c = c.protocol
            } else
                c: {
                    c = document.createElement("a");
                    try {
                        c.href = b
                    } catch (d) {
                        c = void 0;
                        break c
                    }
                    c = c.protocol;
                    c = ":" === c || "" === c ? "https:" : c
                }
            "javascript:" === c && (pd(b),
            b = void 0)
        }
        void 0 !== b && (a.href = b)
    }
    ;var ah = {}
      , bh = function(a) {
        L.call(this);
        this.T = a;
        this.R = new Ug(this.ya,0,this);
        mg(this, w(kg, this.R));
        var b = window;
        this.K = "function" === typeof b.MutationObserver ? new b.MutationObserver(v(this.ua, this)) : null;
        a = a.g;
        this.listen(a, "mouseout mousedown click blur focusout keydown".split(" "), this.ia, !0);
        this.listen(a, ["mouseover", "focus", "focusin"], this.xa, !0)
    };
    m(bh, L);
    bh.prototype.H = function() {
        ch(this);
        L.prototype.H.call(this)
    }
    ;
    var dh = function(a, b) {
        switch (b.type) {
        case "mousedown":
        case "mouseover":
        case "mouseout":
        case "click":
            a.ga = !1;
            break;
        case "keydown":
            a.ga = !0
        }
    };
    bh.prototype.xa = function(a) {
        this.K && this.K.disconnect();
        dh(this, a);
        var b = a.target;
        a = "focus" == a.type || "focusin" == a.type;
        var c = this.g && Je(this.g.g, b);
        if (this.ga || !a || c) {
            this.va = a;
            if (a = b && b.getAttribute && this.K)
                a = b.getAttribute("role") || null,
                a = Ya(fg, a);
            a && (this.K.observe(b, {
                attributes: !0
            }),
            (a = jg(b)) && (b = a));
            this.o = b
        } else
            this.o = null;
        eh(this)
    }
    ;
    bh.prototype.ia = function(a) {
        dh(this, a);
        var b = a.target;
        a = "mousedown" == a.type || "click" == a.type;
        b = this.g && Je(this.g.g, b);
        a && b || (this.o = null,
        eh(this))
    }
    ;
    bh.prototype.ua = function(a) {
        Wa(a, v(function(b) {
            var c = jg(b.target);
            c && "aria-activedescendant" == b.attributeName && (this.o = c,
            eh(this))
        }, this))
    }
    ;
    var eh = function(a) {
        if (!(a.R.isActive() && a.l && a.F)) {
            ch(a);
            var b = null != a.F ? a.F : 50;
            a.R.start(a.l ? b : 300)
        }
    }
      , ch = function(a) {
        a.O && (r.clearTimeout(a.O),
        a.O = 0,
        a.l = null)
    };
    bh.prototype.ya = function() {
        if (!this.o)
            fh(this),
            this.F = this.l = null;
        else if (!(this.l && this.g && Je(this.g.A(), this.o)) || this.l.getAttribute("data-tooltip-unhoverable")) {
            var a = Re(this.o, function(g) {
                return g.getAttribute && (g.getAttribute("data-tooltip-contained") || g.getAttribute("data-tooltip") || g.g) && !g.getAttribute("data-tooltip-suspended")
            })
              , b = !1;
            this.l && this.l != a && (fh(this),
            this.F = this.l = null,
            b = !0);
            if (!this.l && a && (this.l = a,
            !(a.getAttribute("data-tooltip-only-on-overflow") && a.offsetWidth >= a.scrollWidth && a.offsetHeight >= a.scrollHeight || this.va && "mouse" == a.getAttribute("data-tooltip-trigger")))) {
                var c = mc;
                if (a.getAttribute("data-tooltip-contained"))
                    for (var d = we(a), e = 0; e < d.length; e++) {
                        if (d[e].parentNode == a) {
                            c = d[e].cloneNode(!0);
                            break
                        }
                    }
                else
                    c = a.g ? a.g : lc(a.getAttribute("data-tooltip"));
                d = a.getAttribute("data-tooltip-align");
                e = a.getAttribute("data-tooltip-class");
                var f = a.getAttribute("data-tooltip-offset");
                f = ob(Bc(f)) ? -1 : Number(f);
                var h = a.getAttribute("data-tooltip-hide-delay");
                h = ob(Bc(h)) ? null : Number(h);
                if (!b && (a = a.getAttribute("data-tooltip-delay"),
                a = Math.max(0, a - 300))) {
                    this.O = Tg(w(this.ha, this.l, c, d, f, e, h), a, this);
                    return
                }
                this.ha(this.l, c, d, f, e, h)
            }
        }
    }
    ;
    var gh = function(a) {
        if (a)
            switch (a.toLowerCase().split(",")[0]) {
            case "l":
                return 0;
            case "t":
                return 2;
            case "r":
                return 3
            }
        return 1
    };
    bh.prototype.ha = function(a, b, c, d, e, f) {
        this.O = 0;
        this.F = f;
        if (!this.g) {
            this.g = new pg(this.T);
            fh(this);
            Ge(this.T.g.body, this.g.A());
            mg(this, w(kg, this.g));
            this.B = new Vf("jfk-tooltip",!0);
            this.B.sc = !0;
            this.B.Za = !0;
            f = this.B;
            var h = this.g.A()
              , g = this.g.o;
            f.g = h;
            f.B = g
        }
        a: {
            if (c)
                switch (c.toLowerCase().split(",")[1]) {
                case "l":
                    f = 0;
                    break a;
                case "r":
                    f = 1;
                    break a
                }
            f = 2
        }
        Wf(this.B, gh(c), f, void 0, d);
        tf(this.g.A(), "jfk-tooltip-hide");
        this.M != e && (this.M && !ob(Bc(this.M)) && tf(this.g.A(), this.M),
        ob(Bc(e)) || rf(this.g.A(), e),
        this.M = e);
        Df(this.g.A(), 0, 0);
        if (b instanceof D)
            Rc(this.g.g, b);
        else
            for (He(this.g.g); c = b.firstChild; )
                this.g.g.appendChild(c);
        this.B.l = a;
        this.B.u()
    }
    ;
    var fh = function(a) {
        a.g && rf(a.g.A(), "jfk-tooltip-hide")
    };
    var hh = []
      , ih = function(a) {
        A(!Object.isSealed(a), "Cannot use getInstance() with a sealed constructor.");
        var b = "Da";
        if (a.Da && a.hasOwnProperty(b))
            return a.Da;
        hh.push(a);
        var c = new a;
        a.Da = c;
        A(a.hasOwnProperty(b), "Could not instantiate singleton.");
        return c
    };
    var lh = function(a, b, c, d, e, f) {
        if (Md && e)
            return jh(a);
        if (e && !d)
            return !1;
        if (!G) {
            "number" === typeof b && (b = kh(b));
            var h = 17 == b || 18 == b || Md && 91 == b;
            if ((!c || Md) && h || Md && 16 == b && (d || f))
                return !1
        }
        if ((H || Jd) && d && c)
            switch (a) {
            case 220:
            case 219:
            case 221:
            case 192:
            case 186:
            case 189:
            case 187:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
                return !1
            }
        if (F && d && b == a)
            return !1;
        switch (a) {
        case 13:
            return G ? f || e ? !1 : !(c && d) : !0;
        case 27:
            return !(H || Jd || G)
        }
        return G && (d || e || f) ? !1 : jh(a)
    }
      , jh = function(a) {
        if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || (H || Jd) && 0 == a)
            return !0;
        switch (a) {
        case 32:
        case 43:
        case 63:
        case 64:
        case 107:
        case 109:
        case 110:
        case 111:
        case 186:
        case 59:
        case 189:
        case 187:
        case 61:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
        case 219:
        case 220:
        case 221:
        case 163:
        case 58:
            return !0;
        case 173:
            return G;
        default:
            return !1
        }
    }
      , kh = function(a) {
        if (G)
            a = mh(a);
        else if (Md && H)
            switch (a) {
            case 93:
                a = 91
            }
        return a
    }
      , mh = function(a) {
        switch (a) {
        case 61:
            return 187;
        case 59:
            return 186;
        case 173:
            return 189;
        case 224:
            return 91;
        case 0:
            return 224;
        default:
            return a
        }
    };
    var nh = function(a, b, c, d) {
        tg.call(this, d);
        this.type = "key";
        this.keyCode = a;
        this.repeat = c
    };
    y(nh, tg);
    var oh = function(a, b) {
        K.call(this);
        a && this.attach(a, b)
    };
    y(oh, K);
    k = oh.prototype;
    k.Ea = null;
    k.ib = null;
    k.Vb = null;
    k.jb = null;
    k.X = -1;
    k.pa = -1;
    k.yb = !1;
    var ph = {
        3: 13,
        12: 144,
        63232: 38,
        63233: 40,
        63234: 37,
        63235: 39,
        63236: 112,
        63237: 113,
        63238: 114,
        63239: 115,
        63240: 116,
        63241: 117,
        63242: 118,
        63243: 119,
        63244: 120,
        63245: 121,
        63246: 122,
        63247: 123,
        63248: 44,
        63272: 46,
        63273: 36,
        63275: 35,
        63276: 33,
        63277: 34,
        63289: 144,
        63302: 45
    }
      , qh = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39,
        Enter: 13,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        "U+007F": 46,
        Home: 36,
        End: 35,
        PageUp: 33,
        PageDown: 34,
        Insert: 45
    }
      , rh = Md && G;
    k = oh.prototype;
    k.Gc = function(a) {
        if (H || Jd)
            if (17 == this.X && !a.ctrlKey || 18 == this.X && !a.altKey || Md && 91 == this.X && !a.metaKey)
                this.pa = this.X = -1;
        -1 == this.X && (a.ctrlKey && 17 != a.keyCode ? this.X = 17 : a.altKey && 18 != a.keyCode ? this.X = 18 : a.metaKey && 91 != a.keyCode && (this.X = 91));
        lh(a.keyCode, this.X, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? (this.pa = kh(a.keyCode),
        rh && (this.yb = a.altKey)) : this.handleEvent(a)
    }
    ;
    k.Ic = function(a) {
        this.pa = this.X = -1;
        this.yb = a.altKey
    }
    ;
    k.handleEvent = function(a) {
        var b = a.ka
          , c = b.altKey;
        if (F && "keypress" == a.type) {
            var d = this.pa;
            var e = 13 != d && 27 != d ? b.keyCode : 0
        } else
            (H || Jd) && "keypress" == a.type ? (d = this.pa,
            e = 0 <= b.charCode && 63232 > b.charCode && jh(d) ? b.charCode : 0) : ("keypress" == a.type ? (rh && (c = this.yb),
            b.keyCode == b.charCode ? 32 > b.keyCode ? (d = b.keyCode,
            e = 0) : (d = this.pa,
            e = b.charCode) : (d = b.keyCode || this.pa,
            e = b.charCode || 0)) : (d = b.keyCode || this.pa,
            e = b.charCode || 0),
            Md && 63 == e && 224 == d && (d = 191));
        var f = d = kh(d);
        d ? 63232 <= d && d in ph ? f = ph[d] : 25 == d && a.shiftKey && (f = 9) : b.keyIdentifier && b.keyIdentifier in qh && (f = qh[b.keyIdentifier]);
        if (!G || "keypress" != a.type || lh(f, this.X, a.shiftKey, a.ctrlKey, c, a.metaKey))
            a = f == this.X,
            this.X = f,
            b = new nh(f,e,a,b),
            b.altKey = c,
            this.dispatchEvent(b)
    }
    ;
    k.A = function() {
        return this.Ea
    }
    ;
    k.attach = function(a, b) {
        this.jb && this.detach();
        this.Ea = a;
        this.ib = Gg(this.Ea, "keypress", this, b);
        this.Vb = Gg(this.Ea, "keydown", this.Gc, b, this);
        this.jb = Gg(this.Ea, "keyup", this.Ic, b, this)
    }
    ;
    k.detach = function() {
        this.ib && (Og(this.ib),
        Og(this.Vb),
        Og(this.jb),
        this.jb = this.Vb = this.ib = null);
        this.Ea = null;
        this.pa = this.X = -1
    }
    ;
    k.H = function() {
        oh.I.H.call(this);
        this.detach()
    }
    ;
    var sh = function() {};
    va(sh);
    var uh = function(a) {
        K.call(this);
        this.o = a || te();
        this.ha = th;
        this.W = null;
        this.Y = !1;
        this.g = null;
        this.B = void 0;
        this.O = this.ga = this.u = null;
        this.Ya = !1
    };
    y(uh, K);
    sh.Z();
    var th = null
      , vh = function(a, b) {
        switch (a) {
        case 1:
            return b ? "disable" : "enable";
        case 2:
            return b ? "highlight" : "unhighlight";
        case 4:
            return b ? "activate" : "deactivate";
        case 8:
            return b ? "select" : "unselect";
        case 16:
            return b ? "check" : "uncheck";
        case 32:
            return b ? "focus" : "blur";
        case 64:
            return b ? "open" : "close"
        }
        throw Error("Invalid component state");
    }
      , wh = function(a, b) {
        if (a.u && a.u.O) {
            var c = a.u.O
              , d = a.W;
            d in c && delete c[d];
            c = a.u.O;
            if (null !== c && b in c)
                throw Error('The object already contains the key "' + b + '"');
            c[b] = a
        }
        a.W = b
    };
    uh.prototype.A = function() {
        return this.g
    }
    ;
    var xh = function(a) {
        a = a.g;
        A(a, "Can not call getElementStrict before rendering/decorating.");
        return a
    }
      , yh = function(a) {
        a.B || (a.B = new L(a));
        return A(a.B)
    };
    uh.prototype.pb = function() {
        this.g = Fe(this.o.g, "DIV")
    }
    ;
    var zh = function(a, b) {
        if (a.Y)
            throw Error("Component already rendered");
        a.g || a.pb();
        b ? b.insertBefore(a.g, null) : a.o.g.body.appendChild(a.g);
        a.u && !a.u.Y || a.oa()
    }
      , Ah = function(a, b) {
        if (a.Y)
            throw Error("Component already rendered");
        if (b && a.bc(b)) {
            a.Ya = !0;
            var c = se(b);
            a.o && a.o.g == c || (a.o = te(b));
            a.lc(b);
            a.oa()
        } else
            throw Error("Invalid element to decorate");
    };
    k = uh.prototype;
    k.bc = function() {
        return !0
    }
    ;
    k.lc = function(a) {
        this.g = a
    }
    ;
    k.oa = function() {
        this.Y = !0;
        Bh(this, function(a) {
            !a.Y && a.A() && a.oa()
        })
    }
    ;
    k.bb = function() {
        Bh(this, function(a) {
            a.Y && a.bb()
        });
        this.B && this.B.removeAll();
        this.Y = !1
    }
    ;
    k.H = function() {
        this.Y && this.bb();
        this.B && (this.B.na(),
        delete this.B);
        Bh(this, function(a) {
            a.na()
        });
        !this.Ya && this.g && Ie(this.g);
        this.u = this.g = this.O = this.ga = null;
        uh.I.H.call(this)
    }
    ;
    k.qb = function() {
        return this.g
    }
    ;
    var Bh = function(a, b) {
        a.ga && a.ga.forEach(b, void 0)
    };
    var Ch = function() {}, Dh;
    va(Ch);
    var Eh = {
        button: "pressed",
        checkbox: "checked",
        menuitem: "selected",
        menuitemcheckbox: "checked",
        menuitemradio: "checked",
        radio: "checked",
        tab: "selected",
        treeitem: "selected"
    };
    Ch.prototype.rb = function() {}
    ;
    Ch.prototype.Ha = function(a) {
        return a.o.wa("DIV", Fh(this, a).join(" "), a.getContent())
    }
    ;
    var Gh = function(a, b, c) {
        (a = a.A ? a.A() : a) && (c ? sf : uf)(a, [b])
    };
    Ch.prototype.cc = function() {
        return !0
    }
    ;
    Ch.prototype.qa = function(a, b) {
        b.id && wh(a, b.id);
        b && b.firstChild ? Hh(a, b.firstChild.nextSibling ? $a(b.childNodes) : b.firstChild) : a.Ia = null;
        var c = 0
          , d = this.P()
          , e = this.P()
          , f = !1
          , h = !1
          , g = $a(of(b));
        g.forEach(function(l) {
            f || l != d ? h || l != e ? c |= Ih(this, l) : h = !0 : (f = !0,
            e == d && (h = !0));
            1 == Ih(this, l) && (Ma(b),
            b.hasAttribute("tabindex") && Oe(b) && Ne(b, !1))
        }, this);
        a.L = c;
        f || (g.push(d),
        e == d && (h = !0));
        h || g.push(e);
        (a = a.ba) && g.push.apply(g, a);
        f && h && !a || pf(b, g.join(" "));
        return b
    }
    ;
    Ch.prototype.qc = function(a) {
        null == a.ha && (a.ha = Pf(a.Y ? a.g : a.o.g.body));
        a.ha && this.ec(a.A(), !0);
        a.isEnabled() && this.lb(a, a.isVisible())
    }
    ;
    var Jh = function(a, b) {
        if (a = a.rb()) {
            A(b, "The element passed as a first parameter cannot be null.");
            var c = b.getAttribute("role") || null;
            a != c && gg(b, a)
        }
    };
    k = Ch.prototype;
    k.sb = function(a, b) {
        var c = !b;
        b = F ? a.getElementsByTagName("*") : null;
        if (Qf) {
            if (c = c ? "none" : "",
            a.style && (a.style[Qf] = c),
            b) {
                a = 0;
                for (var d; d = b[a]; a++)
                    d.style && (d.style[Qf] = c)
            }
        } else if (F && (c = c ? "on" : "",
        a.setAttribute("unselectable", c),
        b))
            for (a = 0; d = b[a]; a++)
                d.setAttribute("unselectable", c)
    }
    ;
    k.ec = function(a, b) {
        Gh(a, this.P() + "-rtl", b)
    }
    ;
    k.dc = function(a) {
        var b;
        return a.S & 32 && (b = a.A()) ? b.hasAttribute("tabindex") && Oe(b) : !1
    }
    ;
    k.lb = function(a, b) {
        var c;
        if (a.S & 32 && (c = a.A())) {
            if (!b && a.L & 32) {
                try {
                    c.blur()
                } catch (d) {}
                a.L & 32 && a.oc(null)
            }
            (c.hasAttribute("tabindex") && Oe(c)) != b && Ne(c, b)
        }
    }
    ;
    k.tb = function(a, b, c) {
        var d = a.A();
        if (d) {
            var e = Kh(this, b);
            e && Gh(a, e, c);
            this.ma(d, b, c)
        }
    }
    ;
    k.ma = function(a, b, c) {
        Dh || (Dh = {
            1: "disabled",
            8: "selected",
            16: "checked",
            64: "expanded"
        });
        A(a, "The element passed as a first parameter cannot be null.");
        b = Dh[b];
        var d = a.getAttribute("role") || null;
        d && (d = Eh[d] || b,
        b = "checked" == b || "selected" == b ? d : b);
        b && ig(a, b, c)
    }
    ;
    k.P = function() {
        return "goog-control"
    }
    ;
    var Fh = function(a, b) {
        var c = a.P()
          , d = [c]
          , e = a.P();
        e != c && d.push(e);
        c = b.getState();
        for (e = []; c; ) {
            var f = c & -c;
            e.push(Kh(a, f));
            c &= ~f
        }
        d.push.apply(d, e);
        (a = b.ba) && d.push.apply(d, a);
        return d
    }
      , Kh = function(a, b) {
        a.l || Lh(a);
        return a.l[b]
    }
      , Ih = function(a, b) {
        if (!a.M) {
            a.l || Lh(a);
            var c = a.l, d = {}, e;
            for (e in c)
                d[c[e]] = e;
            a.M = d
        }
        a = parseInt(a.M[b], 10);
        return isNaN(a) ? 0 : a
    }
      , Lh = function(a) {
        var b = a.P();
        var c = -1 != b.replace(/\xa0|\s/g, " ").indexOf(" ");
        A(!c, "ControlRenderer has an invalid css class: '" + b + "'");
        a.l = {
            1: b + "-disabled",
            2: b + "-hover",
            4: b + "-active",
            8: b + "-selected",
            16: b + "-checked",
            32: b + "-focused",
            64: b + "-open"
        }
    };
    var Mh = function() {};
    y(Mh, Ch);
    va(Mh);
    k = Mh.prototype;
    k.rb = function() {
        return "button"
    }
    ;
    k.ma = function(a, b, c) {
        switch (b) {
        case 8:
        case 16:
            A(a, "The button DOM element cannot be null.");
            ig(a, "pressed", c);
            break;
        default:
        case 64:
        case 1:
            Mh.I.ma.call(this, a, b, c)
        }
    }
    ;
    k.Ha = function(a) {
        var b = Mh.I.Ha.call(this, a);
        this.nb(b, a.Ta());
        var c = a.Ca();
        c && this.ub(b, c);
        a.S & 16 && this.ma(b, 16, !!(a.L & 16));
        return b
    }
    ;
    k.qa = function(a, b) {
        b = Mh.I.qa.call(this, a, b);
        var c = this.Ca(b);
        a.ua = c;
        a.J = this.Ta(b);
        a.S & 16 && this.ma(b, 16, !!(a.L & 16));
        return b
    }
    ;
    k.Ca = function() {}
    ;
    k.ub = function() {}
    ;
    k.Ta = function(a) {
        return a.title
    }
    ;
    k.nb = function(a, b) {
        a && (b ? a.title = b : a.removeAttribute("title"))
    }
    ;
    k.P = function() {
        return "goog-button"
    }
    ;
    var Nh = {
        wb: "mousedown",
        xb: "mouseup",
        hc: "mousecancel",
        Xd: "mousemove",
        Zd: "mouseover",
        Yd: "mouseout",
        Vd: "mouseenter",
        Wd: "mouseleave"
    };
    var Oh = function(a, b) {
        if (!a)
            throw Error("Invalid class name " + a);
        if ("function" !== typeof b)
            throw Error("Invalid decorator function " + b);
    }
      , Ph = {};
    var M = function(a, b, c) {
        uh.call(this, c);
        if (!b) {
            for (b = this.constructor; b; ) {
                var d = Aa(b);
                if (d = Ph[d])
                    break;
                b = (b = Object.getPrototypeOf(b.prototype)) && b.constructor
            }
            b = d ? "function" === typeof d.Z ? d.Z() : new d : null
        }
        this.l = b;
        this.Ia = void 0 !== a ? a : null
    };
    y(M, uh);
    k = M.prototype;
    k.Ia = null;
    k.L = 0;
    k.S = 39;
    k.Ja = 255;
    k.yc = !0;
    k.ba = null;
    k.Tb = !0;
    var Rh = function(a) {
        a.Y && 0 != a.Tb && Qh(a, !1);
        a.Tb = !1
    }
      , Sh = function(a, b) {
        b && (a.ba ? Ya(a.ba, b) || a.ba.push(b) : a.ba = [b],
        Gh(a, b, !0))
    };
    k = M.prototype;
    k.pb = function() {
        var a = this.l.Ha(this);
        this.g = a;
        Jh(this.l, a);
        this.l.sb(a, !1);
        this.isVisible() || (Of(a, !1),
        a && ig(a, "hidden", !0))
    }
    ;
    k.qb = function() {
        return this.A()
    }
    ;
    k.bc = function(a) {
        return this.l.cc(a)
    }
    ;
    k.lc = function(a) {
        this.g = a = this.l.qa(this, a);
        Jh(this.l, a);
        this.l.sb(a, !1);
        this.yc = "none" != a.style.display
    }
    ;
    k.oa = function() {
        M.I.oa.call(this);
        var a = this.l
          , b = xh(this);
        A(this);
        A(b);
        this.isVisible() || ig(b, "hidden", !this.isVisible());
        this.isEnabled() || a.ma(b, 1, !this.isEnabled());
        this.S & 8 && a.ma(b, 8, this.isSelected());
        this.S & 16 && a.ma(b, 16, !!(this.L & 16));
        this.S & 64 && a.ma(b, 64, !!(this.L & 64));
        this.l.qc(this);
        this.S & -2 && (this.Tb && Qh(this, !0),
        this.S & 32 && (a = this.A())) && (b = this.F || (this.F = new oh),
        b.attach(a),
        yh(this).listen(b, "key", this.Hc).listen(a, "focus", this.Fc).listen(a, "blur", this.oc))
    }
    ;
    var Qh = function(a, b) {
        var c = yh(a)
          , d = a.A();
        b ? (c.listen(d, Nh.wb, a.Ua).listen(d, [Nh.xb, Nh.hc], a.Va).listen(d, "mouseover", a.xa).listen(d, "mouseout", a.va),
        a.M != Ta && c.listen(d, "contextmenu", a.M),
        F && !a.K && (a.K = new Th(a),
        mg(a, w(kg, a.K)))) : (c.fa(d, Nh.wb, a.Ua).fa(d, [Nh.xb, Nh.hc], a.Va).fa(d, "mouseover", a.xa).fa(d, "mouseout", a.va),
        a.M != Ta && c.fa(d, "contextmenu", a.M),
        F && (kg(a.K),
        a.K = null))
    };
    M.prototype.bb = function() {
        M.I.bb.call(this);
        this.F && this.F.detach();
        this.isVisible() && this.isEnabled() && this.l.lb(this, !1)
    }
    ;
    M.prototype.H = function() {
        M.I.H.call(this);
        this.F && (this.F.na(),
        delete this.F);
        delete this.l;
        this.K = this.ba = this.Ia = null
    }
    ;
    M.prototype.getContent = function() {
        return this.Ia
    }
    ;
    var Hh = function(a, b) {
        a.Ia = b
    };
    M.prototype.isVisible = function() {
        return this.yc
    }
    ;
    M.prototype.isEnabled = function() {
        return !(this.L & 1)
    }
    ;
    M.prototype.setEnabled = function(a) {
        var b = this.u;
        b && "function" == typeof b.isEnabled && !b.isEnabled() || !Vh(this, 1, !a) || (a || (Wh(this, !1),
        Xh(this, !1)),
        this.isVisible() && this.l.lb(this, a),
        Yh(this, 1, !a, !0))
    }
    ;
    var Xh = function(a, b) {
        Vh(a, 2, b) && Yh(a, 2, b)
    };
    M.prototype.isActive = function() {
        return !!(this.L & 4)
    }
    ;
    var Wh = function(a, b) {
        Vh(a, 4, b) && Yh(a, 4, b)
    };
    M.prototype.isSelected = function() {
        return !!(this.L & 8)
    }
    ;
    M.prototype.mb = function(a) {
        Vh(this, 32, a) && Yh(this, 32, a)
    }
    ;
    M.prototype.getState = function() {
        return this.L
    }
    ;
    var Yh = function(a, b, c, d) {
        d || 1 != b ? a.S & b && c != !!(a.L & b) && (a.l.tb(a, b, c),
        a.L = c ? a.L | b : a.L & ~b) : a.setEnabled(!c)
    }
      , Zh = function(a) {
        if (a.Y && a.L & 32)
            throw Error("Component already rendered");
        a.L & 32 && Yh(a, 32, !1);
        a.S &= -33
    }
      , $h = function(a, b) {
        return !!(a.Ja & b) && !!(a.S & b)
    }
      , Vh = function(a, b, c) {
        return !!(a.S & b) && !!(a.L & b) != c && (!(0 & b) || a.dispatchEvent(vh(b, c))) && !a.N
    };
    M.prototype.xa = function(a) {
        !ai(a, this.A()) && this.dispatchEvent("enter") && this.isEnabled() && $h(this, 2) && Xh(this, !0)
    }
    ;
    M.prototype.va = function(a) {
        !ai(a, this.A()) && this.dispatchEvent("leave") && ($h(this, 4) && Wh(this, !1),
        $h(this, 2) && Xh(this, !1))
    }
    ;
    M.prototype.M = Ta;
    var ai = function(a, b) {
        return !!a.relatedTarget && Je(b, a.relatedTarget)
    };
    k = M.prototype;
    k.Ua = function(a) {
        this.isEnabled() && ($h(this, 2) && Xh(this, !0),
        0 != a.ka.button || Md && a.ctrlKey || ($h(this, 4) && Wh(this, !0),
        this.l && this.l.dc(this) && this.A().focus()));
        0 != a.ka.button || Md && a.ctrlKey || a.preventDefault()
    }
    ;
    k.Va = function(a) {
        this.isEnabled() && ($h(this, 2) && Xh(this, !0),
        this.isActive() && this.kb(a) && $h(this, 4) && Wh(this, !1))
    }
    ;
    k.kb = function(a) {
        if ($h(this, 16)) {
            var b = !(this.L & 16);
            Vh(this, 16, b) && Yh(this, 16, b)
        }
        $h(this, 8) && Vh(this, 8, !0) && Yh(this, 8, !0);
        $h(this, 64) && (b = !(this.L & 64),
        Vh(this, 64, b) && Yh(this, 64, b));
        b = new qg("action",this);
        a && (b.altKey = a.altKey,
        b.ctrlKey = a.ctrlKey,
        b.metaKey = a.metaKey,
        b.shiftKey = a.shiftKey,
        b.u = a.u);
        return this.dispatchEvent(b)
    }
    ;
    k.Fc = function() {
        $h(this, 32) && this.mb(!0)
    }
    ;
    k.oc = function() {
        $h(this, 4) && Wh(this, !1);
        $h(this, 32) && this.mb(!1)
    }
    ;
    k.Hc = function(a) {
        return this.isVisible() && this.isEnabled() && this.Sb(a) ? (a.preventDefault(),
        a.o(),
        !0) : !1
    }
    ;
    k.Sb = function(a) {
        return 13 == a.keyCode && this.kb(a)
    }
    ;
    if ("function" !== typeof M)
        throw Error("Invalid component class " + M);
    if ("function" !== typeof Ch)
        throw Error("Invalid renderer class " + Ch);
    var bi = Aa(M);
    Ph[bi] = Ch;
    Oh("goog-control", function() {
        return new M(null)
    });
    var Th = function(a) {
        lg.call(this);
        this.l = a;
        this.g = !1;
        this.o = new L(this);
        mg(this, w(kg, this.o));
        a = xh(this.l);
        this.o.listen(a, Nh.wb, this.B).listen(a, Nh.xb, this.F).listen(a, "click", this.u)
    };
    y(Th, lg);
    var ci = !F || 9 <= Number(ae);
    Th.prototype.B = function() {
        this.g = !1
    }
    ;
    Th.prototype.F = function() {
        this.g = !0
    }
    ;
    var di = function(a, b) {
        if (!ci)
            return a.button = 0,
            a.type = b,
            a;
        var c = document.createEvent("MouseEvents");
        c.initMouseEvent(b, a.bubbles, a.cancelable, a.view || null, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, a.relatedTarget || null);
        return c
    };
    Th.prototype.u = function(a) {
        if (this.g)
            this.g = !1;
        else {
            var b = a.ka
              , c = b.button
              , d = b.type
              , e = di(b, "mousedown");
            this.l.Ua(new tg(e,a.g));
            e = di(b, "mouseup");
            this.l.Va(new tg(e,a.g));
            ci || (b.button = c,
            b.type = d)
        }
    }
    ;
    Th.prototype.H = function() {
        this.l = null;
        Th.I.H.call(this)
    }
    ;
    var ei = function() {};
    y(ei, Mh);
    va(ei);
    k = ei.prototype;
    k.rb = function() {}
    ;
    k.Ha = function(a) {
        Rh(a);
        a.Ja &= -256;
        Zh(a);
        var b = a.o
          , c = b.wa
          , d = {
            "class": Fh(this, a).join(" "),
            disabled: !a.isEnabled(),
            title: a.Ta() || "",
            value: a.Ca() || ""
        };
        if (a = a.getContent()) {
            if ("string" !== typeof a)
                if (Array.isArray(a))
                    a = a.map(Qe).join("");
                else {
                    var e = [];
                    Pe(a, e, !0);
                    a = e.join("");
                    a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
                    a = a.replace(/\u200B/g, "");
                    a = a.replace(/ +/g, " ");
                    " " != a && (a = a.replace(/^\s*/, ""))
                }
            a = a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
        } else
            a = "";
        return c.call(b, "BUTTON", d, a || "")
    }
    ;
    k.cc = function(a) {
        return "BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
    }
    ;
    k.qa = function(a, b) {
        Rh(a);
        a.Ja &= -256;
        Zh(a);
        if (b.disabled) {
            var c = Ja(Kh(this, 1));
            rf(b, c)
        }
        return ei.I.qa.call(this, a, b)
    }
    ;
    k.qc = function(a) {
        yh(a).listen(a.A(), "click", a.kb)
    }
    ;
    k.sb = function() {}
    ;
    k.ec = function() {}
    ;
    k.dc = function(a) {
        return a.isEnabled()
    }
    ;
    k.lb = function() {}
    ;
    k.tb = function(a, b, c) {
        ei.I.tb.call(this, a, b, c);
        (a = a.A()) && 1 == b && (a.disabled = c)
    }
    ;
    k.Ca = function(a) {
        return a.value
    }
    ;
    k.ub = function(a, b) {
        a && (a.value = b)
    }
    ;
    k.ma = function() {}
    ;
    var fi = function(a, b, c) {
        M.call(this, a, b || ei.Z(), c)
    };
    y(fi, M);
    k = fi.prototype;
    k.Ca = function() {
        return this.ua
    }
    ;
    k.Ta = function() {
        return this.J
    }
    ;
    k.nb = function(a) {
        this.J = a;
        this.l.nb(this.A(), a)
    }
    ;
    k.H = function() {
        fi.I.H.call(this);
        delete this.ua;
        delete this.J
    }
    ;
    k.oa = function() {
        fi.I.oa.call(this);
        if (this.S & 32) {
            var a = this.A();
            a && yh(this).listen(a, "keyup", this.Sb)
        }
    }
    ;
    k.Sb = function(a) {
        return 13 == a.keyCode && "key" == a.type || 32 == a.keyCode && "keyup" == a.type ? this.kb(a) : 32 == a.keyCode
    }
    ;
    Oh("goog-button", function() {
        return new fi(null)
    });
    var gi = ia(["value"])
      , ii = function(a, b, c, d) {
        fi.call(this, a, hi.Z(), b);
        this.R = c || 0;
        this.T = d || 0;
        this.ia = !1
    };
    y(ii, fi);
    k = ii.prototype;
    k.nb = function(a) {
        this.J = a;
        var b = this.A();
        if (b)
            if (this.ia) {
                var c = a instanceof D ? Zg(ic(a).toString()) : a;
                b.removeAttribute("title");
                b.removeAttribute("data-tooltip-contained");
                b.removeAttribute("data-tooltip");
                a ? (a instanceof D ? b.g = a : (b.setAttribute("data-tooltip", a),
                b.g = null),
                b.setAttribute("aria-label", c)) : (b.g = null,
                b.removeAttribute("aria-label"));
                a = te(b) || te();
                b = Aa(a.g);
                ah[b] || (ah[b] = new bh(a))
            } else
                a ? b.title = a : b.removeAttribute("title")
    }
    ;
    k.setEnabled = function(a) {
        this.isEnabled() != a && (ii.I.setEnabled.call(this, a),
        ji(this))
    }
    ;
    k.mb = function(a) {
        ii.I.mb.call(this, a);
        ki(this, !1)
    }
    ;
    k.Ua = function(a) {
        ii.I.Ua.call(this, a);
        this.isEnabled() && ki(this, !0)
    }
    ;
    k.Va = function(a) {
        ii.I.Va.call(this, a);
        this.isEnabled() && ki(this, !0)
    }
    ;
    var ki = function(a, b) {
        a.A() && (a = a.A(),
        b ? rf(a, "jfk-button-clear-outline") : tf(a, "jfk-button-clear-outline"))
    }
      , ji = function(a) {
        a.A() && li(a.l, a)
    }
      , hi = function() {
        this.O = this.P() + "-standard";
        this.o = this.P() + "-action";
        this.K = this.P() + "-primary";
        this.N = this.P() + "-default";
        this.F = this.P() + "-flat";
        this.J = this.P() + "-narrow";
        this.aa = this.P() + "-mini";
        this.B = this.P() + "-contrast"
    };
    y(hi, Mh);
    hi.Z = function() {
        return ih(hi)
    }
    ;
    hi.prototype.g = function(a, b, c) {
        a && c.R != a && (c.R = a,
        ji(c));
        b && c.T != b && (c.T = b,
        ji(c))
    }
    ;
    hi.prototype.P = function() {
        return "jfk-button"
    }
    ;
    hi.prototype.Ha = function(a) {
        Oa(a, ii, "Button is expected to be instance of jfk.Button");
        var b = a.o
          , c = Te(Xe, {
            disabled: !a.isEnabled(),
            checked: !!(a.L & 16),
            style: a.R,
            title: a.Ta(),
            Rc: a.ia,
            value: a.Ca(),
            width: a.T
        }, b);
        b.Ac(c, a.getContent());
        this.qa(a, c);
        return c
    }
    ;
    hi.prototype.qa = function(a, b) {
        hi.I.qa.call(this, a, b);
        this.u || (this.u = fb(this.O, w(this.g, 0, null), this.o, w(this.g, 2, null), this.K, w(this.g, 3, null), this.N, w(this.g, 1, null), this.F, w(this.g, 4, null), this.aa, w(this.g, 5, null), this.B, w(this.g, 6, null), this.J, w(this.g, null, 1)));
        for (var c = of(b), d = 0; d < c.length; ++d) {
            var e = this.u[c[d]];
            e && e(a)
        }
        if (c = b.getAttribute("data-tooltip"))
            a.J = c,
            a.ia = !0;
        return b
    }
    ;
    var Tc = [function(a) {
        Qc(a, !0, "safeAttr is a template literal tag function and should be called using the tagged template syntax. For example, safeAttr`foo`;");
        var b = a[0].toLowerCase();
        if (0 === b.indexOf("on") || 0 === "on".indexOf(b))
            throw Error("Prefix '" + a[0] + "' does not guarantee the attribute to be safe as it is also a prefix for event handler attributesPlease use 'addEventListener' to set event handlers.");
        Mc.forEach(function(c) {
            if (0 === c.indexOf(b))
                throw Error("Prefix '" + a[0] + "' does not guarantee the attribute to be safe as it is also a prefix for the security sensitive attribute '" + (c + "'. Please use native or safe DOM APIs to set the attribute."));
        });
        return new Pc(b,Nc)
    }(gi)];
    hi.prototype.Ca = function(a) {
        return a.getAttribute("value") || ""
    }
    ;
    hi.prototype.ub = function(a, b) {
        a && Sc(a, b)
    }
    ;
    var li = function(a, b) {
        function c(h, g) {
            (h ? d : e).push(g)
        }
        A(b.A(), "Button element must already exist when updating style.");
        var d = []
          , e = []
          , f = b.R;
        c(0 == f, a.O);
        c(2 == f, a.o);
        c(3 == f, a.K);
        c(4 == f, a.F);
        c(5 == f, a.aa);
        c(1 == f, a.N);
        c(6 == f, a.B);
        c(1 == b.T, a.J);
        c(!b.isEnabled(), a.P() + "-disabled");
        uf(b.A(), e);
        sf(b.A(), d)
    };
    var mi = function() {
        ii.call(this, "", void 0, 4);
        Sh(this, "jfk-button-flat");
        Sh(this, "gtx-audio-button");
        Sh(this, "no-audio");
        this.ya = this.Xa = "";
        yh(this).listen(this, "action", this.Bc)
    };
    m(mi, ii);
    mi.prototype.Bc = function() {
        var a = chrome.runtime
          , b = a.sendMessage;
        var c = this.Xa;
        c = "https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=" + this.ya + Sa(c) + "&q=" + encodeURIComponent(String(c));
        b.call(a, {
            audioSrc: c
        })
    }
    ;
    var pi = function(a, b, c) {
        var d = c.toLowerCase();
        d in ni && oi[ni[d.toLowerCase()]] >= b.length ? (a.ba && Za(a.ba, "no-audio") && (0 == a.ba.length && (a.ba = null),
        Gh(a, "no-audio", !1)),
        a.Xa = b,
        a.ya = c) : Sh(a, "no-audio")
    };
    function qi(a) {
        a = String(a).toLowerCase().replace("_", "-");
        if ("zh-cn" == a)
            return "zh-CN";
        if ("zh-tw" == a)
            return "zh-TW";
        var b = a.indexOf("-");
        a = 0 <= b ? a.substring(0, b) : a;
        return "zh" == a ? "zh-CN" : a
    }
    function ri(a) {
        a = chrome.i18n.getMessage(a);
        return chrome.i18n.getMessage(a)
    }
    ;var ti = function() {
        this.o = [];
        chrome.i18n.getAcceptLanguages(v(this.aa, this));
        this.l = "";
        this.g = "1";
        this.u = !0;
        this.B = {};
        this.N = {};
        chrome.storage.local.get(null, v(this.J, this));
        si(this)
    }
      , ui = function(a) {
        if ("" != a.l)
            a = a.l;
        else
            a: {
                for (var b = 0; b < a.o.length; b++) {
                    var c = qi(a.o[b]);
                    if (a.B[c]) {
                        a = c;
                        break a
                    }
                }
                a = "en"
            }
        return a
    };
    ti.prototype.J = function(a) {
        "gtxTargetLang"in a && (this.l = a.gtxTargetLang);
        "gtxShowBubble"in a && (this.g = a.gtxShowBubble);
        "gtxDetectLanguage"in a && (this.u = a.gtxDetectLanguage);
        "gtxSourceLangList"in a && (this.N = vi(this, a.gtxSourceLangList));
        "gtxTargetLangList"in a && (this.B = vi(this, a.gtxTargetLangList));
        this.loaded = !0
    }
    ;
    var vi = function(a, b) {
        var c = [], d;
        for (d in b)
            c.push({
                code: d,
                name: b[d]
            });
        c.sort(a.F);
        a = {};
        for (b = 0; b < c.length; b++)
            a[c[b].code] = c[b].name;
        return a
    };
    ti.prototype.F = function(a, b) {
        return a.name.localeCompare(b.name)
    }
    ;
    var si = function(a) {
        chrome.storage.onChanged.addListener(function(b) {
            b.gtxTargetLang && (a.l = b.gtxTargetLang.newValue);
            b.gtxShowBubble && (a.g = b.gtxShowBubble.newValue)
        })
    };
    ti.prototype.aa = function(a) {
        this.o = a
    }
    ;
    var xi = function(a) {
        var b = wi;
        a = qi(a);
        return a == ui(b) ? !0 : !1
    }
      , zi = function(a) {
        var b = yi;
        if ("sl" == a)
            return b.N;
        if ("tl" == a)
            return b.B;
        throw Error("Invalid input for getLangList()");
    }
      , Ai = !!chrome.i18n.detectLanguage;
    var oi = [0, 200]
      , ni = {
        af: 1,
        ar: 1,
        bn: 1,
        bs: 1,
        ca: 1,
        cs: 1,
        cy: 1,
        da: 1,
        de: 1,
        el: 1,
        en: 1,
        eo: 1,
        es: 1,
        et: 1,
        fi: 1,
        fr: 1,
        gu: 1,
        hi: 1,
        hr: 1,
        hu: 1,
        hy: 1,
        id: 1,
        is: 1,
        it: 1,
        ja: 1,
        jw: 1,
        km: 1,
        kn: 1,
        ko: 1,
        la: 1,
        lv: 1,
        mk: 1,
        ml: 1,
        mr: 1,
        my: 1,
        ne: 1,
        nl: 1,
        no: 1,
        pl: 1,
        pt: 1,
        ro: 1,
        ru: 1,
        si: 1,
        sk: 1,
        sq: 1,
        sr: 1,
        su: 1,
        sv: 1,
        sw: 1,
        ta: 1,
        te: 1,
        th: 1,
        tl: 1,
        tr: 1,
        vi: 1,
        uk: 1,
        ur: 1,
        zh: 1,
        "zh-cn": 1,
        "zh-tw": 1
    };
    var Bi = function() {
        this.l = [];
        this.g = {};
        this.o = !1;
        this.F = 1;
        this.u = {};
        Gg(window, "beforeunload", this.N, !1, this)
    }
      , Ci = function(a, b, c) {
        if (null == b)
            return "1";
        switch (wa(b)) {
        case "string":
            return a = b,
            64 < a.length && (null == c || !c) && (a = a.substr(0, 64)),
            encodeURIComponent(String(a));
        case "number":
            return "" + b;
        case "boolean":
            return b ? "1" : "0";
        case "array":
            var d = [];
            for (var e in b)
                d.push(Ci(a, b[e], c));
            return d.join(",");
        case "object":
            d = [];
            for (var f in b)
                d.push(Di(a, f, b[f], c));
            return d.join(",");
        default:
            return ""
        }
    }
      , Di = function(a, b, c, d) {
        return [encodeURIComponent(String(b)), Ci(a, c, d || "smtalt" == b)].join("=")
    };
    Bi.prototype.log = function(a, b) {
        this.l.push([a, b]);
        this.o || (this.o = !0,
        Tg(this.B, 0, this))
    }
    ;
    Bi.prototype.B = function() {
        for (var a = 0; a < this.l.length; a++) {
            var b = this.l[a];
            Ei(this, "/gen204?" + Di(this, b[0], b[1]))
        }
        this.l = [];
        this.o = !1
    }
    ;
    var Ei = function(a, b) {
        var c = new Image
          , d = a.F++;
        a.u[d] = c;
        c.onload = c.onerror = function() {
            delete Bi.Z().u[d]
        }
        ;
        c.src = b;
        c = null
    };
    Bi.prototype.N = function() {
        this.B();
        for (var a in this.g)
            0 != this.g[a] && (Ei(this, "/gen204?" + Di(this, a, this.g[a][1])),
            a in this.g && (r.clearTimeout(this.g[a][0]),
            delete this.g[a]))
    }
    ;
    Bi.Z = function() {
        return ih(Bi)
    }
    ;
    var Fi = function() {};
    Fi.prototype.g = null;
    var Hi = function(a) {
        var b;
        (b = a.g) || (b = {},
        Gi(a) && (b[0] = !0,
        b[1] = !0),
        b = a.g = b);
        return b
    };
    var Ii, Ji = function() {};
    y(Ji, Fi);
    var Ki = function(a) {
        return (a = Gi(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
      , Gi = function(a) {
        if (!a.l && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.l = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.l
    };
    Ii = new Ji;
    var Li = function(a) {
        K.call(this);
        this.headers = new Map;
        this.T = a || null;
        this.o = !1;
        this.R = this.g = null;
        this.F = this.ia = this.B = "";
        this.u = this.ha = this.K = this.ga = !1;
        this.J = 0;
        this.O = null;
        this.va = "";
        this.M = this.ya = !1
    };
    y(Li, K);
    Li.prototype.l = hd(id(), "goog.net.XhrIo").o;
    var Mi = /^https?$/i
      , Ni = ["POST", "PUT"]
      , Oi = []
      , Pi = function(a, b, c, d) {
        var e = new Li;
        Oi.push(e);
        b && e.listen("complete", b);
        e.Xb("ready", e.Xa);
        e.send(a, c, d, void 0)
    };
    Li.prototype.Xa = function() {
        this.na();
        Za(Oi, this)
    }
    ;
    Li.prototype.send = function(a, b, c, d) {
        if (this.g)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + this.B + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.B = a;
        this.F = "";
        this.ia = b;
        this.ga = !1;
        this.o = !0;
        this.g = this.T ? Ki(this.T) : Ki(Ii);
        this.R = this.T ? Hi(this.T) : Hi(Ii);
        this.g.onreadystatechange = v(this.ua, this);
        try {
            ld(this.l, Qi(this, "Opening Xhr")),
            this.ha = !0,
            this.g.open(b, String(a), !0),
            this.ha = !1
        } catch (h) {
            ld(this.l, Qi(this, "Error opening Xhr: " + h.message));
            Ri(this, h);
            return
        }
        a = c || "";
        c = new Map(this.headers);
        if (d)
            if (Object.getPrototypeOf(d) === Object.prototype)
                for (var e in d)
                    c.set(e, d[e]);
            else if ("function" === typeof d.keys && "function" === typeof d.get) {
                e = ja(d.keys());
                for (var f = e.next(); !f.done; f = e.next())
                    f = f.value,
                    c.set(f, d.get(f))
            } else
                throw Error("Unknown input type for opt_headers: " + String(d));
        d = Array.from(c.keys()).find(function(h) {
            return "content-type" == h.toLowerCase()
        });
        e = r.FormData && a instanceof r.FormData;
        !Ya(Ni, b) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        b = ja(c);
        for (d = b.next(); !d.done; d = b.next())
            c = ja(d.value),
            d = c.next().value,
            c = c.next().value,
            this.g.setRequestHeader(d, c);
        this.va && (this.g.responseType = this.va);
        "withCredentials"in this.g && this.g.withCredentials !== this.ya && (this.g.withCredentials = this.ya);
        try {
            Si(this),
            0 < this.J && (this.M = Ti(this.g),
            ld(this.l, Qi(this, "Will abort after " + this.J + "ms if incomplete, xhr2 " + this.M)),
            this.M ? (this.g.timeout = this.J,
            this.g.ontimeout = v(this.xa, this)) : this.O = Tg(this.xa, this.J, this)),
            ld(this.l, Qi(this, "Sending request")),
            this.K = !0,
            this.g.send(a),
            this.K = !1
        } catch (h) {
            ld(this.l, Qi(this, "Send error: " + h.message)),
            Ri(this, h)
        }
    }
    ;
    var Ti = function(a) {
        return F && "number" === typeof a.timeout && void 0 !== a.ontimeout
    };
    Li.prototype.xa = function() {
        "undefined" != typeof ua && this.g && (this.F = "Timed out after " + this.J + "ms, aborting",
        ld(this.l, Qi(this, this.F)),
        this.dispatchEvent("timeout"),
        this.abort(8))
    }
    ;
    var Ri = function(a, b) {
        a.o = !1;
        a.g && (a.u = !0,
        a.g.abort(),
        a.u = !1);
        a.F = b;
        Ui(a);
        Vi(a)
    }
      , Ui = function(a) {
        a.ga || (a.ga = !0,
        a.dispatchEvent("complete"),
        a.dispatchEvent("error"))
    };
    Li.prototype.abort = function() {
        this.g && this.o && (ld(this.l, Qi(this, "Aborting")),
        this.o = !1,
        this.u = !0,
        this.g.abort(),
        this.u = !1,
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        Vi(this))
    }
    ;
    Li.prototype.H = function() {
        this.g && (this.o && (this.o = !1,
        this.u = !0,
        this.g.abort(),
        this.u = !1),
        Vi(this, !0));
        Li.I.H.call(this)
    }
    ;
    Li.prototype.ua = function() {
        this.N || (this.ha || this.K || this.u ? Wi(this) : this.Ya())
    }
    ;
    Li.prototype.Ya = function() {
        Wi(this)
    }
    ;
    var Wi = function(a) {
        if (a.o && "undefined" != typeof ua)
            if (a.R[1] && 4 == Xi(a) && 2 == a.Ba())
                ld(a.l, Qi(a, "Local request error detected and ignored"));
            else if (a.K && 4 == Xi(a))
                Tg(a.ua, 0, a);
            else if (a.dispatchEvent("readystatechange"),
            4 == Xi(a)) {
                ld(a.l, Qi(a, "Request complete"));
                a.o = !1;
                try {
                    if (Yi(a))
                        a.dispatchEvent("complete"),
                        a.dispatchEvent("success");
                    else {
                        try {
                            var b = 2 < Xi(a) ? a.g.statusText : ""
                        } catch (c) {
                            ld(a.l, "Can not get status: " + c.message),
                            b = ""
                        }
                        a.F = b + " [" + a.Ba() + "]";
                        Ui(a)
                    }
                } finally {
                    Vi(a)
                }
            }
    }
      , Vi = function(a, b) {
        if (a.g) {
            Si(a);
            var c = a.g
              , d = a.R[0] ? function() {}
            : null;
            a.g = null;
            a.R = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
                kd(a.l, "Problem encountered resetting onreadystatechange: " + e.message)
            }
        }
    }
      , Si = function(a) {
        a.g && a.M && (a.g.ontimeout = null);
        a.O && (r.clearTimeout(a.O),
        a.O = null)
    };
    Li.prototype.isActive = function() {
        return !!this.g
    }
    ;
    var Yi = function(a) {
        var b = a.Ba();
        a: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
            var c = !0;
            break a;
        default:
            c = !1
        }
        if (!c) {
            if (b = 0 === b)
                a = String(a.B).match(Hc)[1] || null,
                !a && r.self && r.self.location && (a = r.self.location.protocol.slice(0, -1)),
                b = !Mi.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    }
      , Xi = function(a) {
        return a.g ? a.g.readyState : 0
    };
    Li.prototype.Ba = function() {
        try {
            return 2 < Xi(this) ? this.g.status : -1
        } catch (a) {
            return -1
        }
    }
    ;
    var Zi = function(a) {
        try {
            return a.g ? a.g.responseText : ""
        } catch (b) {
            return ld(a.l, "Can not get responseText: " + b.message),
            ""
        }
    }
      , Qi = function(a, b) {
        return b + " [" + a.ia + " " + a.B + " " + a.Ba() + "]"
    };
    function $i(a, b) {
        void 0 === a.hb ? Object.defineProperties(a, {
            hb: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        }) : a.hb |= b
    }
    function aj(a) {
        return a.hb || 0
    }
    function bj(a, b, c) {
        Object.defineProperties(a, {
            Ub: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            },
            rc: {
                value: c,
                configurable: !0,
                writable: !0,
                enumerable: !1
            },
            Lc: {
                value: void 0,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }
    function cj(a) {
        return null != a.Ub
    }
    function dj(a) {
        return a.Ub
    }
    function ej(a, b) {
        a.Ub = b
    }
    function fj(a, b) {
        a.Lc = b
    }
    function gj(a) {
        return a.rc
    }
    function hj(a, b) {
        A(0 <= Object.getOwnPropertyNames(a).indexOf("internalJsprotoWrapper"));
        return a.rc = b
    }
    ;var ij, jj, kj, lj, mj, nj, oj, pj, qj;
    if ("function" === typeof Symbol && "symbol" === typeof Symbol()) {
        var rj = Symbol("bitset")
          , sj = Symbol("pivotFieldNumber")
          , tj = Symbol("descriptor")
          , uj = Symbol("unparsedFields")
          , vj = Symbol("wrapper");
        ij = function(a, b) {
            a[rj] = jj(a) | b
        }
        ;
        jj = function(a) {
            return a[rj] || 0
        }
        ;
        lj = function(a, b, c, d) {
            a[sj] = b;
            a[vj] = c;
            a[tj] = d;
            a[uj] = void 0
        }
        ;
        kj = function(a) {
            return null != a[sj]
        }
        ;
        mj = function(a) {
            return a[sj]
        }
        ;
        nj = function(a, b) {
            a[sj] = b
        }
        ;
        oj = function(a, b) {
            a[uj] = b
        }
        ;
        pj = function(a) {
            return a[vj]
        }
        ;
        qj = function(a, b) {
            A(kj(a));
            return a[vj] = b
        }
    } else
        ij = $i,
        jj = aj,
        lj = bj,
        kj = cj,
        mj = dj,
        nj = ej,
        oj = fj,
        pj = gj,
        qj = hj;
    var wj = function() {}
      , xj = function() {};
    m(xj, wj);
    var yj = function() {};
    m(yj, xj);
    function zj(a) {
        return null != a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    function Aj(a) {
        var b = Ia(mj(a));
        if (b > a.length)
            return null;
        A(b === a.length);
        a = a[b - 1];
        A(zj(a));
        return a
    }
    function Bj(a, b, c) {
        A(0 < b);
        var d = mj(a);
        if (b < d)
            a[b - 1] = c;
        else {
            var e = Aj(a);
            e ? e[b] = c : (e = {},
            a[d - 1] = (e[b] = c,
            e))
        }
    }
    function Cj(a, b) {
        A(0 < b);
        var c = mj(a);
        if (b < c)
            return A(!zj(a[b - 1])),
            a[b - 1];
        var d;
        return null == (d = Aj(a)) ? void 0 : d[b]
    }
    function Dj(a, b, c) {
        a = Cj(a, b);
        return null == a ? c : a
    }
    var Ej = Object.freeze([]);
    var Fj = function() {};
    Fj.prototype[Symbol.iterator] = function() {
        return this.g()
    }
    ;
    var Gj = function(a, b) {
        this.o = a;
        this.l = b
    };
    m(Gj, Fj);
    Gj.prototype.g = function() {
        var a = this.o[Symbol.iterator]()
          , b = this.l;
        return {
            next: function() {
                var c = a.next()
                  , d = c.done;
                if (d)
                    return c;
                c = b(c.value);
                return {
                    done: d,
                    value: c
                }
            }
        }
    }
    ;
    Gj.prototype.map = function(a) {
        return new Gj(this,a)
    }
    ;
    var Hj = function(a) {
        this.l = a
    };
    m(Hj, Fj);
    var Jj = function(a) {
        a && a.length ? a = new Hj(La(a).slice()) : (Ij || (Ij = new Hj(Ej)),
        a = Ij);
        return a
    };
    Hj.prototype.g = function() {
        return this.l[Symbol.iterator]()
    }
    ;
    Hj.prototype.map = function(a) {
        return new Gj(this,a)
    }
    ;
    var Ij;
    function Kj(a, b) {
        var c = Cj(a, b);
        return c instanceof wj ? (c = Oa(c, yj),
        La(c.g(a, b))) : Jj(c)
    }
    function Lj(a, b) {
        var c = Cj(a, b);
        c instanceof xj && (c = Cj(a, b),
        Array.isArray(c) ? c = La(c) : c instanceof xj ? c = La(c.g(a, b)) : (A(null == c),
        c = [],
        Bj(a, b, c)));
        a = La(c);
        A(!1, "Index undefined out of bounds for array[" + (null == a ? void 0 : a.length) + "] fieldNumber " + b + ".");
        return null == a ? void 0 : a[void 0]
    }
    ;function N(a, b, c) {
        for (var d = a.h, e = 0; e < b.length; e++) {
            var f = b[e];
            if (null != Cj(d, f.i))
                if (f.m) {
                    var h = f.m(a);
                    c[f.name] = f.D ? h.s() : h
                } else
                    h = [].concat(ka(f.v(a))),
                    c[f.name] = f.D ? h.map(function(g) {
                        return g.s()
                    }) : h
        }
    }
    function O(a, b, c) {
        b = new Map(b.map(function(n) {
            return [n.name, n]
        }));
        c = new c;
        var d = c.h, e = {}, f;
        for (f in a) {
            if (A(a.hasOwnProperty(f))) {
                var h = A(b.get(f))
                  , g = a[f];
                if (null != g) {
                    var l = void 0;
                    if (h.C)
                        e.ob = h.C,
                        l = function(n) {
                            return function(p) {
                                p = Ka(p);
                                return n.ob(p).h
                            }
                        }(e),
                        h.m ? l = l(g) : (g = La(g).map(l),
                        l = g.length ? g : null);
                    else
                        b: {
                            switch (typeof g) {
                            case "string":
                            case "number":
                            case "boolean":
                                l = g;
                                break b;
                            case "object":
                                if (Array.isArray(g)) {
                                    l = g.length ? g : null;
                                    break b
                                }
                            }
                            B("Unexpected value " + g);
                            l = void 0
                        }
                    null != l && Bj(d, h.i, l)
                }
            }
            e = {
                ob: e.ob
            }
        }
        return c
    }
    function R(a, b, c) {
        for (var d = a.h, e = 0; e < b.length; e++) {
            var f = b[e];
            if (null != Cj(d, f.i))
                if (f.m) {
                    var h = f.m(a);
                    c.push(f.j(f, h))
                } else {
                    h = 0;
                    for (var g = f.v(a)[Symbol.iterator](), l = g.next(); !l.done; l = g.next(),
                    h++)
                        c.push(f.j(f, l.value, h))
                }
        }
    }
    function S(a, b, c) {
        b instanceof Uint8Array ? b = '"' + [].concat(ka(b)).map(function(d) {
            return "\\x" + (16 > Ia(d) ? "0" : "") + d.toString(16)
        }).join("") + '"' : "string" === typeof b && null == a.Ze && (b = '"' + b + '"');
        return a.name + ": " + b + (null == c ? "" : " #" + c)
    }
    function T(a, b, c) {
        b = b.G();
        var d = ""
          , e = null == c ? "" : " #" + c;
        c = null == c ? "" : " " + c;
        b && (d = "\n  " + b.replace(/\n/g, "\n  "));
        return a.name + " {" + e + d + "\n} # " + a.name + c
    }
    ;function U(a, b, c) {
        return Dj(a, b, c || 0)
    }
    function Mj(a, b) {
        a = Kj(a, b);
        return a = a.map(Ia)
    }
    ;function V(a, b, c) {
        var d = Nj(a, b, c);
        if (!d) {
            var e = [];
            d = new c(e);
            Bj(a, b, e)
        }
        return d
    }
    function Oj(a, b, c) {
        return (a = La(Lj(a, b))) ? Pj(a, c) : new c
    }
    function W(a, b, c) {
        return Kj(a, b).map(function(d) {
            return Pj(d, c)
        })
    }
    function Nj(a, b, c) {
        if (a = Cj(a, b))
            return Pj(La(a), c)
    }
    function Pj(a, b) {
        var c = pj(a);
        return null == c ? new b(a) : c
    }
    ;function X(a, b) {
        return Dj(a, b, "")
    }
    function Y(a, b) {
        a = Kj(a, b);
        return a = a.map(Ja)
    }
    ;Object.create(null);
    var Z = function(a, b) {
        a = a || [];
        if (kj(a))
            b && b > a.length && !Aj(a) && nj(a, b),
            qj(a, this);
        else {
            b = Math.max(b || 2147483647, a.length + 1);
            var c = a.length;
            c = c && a[c - 1];
            if (zj(c)) {
                b = a.length;
                for (var d in c) {
                    var e = Number(d);
                    e < b && (a[e - 1] = c[d],
                    delete c[e])
                }
            }
            lj(a, b, this, void 0)
        }
        this.h = a
    };
    Z.prototype.clear = function() {
        this.h.length = 0;
        oj(this.h, void 0)
    }
    ;
    var Qj = function(a) {
        Z.call(this, a)
    };
    m(Qj, Z);
    k = Qj.prototype;
    k.Cb = function() {
        return X(this.h, 1)
    }
    ;
    k.getTitle = function() {
        return X(this.h, 2)
    }
    ;
    k.setTitle = function(a) {
        Bj(this.h, 2, a)
    }
    ;
    k.Ma = function() {
        return X(this.h, 3)
    }
    ;
    k.cb = function() {
        return X(this.h, 4)
    }
    ;
    var Rj = function() {
        return [{
            name: "alert_mid",
            i: 1,
            m: function(a) {
                return a.Cb()
            },
            j: S
        }, {
            name: "title",
            i: 2,
            m: function(a) {
                return a.getTitle()
            },
            j: S
        }, {
            name: "description",
            i: 3,
            m: function(a) {
                return a.Ma()
            },
            j: S
        }, {
            name: "link",
            i: 4,
            m: function(a) {
                return a.cb()
            },
            j: S
        }]
    }
      , Sj = function(a) {
        return O(a, Rj(), Qj)
    };
    Qj.prototype.s = function() {
        var a = {};
        N(this, Rj(), a);
        return a
    }
    ;
    Qj.prototype.G = function() {
        var a = [];
        R(this, Rj(), a);
        return a.join("\n")
    }
    ;
    Qj.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Tj = function(a) {
        Z.call(this, a)
    };
    m(Tj, Z);
    var Uj = function(a) {
        return new Tj(a)
    };
    Tj.prototype.getType = function() {
        return U(this.h, 1)
    }
    ;
    var Vj = function() {
        return [{
            name: "type",
            i: 1,
            m: function(a) {
                return a.getType()
            },
            j: S
        }, {
            name: "display_text",
            i: 2,
            m: function(a) {
                return X(a.h, 2)
            },
            j: S
        }, {
            name: "contact_text",
            i: 3,
            m: function(a) {
                return X(a.h, 3)
            },
            j: S
        }]
    }
      , Wj = function(a) {
        return O(a, Vj(), Tj)
    };
    Tj.prototype.s = function() {
        var a = {};
        N(this, Vj(), a);
        return a
    }
    ;
    Tj.prototype.G = function() {
        var a = [];
        R(this, Vj(), a);
        return a.join("\n")
    }
    ;
    Tj.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Xj = function(a) {
        Z.call(this, a)
    };
    m(Xj, Z);
    var Yj = function(a) {
        return new Xj(a)
    };
    Xj.prototype.getTitle = function() {
        return X(this.h, 3)
    }
    ;
    Xj.prototype.setTitle = function(a) {
        Bj(this.h, 3, a)
    }
    ;
    Xj.prototype.Ma = function() {
        return X(this.h, 4)
    }
    ;
    var Zj = function() {
        return [{
            name: "location",
            i: 1,
            m: function(a) {
                return X(a.h, 1)
            },
            j: S
        }, {
            name: "language",
            i: 2,
            m: function(a) {
                return X(a.h, 2)
            },
            j: S
        }, {
            name: "title",
            i: 3,
            m: function(a) {
                return a.getTitle()
            },
            j: S
        }, {
            name: "description",
            i: 4,
            m: function(a) {
                return a.Ma()
            },
            j: S
        }, {
            name: "contact_details",
            i: 5,
            D: Uj,
            C: Wj,
            v: function(a) {
                return W(a.h, 5, Tj)
            },
            j: T
        }]
    }
      , ak = function(a) {
        return O(a, Zj(), Xj)
    };
    Xj.prototype.s = function() {
        var a = {};
        N(this, Zj(), a);
        return a
    }
    ;
    Xj.prototype.G = function() {
        var a = [];
        R(this, Zj(), a);
        return a.join("\n")
    }
    ;
    Xj.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var bk = function(a) {
        Z.call(this, a)
    };
    m(bk, Z);
    bk.prototype.getTitle = function() {
        return X(this.h, 1)
    }
    ;
    bk.prototype.setTitle = function(a) {
        Bj(this.h, 1, a)
    }
    ;
    bk.prototype.Cb = function() {
        return X(this.h, 2)
    }
    ;
    var ck = function() {
        return [{
            name: "title",
            i: 1,
            m: function(a) {
                return a.getTitle()
            },
            j: S
        }, {
            name: "alert_mid",
            i: 2,
            m: function(a) {
                return a.Cb()
            },
            j: S
        }, {
            name: "help_and_info",
            i: 3,
            D: Yj,
            C: ak,
            v: function(a) {
                return W(a.h, 3, Xj)
            },
            j: T
        }]
    }
      , dk = function(a) {
        return O(a, ck(), bk)
    };
    bk.prototype.s = function() {
        var a = {};
        N(this, ck(), a);
        return a
    }
    ;
    bk.prototype.G = function() {
        var a = [];
        R(this, ck(), a);
        return a.join("\n")
    }
    ;
    bk.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var ek = function(a) {
        Z.call(this, a)
    };
    m(ek, Z);
    var fk = function(a) {
        return new ek(a)
    };
    ek.prototype.Eb = function() {
        return U(this.h, 1)
    }
    ;
    ek.prototype.Ib = function() {
        return Mj(this.h, 2)
    }
    ;
    var gk = function() {
        return [{
            name: "backend",
            i: 1,
            m: function(a) {
                return a.Eb()
            },
            j: S
        }, {
            name: "features_applied",
            i: 2,
            v: function(a) {
                return a.Ib()
            },
            j: S
        }]
    }
      , hk = function(a) {
        return O(a, gk(), ek)
    };
    ek.prototype.s = function() {
        var a = {};
        N(this, gk(), a);
        return a
    }
    ;
    ek.prototype.G = function() {
        var a = [];
        R(this, gk(), a);
        return a.join("\n")
    }
    ;
    ek.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var ik = function(a) {
        Z.call(this, a)
    };
    m(ik, Z);
    var jk = function(a) {
        return new ik(a)
    };
    ik.prototype.Lb = function() {
        return U(this.h, 1)
    }
    ;
    var kk = function() {
        return [{
            name: "label",
            i: 1,
            m: function(a) {
                return a.Lb()
            },
            j: S
        }, {
            name: "oxford_label",
            i: 2,
            m: function(a) {
                return U(a.h, 2)
            },
            j: S
        }]
    }
      , lk = function(a) {
        return O(a, kk(), ik)
    };
    ik.prototype.s = function() {
        var a = {};
        N(this, kk(), a);
        return a
    }
    ;
    ik.prototype.G = function() {
        var a = [];
        R(this, kk(), a);
        return a.join("\n")
    }
    ;
    ik.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var mk = function(a) {
        Z.call(this, a)
    };
    m(mk, Z);
    var nk = function(a) {
        return new mk(a)
    };
    mk.prototype.Qb = function() {
        return X(this.h, 1)
    }
    ;
    mk.prototype.Mb = function() {
        return Mj(this.h, 2)
    }
    ;
    mk.prototype.Sa = function() {
        return U(this.h, 3)
    }
    ;
    mk.prototype.Na = function() {
        return U(this.h, 4)
    }
    ;
    var ok = function() {
        return [{
            name: "text",
            i: 1,
            m: function(a) {
                return a.Qb()
            },
            j: S
        }, {
            name: "labels",
            i: 2,
            v: function(a) {
                return a.Mb()
            },
            j: S
        }, {
            name: "start_pos",
            i: 3,
            m: function(a) {
                return a.Sa()
            },
            j: S
        }, {
            name: "end_pos",
            i: 4,
            m: function(a) {
                return a.Na()
            },
            j: S
        }, {
            name: "label_infos",
            i: 5,
            D: jk,
            C: lk,
            v: function(a) {
                return W(a.h, 5, ik)
            },
            j: T
        }]
    }
      , pk = function(a) {
        return O(a, ok(), mk)
    };
    mk.prototype.s = function() {
        var a = {};
        N(this, ok(), a);
        return a
    }
    ;
    mk.prototype.G = function() {
        var a = [];
        R(this, ok(), a);
        return a.join("\n")
    }
    ;
    mk.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var qk = function(a) {
        Z.call(this, a)
    };
    m(qk, Z);
    var rk = function(a) {
        return new qk(a)
    };
    qk.prototype.Ob = function() {
        return U(this.h, 2)
    }
    ;
    qk.prototype.Jb = function() {
        return !!Dj(this.h, 3, !1)
    }
    ;
    qk.prototype.Db = function() {
        return !!Dj(this.h, 4, !1)
    }
    ;
    qk.prototype.Aa = function() {
        return U(this.h, 8)
    }
    ;
    var sk = function() {
        return [{
            name: "word_postproc",
            i: 1,
            m: function(a) {
                return X(a.h, 1)
            },
            j: S
        }, {
            name: "score",
            i: 2,
            m: function(a) {
                return a.Ob()
            },
            j: S
        }, {
            name: "has_preceding_space",
            i: 3,
            m: function(a) {
                return a.Jb()
            },
            j: S
        }, {
            name: "attach_to_next_token",
            i: 4,
            m: function(a) {
                return a.Db()
            },
            j: S
        }, {
            name: "backends",
            i: 5,
            v: function(a) {
                return Mj(a.h, 5)
            },
            j: S
        }, {
            name: "word_postproc_segments",
            i: 6,
            D: nk,
            C: pk,
            v: function(a) {
                return W(a.h, 6, mk)
            },
            j: T
        }, {
            name: "backend_infos",
            i: 7,
            D: fk,
            C: hk,
            v: function(a) {
                return W(a.h, 7, ek)
            },
            j: T
        }, {
            name: "gender",
            i: 8,
            m: function(a) {
                return a.Aa()
            },
            j: S
        }]
    }
      , tk = function(a) {
        return O(a, sk(), qk)
    };
    qk.prototype.s = function() {
        var a = {};
        N(this, sk(), a);
        return a
    }
    ;
    qk.prototype.G = function() {
        var a = [];
        R(this, sk(), a);
        return a.join("\n")
    }
    ;
    qk.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var uk = function(a) {
        Z.call(this, a)
    };
    m(uk, Z);
    var vk = function(a) {
        return new uk(a)
    };
    uk.prototype.Fb = function() {
        return U(this.h, 1)
    }
    ;
    uk.prototype.Hb = function() {
        return U(this.h, 2)
    }
    ;
    var wk = function() {
        return [{
            name: "begin",
            i: 1,
            m: function(a) {
                return a.Fb()
            },
            j: S
        }, {
            name: "end",
            i: 2,
            m: function(a) {
                return a.Hb()
            },
            j: S
        }]
    }
      , xk = function(a) {
        return O(a, wk(), uk)
    };
    uk.prototype.s = function() {
        var a = {};
        N(this, wk(), a);
        return a
    }
    ;
    uk.prototype.G = function() {
        var a = [];
        R(this, wk(), a);
        return a.join("\n")
    }
    ;
    uk.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var yk = function(a) {
        Z.call(this, a)
    };
    m(yk, Z);
    var zk = function(a) {
        return new yk(a)
    };
    yk.prototype.Sa = function() {
        return U(this.h, 6)
    }
    ;
    yk.prototype.Na = function() {
        return U(this.h, 7)
    }
    ;
    var Ak = function() {
        return [{
            name: "src_phrase",
            i: 1,
            m: function(a) {
                return X(a.h, 1)
            },
            j: S
        }, {
            name: "alternative",
            i: 3,
            D: rk,
            C: tk,
            v: function(a) {
                return W(a.h, 3, qk)
            },
            j: T
        }, {
            name: "srcunicodeoffsets",
            i: 4,
            D: vk,
            C: xk,
            v: function(a) {
                return W(a.h, 4, uk)
            },
            j: T
        }, {
            name: "raw_src_segment",
            i: 5,
            m: function(a) {
                return X(a.h, 5)
            },
            j: S
        }, {
            name: "start_pos",
            i: 6,
            m: function(a) {
                return a.Sa()
            },
            j: S
        }, {
            name: "end_pos",
            i: 7,
            m: function(a) {
                return a.Na()
            },
            j: S
        }, {
            name: "src_phrase_segments",
            i: 8,
            D: nk,
            C: pk,
            v: function(a) {
                return W(a.h, 8, mk)
            },
            j: T
        }]
    }
      , Bk = function(a) {
        return O(a, Ak(), yk)
    };
    yk.prototype.s = function() {
        var a = {};
        N(this, Ak(), a);
        return a
    }
    ;
    yk.prototype.G = function() {
        var a = [];
        R(this, Ak(), a);
        return a.join("\n")
    }
    ;
    yk.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Ck = function(a) {
        Z.call(this, a)
    };
    m(Ck, Z);
    var Dk = function(a) {
        return new Ck(a)
    };
    k = Ck.prototype;
    k.fb = function() {
        return X(this.h, 1)
    }
    ;
    k.Jb = function() {
        return !!Dj(this.h, 3, !1)
    }
    ;
    k.Db = function() {
        return !!Dj(this.h, 4, !1)
    }
    ;
    k.Gb = function() {
        return U(this.h, 5)
    }
    ;
    k.Sa = function() {
        return U(this.h, 6)
    }
    ;
    k.Na = function() {
        return U(this.h, 7)
    }
    ;
    var Ek = function() {
        return [{
            name: "word",
            i: 1,
            m: function(a) {
                return a.fb()
            },
            j: S
        }, {
            name: "styles",
            i: 2,
            v: function(a) {
                return Mj(a.h, 2)
            },
            j: S
        }, {
            name: "has_preceding_space",
            i: 3,
            m: function(a) {
                return a.Jb()
            },
            j: S
        }, {
            name: "attach_to_next_token",
            i: 4,
            m: function(a) {
                return a.Db()
            },
            j: S
        }, {
            name: "confidence",
            i: 5,
            m: function(a) {
                return a.Gb()
            },
            j: S
        }, {
            name: "start_pos",
            i: 6,
            m: function(a) {
                return a.Sa()
            },
            j: S
        }, {
            name: "end_pos",
            i: 7,
            m: function(a) {
                return a.Na()
            },
            j: S
        }, {
            name: "not_from_first_segment",
            i: 8,
            m: function(a) {
                return U(a.h, 8)
            },
            j: S
        }]
    }
      , Fk = function(a) {
        return O(a, Ek(), Ck)
    };
    Ck.prototype.s = function() {
        var a = {};
        N(this, Ek(), a);
        return a
    }
    ;
    Ck.prototype.G = function() {
        var a = [];
        R(this, Ek(), a);
        return a.join("\n")
    }
    ;
    Ck.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Gk = function(a) {
        Z.call(this, a)
    };
    m(Gk, Z);
    Gk.prototype.Mb = function() {
        return Y(this.h, 5)
    }
    ;
    var Hk = function() {
        return [{
            name: "register",
            i: 1,
            v: function(a) {
                return Y(a.h, 1)
            },
            j: S
        }, {
            name: "geographic",
            i: 2,
            v: function(a) {
                return Y(a.h, 2)
            },
            j: S
        }, {
            name: "subject",
            i: 3,
            v: function(a) {
                return Y(a.h, 3)
            },
            j: S
        }, {
            name: "usage_label",
            i: 4,
            v: function(a) {
                return Y(a.h, 4)
            },
            j: S
        }, {
            name: "labels",
            i: 5,
            v: function(a) {
                return a.Mb()
            },
            j: S
        }]
    }
      , Ik = function(a) {
        return O(a, Hk(), Gk)
    };
    Gk.prototype.s = function() {
        var a = {};
        N(this, Hk(), a);
        return a
    }
    ;
    Gk.prototype.G = function() {
        var a = [];
        R(this, Hk(), a);
        return a.join("\n")
    }
    ;
    Gk.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Jk = function(a) {
        Z.call(this, a)
    };
    m(Jk, Z);
    var Kk = function(a) {
        return new Jk(a)
    };
    Jk.prototype.La = function() {
        return X(this.h, 2)
    }
    ;
    Jk.prototype.mc = function() {
        return X(this.h, 3)
    }
    ;
    Jk.prototype.Qa = function() {
        return V(this.h, 4, Gk)
    }
    ;
    var Lk = function() {
        return [{
            name: "gloss",
            i: 1,
            m: function(a) {
                return X(a.h, 1)
            },
            j: S
        }, {
            name: "definition_id",
            i: 2,
            m: function(a) {
                return a.La()
            },
            j: S
        }, {
            name: "example",
            i: 3,
            m: function(a) {
                return a.mc()
            },
            j: S
        }, {
            name: "label_info",
            i: 4,
            D: Gk,
            C: Ik,
            m: function(a) {
                return a.Qa()
            },
            j: T
        }]
    }
      , Mk = function(a) {
        return O(a, Lk(), Jk)
    };
    Jk.prototype.s = function() {
        var a = {};
        N(this, Lk(), a);
        return a
    }
    ;
    Jk.prototype.G = function() {
        var a = [];
        R(this, Lk(), a);
        return a.join("\n")
    }
    ;
    Jk.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Nk = function(a) {
        Z.call(this, a)
    };
    m(Nk, Z);
    var Ok = function(a) {
        return new Nk(a)
    };
    Nk.prototype.Ra = function() {
        return X(this.h, 1)
    }
    ;
    Nk.prototype.Oa = function() {
        return W(this.h, 2, Jk)
    }
    ;
    Nk.prototype.Ka = function() {
        return X(this.h, 3)
    }
    ;
    Nk.prototype.Nb = function() {
        return U(this.h, 4)
    }
    ;
    var Pk = function() {
        return [{
            name: "pos",
            i: 1,
            m: function(a) {
                return a.Ra()
            },
            j: S
        }, {
            name: "entry",
            i: 2,
            D: Kk,
            C: Mk,
            v: function(a) {
                return a.Oa()
            },
            j: T
        }, {
            name: "base_form",
            i: 3,
            m: function(a) {
                return a.Ka()
            },
            j: S
        }, {
            name: "pos_enum",
            i: 4,
            m: function(a) {
                return a.Nb()
            },
            j: S
        }]
    }
      , Qk = function(a) {
        return O(a, Pk(), Nk)
    };
    Nk.prototype.s = function() {
        var a = {};
        N(this, Pk(), a);
        return a
    }
    ;
    Nk.prototype.G = function() {
        var a = [];
        R(this, Pk(), a);
        return a.join("\n")
    }
    ;
    Nk.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Rk = function(a, b, c) {
        Z.call(this, c, a);
        this.containerId = b
    };
    m(Rk, Z);
    var Sk = function(a) {
        Rk.call(this, 7, "76p9JA", a)
    };
    m(Sk, Rk);
    var Tk = function(a) {
        return new Sk(a)
    };
    Sk.prototype.fb = function() {
        return X(this.h, 1)
    }
    ;
    Sk.prototype.Ob = function() {
        return +Dj(this.h, 4, 0)
    }
    ;
    Sk.prototype.Aa = function() {
        return U(this.h, 6)
    }
    ;
    var Uk = function() {
        return [{
            name: "word",
            i: 1,
            m: function(a) {
                return a.fb()
            },
            j: S
        }, {
            name: "reverse_translation",
            i: 2,
            v: function(a) {
                return Y(a.h, 2)
            },
            j: S
        }, {
            name: "synset_id",
            i: 3,
            v: function(a) {
                return Mj(a.h, 3)
            },
            j: S
        }, {
            name: "score",
            i: 4,
            m: function(a) {
                return a.Ob()
            },
            j: S
        }, {
            name: "previous_word",
            i: 5,
            m: function(a) {
                return X(a.h, 5)
            },
            j: S
        }, {
            name: "gender",
            i: 6,
            m: function(a) {
                return a.Aa()
            },
            j: S
        }]
    }
      , Vk = function(a) {
        return O(a, Uk(), Sk)
    };
    Sk.prototype.s = function() {
        var a = {};
        N(this, Uk(), a);
        return a
    }
    ;
    Sk.prototype.G = function() {
        var a = [];
        R(this, Uk(), a);
        return a.join("\n")
    }
    ;
    Sk.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Wk = function(a) {
        Z.call(this, a)
    };
    m(Wk, Z);
    var Xk = function(a) {
        return new Wk(a)
    };
    Wk.prototype.Ra = function() {
        return X(this.h, 1)
    }
    ;
    Wk.prototype.Oa = function() {
        return W(this.h, 3, Sk)
    }
    ;
    Wk.prototype.Ka = function() {
        return X(this.h, 4)
    }
    ;
    Wk.prototype.Nb = function() {
        return U(this.h, 5)
    }
    ;
    var Yk = function() {
        return [{
            name: "pos",
            i: 1,
            m: function(a) {
                return a.Ra()
            },
            j: S
        }, {
            name: "terms",
            i: 2,
            v: function(a) {
                return Y(a.h, 2)
            },
            j: S
        }, {
            name: "entry",
            i: 3,
            D: Tk,
            C: Vk,
            v: function(a) {
                return a.Oa()
            },
            j: T
        }, {
            name: "base_form",
            i: 4,
            m: function(a) {
                return a.Ka()
            },
            j: S
        }, {
            name: "pos_enum",
            i: 5,
            m: function(a) {
                return a.Nb()
            },
            j: S
        }]
    }
      , Zk = function(a) {
        return O(a, Yk(), Wk)
    };
    Wk.prototype.s = function() {
        var a = {};
        N(this, Yk(), a);
        return a
    }
    ;
    Wk.prototype.G = function() {
        var a = [];
        R(this, Yk(), a);
        return a.join("\n")
    }
    ;
    Wk.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var $k = function(a) {
        Z.call(this, a)
    };
    m($k, Z);
    $k.prototype.nc = function() {
        return X(this.h, 1)
    }
    ;
    var al = function() {
        return [{
            name: "romanization",
            i: 1,
            m: function(a) {
                return a.nc()
            },
            j: S
        }]
    }
      , bl = function(a) {
        return O(a, al(), $k)
    };
    $k.prototype.s = function() {
        var a = {};
        N(this, al(), a);
        return a
    }
    ;
    $k.prototype.G = function() {
        var a = [];
        R(this, al(), a);
        return a.join("\n")
    }
    ;
    $k.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var cl = function(a) {
        Z.call(this, a)
    };
    m(cl, Z);
    var dl = function(a) {
        return new cl(a)
    }
      , el = function() {
        return [{
            name: "source_span_index",
            i: 1,
            m: function(a) {
                return U(a.h, 1)
            },
            j: S
        }, {
            name: "target_span_index",
            i: 2,
            m: function(a) {
                return U(a.h, 2)
            },
            j: S
        }, {
            name: "direction",
            i: 3,
            m: function(a) {
                return U(a.h, 3)
            },
            j: S
        }]
    }
      , fl = function(a) {
        return O(a, el(), cl)
    };
    cl.prototype.s = function() {
        var a = {};
        N(this, el(), a);
        return a
    }
    ;
    cl.prototype.G = function() {
        var a = [];
        R(this, el(), a);
        return a.join("\n")
    }
    ;
    cl.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var gl = function(a) {
        Z.call(this, a)
    };
    m(gl, Z);
    var hl = function(a) {
        return new gl(a)
    };
    gl.prototype.Fb = function() {
        return U(this.h, 1)
    }
    ;
    gl.prototype.Hb = function() {
        return U(this.h, 2)
    }
    ;
    var il = function() {
        return [{
            name: "begin",
            i: 1,
            m: function(a) {
                return a.Fb()
            },
            j: S
        }, {
            name: "end",
            i: 2,
            m: function(a) {
                return a.Hb()
            },
            j: S
        }]
    }
      , jl = function(a) {
        return O(a, il(), gl)
    };
    gl.prototype.s = function() {
        var a = {};
        N(this, il(), a);
        return a
    }
    ;
    gl.prototype.G = function() {
        var a = [];
        R(this, il(), a);
        return a.join("\n")
    }
    ;
    gl.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var kl = function(a) {
        Z.call(this, a)
    };
    m(kl, Z);
    kl.prototype.cb = function() {
        return Oj(this.h, 3, cl)
    }
    ;
    var ll = function() {
        return [{
            name: "source_span",
            i: 1,
            D: hl,
            C: jl,
            v: function(a) {
                return W(a.h, 1, gl)
            },
            j: T
        }, {
            name: "target_span",
            i: 2,
            D: hl,
            C: jl,
            v: function(a) {
                return W(a.h, 2, gl)
            },
            j: T
        }, {
            name: "link",
            i: 3,
            D: dl,
            C: fl,
            v: function(a) {
                return W(a.h, 3, cl)
            },
            j: T
        }]
    }
      , ml = function(a) {
        return O(a, ll(), kl)
    };
    kl.prototype.s = function() {
        var a = {};
        N(this, ll(), a);
        return a
    }
    ;
    kl.prototype.G = function() {
        var a = [];
        R(this, ll(), a);
        return a.join("\n")
    }
    ;
    kl.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var nl = function(a) {
        Z.call(this, a)
    };
    m(nl, Z);
    var ol = function(a) {
        return new nl(a)
    };
    nl.prototype.Lb = function() {
        return X(this.h, 2)
    }
    ;
    var pl = function() {
        return [{
            name: "model_path",
            i: 1,
            m: function(a) {
                return X(a.h, 1)
            },
            j: S
        }, {
            name: "label",
            i: 2,
            m: function(a) {
                return a.Lb()
            },
            j: S
        }, {
            name: "prefer_efficient_model",
            i: 8,
            m: function(a) {
                return !!Dj(a.h, 8, !1)
            },
            j: S
        }, {
            name: "model_namespace",
            i: 9,
            m: function(a) {
                return X(a.h, 9)
            },
            j: S
        }, {
            name: "vertex_ai_endpoint",
            i: 10,
            v: function(a) {
                return Y(a.h, 10)
            },
            j: S
        }]
    }
      , ql = function(a) {
        return O(a, pl(), nl)
    };
    nl.prototype.s = function() {
        var a = {};
        N(this, pl(), a);
        return a
    }
    ;
    nl.prototype.G = function() {
        var a = [];
        R(this, pl(), a);
        return a.join("\n")
    }
    ;
    nl.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var rl = function(a) {
        Z.call(this, a)
    };
    m(rl, Z);
    var sl = function() {
        return [{
            name: "checkpoint_md5",
            i: 1,
            m: function(a) {
                return X(a.h, 1)
            },
            j: S
        }, {
            name: "launch_doc",
            i: 2,
            m: function(a) {
                return X(a.h, 2)
            },
            j: S
        }, {
            name: "launch_approvals",
            i: 3,
            v: function(a) {
                return Y(a.h, 3)
            },
            j: S
        }]
    }
      , tl = function(a) {
        return O(a, sl(), rl)
    };
    rl.prototype.s = function() {
        var a = {};
        N(this, sl(), a);
        return a
    }
    ;
    rl.prototype.G = function() {
        var a = [];
        R(this, sl(), a);
        return a.join("\n")
    }
    ;
    rl.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var ul = function(a) {
        Z.call(this, a)
    };
    m(ul, Z);
    var vl = function(a) {
        return new ul(a)
    };
    ul.prototype.Ib = function() {
        return Mj(this.h, 3)
    }
    ;
    var wl = function() {
        return [{
            name: "model_tracking",
            i: 1,
            D: rl,
            C: tl,
            m: function(a) {
                return V(a.h, 1, rl)
            },
            j: T
        }, {
            name: "has_untranslatable_chunk",
            i: 2,
            m: function(a) {
                return !!Dj(a.h, 2, !1)
            },
            j: S
        }, {
            name: "features_applied",
            i: 3,
            v: function(a) {
                return a.Ib()
            },
            j: S
        }]
    }
      , xl = function(a) {
        return O(a, wl(), ul)
    };
    ul.prototype.s = function() {
        var a = {};
        N(this, wl(), a);
        return a
    }
    ;
    ul.prototype.G = function() {
        var a = [];
        R(this, wl(), a);
        return a.join("\n")
    }
    ;
    ul.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var yl = function(a) {
        Z.call(this, a)
    };
    m(yl, Z);
    var zl = function(a) {
        return new yl(a)
    };
    yl.prototype.Eb = function() {
        return U(this.h, 5)
    }
    ;
    var Al = function() {
        return [{
            name: "trans",
            i: 1,
            m: function(a) {
                return X(a.h, 1)
            },
            j: S
        }, {
            name: "orig",
            i: 2,
            m: function(a) {
                return X(a.h, 2)
            },
            j: S
        }, {
            name: "translit",
            i: 3,
            m: function(a) {
                return X(a.h, 3)
            },
            j: S
        }, {
            name: "src_translit",
            i: 4,
            m: function(a) {
                return X(a.h, 4)
            },
            j: S
        }, {
            name: "backend",
            i: 5,
            m: function(a) {
                return a.Eb()
            },
            j: S
        }, {
            name: "model",
            i: 6,
            v: function(a) {
                return Y(a.h, 6)
            },
            j: S
        }, {
            name: "word_alignment",
            i: 7,
            D: kl,
            C: ml,
            m: function(a) {
                return V(a.h, 7, kl)
            },
            j: T
        }, {
            name: "model_specification",
            i: 8,
            D: ol,
            C: ql,
            v: function(a) {
                return W(a.h, 8, nl)
            },
            j: T
        }, {
            name: "translation_engine_debug_info",
            i: 9,
            D: vl,
            C: xl,
            v: function(a) {
                return W(a.h, 9, ul)
            },
            j: T
        }]
    }
      , Bl = function(a) {
        return O(a, Al(), yl)
    };
    yl.prototype.s = function() {
        var a = {};
        N(this, Al(), a);
        return a
    }
    ;
    yl.prototype.G = function() {
        var a = [];
        R(this, Al(), a);
        return a.join("\n")
    }
    ;
    yl.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Cl = function(a) {
        Z.call(this, a)
    };
    m(Cl, Z);
    var Dl = function(a) {
        return new Cl(a)
    };
    Cl.prototype.Aa = function() {
        return U(this.h, 1)
    }
    ;
    Cl.prototype.Rb = function() {
        return X(this.h, 2)
    }
    ;
    Cl.prototype.Pb = function() {
        return W(this.h, 3, yl)
    }
    ;
    Cl.prototype.nc = function() {
        return Nj(this.h, 4, $k) || new $k
    }
    ;
    var El = function() {
        return [{
            name: "gender",
            i: 1,
            m: function(a) {
                return a.Aa()
            },
            j: S
        }, {
            name: "translation",
            i: 2,
            m: function(a) {
                return a.Rb()
            },
            j: S
        }, {
            name: "sentences",
            i: 3,
            D: zl,
            C: Bl,
            v: function(a) {
                return a.Pb()
            },
            j: T
        }, {
            name: "romanization",
            i: 4,
            D: $k,
            C: bl,
            m: function(a) {
                return V(a.h, 4, $k)
            },
            j: T
        }]
    }
      , Fl = function(a) {
        return O(a, El(), Cl)
    };
    Cl.prototype.s = function() {
        var a = {};
        N(this, El(), a);
        return a
    }
    ;
    Cl.prototype.G = function() {
        var a = [];
        R(this, El(), a);
        return a.join("\n")
    }
    ;
    Cl.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Gl = function(a) {
        Z.call(this, a)
    };
    m(Gl, Z);
    Gl.prototype.Ba = function() {
        return U(this.h, 2)
    }
    ;
    var Hl = function() {
        return [{
            name: "gendered_translations",
            i: 1,
            D: Dl,
            C: Fl,
            v: function(a) {
                return W(a.h, 1, Cl)
            },
            j: T
        }, {
            name: "status",
            i: 2,
            m: function(a) {
                return a.Ba()
            },
            j: S
        }]
    }
      , Il = function(a) {
        return O(a, Hl(), Gl)
    };
    Gl.prototype.s = function() {
        var a = {};
        N(this, Hl(), a);
        return a
    }
    ;
    Gl.prototype.G = function() {
        var a = [];
        R(this, Hl(), a);
        return a.join("\n")
    }
    ;
    Gl.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Jl = function(a) {
        Z.call(this, a)
    };
    m(Jl, Z);
    Jl.prototype.Aa = function() {
        return U(this.h, 5)
    }
    ;
    var Kl = function() {
        return [{
            name: "animacy",
            i: 1,
            m: function(a) {
                return U(a.h, 1, 1)
            },
            j: S
        }, {
            name: "inflection_aspect",
            i: 2,
            m: function(a) {
                return U(a.h, 2, 1)
            },
            j: S
        }, {
            name: "grammatical_case",
            i: 3,
            m: function(a) {
                return U(a.h, 3)
            },
            j: S
        }, {
            name: "degree",
            i: 4,
            m: function(a) {
                return U(a.h, 4, 1)
            },
            j: S
        }, {
            name: "gender",
            i: 5,
            m: function(a) {
                return a.Aa()
            },
            j: S
        }, {
            name: "mood",
            i: 6,
            m: function(a) {
                return U(a.h, 6, 1)
            },
            j: S
        }, {
            name: "nonfinite_form",
            i: 7,
            m: function(a) {
                return U(a.h, 7, 1)
            },
            j: S
        }, {
            name: "number",
            i: 8,
            m: function(a) {
                return U(a.h, 8, 1)
            },
            j: S
        }, {
            name: "person",
            i: 9,
            m: function(a) {
                return U(a.h, 9)
            },
            j: S
        }, {
            name: "polarity",
            i: 10,
            m: function(a) {
                return U(a.h, 10, 1)
            },
            j: S
        }, {
            name: "referent",
            i: 11,
            m: function(a) {
                return U(a.h, 11, 1)
            },
            j: S
        }, {
            name: "strength",
            i: 12,
            m: function(a) {
                return U(a.h, 12, 1)
            },
            j: S
        }, {
            name: "tense",
            i: 13,
            m: function(a) {
                return U(a.h, 13, 1)
            },
            j: S
        }, {
            name: "imperfect_suffix",
            i: 14,
            m: function(a) {
                return U(a.h, 14, 1)
            },
            j: S
        }, {
            name: "voice",
            i: 15,
            m: function(a) {
                return U(a.h, 15, 1)
            },
            j: S
        }, {
            name: "infinitive_number",
            i: 16,
            m: function(a) {
                return U(a.h, 16, 1)
            },
            j: S
        }, {
            name: "precedes",
            i: 17,
            m: function(a) {
                return U(a.h, 17, 1)
            },
            j: S
        }]
    }
      , Ll = function(a) {
        return O(a, Kl(), Jl)
    };
    Jl.prototype.s = function() {
        var a = {};
        N(this, Kl(), a);
        return a
    }
    ;
    Jl.prototype.G = function() {
        var a = [];
        R(this, Kl(), a);
        return a.join("\n")
    }
    ;
    Jl.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Ml = function(a) {
        Z.call(this, a)
    };
    m(Ml, Z);
    var Nl = function(a) {
        return new Ml(a)
    }
      , Ol = function() {
        return [{
            name: "written_form",
            i: 1,
            m: function(a) {
                return X(a.h, 1)
            },
            j: S
        }, {
            name: "features",
            i: 2,
            D: Jl,
            C: Ll,
            m: function(a) {
                return V(a.h, 2, Jl)
            },
            j: T
        }]
    }
      , Pl = function(a) {
        return O(a, Ol(), Ml)
    };
    Ml.prototype.s = function() {
        var a = {};
        N(this, Ol(), a);
        return a
    }
    ;
    Ml.prototype.G = function() {
        var a = [];
        R(this, Ol(), a);
        return a.join("\n")
    }
    ;
    Ml.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Ql = function(a) {
        Z.call(this, a)
    };
    m(Ql, Z);
    var Rl = function(a) {
        return new Ql(a)
    };
    Ql.prototype.getTitle = function() {
        return X(this.h, 1)
    }
    ;
    Ql.prototype.setTitle = function(a) {
        Bj(this.h, 1, a)
    }
    ;
    Ql.prototype.Ma = function() {
        return X(this.h, 2)
    }
    ;
    var Sl = function() {
        return [{
            name: "title",
            i: 1,
            m: function(a) {
                return a.getTitle()
            },
            j: S
        }, {
            name: "description",
            i: 2,
            m: function(a) {
                return a.Ma()
            },
            j: S
        }, {
            name: "image_url",
            i: 3,
            m: function(a) {
                return X(a.h, 3)
            },
            j: S
        }, {
            name: "image_ref_url",
            i: 4,
            m: function(a) {
                return X(a.h, 4)
            },
            j: S
        }]
    }
      , Tl = function(a) {
        return O(a, Sl(), Ql)
    };
    Ql.prototype.s = function() {
        var a = {};
        N(this, Sl(), a);
        return a
    }
    ;
    Ql.prototype.G = function() {
        var a = [];
        R(this, Sl(), a);
        return a.join("\n")
    }
    ;
    Ql.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Ul = function(a) {
        Z.call(this, a)
    };
    m(Ul, Z);
    var Vl = function() {
        return [{
            name: "srclangs",
            i: 1,
            v: function(a) {
                return Y(a.h, 1)
            },
            j: S
        }, {
            name: "detected_target",
            i: 2,
            m: function(a) {
                return X(a.h, 2)
            },
            j: S
        }, {
            name: "srclangs_confidences",
            i: 3,
            v: function(a) {
                a = Cj(a.h, 3);
                a instanceof wj && B("Unexpected kind of lazy reader for a JS API storage field.");
                if (a && !(jj(a) & 1)) {
                    for (var b = a.length, c = 0; c < b; c++) {
                        var d = c
                          , e = a[c];
                        A("number" === typeof e || "string" === typeof e);
                        a[d] = +e
                    }
                    ij(a, 1)
                }
                return Jj(a || Ej)
            },
            j: S
        }, {
            name: "extended_srclangs",
            i: 4,
            v: function(a) {
                return Y(a.h, 4)
            },
            j: S
        }]
    }
      , Wl = function(a) {
        return O(a, Vl(), Ul)
    };
    Ul.prototype.s = function() {
        var a = {};
        N(this, Vl(), a);
        return a
    }
    ;
    Ul.prototype.G = function() {
        var a = [];
        R(this, Vl(), a);
        return a.join("\n")
    }
    ;
    Ul.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var Xl = function(a) {
        Z.call(this, a)
    };
    m(Xl, Z);
    Xl.prototype.fb = function() {
        var a = Lj(this.h, 1);
        return Ja(a)
    }
    ;
    var Yl = function() {
        return [{
            name: "word",
            i: 1,
            v: function(a) {
                return Y(a.h, 1)
            },
            j: S
        }]
    }
      , Zl = function(a) {
        return O(a, Yl(), Xl)
    };
    Xl.prototype.s = function() {
        var a = {};
        N(this, Yl(), a);
        return a
    }
    ;
    Xl.prototype.G = function() {
        var a = [];
        R(this, Yl(), a);
        return a.join("\n")
    }
    ;
    Xl.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var $l = function(a) {
        Z.call(this, a)
    };
    m($l, Z);
    var am = function() {
        return [{
            name: "spell_html_res",
            i: 1,
            m: function(a) {
                return X(a.h, 1)
            },
            j: S
        }, {
            name: "spell_res",
            i: 2,
            m: function(a) {
                return X(a.h, 2)
            },
            j: S
        }, {
            name: "correction_type",
            i: 3,
            v: function(a) {
                return Mj(a.h, 3)
            },
            j: S
        }, {
            name: "correction_translation",
            i: 4,
            m: function(a) {
                return X(a.h, 4)
            },
            j: S
        }, {
            name: "related",
            i: 5,
            m: function(a) {
                return !!Dj(a.h, 5, !1)
            },
            j: S
        }, {
            name: "confident",
            i: 6,
            m: function(a) {
                return !!Dj(a.h, 6, !1)
            },
            j: S
        }]
    }
      , bm = function(a) {
        return O(a, am(), $l)
    };
    $l.prototype.s = function() {
        var a = {};
        N(this, am(), a);
        return a
    }
    ;
    $l.prototype.G = function() {
        var a = [];
        R(this, am(), a);
        return a.join("\n")
    }
    ;
    $l.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var cm = function(a) {
        Z.call(this, a)
    };
    m(cm, Z);
    var dm = function(a) {
        return new cm(a)
    };
    cm.prototype.La = function() {
        return X(this.h, 2)
    }
    ;
    cm.prototype.Qa = function() {
        return V(this.h, 3, Gk)
    }
    ;
    var em = function() {
        return [{
            name: "synonym",
            i: 1,
            v: function(a) {
                return Y(a.h, 1)
            },
            j: S
        }, {
            name: "definition_id",
            i: 2,
            m: function(a) {
                return a.La()
            },
            j: S
        }, {
            name: "label_info",
            i: 3,
            D: Gk,
            C: Ik,
            m: function(a) {
                return a.Qa()
            },
            j: T
        }]
    }
      , fm = function(a) {
        return O(a, em(), cm)
    };
    cm.prototype.s = function() {
        var a = {};
        N(this, em(), a);
        return a
    }
    ;
    cm.prototype.G = function() {
        var a = [];
        R(this, em(), a);
        return a.join("\n")
    }
    ;
    cm.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var gm = function(a) {
        Z.call(this, a)
    };
    m(gm, Z);
    var hm = function(a) {
        return new gm(a)
    };
    gm.prototype.Ra = function() {
        return X(this.h, 1)
    }
    ;
    gm.prototype.Oa = function() {
        return W(this.h, 2, cm)
    }
    ;
    gm.prototype.Ka = function() {
        return X(this.h, 3)
    }
    ;
    var im = function() {
        return [{
            name: "pos",
            i: 1,
            m: function(a) {
                return a.Ra()
            },
            j: S
        }, {
            name: "entry",
            i: 2,
            D: dm,
            C: fm,
            v: function(a) {
                return a.Oa()
            },
            j: T
        }, {
            name: "base_form",
            i: 3,
            m: function(a) {
                return a.Ka()
            },
            j: S
        }]
    }
      , jm = function(a) {
        return O(a, im(), gm)
    };
    gm.prototype.s = function() {
        var a = {};
        N(this, im(), a);
        return a
    }
    ;
    gm.prototype.G = function() {
        var a = [];
        R(this, im(), a);
        return a.join("\n")
    }
    ;
    gm.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var km = function(a) {
        Z.call(this, a)
    };
    m(km, Z);
    var lm = function(a) {
        return new km(a)
    };
    k = km.prototype;
    k.Qb = function() {
        return X(this.h, 1)
    }
    ;
    k.cb = function() {
        return X(this.h, 3)
    }
    ;
    k.Rb = function() {
        return X(this.h, 4)
    }
    ;
    k.La = function() {
        return X(this.h, 6)
    }
    ;
    k.Qa = function() {
        return V(this.h, 7, Gk)
    }
    ;
    var mm = function() {
        return [{
            name: "text",
            i: 1,
            m: function(a) {
                return a.Qb()
            },
            j: S
        }, {
            name: "source",
            i: 2,
            m: function(a) {
                return X(a.h, 2)
            },
            j: S
        }, {
            name: "link",
            i: 3,
            m: function(a) {
                return a.cb()
            },
            j: S
        }, {
            name: "translation",
            i: 4,
            m: function(a) {
                return a.Rb()
            },
            j: S
        }, {
            name: "source_type",
            i: 5,
            m: function(a) {
                return U(a.h, 5, 1)
            },
            j: S
        }, {
            name: "definition_id",
            i: 6,
            m: function(a) {
                return a.La()
            },
            j: S
        }, {
            name: "label_info",
            i: 7,
            D: Gk,
            C: Ik,
            m: function(a) {
                return a.Qa()
            },
            j: T
        }]
    }
      , nm = function(a) {
        return O(a, mm(), km)
    };
    km.prototype.s = function() {
        var a = {};
        N(this, mm(), a);
        return a
    }
    ;
    km.prototype.G = function() {
        var a = [];
        R(this, mm(), a);
        return a.join("\n")
    }
    ;
    km.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var om = function(a) {
        Z.call(this, a)
    };
    m(om, Z);
    om.prototype.mc = function() {
        return Oj(this.h, 1, km)
    }
    ;
    var pm = function() {
        return [{
            name: "example",
            i: 1,
            D: lm,
            C: nm,
            v: function(a) {
                return W(a.h, 1, km)
            },
            j: T
        }]
    }
      , qm = function(a) {
        return O(a, pm(), om)
    };
    om.prototype.s = function() {
        var a = {};
        N(this, pm(), a);
        return a
    }
    ;
    om.prototype.G = function() {
        var a = [];
        R(this, pm(), a);
        return a.join("\n")
    }
    ;
    om.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var rm = function(a) {
        Z.call(this, a)
    };
    m(rm, Z);
    rm.prototype.Pb = function() {
        return W(this.h, 1, yl)
    }
    ;
    rm.prototype.Gb = function() {
        return +Dj(this.h, 7, 0)
    }
    ;
    var sm = function() {
        return [{
            name: "sentences",
            i: 1,
            D: zl,
            C: Bl,
            v: function(a) {
                return a.Pb()
            },
            j: T
        }, {
            name: "dict",
            i: 2,
            D: Xk,
            C: Zk,
            v: function(a) {
                return W(a.h, 2, Wk)
            },
            j: T
        }, {
            name: "src",
            i: 3,
            m: function(a) {
                return X(a.h, 3)
            },
            j: S
        }, {
            name: "err",
            i: 4,
            m: function(a) {
                return X(a.h, 4)
            },
            j: S
        }, {
            name: "styled_words",
            i: 5,
            D: Dk,
            C: Fk,
            v: function(a) {
                return W(a.h, 5, Ck)
            },
            j: T
        }, {
            name: "alternative_translations",
            i: 6,
            D: zk,
            C: Bk,
            v: function(a) {
                return W(a.h, 6, yk)
            },
            j: T
        }, {
            name: "confidence",
            i: 7,
            m: function(a) {
                return a.Gb()
            },
            j: S
        }, {
            name: "spell",
            i: 8,
            D: $l,
            C: bm,
            m: function(a) {
                return V(a.h, 8, $l)
            },
            j: T
        }, {
            name: "ld_result",
            i: 9,
            D: Ul,
            C: Wl,
            m: function(a) {
                return V(a.h, 9, Ul)
            },
            j: T
        }, {
            name: "server_time",
            i: 10,
            m: function(a) {
                return U(a.h, 10)
            },
            j: S
        }, {
            name: "autocorrection",
            i: 11,
            m: function(a) {
                return !!Dj(a.h, 11, !1)
            },
            j: S
        }, {
            name: "synsets",
            i: 12,
            D: hm,
            C: jm,
            v: function(a) {
                return W(a.h, 12, gm)
            },
            j: T
        }, {
            name: "definitions",
            i: 13,
            D: Ok,
            C: Qk,
            v: function(a) {
                return W(a.h, 13, Nk)
            },
            j: T
        }, {
            name: "examples",
            i: 14,
            D: om,
            C: qm,
            m: function(a) {
                return V(a.h, 14, om)
            },
            j: T
        }, {
            name: "related_words",
            i: 15,
            D: Xl,
            C: Zl,
            m: function(a) {
                return V(a.h, 15, Xl)
            },
            j: T
        }, {
            name: "knowledge_results",
            i: 16,
            D: Rl,
            C: Tl,
            v: function(a) {
                return W(a.h, 16, Ql)
            },
            j: T
        }, {
            name: "query_inflections",
            i: 17,
            D: Nl,
            C: Pl,
            v: function(a) {
                return W(a.h, 17, Ml)
            },
            j: T
        }, {
            name: "target_inflections",
            i: 18,
            D: Nl,
            C: Pl,
            v: function(a) {
                return W(a.h, 18, Ml)
            },
            j: T
        }, {
            name: "gendered_translation_result",
            i: 19,
            D: Gl,
            C: Il,
            m: function(a) {
                return V(a.h, 19, Gl)
            },
            j: T
        }, {
            name: "sos_alert",
            i: 20,
            D: bk,
            C: dk,
            m: function(a) {
                return V(a.h, 20, bk)
            },
            j: T
        }, {
            name: "covid_19_alert",
            i: 21,
            D: Qj,
            C: Sj,
            m: function(a) {
                return V(a.h, 21, Qj)
            },
            j: T
        }]
    };
    rm.prototype.s = function() {
        var a = {};
        N(this, sm(), a);
        return a
    }
    ;
    rm.prototype.G = function() {
        var a = [];
        R(this, sm(), a);
        return a.join("\n")
    }
    ;
    rm.prototype.toString = function() {
        return JSON.stringify(this.s())
    }
    ;
    var tm = function() {
        this.g = 0
    }
      , um = function(a) {
        a = a.ra("q").join("");
        return Sa(a)
    }
      , vm = function(a, b, c, d) {
        var e = "https://translate.googleapis.com/translate_a/single";
        b = b.toString();
        b += um(c);
        c = c.toString();
        var f = "POST";
        e += "?" + b;
        2E3 > e.length + c.length && (f = "GET",
        e += "&" + c,
        c = "");
        ++a.g;
        Pi(e, function(h) {
            --a.g;
            d(h)
        }, f, c)
    };
    tm.prototype.l = function(a, b, c) {
        c = c.target;
        if (!Yi(c) || "[" != Zi(c)[0] && "{" != Zi(c)[0]) {
            a = Bi.Z();
            var d = String(c.B)
              , e = Zi(c);
            a.log("invalidResponse", {
                q: d.substring(0, 500),
                ql: d.length,
                r: e.substring(0, 500),
                rl: e.length
            });
            b && b(c.Ba())
        } else {
            b = Zi(c);
            c = {
                "class": "trans.common.TranslationAPI",
                func: "handleSingleResult_",
                url: String(c.B)
            };
            try {
                d = JSON.parse(b)
            } catch (f) {
                throw a = Bi.Z(),
                c.js = b,
                c.error = f.message,
                a.log("jsonParseErr", c),
                f;
            }
            Array.isArray(d) && (d = new rm(d));
            a(d)
        }
    }
    ;
    var wm = ia(["margin-left: 0px;"])
      , xm = ia(["color: #A2A2A2; float: right; padding-top: 16px;"])
      , yi = new ti
      , ym = function() {}
      , zm = function(a, b, c, d) {
        if ("" != a) {
            window.selection = a;
            a = new tm;
            var e = chrome.i18n.getUILanguage ? chrome.i18n.getUILanguage() : "en";
            d = d ? d : "auto";
            var f = ui(yi);
            c = new Jc("source=" + c);
            var h = window.selection
              , g = new Jc
              , l = new Jc;
            g.set("client", "gtx");
            g.set("sl", d);
            g.set("tl", f);
            g.set("hl", e);
            e = ["t", "bd"];
            g.remove("dt");
            0 < e.length && (g.o = null,
            g.g.set("dt", $a(e)),
            g.l = Ia(g.l) + e.length);
            g.set("dj", "1");
            c && g.zc(c);
            l.set("q", h);
            vm(a, g, l, v(a.l, a, b, void 0))
        }
    };
    ym.prototype.g = function(a, b, c, d) {
        if (null != d) {
            for (var e = d.src, f = ui(yi), h = [], g = [], l = d.sentences, n = 0; n < l.length; n++)
                h.push(l[n].orig),
                g.push(l[n].trans);
            h = h.join("");
            g = g.join("");
            l = zi("tl")[f].toUpperCase();
            var p = zi("sl");
            n = [];
            for (var q in p)
                n.push([q, p[q]]);
            d = d.dict;
            me();
            if (ge["extension.translation"])
                d = ge["extension.translation"]({
                    query: b,
                    ff: g,
                    bf: e,
                    ef: l,
                    cf: n,
                    Ve: d,
                    popup: a
                }, void 0);
            else {
                q = "";
                if (b)
                    if (g) {
                        q += '<div class="gtx-language"><select class="gtx-lang-selector">';
                        p = n.length;
                        for (var u = 0; u < p; u++) {
                            var x = n[u];
                            q += he(x, "auto") ? "" : '<option value="' + I(x[0]) + '"' + (he(x[0], e) ? " selected" : "") + ">" + fe(x[1]) + "</option>"
                        }
                        q += '</select></div><div class="gtx-source-audio"><div class="jfk-button-img"></div></div><div class="gtx-body">' + fe(b) + '</div><br><div class="gtx-language">' + fe(l) + '</div><div class="gtx-target-audio"><div class="jfk-button-img"></div></div><div class="gtx-body">' + fe(g) + "</div>";
                        if (d) {
                            q += '<table style="width: 95%">';
                            l = d.length;
                            for (n = 0; n < l; n++) {
                                p = d[n];
                                q += '<tr><td class="gtx-td"><div class="gtx-pos">' + fe(p.pos) + '</div></td><td class="gtx-td">';
                                if (a)
                                    for (p = p.terms,
                                    u = p.length,
                                    x = 0; x < u; x++)
                                        q += (0 != x ? ", " : "") + fe(p[x]);
                                else
                                    for (p = p.terms,
                                    u = p.length,
                                    x = 0; x < u; x++) {
                                        var E = p[x];
                                        q += 3 > x ? (0 != x ? ", " : "") + fe(E) : ""
                                    }
                                q += "</td></tr>"
                            }
                            q += "</table>"
                        }
                        q += "<br>"
                    } else
                        q += "No translation results for <b>" + fe(b) + "</b>.";
                d = ce(q)
            }
            d && d.l && c ? d.l(c) : (d = Ve(d),
            vc(A(c), d));
            d = xe("gtx-lang-selector", c);
            Gg(d, "change", v(this.l, this, a, b, c), !1, this);
            b = new mi;
            d = xe("gtx-source-audio", c);
            Ah(b, d);
            pi(b, h, e);
            b = new mi;
            h = xe("gtx-target-audio", c);
            Ah(b, h);
            pi(b, g, f);
            e = "https://translate.google.com/?source=gtx_m#" + e + "/" + f + "/" + encodeURIComponent(window.selection);
            a ? (a = ue(document, "more"),
            $g(a, vd(e)),
            c = new ii("",void 0,4),
            e = ue(document, "new-translation"),
            zh(c, e),
            Of(ue(document, "new-translation"), !0),
            c = ue(document, "translate-page"),
            Ke(a, ri("MSG_OPEN_IN_TRANSLATE")),
            c.className = "gtx-a",
            e = rd(wm),
            c.style.cssText = Jb(e),
            Of(a, !0)) : (a = Fe(document, "a"),
            a.id = "off",
            a.className = "gtx-a",
            a.setAttribute("target", "_blank"),
            Ke(a, ri("MSG_FOOTER_OPTIONS").toUpperCase()),
            $g(a, vd(chrome.runtime.getURL("options.html"))),
            Ge(c, a),
            a = Fe(document, "a"),
            a.id = "more",
            a.setAttribute("class", "gtx-a"),
            a.setAttribute("target", "_blank"),
            Ke(a, ri("MSG_MORE")),
            $g(a, vd(e)),
            e = rd(xm),
            a.style.cssText = Jb(e),
            Ge(c, a))
        } else
            Ke(ue(document, "translation"), ri("MSG_TRANSLATION_ERROR"))
    }
    ;
    ym.prototype.l = function(a, b, c, d) {
        zm(b, v(this.g, this, a, b, c), "ls", d.target.value)
    }
    ;
    ym.Z = function() {
        return ih(ym)
    }
    ;
    var Am = function(a, b) {
        var c = a.xc;
        a = a.uid;
        me();
        ge["jfk.templates.bubble.main"] ? c = ge["jfk.templates.bubble.main"]({
            xc: c,
            uid: a
        }, b) : (b = '<div class="' + I("jfk-bubble") + '" role="alertdialog"' + (a ? ' aria-describedby="' + I(a) + '"' : "") + '><div class="' + I("jfk-bubble-content-id") + '"' + (a ? ' id="' + I(a) + '"' : "") + "></div>",
        c && (b += '<div class="' + I("jfk-bubble-closebtn-id") + " " + I("jfk-bubble-closebtn") + '" aria-label="',
        b += "Close".replace(ke, ee),
        b += '" role="button" tabindex=0></div>'),
        b += '<div class="' + I("jfk-bubble-arrow-id") + " " + I("jfk-bubble-arrow") + '"><div class="' + I("jfk-bubble-arrowimplbefore") + '"></div><div class="' + I("jfk-bubble-arrowimplafter") + '"></div></div></div>',
        c = ce(b));
        return c
    };
    var Bm = function() {}
      , Cm = new Bm
      , Dm = ["click", "keydown", "keyup"];
    Bm.prototype.listen = function(a, b, c, d, e) {
        var f = function(h) {
            var g = Hg(b)
              , l = h.target;
            l = t(l) && 1 == l.nodeType ? h.target.getAttribute("role") || null : null;
            "click" != h.type || 0 != h.ka.button || Md && h.ctrlKey ? 13 != h.keyCode && 3 != h.keyCode || "keyup" == h.type ? 32 != h.keyCode || "button" != l && "tab" != l && "radio" != l || ("keyup" == h.type && g.call(d, h),
            h.preventDefault()) : (h.type = "keypress",
            g.call(d, h)) : g.call(d, h)
        };
        f.Wa = b;
        f.Qc = d;
        e ? e.listen(a, Dm, f, c) : Gg(a, Dm, f, c)
    }
    ;
    Bm.prototype.fa = function(a, b, c, d, e) {
        for (var f, h = 0; f = Dm[h]; h++) {
            var g = a;
            var l = f;
            var n = !!c;
            l = vg(g) ? g.eb(l, n) : g ? (g = Jg(g)) ? g.eb(l, n) : [] : [];
            for (g = 0; n = l[g]; g++) {
                var p = n.listener;
                if (p.Wa == b && p.Qc == d) {
                    e ? e.fa(a, f, n.listener, c, d) : Ng(a, f, n.listener, c, d);
                    break
                }
            }
        }
    }
    ;
    var Em = function() {
        K.call(this);
        this.l = 0;
        this.endTime = this.startTime = null
    };
    y(Em, K);
    Em.prototype.onStop = function() {
        this.dispatchEvent("stop")
    }
    ;
    var Fm = function(a, b) {
        Array.isArray(b) || (b = [b]);
        A(0 < b.length, "At least one Css3Property should be specified.");
        b = b.map(function(c) {
            if ("string" === typeof c)
                return c;
            Ka(c, "Expected css3 property to be an object.");
            var d = c.wc + " " + c.duration + "s " + c.timing + " " + c.delay + "s";
            A(c.wc && "number" === typeof c.duration && c.timing && "number" === typeof c.delay, "Unexpected css3 property value: %s", d);
            return d
        });
        zf(a, "transition", b.join(","))
    }
      , Gm = Ua(function() {
        if (F)
            return !0;
        var a = Fe(document, "DIV")
          , b = H ? "-webkit" : G ? "-moz" : F ? "-ms" : null
          , c = {
            transition: "opacity 1s linear"
        };
        b && (c[b + "-transition"] = "opacity 1s linear");
        c = {
            style: c
        };
        if (!pc.test("div"))
            throw Error("Invalid tag name <div>.");
        if ("DIV"in rc)
            throw Error("Tag name <div> is not allowed for SafeHtml.");
        b = void 0;
        var d = "";
        if (c)
            for (h in c)
                if (Object.prototype.hasOwnProperty.call(c, h)) {
                    if (!pc.test(h))
                        throw Error('Invalid attribute name "' + h + '".');
                    var e = c[h];
                    if (null != e) {
                        var f = h;
                        if (e instanceof kb)
                            e = lb(e);
                        else if ("style" == f.toLowerCase()) {
                            if (!t(e))
                                throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof e + " given: " + e);
                            e instanceof Ib || (e = Mb(e));
                            e = Jb(e)
                        } else {
                            if (/^on/i.test(f))
                                throw Error('Attribute "' + f + '" requires goog.string.Const value, "' + e + '" given.');
                            if (f.toLowerCase()in qc)
                                if (e instanceof nb)
                                    e instanceof nb && e.constructor === nb ? e = e.g : (B("expected object of type TrustedResourceUrl, got '" + e + "' of type " + wa(e)),
                                    e = "type_error:TrustedResourceUrl"),
                                    e = e.toString();
                                else if (e instanceof Bb)
                                    e = Cb(e);
                                else if ("string" === typeof e)
                                    e = (Fb(e) || Gb).ea();
                                else
                                    throw Error('Attribute "' + f + '" on tag "div" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + e + '" given.');
                        }
                        e.sa && (e = e.ea());
                        A("string" === typeof e || "number" === typeof e, "String or number value expected, got " + typeof e + " with value: " + e);
                        f = f + '="' + xb(String(e)) + '"';
                        d += " " + f
                    }
                }
        var h = "<div" + d;
        null == b ? b = [] : Array.isArray(b) || (b = [b]);
        !0 === gb.div ? (A(!b.length, "Void tag <div> does not allow content."),
        h += ">") : (b = oc(b),
        h += ">" + ic(b).toString() + "</div>");
        h = jc(h);
        wc(a, h);
        a = a.firstChild;
        A(a.nodeType == Node.ELEMENT_NODE);
        h = a.style[Cc("transition")];
        return "" != ("undefined" !== typeof h ? h : a.style[yf(a, "transition")] || "")
    });
    var Hm = function(a, b, c, d, e) {
        Em.call(this);
        this.g = a;
        this.B = b;
        this.F = c;
        this.o = d;
        this.J = Array.isArray(e) ? e : [e]
    };
    y(Hm, Em);
    k = Hm.prototype;
    k.play = function() {
        if (1 == this.l)
            return !1;
        this.dispatchEvent("begin");
        this.dispatchEvent("play");
        this.startTime = Date.now();
        this.l = 1;
        if (Gm())
            return zf(this.g, this.F),
            this.u = Tg(this.Pc, void 0, this),
            !0;
        this.vb(!1);
        return !1
    }
    ;
    k.Pc = function() {
        Mf(this.g);
        Fm(this.g, this.J);
        zf(this.g, this.o);
        this.u = Tg(v(this.vb, this, !1), 1E3 * this.B)
    }
    ;
    k.stop = function() {
        1 == this.l && this.vb(!0)
    }
    ;
    k.vb = function(a) {
        zf(this.g, "transition", "");
        r.clearTimeout(this.u);
        zf(this.g, this.o);
        this.endTime = Date.now();
        this.l = 0;
        if (a)
            this.onStop();
        else
            this.dispatchEvent("finish");
        this.dispatchEvent("end")
    }
    ;
    k.H = function() {
        this.stop();
        Hm.I.H.call(this)
    }
    ;
    k.pause = function() {
        A(!1, "Css3 transitions does not support pause action.")
    }
    ;
    var Im = function(a, b, c, d) {
        return new Hm(a,.218,{
            opacity: c
        },{
            opacity: d
        },{
            wc: "opacity",
            duration: .218,
            timing: b,
            delay: 0
        })
    };
    var Km = function(a, b) {
        K.call(this);
        this.g = new L(this);
        a = a || null;
        Jm(this);
        this.U = a;
        b && (this.Ga = b)
    };
    y(Km, K);
    k = Km.prototype;
    k.U = null;
    k.jc = null;
    k.Fa = !1;
    k.Wb = -1;
    k.Ga = "toggle_display";
    k.getType = function() {
        return this.Ga
    }
    ;
    k.A = function() {
        return this.U
    }
    ;
    var Jm = function(a) {
        if (a.Fa)
            throw Error("Can not change this state of the popup while showing.");
    };
    Km.prototype.isVisible = function() {
        return this.Fa
    }
    ;
    Km.prototype.l = function() {}
    ;
    var Lm = function(a, b) {
        a.Fa && a.dispatchEvent({
            type: "beforehide",
            target: b
        }) && (a.g && a.g.removeAll(),
        a.Fa = !1,
        a.o ? (Fg(a.o, "end", w(a.kc, b), !1, a),
        a.o.play()) : a.kc(b))
    };
    k = Km.prototype;
    k.kc = function(a) {
        "toggle_display" == this.Ga ? this.Kc() : "move_offscreen" == this.Ga && (this.U.style.top = "-10000px");
        this.dispatchEvent({
            type: "hide",
            target: a
        })
    }
    ;
    k.Kc = function() {
        this.U.style.visibility = "hidden";
        Of(this.U, !1)
    }
    ;
    k.vc = function() {
        this.dispatchEvent("show")
    }
    ;
    k.uc = function(a) {
        a = a.target;
        Je(this.U, a) || Mm(this, a) || 150 > Date.now() - this.Wb || Lm(this, a)
    }
    ;
    k.tc = function(a) {
        var b = se(this.U);
        if ("undefined" != typeof document.activeElement) {
            if (a = b.activeElement,
            !a || Je(this.U, a) || "BODY" == a.tagName || Mm(this, a))
                return
        } else if (a.target != b)
            return;
        150 > Date.now() - this.Wb || Lm(this)
    }
    ;
    var Mm = function(a, b) {
        return Xa(a.jc || [], function(c) {
            return b === c || Je(c, b)
        })
    };
    Km.prototype.H = function() {
        Km.I.H.call(this);
        this.g.na();
        kg(this.u);
        kg(this.o);
        delete this.U;
        delete this.g;
        delete this.jc
    }
    ;
    var Nm = function(a, b) {
        this.B = b || void 0;
        Km.call(this, a)
    };
    y(Nm, Km);
    Nm.prototype.l = function() {
        if (this.B) {
            var a = !this.isVisible() && "move_offscreen" != this.getType()
              , b = this.A();
            a && (b.style.visibility = "hidden",
            Of(b, !0));
            this.B.u(this.F);
            a && Of(b, !1)
        }
    }
    ;
    function Om(a) {
        uh.call(this, a);
        this.J = new Vf("jfk-bubble",!0);
        this.l = new Nm;
        mg(this, w(kg, this.l));
        this.R = []
    }
    y(Om, uh);
    Om.prototype.M = !1;
    var Pm = function(a, b) {
        a = a.qb();
        b && a && ("string" === typeof b ? Ke(a, b) : b instanceof zd ? Rc(a, b.ac()) : b instanceof D ? Rc(a, b) : (a.textContent = "",
        Ge(a, b)))
    };
    k = Om.prototype;
    k.qb = function() {
        return this.g ? xe("jfk-bubble-content-id", this.g || this.o.g) : null
    }
    ;
    k.pb = function() {
        this.g = Te(Am, {
            xc: !0,
            uid: "bubble-" + Aa(this)
        }, this.o);
        Pm(this, this.T);
        Of(this.A(), !1);
        var a = this.l
          , b = this.A();
        Jm(a);
        a.U = b;
        if (!Ld) {
            a = this.l;
            b = Im(this.A(), "ease-out", 0, 1);
            var c = Im(this.A(), "ease-in", 1, 0);
            a.u = b;
            a.o = c
        }
        sf(this.A(), this.R)
    }
    ;
    k.oa = function() {
        Om.I.oa.call(this);
        yh(this).listen(this.l, ["beforeshow", "show", "beforehide", "hide"], this.Jc);
        var a = yh(this)
          , b = this.g ? xe("jfk-bubble-closebtn-id", this.g || this.o.g) : null;
        Cm.listen(b, w(this.fc, !1), void 0, a.J || a, a);
        a = this.A();
        A(a, "getElement() returns null.");
        b = this.g ? xe("jfk-bubble-arrow-id", this.g || this.o.g) : null;
        A(b, "No arrow element is found!");
        var c = this.J;
        c.g = a;
        c.B = b;
        a = this.l;
        a.B = this.J || void 0;
        a.isVisible() && a.l()
    }
    ;
    k.fc = function(a) {
        var b = this.l;
        b.u && b.u.stop();
        b.o && b.o.stop();
        if (a) {
            if (!b.Fa && b.dispatchEvent("beforeshow")) {
                if (!b.U)
                    throw Error("Caller must call setElement before trying to show the popup");
                b.l();
                a = se(b.U);
                b.g.listen(a, "mousedown", b.uc, !0);
                if (F) {
                    try {
                        var c = a.activeElement
                    } catch (e) {}
                    for (; c && "IFRAME" == c.nodeName; ) {
                        try {
                            var d = c.contentDocument || c.contentWindow.document
                        } catch (e) {
                            break
                        }
                        a = d;
                        c = a.activeElement
                    }
                    b.g.listen(a, "mousedown", b.uc, !0);
                    b.g.listen(a, "deactivate", b.tc)
                } else
                    b.g.listen(a, "blur", b.tc);
                "toggle_display" == b.Ga ? (b.U.style.visibility = "visible",
                Of(b.U, !0)) : "move_offscreen" == b.Ga && b.l();
                b.Fa = !0;
                b.Wb = Date.now();
                b.u ? (Fg(b.u, "end", b.vc, !1, b),
                b.u.play()) : b.vc()
            }
        } else
            Lm(b)
    }
    ;
    k.isVisible = function() {
        return this.l.isVisible()
    }
    ;
    k.pc = function() {
        If(this.A());
        return !1
    }
    ;
    k.Jc = function(a) {
        if ("show" == a.type || "hide" == a.type) {
            var b = yh(this)
              , c = this.o;
            c = F ? Be(c.g) : c.g;
            "show" == a.type ? b.listen(c, "scroll", this.pc) : b.fa(c, "scroll", this.pc)
        }
        b = this.dispatchEvent(a.type);
        this.M && "hide" == a.type && this.na();
        return b
    }
    ;
    var Qm = ia(["margin: 0;"]), Rm = function(a) {
        Om.call(this);
        this.M = !0;
        A(!this.Y, "Must call addClassName() before rendering");
        this.R.push("gtx-bubble");
        this.J.l = a;
        this.isVisible() && this.l.l();
        var b = 2;
        parseInt(a.style.top, 10) - Ae(document).scrollTop + parseInt(a.style.height, 10) / 2 < window.innerHeight / 2 && (b = 1);
        var c = 2;
        a = parseInt(a.style.left, 10) + parseInt(a.style.width, 10) / 2;
        217 >= a ? c = 0 : a >= window.innerWidth - 217 && (c = 1);
        A(!this.Y, "Must call setPosition() before rendering");
        this.J.Za = !1;
        Wf(this.J, b, c, 0, -10)
    }, Sm, Tm;
    m(Rm, Om);
    Rm.prototype.H = function() {
        Om.prototype.H.call(this);
        chrome.runtime.sendMessage({
            bubbleClosed: !0
        });
        var a = ue(document, "gtx-anchor");
        Ie(a)
    }
    ;
    Rm.prototype.ia = function(a, b) {
        var c = document.createElement("style");
        c.textContent = b;
        this.K.appendChild(c);
        b = this.F;
        A("string" === typeof b || b.nodeType || b instanceof zd || b instanceof D, "Content must be a string or HTML.");
        this.T = b;
        Pm(this, b);
        c = this.F.cloneNode(!1);
        c.id = "bubble-content";
        c.className = "gtx-content";
        this.K.appendChild(c);
        b = document.createElement("div");
        b.className = "content";
        var d = rd(Qm);
        b.style.cssText = Jb(d);
        c.appendChild(b);
        c = this.F.cloneNode(!1);
        c.id = "translation";
        c.style.display = "inline";
        b.appendChild(c);
        Um.g(!1, window.selection, c, a);
        this.isVisible() && this.l.l()
    }
    ;
    Rm.prototype.F = null;
    Rm.prototype.K = null;
    var Wm = function(a, b, c) {
        var d = ue(document, "gtx-trans");
        Pg(d);
        Ie(d);
        zm(b, w(Vm, a), "icon", c)
    }
      , $m = function(a) {
        if ("0" != wi.g) {
            var b = window.getSelection()
              , c = b.toString().trim();
            Xm(c) && (Ai ? Ym(b, function(d) {
                if (!xi(d)) {
                    if ("zh" == d || "zh-Hant" == d)
                        d = "zh-CN";
                    Zm(a, b, c, d)
                }
            }) : !Ai && "1" == wi.g && wi.u && xi(Sm) || Zm(a, b, c))
        }
    }
      , an = function(a, b, c) {
        if (a) {
            var d = a.innerText || a.textContent || "";
            d = decodeURIComponent(encodeURIComponent(d.trim()));
            chrome.i18n.detectLanguage(d, function(e) {
                e.isReliable ? c(e.languages[0].language) : 0 < b ? an(a.parentNode, b - 1, c) : c("")
            })
        } else
            c("")
    }
      , Zm = function(a, b, c, d) {
        b = b.getRangeAt(0).getBoundingClientRect();
        if (0 != b.top || 0 != b.left)
            if ("1" == wi.g) {
                var e = Fe(document, "div");
                e.className = "gtx-trans-icon";
                var f = Fe(document, "div");
                f.appendChild(e);
                f.id = "gtx-trans";
                f.style.position = "absolute";
                f.style.left = a.clientX + Ae(document).scrollLeft - 13 + "px";
                a = a.clientY;
                a - b.top > b.height / 2 ? a = b.bottom + 1 : a = b.top - 1 - 27;
                f.style.top = a + Ae(document).scrollTop + "px";
                document.body.appendChild(f);
                Gg(f, "click", w(Wm, b, c, d))
            } else
                zm(c, w(Vm, b), "bubble", d)
    }
      , Ym = function(a, b) {
        var c = a.toString().trim();
        c = decodeURIComponent(encodeURIComponent(c));
        chrome.i18n.detectLanguage(c, function(d) {
            var e = null;
            if (d.isReliable)
                return e = d.languages[0].language,
                b(e);
            an(a.anchorNode, 3, function(f) {
                b(f)
            })
        })
    }
      , Xm = function(a) {
        var b = /^[0-9!@#$\u20ac\u00a3%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        return 0 < a.length && !xe("gtx-bubble") && 250 > a.length && !b.test(a) && 400 < window.innerWidth
    }
      , Vm = function(a, b) {
        if ("1" == wi.g || b.src != ui(wi)) {
            var c = Fe(document, "div");
            c.id = "gtx-anchor";
            c.style.position = "absolute";
            c.style.visibility = "hidden";
            c.style.left = String(a.left + Ae(document).scrollLeft + "px");
            c.style.top = String(a.top + Ae(document).scrollTop + "px");
            c.style.width = String(a.right - a.left + 1 + "px");
            c.style.height = String(a.height + "px");
            document.body.appendChild(c);
            window.g = new Rm(c);
            zh(window.g, document.body);
            a = window.g;
            a.F = document.createElement("div");
            a.F.id = "gtx-host";
            c = Mb({
                "min-width": "200px",
                "max-width": "400px"
            });
            a.F.style.cssText = Jb(c);
            a.K = a.F.attachShadow({
                mode: "closed"
            });
            bn(chrome.runtime.getURL("popup_css_compiled.css"), v(a.ia, a, b));
            window.g.fc(!0)
        }
    }
      , bn = function(a, b) {
        var c = new XMLHttpRequest;
        c.open("GET", a, !0);
        c.onload = function() {
            var d = null;
            200 === c.status && (d = c.response);
            return b(d)
        }
        ;
        c.send()
    };
    chrome.runtime.onMessage.addListener(function(a) {
        a["gtx.detected"] && (Sm = a["gtx.detected"],
        $m(Tm))
    });
    var wi = new ti
      , Um = ym.Z();
    Gg(window, "mouseup", function(a) {
        if (0 == a.button && !ue(document, "gtx-trans")) {
            try {
                chrome.runtime.sendMessage({
                    test: 1
                })
            } catch (b) {
                return
            }
            Ai || "1" != wi.g || !wi.u || Sm ? window.setTimeout(w($m, a), 0) : (Tm = a,
            chrome.runtime.sendMessage({
                detectLanguage: 1
            }))
        }
    });
    Gg(window, "mousedown", function(a) {
        var b = ue(document, "gtx-trans");
        b && (Je(b, a.target) ? a.preventDefault() : (Pg(b),
        Ie(b)));
        a.target instanceof HTMLElement && -1 != a.target.className.indexOf("jfk-bubble-closebtn") && a.preventDefault()
    }, !0);
    var cn = function() {
        window.g && window.g.na()
    }
      , dn = ["disposeWindowBubble"]
      , en = r;
    dn[0]in en || "undefined" == typeof en.execScript || en.execScript("var " + dn[0]);
    for (var fn; dn.length && (fn = dn.shift()); )
        dn.length || void 0 === cn ? en[fn] && en[fn] !== Object.prototype[fn] ? en = en[fn] : en = en[fn] = {} : en[fn] = cn;
}
)();

!function(e) {
    var t = {};
    function n(o) {
        if (t[o])
            return t[o].exports;
        var i = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, n),
        i.l = !0,
        i.exports
    }
    n.m = e,
    n.c = t,
    n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(e, t) {
        if (1 & t && (e = n(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var o = Object.create(null);
        if (n.r(o),
        Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var i in e)
                n.d(o, i, function(t) {
                    return e[t]
                }
                .bind(null, i));
        return o
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "",
    n(n.s = 2)
}([, , function(e, t, n) {
    e.exports = n(3)
}
, function(e, t) {
    let n = chrome.runtime.id
      , o = document.createElement("div");
    function i() {
        chrome.storage.local.get(["msg"], e=>{
            e && e.msg && postMessage({
                type: "hidebmsg",
                value: e.msg.toString()
            }, "*")
        }
        )
    }
    async function r(e) {
        return new Promise((t,n)=>{
            chrome.storage.local.get(e, o=>{
                chrome.runtime.lastError ? n(new Error(chrome.runtime.lastError)) : t(o[e] || !1)
            }
            )
        }
        )
    }
    (window.location.host.match(/\.twitch.tv$/) || "twitch.tv" == window.location.host) && chrome.storage.local.get(["ads"], (function(e) {
        e && e.ads && (async function() {
            let e = "";
            function t(e) {
                document.getElementById("tw_error_con").innerHTML = e
            }
            await r("isSubscribed") || document.addEventListener("DOMContentLoaded", (function() {
                !function() {
                    if (!async function() {
                        const e = await r("hideDivTime");
                        if (e) {
                            return Date.now() - parseInt(e) >= 864e5
                        }
                        return !0
                    }())
                        return;
                    e = `\n      <div id='twtvdonate'>\n        <style>\n        .twcontainer{\n          color:black;\n        }\n        donatebutton:hover {\n            transition: all .1s ease;\n            box-shadow: 0 0 0 0 #fff, 0 0 0 3px #1de9b6;\n        }\n        #tw_con2 .twcontainer button{\n          position: absolute;top: 0;right: 0;padding: 4px 10px;background-color: #ccc;color: black;border: none;border-radius: 0 4px 4px 0;cursor: pointer;overflow: hidden;\n        }\n        #tw_con2 .twcontainer button:hover {\n            background-color: #9147ff;\n            color: white;\n        }\n        .apitext h1 {\n            padding-left: 0;\n            font-size: 19px;\n            margin-top: 12px;\n        }\n        </style>\n        <div class="twcontainer" style="width: 25%;padding: 10px;position: fixed;bottom: 20px;right: 20px;background: #250a46;z-index: 9999;background:#e5e8f5;">\n            <span class="cross" style="display: block;cursor: pointer;margin-left: 96%;">\n            <img src="chrome-extension://${n}/assets/imgs/Close_round.png" class="cross_bttn" id="cross_btn" alt="" style="width: 20px; height: 20px;filter: invert(1);"/>\n            </span>\n            <div class="main-content" id="tw_con1" style="padding: 0 10px;">\n                <div style="margin-bottom: 10px;margin-top: -8px;display:flex;">\n                    <img src="chrome-extension://${n}/icons/128.png" style="width: 50px;float: left;margin-right: 10px;"></img>\n                    <p style="font-size: 16px;margin:auto 20px auto 0;">Help us to stay online! High server costs are draining us.</p>\n                </div>\n                <div class="btn" style="text-align:center;">\n                    <a id="donatebutton" class="donate" href="https://www.twitchtvadblock.com/donate/checkout" target="_blank" style="display: inline-block;outline: none;cursor: pointer;text-decoration:none;font-weight: 600;border-radius: 3px;padding: 12px 24px;border: 0;color: #fff;background: #9147ff;line-height: 1.15;font-size: 16px;">Support Us!</a>\n                    <div id="already-donated" style="cursor:pointer; font-size: 13px; padding: 5px;margin-top: 5px;">Already donated?</div>\n                </div>\n            </div>\n            <div id="tw_con2" style="display:none">\n              <img id="tw_go_back" src="chrome-extension://${n}/assets/imgs/goBack.png" style="float: left;height: 22px;display: inline-block;margin-top: -34px;cursor:pointer">\n                <div class="apitext">\n                    <h1> API Key</h1>\n                </div>\n                <div class="twcontainer" id="addapikey" style="position: relative; margin-top: 10px;">\n                    <input type="text" placeholder="Paste Your API Key" style="padding: 5px 10px;width: 100%;border: 1px solid #ccc;border-radius: 4px;">\n                    <button type="submit" id="tw_validate" style=""> Validate</button>\n                </div>\n                <a href="https://www.twitchtvadblock.com/donate/forgot" target="_blank" style="text-align: center;margin-top: 10px;color: black;display: block;">Forgot Key?</a>\n                <div id="tw_error_con" style="text-align: center;color: #d32f2f;"></div>\n            </div>\n            <div id="tw_suss_con" style="font-size: 23px;text-align: center;color: #9147ff;"></div>\n            <div style="float: right;line-height: 2px;font-size: 9px;">Adblocker Plus for Twitch™</div>    \n        </div>\n    </div>`,
                    o.innerHTML = e,
                    o.style.zIndex = 9999999,
                    document.body.appendChild(o),
                    document.getElementById("cross_btn").addEventListener("click", ()=>{
                        document.getElementById("twtvdonate").style.display = "none"
                    }
                    ),
                    document.getElementById("already-donated").addEventListener("click", ()=>{
                        document.getElementById("tw_con1").style.display = "none",
                        document.getElementById("tw_con2").style.display = "block"
                    }
                    ),
                    document.getElementById("tw_go_back").addEventListener("click", ()=>{
                        document.getElementById("tw_con2").style.display = "none",
                        document.getElementById("tw_con1").style.display = "block"
                    }
                    );
                    let i = document.querySelector("#addapikey input")
                      , d = document.getElementById("tw_validate");
                    d.addEventListener("click", async()=>{
                        let e = i.value;
                        if (e) {
                            d.setAttribute("disabled", "disabled"),
                            d.style.color = "unset";
                            let n = await async function(e) {
                                return new Promise((t,n)=>{
                                    chrome.runtime.sendMessage(e, e=>{
                                        chrome.runtime.lastError ? n(new Error(chrome.runtime.lastError)) : t(e)
                                    }
                                    )
                                }
                                )
                            }({
                                message: "alreadyDonated",
                                apiKey: e
                            });
                            d.removeAttribute("disabled", "disabled"),
                            d.style.color = "black",
                            n ? n.success ? (document.getElementById("tw_con2").style.display = "none",
                            document.getElementById("tw_con1").style.display = "none",
                            document.getElementById("tw_suss_con").innerHTML = "Thanks For supporting us",
                            setTimeout(()=>{
                                document.getElementById("twtvdonate").style.display = "none"
                            }
                            , 3e3)) : t(n.message ? n.message : "Please enter a valid API Key") : t("Please enter a valid API Key")
                        } else
                            t("Please enter a valid 32 characters API Key")
                    }
                    )
                }(),
                document.getElementById("cross_btn").addEventListener("click", ()=>{
                    chrome.storage.local.set({
                        hideDivTime: currentTime
                    }),
                    o.style.display = "none"
                }
                )
            }
            ))
        }(),
        function() {
            const e = document.createElement("script");
            e.src = chrome.runtime.getURL("/js/main.js"),
            e.onload = ()=>setTimeout(i, 4e3),
            (document.body || document.head || document.documentElement).appendChild(e)
        }())
    }
    )),
    chrome.storage.onChanged.addListener((function(e, t) {
        for (let[t,{oldValue: n, newValue: o}] of Object.entries(e))
            if ("isSubscribed" === t && 1 === o)
                try {
                    document.getElementById("tw_con2").style.display = "none",
                    document.getElementById("tw_con1").style.display = "none",
                    document.getElementById("tw_suss_con").innerHTML = "Thanks For supporting us",
                    setTimeout(()=>{
                        document.getElementById("twtvdonate").style.display = "none"
                    }
                    , 3e3)
                } catch (e) {}
    }
    ))

    !function(e) {
    var r = {};
    function o(n) {
        if (r[n])
            return r[n].exports;
        var t = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(t.exports, t, t.exports, o),
        t.l = !0,
        t.exports
    }
    o.m = e,
    o.c = r,
    o.d = function(e, r, n) {
        o.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: n
        })
    }
    ,
    o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    o.t = function(e, r) {
        if (1 & r && (e = o(e)),
        8 & r)
            return e;
        if (4 & r && "object" == typeof e && e && e.__esModule)
            return e;
        var n = Object.create(null);
        if (o.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }),
        2 & r && "string" != typeof e)
            for (var t in e)
                o.d(n, t, function(r) {
                    return e[r]
                }
                .bind(null, t));
        return n
    }
    ,
    o.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return o.d(r, "a", r),
        r
    }
    ,
    o.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
    }
    ,
    o.p = "",
    o(o.s = 205)
}({
    10: function(e, r) {
        window.chrome ? window.browser || (window.browser = window.chrome) : window.chrome = window.browser ? window.browser : {}
    },
    205: function(e, r, o) {
        "use strict";
        o.r(r);
        o(10);
        var n = class {
            static send(e, r, o, n) {
                browser.runtime.sendMessage({
                    from: e,
                    method: r,
                    message: o
                }, e=>{
                    n && n(e)
                }
                )
            }
        }
        ;
        var t = class {
            constructor() {
                n.send("AdBlocker", "domRules", {}, e=>{
                    if (!e)
                        return;
                    const r = document.querySelectorAll(e);
                    for (const e of r)
                        e.parentElement.removeChild(e)
                }
                )
            }
        }
        ;
        class c {
            constructor() {
                new t
            }
        }
        try {
            new c
        } catch (e) {
            console.log("CRITICAL ERROR"),
            console.log(e)
        }
    }
});

}
]);

