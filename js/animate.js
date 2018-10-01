// var theThings = document.querySelectorAll(".animal_giraffe");
// var tx;
// var ty;
//
// var transitionDurations = ["transitionDuration", "msTransitionDuration", "webkitTransitionDuration", "mozTransitionDuration", "oTransitionDuration"];
// var transitionDurationProperty = getSupportedPropertyName(transitionDurations);
//
// var transforms = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
// var transformProperty = getSupportedPropertyName(transforms);
//
// function setInitialProperties() {
// 	for (var i = 0; i < theThings.length; i++) {
// 		var theThing = theThings[i];
// 		setTranslate3DTransform(theThing);
// 	}
// 	setTimeout(kickOffTransition, 2000);
// }
// setInitialProperties();
//
//
// function kickOffTransition() {
// 	for (var i = 0; i < theThings.length; i++) {
// 		var theThing = theThings[i];
// 		theThing.addEventListener("transitionend", updatePosition, false);
// 		theThing.addEventListener("webkitTransitionEnd", updatePosition, false);
// 		theThing.addEventListener("mozTransitionEnd", updatePosition, false);
// 		theThing.addEventListener("msTransitionEnd", updatePosition, false);
// 		theThing.addEventListener("oTransitionEnd", updatePosition, false);
//
// 		setTranslate3DTransform(theThing);
// 		setTransitionDuration(theThing);
// 	}
// }
//
// function updatePosition(e) {
// 	var theThing = e.currentTarget;
// 	if (e.propertyName.indexOf("transform") != -1) {
// 		setTranslate3DTransform(theThing);
// 		setTransitionDuration(theThing);
// 	}
// }
//
// function getRandomXPosition() {
// 	return Math.round(-50 + Math.random() * 650);
// }
//
// function getRandomYPosition() {
// 	return Math.round(-50 + Math.random() * 400);
// }
//
// function getRandomDuration() {
// 	return (.5 + Math.random() * 1) + "s";
// }
//
// function getSupportedPropertyName(properties) {
//   for (var i = 0; i < properties.length; i++) {
//     if(typeof document.body.style[properties[i]] != "undefined") {
//       return properties[i];
//     }
//   }
//   return null;
// }
//
// function setTranslate3DTransform(element) {
//   tx = getRandomXPosition();
//   ty = getRandomYPosition();
// 	element.style[transformProperty] = "translate3d(" + tx + "px" + ", " + ty + "px" + ", 0)";
//   element.setAttribute('data-x', `${tx}px`);
//   element.setAttribute('data-y', `${ty}px`);
// }
//
// function setTransitionDuration(element) {
// 	if (transitionDurationProperty) {
// 		element.style[transitionDurationProperty] = getRandomDuration();
// 	}
// }
