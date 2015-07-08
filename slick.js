'use strict';

/**
 * Notes:
 *
 * Isolate Scope: When an isolate scope is created, it only has access
 * to a specified set of variables passed in as attributes.
 *
 * Some links and resources that have helped me along the way:
 *
 * https://github.com/vasyabigi/angular-slick
 * https://github.com/vasyabigi/angular-slick/issues/81#issuecomment-98307691
 * https://github.com/vasyabigi/angular-slick/blob/master/dist/slick.js
 * http://tech.blinemedical.com/sharing-data-between-child-and-parent-directives-and-scopes-in-angularjs/
 * http://tech.blinemedical.com/sharing-data-between-child-and-parent-directives-and-scopes-in-angularjs/
 * https://github.com/vasyabigi/angular-slick/pull/109
 * https://github.com/vasyabigi/angular-slick/pull/74
 */

angular.module('slick', []).directive('slick', [
	'$timeout',
	function($timeout) {
		return {
			restrict: 'AEC',
			scope: {
				// Documented:
				accessibility: '@',
				adaptiveHeight: '@',
				appendArrows: '@',
				arrows: '@',
				asNavFor: '@',
				autoplay: '@',
				autoplaySpeed: '@',
				centerMode: '@',
				centerPadding: '@',
				cssEase: '@',
				customPaging: '&',
				dots: '@',
				draggable: '@',
				easing: '@',
				edgeFriction: '@',
				fade: '@',
				focusOnSelect: '@',
				infinite: '@',
				initialSlide: '@',
				lazyLoad: '@',
				mobileFirst: '@',
				nextArrow: '@',
				pauseOnDotsHover: '@',
				pauseOnHover: '@',
				prevArrow: '@',
				respondTo: '@',
				responsive: '=',
				rows: '@',
				rtl: '@',
				slide: '@',
				slidesPerRow: '@',
				slidesToScroll: '@',
				slidesToShow: '@',
				speed: '@',
				swipe: '@',
				swipeToSlide: '@',
				touchMove: '@',
				touchThreshold: '@',
				useCSS: '@',
				variableWidth: '@',
				vertical: '@',
				verticalSwiping: '@',
				// Undocumented:
				appendDots: '@',
				// Internal:
				control: '@',
				currentIndex: '=',
				data: '=',
				initOnload: '@',
				// Callbacks:
				onAfterChange: '=',
				onBeforeChange: '=',
				onEdge: '=',
				onInit: '=',
				onReInit: '=',
				onSetPosition: '=',
				onSwipe: '=',
				// Internal callbacks:
				onAfterSlick: '=',
				onBeforeSlick: '='
			},
			link: function(scope, element, attrs) {
				var isInitialized;
				var destroySlick = function() {
					return $timeout(function() {
						return angular
							.element(element)
							.off() // Remove existing event handlers!
							.slick('unslick');
					});
				};
				var initializeSlick = function() {
					return $timeout(function() {
						var currentIndex;
						var customPaging;
						var slider = angular.element(element);
						var methods = [
							// https://github.com/kenwheeler/slick#methods
							'slick',
							'unslick',
							'slickNext',
							'slickPrev',
							'slickPause',
							'slickPlay',
							'slickGoTo',
							'slickCurrentSlide',
							'slickAdd',
							'slickRemove',
							'slickFilter',
							'slickUnfilter',
							'slickGetOption',
							'slickSetOption'
						];
						if (scope.beforeSlick) {
							scope.beforeSlick(slider);
						}
						customPaging = function(slick, index) {
							return scope.customPaging({
								slick: slick,
								index: index
							});
						};
						if (scope.currentIndex != null) {
							currentIndex = scope.currentIndex;
						}
						slider
							// Must come first!
							.on('init', function(event, slick) {
								if (attrs.onInit) {
									scope.onInit(event, slick);
								}
								if (currentIndex != null) {
									return slick.slideHandler(currentIndex, false, true); // Go to index, sans animation.
								}
							})
							.slick({
								accessibility: scope.accessibility !== 'false',
								adaptiveHeight: scope.adaptiveHeight === 'true',
								appendArrows: scope.appendArrows ? angular.element(scope.appendArrows) : angular.element(element),
								appendDots: scope.appendDots ? angular.element(scope.appendDots) : angular.element(element),
								arrows: scope.arrows !== 'false',
								asNavFor: scope.asNavFor ? scope.asNavFor : void 0,
								autoplay: scope.autoplay === 'true',
								autoplaySpeed: scope.autoplaySpeed != null ? parseInt(scope.autoplaySpeed, 10) : 3000,
								centerMode: scope.centerMode === 'true',
								centerPadding: scope.centerPadding || '50px',
								cssEase: scope.cssEase || 'ease',
								customPaging: attrs.customPaging ? customPaging : void 0,
								dots: scope.dots === 'true',
								draggable: scope.draggable !== 'false',
								easing: scope.easing || 'linear',
								edgeFriction: scope.edgeFriction || 0.15,
								fade: scope.fade === 'true',
								focusOnSelect: scope.focusOnSelect === 'true',
								infinite: scope.infinite !== 'false',
								initialSlide: scope.initialSlide !== null ? parseInt(scope.initialSlide, 10) : 0,
								lazyLoad: scope.lazyLoad || 'ondemand',
								mobileFirst: scope.mobileFirst === 'true',
								nextArrow: scope.nextArrow ? angular.element(scope.nextArrow) : void 0,
								pauseOnDotsHover: scope.pauseOnDotsHover === 'true',
								pauseOnHover: scope.pauseOnHover !== 'false',
								prevArrow: scope.prevArrow ? angular.element(scope.prevArrow) : void 0,
								respondTo: scope.respondTo || 'window',
								responsive: scope.responsive || void 0,
								rows: scope.rows != null ? parseInt(scope.rows, 10) : 1,
								rtl: scope.rtl === 'true',
								slide: scope.slide || 'div',
								slidesPerRow: scope.slidesPerRow != null ? parseInt(scope.slidesPerRow, 10) : 1,
								slidesToScroll: scope.slidesToScroll != null ? parseInt(scope.slidesToScroll, 10) : 1,
								slidesToShow: scope.slidesToShow != null ? parseInt(scope.slidesToShow, 10) : 1,
								speed: scope.speed != null ? parseInt(scope.speed, 10) : 300,
								swipe: scope.swipe !== 'false',
								swipeToSlide: scope.swipeToSlide === 'true',
								touchMove: scope.touchMove !== 'false',
								touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
								useCSS: scope.useCSS !== 'false',
								variableWidth: scope.variableWidth === 'true',
								vertical: scope.vertical === 'true',
								verticalSwiping: scope.verticalSwiping === 'true'
							})
							.on('afterChange', function(event, slick, currentSlide, nextSlide) {
								currentIndex = currentSlide;
								scope.$apply(function() {
									scope.currentIndex = currentSlide;
								});
								if (attrs.onAfterChange) {
									return scope.onAfterChange(event, slick, currentSlide, nextSlide);
								}
							})
							.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
								if (attrs.onBeforeChange) {
									return scope.onBeforeChange(event, slick, currentSlide, nextSlide);
								}
							})
							.on('edge', function(event, slick, direction) {
								if (attrs.onEdge) {
									return scope.onEdge(event, slick, direction);
								}
							})
							.on('reInit', function(event, slick) {
								if (attrs.onReInit) {
									return scope.onReInit(event, slick);
								}
							})
							.on('setPosition', function(event, slick) {
								if (attrs.onSetPosition) {
									return scope.onSetPosition(event, slick);
								}
							})
							.on('swipe', function(event, slick, direction) {
								if (attrs.onSwipe) {
									return scope.onSwipe(event, slick, direction);
								}
							})
							.on('breakpoint', function(event, slick) {
								if (attrs.onBreakpoint) {
									return scope.onBreakpoint(event, slick);
								}
							})
							.on('destroy', function(event, slick) {
								if (attrs.onDestroy) {
									return scope.onDestroy(event, slick);
								}
							});
						// Need to test this:
						if (scope.control) {
							scope.$parent[scope.control] = {};
							methods.forEach(function(value) {
								scope.$parent[scope.control][value] = function () {
									var args = Array.prototype.slice.call(arguments);
									args.unshift(value);
									slider.slick.apply(element, args);
								};
							});
						}
						scope.$watch('currentIndex', function(newVal, oldVal) {
							if (currentIndex != null && newVal != null) {
								// Only called if triggered manually via button on template:
								$timeout(function() {
									return slider.slick('slickGoTo', newVal, true);
								});
							}
						});
						if (scope.afterSlick) {
							$timeout(function() {
								scope.afterSlick(slider);
							});
						}
						return scope; // What to return here and why?
					});
				};
				$timeout(function() {
					if (scope.initOnload) {
						isInitialized = false;
						return scope.$watch('data', function(newVal, oldVal) {
							if (newVal != null) {
								if (isInitialized) {
									destroySlick();
								}
								initializeSlick();
								return isInitialized = true;
							}
						});
					} else {
						return initializeSlick();
					}
				});
			}
		};
	}
]);
