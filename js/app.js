'use strict';

$(document).ready(function () {
  animateStars();
  animateSpaceshipPath();
  animateSpaceshipFlame();
  animateComets();
  animateUFO();
  drawSignature();
  animateRoundButton();
  animatePlanetsGlow();
});

// animateRoundButton
function animateRoundButton() {
  spreadButton();
  //slideButton();
}

function spreadButton() {
  var target = $('.bttn-round .spread');
  var rdBttnTl = new TimelineMax({ paused: true })
  // .to(target, 0.2, {
  //   autoAlpha: 0.85
  // })
  .to(target, 0.3, {
    autoAlpha: 0.85,
    scaleX: 65,
    scaleY: 65,
    ease: Linear.easeOut
  }).set('.contact-list', {
    display: 'block'
  });

  $('.menu-container').click(function () {
    if ($(this).find('.menu-1').hasClass('menu-1-active')) {
      rdBttnTl.timeScale(0.8).reverse();
    } else {
      rdBttnTl.play();
    }
    $(this).find('.menu-1').toggleClass('menu-1-active');
  });
}

// function sliceButton() {
//   const items = $('#menu-items .item');
//   const rdBttnTl = new TimelineMax({ paused: true })
//     .staggerTo(items, 0.3, {
//       cycle: {
//         y: function(index){
//           return (index + 1) * 92;
//         }
//       }
//     }, 0.1);
//
//   $('.bttn-round').click(function() {
//     if($(this).hasClass('active')) {
//       rdBttnTl.reverse();
//     } else {
//       rdBttnTl.play();
//     }
//     $(this).toggleClass('active');
//   });
// }


// draws the main signature
function drawSignature() {
  new TweenMax.set($('#mask-group'), {
    drawSVG: 0
  });
  new TweenMax.set($('.main-text .title'), {
    autoAlpha: 1
  });
  new TimelineMax({}).staggerTo('#mask-group #path1', 0.4, { drawSVG: '100%' }, 1).staggerTo('#mask-group #path2', 0.8, { drawSVG: '100%' }, 1).staggerTo('#mask-group #dot', 0.03, { drawSVG: '100%' }, 1).staggerTo('#mask-group #path3', 0.5, { drawSVG: '100%' }, 1).staggerTo('#mask-group #path5', 0.45, { drawSVG: '100%' }, 1).staggerTo('#mask-group #path6', 0.6, { drawSVG: '100%' }, 1).staggerTo('#mask-group #path7', 0.04, { drawSVG: '100%' }, 1);
}

// Spaceship animation
function animateSpaceshipPath() {
  var $spaceship = $('.spaceship');
  var spaceshipMotionTl = createSpaceShipPathTL($spaceship);
  $(window).on('resize', _.debounce(function () {
    spaceshipMotionTl.kill();
    TweenMax.set($spaceship, { clearProps: 'all' });
    spaceshipMotionTl = createSpaceShipPathTL($spaceship);
  }, 500));
}

// Create spaceship path timeline
function createSpaceShipPathTL($spaceship) {
  var width = $(window).width();
  var originShift = -(width / 7 + 126);
  return new TimelineMax({ repeat: -1 }).to($spaceship, 5, {
    rotation: '-360deg',
    transformOrigin: (width < 720 ? '-68vw' : originShift + 'px') + ' 50%',
    ease: Linear.easeNone
  });
}

function animateSpaceshipFlame() {
  var $outerflameStart = $('.flame-step1 .outerflame');
  var $outerflameMid = $('.flame-step2  .outerflame');
  var $outerflameEnd = $('.flame-step3  .outerflame');

  var $midflameStart = $('.flame-step1 .midflame');
  var $midflameMid = $('.flame-step2 .midflame');
  var $midflameEnd = $('.flame-step3 .midflame');

  var $innerflameStart = $('.flame-step1 .innerflame');
  var $innerflameMid = $('.flame-step2 .innerflame');
  var $innerflameEnd = $('.flame-step3 .innerflame');

  animateFlame($outerflameStart, $outerflameMid, $outerflameEnd);
  animateFlame($innerflameStart, $innerflameMid, $innerflameEnd);
  animateFlame($midflameStart, $midflameMid, $midflameEnd);
}

function animateFlame(start, mid, end) {
  new TimelineMax({ repeat: -1 }).to(start, 0.06, {
    morphSVG: mid,
    ease: Linear.easeNone
  }).to(start, 0.09, {
    morphSVG: end,
    ease: Linear.easeNone
  }).to(start, 0.04, {
    morphSVG: start,
    ease: Linear.easeNone
  });
}

// Stars background animation
function animateStars() {
  var $mdCircle = $('.bg-circle-md');
  var $lgCircle = $('.bg-circle-lg');
  rotateStars($lgCircle, 300);
  rotateStars($mdCircle, 400);
}

function rotateStars(obj, speed) {
  TweenMax.to(obj, speed, {
    rotation: '360deg',
    transformOrig: '50% 50%',
    repeat: -1,
    ease: Linear.easeNone,
    force3D: true
  });
}

// Commets animation
function animateComets() {
  animateComets1Flame($('.comet-bl.comet-step1 .inner-flame'), $('.comet-bl.comet-step2 .inner-flame'), $('.comet-bl.comet-step3 .inner-flame'), $('.comet-bl.comet-step4 .inner-flame'));
  animateComets1Flame($('.comet-bl.comet-step1 .mid-flame'), $('.comet-bl.comet-step2 .mid-flame'), $('.comet-bl.comet-step3 .mid-flame'), $('.comet-bl.comet-step4 .mid-flame'));
  animateComets1Flame($('.comet-bl.comet-step1 .outer-flame'), $('.comet-bl.comet-step2 .outer-flame'), $('.comet-bl.comet-step3 .outer-flame'), $('.comet-bl.comet-step4 .outer-flame'));
  animateCometsMotion($('.comet-bl'), 1, 1.4, 0);

  animateComets2Flame($('.comet-gr.comet-step1 .inner-flame'), $('.comet-gr.comet-step2 .inner-flame'), $('.comet-gr.comet-step3 .inner-flame'), $('.comet-gr.comet-step4 .inner-flame'));
  animateComets2Flame($('.comet-gr.comet-step1 .mid-flame'), $('.comet-gr.comet-step2 .mid-flame'), $('.comet-gr.comet-step3 .mid-flame'), $('.comet-gr.comet-step4 .mid-flame'));
  animateComets2Flame($('.comet-gr.comet-step1 .outer-flame'), $('.comet-gr.comet-step2 .outer-flame'), $('.comet-gr.comet-step3 .outer-flame'), $('.comet-gr.comet-step4 .outer-flame'));
  animateCometsMotion($('.comet-gr'), 0.9, 1.2, 0.8);
}

function animateComets1Flame(comet1Start, comet1Mid, comet1End, comet1End2) {
  new TimelineMax({ repeat: -1 }).to(comet1Start, 0.4, {
    morphSVG: comet1Mid,
    ease: Linear.easeNone
  }).to(comet1Start, 0.25, {
    morphSVG: comet1End,
    ease: Linear.easeNone
  }).to(comet1Start, 0.04, {
    morphSVG: comet1End2,
    ease: Linear.easeNone
  }).to(comet1Start, 0.04, {
    morphSVG: comet1End,
    ease: Linear.easeNone
  }).to(comet1Start, 0.47, {
    morphSVG: comet1Start,
    ease: Linear.easeNone
  });
}

function animateComets2Flame(comet1Start, comet1Mid, comet1End) {
  new TimelineMax({ repeat: -1 }).to({}, 0.1, {}).to(comet1Start, 0.2, {
    morphSVG: comet1Mid,
    ease: Linear.easeNone
  }).to(comet1Start, 0.3, {
    morphSVG: comet1End,
    ease: Linear.easeNone
  }).to({}, 0.15, {}).to(comet1Start, 0.3, {
    morphSVG: comet1Start,
    ease: Linear.easeNone
  }).delay(0.8);
}

function animateCometsMotion(comet1, speed, pauseSec, delaySec) {
  var comet1Tl = new TimelineMax({ repeat: -1 });
  comet1Tl.to(comet1, speed, {
    bezier: {
      values: [{ x: 850, y: 584 }]
    },
    rotation: 0.01,
    ease: Linear.easeNone
  }).to({}, pauseSec, {}).delay(delaySec);
}

// UFO animation
function animateUFO() {
  $(window).on('resize load', _.debounce(function () {
    if ($(window).width() > 720) {
      createUFOPath(['15', '50', '0']);
    } else {
      createUFOPath(['5', '50', '0']);
    }
  }, 500));
}

function createUFOPath(rotation) {
  var $ufoMotionPath1 = UFOPathDataToBezier('.ufo-path .path1');
  var $ufoMotionPath2 = UFOPathDataToBezier('.ufo-path .path2');
  var $ufoMotionPath3 = UFOPathDataToBezier('.ufo-path .path3');
  var $ufo = $('.ufo');
  return new TimelineMax({ repeat: -1 }).add(flashLightTl(2)).to($ufo, 0.8, {
    bezier: {
      values: $ufoMotionPath1,
      type: 'soft'
    },
    rotation: rotation[0],
    ease: Power1.easeInOut
  }).to($ufo, 4.8, {
    bezier: {
      values: $ufoMotionPath2,
      type: 'soft'
    },
    rotation: rotation[1],
    ease: Power2.easeInOut
  }).add(flashLightTl(2.5)).to($ufo, 5, {
    bezier: {
      values: $ufoMotionPath3,
      type: 'soft'
    },
    rotation: rotation[2],
    ease: Power2.easeInOut
  });
}

function flashLightTl(waitSec) {
  var $ufoLight = $('.ufo .light');

  return new TimelineMax({ repeat: 2 }).to($ufoLight, 0.05, {
    autoAlpha: 0
  }).to($ufoLight, 0.05, {
    autoAlpha: 0.4
  }).to({}, waitSec, {}).to($ufoLight, 0.05, {
    autoAlpha: 0
  });
}

function UFOPathDataToBezier(path) {
  var ratio = $(window).width() / 5800 + 0.143;
  return MorphSVGPlugin.pathDataToBezier(path, {
    matrix: [ratio, 0, 0, ratio, 0, 0],
    align: 'relative'
  });
}

// Planet glow
function animatePlanetsGlow() {
  animateGlow($('.planet-glow .glow'), 0.5, 0.8, 1);
  animateGlow($('.p-yellow .glow'), 0.18, 0.3, 1);
}

function animateGlow(obj, startOp, endOp, duration) {
  new TimelineMax({ repeat: -1, yoyo: true }).set(obj, {
    autoAlpha: startOp
  }).to(obj, duration, {
    autoAlpha: endOp,
    ease: Linear.easeInOut
  });
}
//# sourceMappingURL=app.js.map
