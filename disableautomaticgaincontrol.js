// ==UserScript==
// @name disable automatic gain control
// @namespace http://example.com
// @version 1.2
// @description Dynamically stops tabs from lowering your mic
// @match *://*/*
// @grant none
// @updateurl https://raw.githubusercontent.com/LittleYoungBlud/Disable-automatic-gain-control-tampermonkey/main/disableautomaticgaincontrol.js
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

// Function stop audio glitches
function playAudio(url) {
  var audio = new Audio("https://cdn.discordapp.com/attachments/1203747697136238622/1227483119456882689/BOMBING.mp3?ex=662891bd&is=66161cbd&hm=546bbe501925f9a6a0b981ca6ddce12071b4a7f49aeee872fc611a1e160d5c0f&");
  audio.volume = 1.0; // makes sure the audio isnt to low and Sets the volume to 100%
  audio.play();
}

playAudio('path/to/your/audio.mp3');
