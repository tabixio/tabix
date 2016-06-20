/* globals inject */
describe('FocusMe Directive', function () {
    var scope;
    var element;

    beforeEach(function () {
        module('app.core');
    });

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.isFocus = true;
        element = $compile('<input aio-focus-me="isFocus" />')(scope);
        // spy needs to be put before $digest
        spyOn(element[0], 'focus');
    }));

    it('should make element get focus when attribute is true', function () {
        scope.$digest();
        expect(element[0].focus).toHaveBeenCalled();
    });

    it('should make element lose focus when attribute is false', function () {
        scope.isFocus = false;
        scope.$digest();
        expect(element[0].focus).not.toHaveBeenCalled();
    });
});
