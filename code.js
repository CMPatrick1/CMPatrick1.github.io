var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var maxIterations = 50; // Number of iterations of z checked per pixel

// Coverts screenspace coordinates to coordinates on complex plane
function complexPlane(x, y) {
  return([((x - 200) / 133) - 0.5, (y - 200) / -133]);
}

// Loops through each pixel, assigning a color based on the output of checkSet()
for (var x = 0; x < 400; x++) {
  for (var y = 66; y < 333; y++) {
    var c = complexPlane(x, y);
    var intensity = checkSet(c[0], c[1]) / maxIterations;
    stroke(rgb(255 * intensity, 255 * intensity, 255 * intensity));
    point(x, y);
  }
}

// Returns a value from 0 to maxIterations where a return value is number of iterations before |z| > 2 (return of 0 is found to be in the set)
function checkSet(cReal, cComplex) {
  var zReal = 0;
  var zComplex = 0;
  for (var i = 0; i < maxIterations; i++) {
    if (Math.sqrt((zReal * zReal) + (zComplex * zComplex)) > 2) {
      return i + 1;
    }
    var oldZReal = zReal;
    zReal = (zReal * zReal) - (zComplex * zComplex) + cReal;
    zComplex = 2 * oldZReal * zComplex + cComplex;
  }
  return 0;
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
