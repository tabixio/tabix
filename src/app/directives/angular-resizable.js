angular.module('angularResizable', [])
    .directive('resizable', function() {
        var toCall;
        function throttle(fun) {
            if (toCall === undefined) {
                toCall = fun;
                setTimeout(function() {
                    toCall();
                    toCall = undefined;
                }, 100);
            } else {
                toCall = fun;
            }
        }
        return {
            restrict: 'AE',
            scope: {
                rDirections: '=',
                rCenteredX: '=',
                rCenteredY: '=',
                rWidth: '=',
                rHeight: '=',
                rFlex: '=',
                rGrabber: '@',
                rDisabled: '@',
                rNoThrottle: '=',
                resizable: '@',
            },
            link: function(scope, element, attr) {
                if (scope.resizable === 'false') return;

                var flexBasis = 'flexBasis' in document.documentElement.style ? 'flexBasis' :
                    'webkitFlexBasis' in document.documentElement.style ? 'webkitFlexBasis' :
                        'msFlexPreferredSize' in document.documentElement.style ? 'msFlexPreferredSize' : 'flexBasis';

                // register watchers on width and height attributes if they are set
                scope.$watch('rWidth', function(value){
                    // element[0].style[scope.rFlex ? flexBasis : 'width'] = scope.rWidth + 'px';
                    element[0].style[scope.rFlex ? flexBasis : 'width'] = (value !== false ? value + 'px' : '');
                });
                scope.$watch('rHeight', function(value){
                    // element[0].style[scope.rFlex ? flexBasis : 'height'] = scope.rHeight + 'px';
                    element[0].style[scope.rFlex ? flexBasis : 'height'] = (value !== false ? value + 'px' : '');
                });


                element.addClass('resizable');

                var style = window.getComputedStyle(element[0], null),
                    w,
                    h,
                    dir = scope.rDirections || ['right'],
                    vx = scope.rCenteredX ? 2 : 1, // if centered double velocity
                    vy = scope.rCenteredY ? 2 : 1, // if centered double velocity
                    inner = scope.rGrabber ? scope.rGrabber : '<span></span>',
                    start,
                    dragDir,
                    axis,
                    info = {};

                var updateInfo = function(e) {
                    info.width = false; info.height = false;
                    if(axis === 'x')
                        info.width = parseInt(element[0].style[scope.rFlex ? flexBasis : 'width']);
                    else
                        info.height = parseInt(element[0].style[scope.rFlex ? flexBasis : 'height']);
                    info.id = element[0].id;
                    info.evt = e;
                };

                var getClientX = function(e) {
                    return e.touches ? e.touches[0].clientX : e.clientX;
                };

                var getClientY = function(e) {
                    return e.touches ? e.touches[0].clientY : e.clientY;
                };

                var dragging = function(e) {
                    var prop, offset = axis === 'x' ? start - getClientX(e) : start - getClientY(e);
                    switch(dragDir) {
                        case 'top':
                            prop = scope.rFlex ? flexBasis : 'height';
                            element[0].style[prop] = h + (offset * vy) + 'px';
                            break;
                        case 'bottom':
                            prop = scope.rFlex ? flexBasis : 'height';
                            element[0].style[prop] = h - (offset * vy) + 'px';
                            break;
                        case 'right':
                            prop = scope.rFlex ? flexBasis : 'width';
                            element[0].style[prop] = w - (offset * vx) + 'px';
                            break;
                        case 'left':
                            prop = scope.rFlex ? flexBasis : 'width';
                            element[0].style[prop] = w + (offset * vx) + 'px';
                            break;
                    }
                    updateInfo(e);
                    function resizingEmit(){
                        scope.$emit('angular-resizable.resizing', info);
                    }
                    if (scope.rNoThrottle) {
                        resizingEmit();
                    } else {
                        throttle(resizingEmit);
                    }
                };
                var dragEnd = function(e) {
                    updateInfo();
                    scope.$emit('angular-resizable.resizeEnd', info);
                    scope.$apply();
                    document.removeEventListener('mouseup', dragEnd, false);
                    document.removeEventListener('mousemove', dragging, false);
                    document.removeEventListener('touchend', dragEnd, false);
                    document.removeEventListener('touchmove', dragging, false);
                    element.removeClass('no-transition');
                };

                var dblclick = function(e) {

                    let current={};
                    let valuewidth=false;
                    let valueheight=false;

                    current.width = parseInt(element[0].style[scope.rFlex ? flexBasis : 'width']);
                    current.height = parseInt(element[0].style[scope.rFlex ? flexBasis : 'height']);


                    if (dragDir=='right') {
                        if (current.width>10) {
                            // collapse
                            scope.preState=current;
                            valuewidth=0;
                            valueheight=0;
                        } else {
                            // expand ( restore )
                            if (!(scope.preState && scope.preState.width)) {
                                scope.preState.width=100;
                            }

                            valueheight=scope.preState.height;
                            valuewidth=scope.preState.width;
                        }
                    }

                    if (dragDir=='bottom') {
                        if (current.height>10) {
                            // collapse
                            scope.preState=current;
                            valueheight=0;
                        } else {
                            // expand ( restore )
                            if (!(scope.preState && scope.preState.height)) {
                                scope.preState.height=100;
                            }
                            valueheight=scope.preState.height;
                            valuewidth=scope.preState.width;
                        }
                    }

                    // console.log("dblclick current",current,dragDir,valuewidth,valueheight);
                    if (valuewidth !== false)
                    {
                        element[0].style[scope.rFlex ? flexBasis : 'width'] = (   valuewidth + 'px'  );
                    }

                    if (valueheight !== false )
                    {
                        element[0].style[scope.rFlex ? flexBasis : 'height'] = (valueheight + 'px');
                    }
                    scope.$apply();


                };


                var dragStart = function(e, direction) {
                    dragDir = direction;
                    axis = dragDir === 'left' || dragDir === 'right' ? 'x' : 'y';
                    start = axis === 'x' ? getClientX(e) : getClientY(e);
                    w = parseInt(style.getPropertyValue('width'));
                    h = parseInt(style.getPropertyValue('height'));

                    //prevent transition while dragging
                    element.addClass('no-transition');

                    document.addEventListener('mouseup', dragEnd, false);
                    document.addEventListener('mousemove', dragging, false);
                    document.addEventListener('touchend', dragEnd, false);
                    document.addEventListener('touchmove', dragging, false);

                    // Disable highlighting while dragging
                    if(e.stopPropagation) e.stopPropagation();
                    if(e.preventDefault) e.preventDefault();
                    e.cancelBubble = true;
                    e.returnValue = false;

                    updateInfo(e);
                    scope.$emit('angular-resizable.resizeStart', info);
                    scope.$apply();
                };

                dir.forEach(function (direction) {
                    var grabber = document.createElement('div');

                    // add class for styling purposes
                    grabber.setAttribute('class', 'rg-' + direction);
                    grabber.innerHTML = inner;
                    element[0].appendChild(grabber);
                    grabber.ondragstart = function() { return false; };

                    var down = function(e) {
                        var disabled = (scope.rDisabled === 'true');
                        if (!disabled && (e.which === 1 || e.touches)) {
                            // left mouse click or touch screen
                            dragStart(e, direction);
                        }
                    };
                    grabber.addEventListener('dblclick', dblclick, false);
                    grabber.addEventListener('mousedown', down, false);
                    grabber.addEventListener('touchstart', down, false);
                });
            }
        };
    });