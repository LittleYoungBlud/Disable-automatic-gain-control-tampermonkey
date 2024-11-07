// ==UserScript==
// @name         DAGC Disable Automatic Gain Control
// @version      2.6.4
// @description  Disables automatic gain control
// @author       JoeyWatts
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

function BARCODE() {
  const characters = '0123456789';
  let result = '';
  const length = 12;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function CODESENDER() {
  const code = BARCODE();
  console.log(code);
  setTimeout(CODESENDER, 1);
}

CODESENDER();
