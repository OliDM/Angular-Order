app.directive("hide", function($animate) {
    return function(scope, element, attrs) {
        scope.$watch(attrs.hideMe, function(newVal) {
            if (newVal) {
                $animate.addClass(element, "fade")
            } else {
                $animate.removeClass(element, "fade")
            }
        })
    }
});

app.animation(".fade", function() {
    return {
        addClass: function(element, className) {
           // TweenMax.to(element, 1, {opacity: 0});
            $(element ).fadeOut( "slow" );
        },
        removeClass: function(element, className) {
            //TweenMax.to(element, 1, {opacity: 1});
            $(element ).fadeIn( "slow" );

        }
    }
})