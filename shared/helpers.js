/* Shortener for querySelectorAll that converts the returned node list into an array so I can do .forEach and have it work in IE11.
This is set up so that's it's possible to do either queryNodes(something) or node.queryNodes(something) */
Object.prototype.queryNodes = function (ipt) {
    console.log("this: ", this);
    if (this === window) {
        return [].slice.call(document.querySelectorAll(ipt));
    } else {
        return [].slice.call(this.querySelectorAll(ipt));
    }
}


/* IE11 polyfill for .closest, taken from https://developer.mozilla.org/en-US/docs/Web/API/Element/closest */

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}