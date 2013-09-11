/*
The following elements are not/partially supported (cmp. [1])
- Elements with a draggable attribute set [..] (partially)
- Editing hosts (not supported)
- Browsing context containers (not supported)
- Sorting interface th elements (not supported)

Please, feel free to upgrade the selectors to eradicate this blemish!

[1] http://www.w3.org/html/wg/drafts/html/master/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
 */

(function ( $ ) {
    $.fn.tabStop = function( direction ) {
        // elements focusable by tabindex attribute
        var activeTabindex = '[tabindex]:not([tabindex^="-"])',
        // elements that are focusable
        optInFocusable = 'a[href],link[href],button,input:not([type="hidden"]),select,textarea,menuitem,[draggable="true"]',
        // excluding criteria (or already in selection)
        optOutFocusable = '[tabindex],[disabled]',
        focusable = $(activeTabindex).get().sort(function(a,b) {
            // smaller tabindexes will be headed first
            return b.getAttribute('tabindex') - a.getAttribute('tabindex');
        }).concat(
            // especially link-elements in the header should not be included
            $('body').find(optInFocusable).not(optOutFocusable).get()
        );
        // does NOT focus itself, just returns the element
        return $(focusable[
            // if no elements are in the jQuery set use the currently active element
            (focusable.indexOf(this.get(0) || document.activeElement) + (
                // don't use -1 or else you woun't get the end of the array if you're already at the first element
                direction < 0 ? focusable.length-1 : 1)) %
            // best way to get the first element if you're alread at the last one
            focusable.length
        ]);
    };
}( jQuery ));
