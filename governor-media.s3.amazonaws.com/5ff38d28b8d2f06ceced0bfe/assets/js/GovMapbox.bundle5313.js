window.GovMapbox=function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s="./src/mapbox.js")}({"./src/mapbox.js":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();n.GovMapbox=function(){function e(n,t){if(function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),!mapboxgl)throw"mapbox must be loaded to use Governor Maps";if(!t)throw"no map configuration was supplied";if(this.elem=document.querySelector(n),this.options=t,!this.elem)throw"no element found using the provided selector: "+n;this.init()}return r(e,[{key:"init",value:function(){this.config=Object.assign({},this.defaults,this.options),this.config.customPopup&&(this.popupTemplateElement=document.getElementById(this.config.customPopup)),this.bounds=new mapboxgl.LngLatBounds,this._mapInstance=this.buildMap(this.elem,this.options),this._markerInstances=this.setupMarkers(this._mapInstance),this._mapInstance.fitBounds(this.bounds.toArray(),{padding:{top:25,bottom:25,left:25,right:25}})}},{key:"showMarkersByType",value:function(e){var n=this;this._markerInstances.forEach(function(t){t.type===e&&t.addTo(n._mapInstance)})}},{key:"buildMap",value:function(e,n){return new mapboxgl.Map({container:e,style:"mapbox://styles/greatparks/cjnor658x1iqp2rmikvuok3ez",center:[n.center.lng,n.center.lat]})}},{key:"buildMarker",value:function(e,n){var t=void 0;if(e.type&&(e.icon=e.type.icon),(t=this.placeMarker(e,n,e.type.scaledSize)).title=e.name,t.type=e.type._id,t.id=e._id,e.showInfoBox){var r=e.content,o=new mapboxgl.Popup({className:"mapbox-pop"});if(this.config.customPopup){var a={image:e.image?"":"info-block-hide",name:e.name?"":"info-block-hide",address:e.address?"":"info-block-hide",phone:e.phone?"":"info-block-hide",directions:e.directions?"":"info-block-hide",url:e.url?"":"info-block-hide"};r='\n                        <div class="sub-row">\n                            <div class="image-holder '+a.image+'">\n                                <img src="'+e.image.cdnCropUrl+'" alt="image description">\n                            </div>\n                            <div class="text-box">\n                                <strong class="'+a.name+'">'+e.name+'</strong>\n                                <address class="'+a.address+'">'+e.address+'</address>\n                                <div class="phone-row '+a.phone+'">\n                                    <a href="tel:'+e.phone+'" class="phone">'+e.phone+'</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="sub-row sub-row-button">\n                            <a target="_blank" href="'+e.directions+'" class="btn '+a.directions+' btn-primary">directions</a>\n                            <a target="_blank" href="'+e.url+'" class="btn '+a.url+' btn-primary">Learn More</a>\n                        </div>\n                '}o.setHTML(r),t.setPopup(o)}return t}},{key:"focusMarker",value:function(e){var n=this._markerInstances.find(function(n){return n.id===e});n&&this._mapInstance.panTo(n.position)}},{key:"getIconConfig",value:function(e){return{title:e.name,url:e.icon,scaledSize:new google.maps.Size(35,35)}}},{key:"getKMLs",value:function(){return this.options.kmls}},{key:"getMarkers",value:function(){return this.options.markers}},{key:"getMarkerInstances",value:function(){return this._markerInstances}},{key:"getMarkerTypes",value:function(){var e={};return this.options.markers.forEach(function(n){e[n.type._id]||(e[n.type._id]=n.type)}),e}},{key:"hideMarkersByType",value:function(e){this._markerInstances.forEach(function(n){n.type===e&&n.remove()})}},{key:"placeMarker",value:function(e,n){var t={title:e.name,type:e.type._id,id:e._id};if(e.icon){var r=document.createElement("div");r.className="marker",r.style.backgroundImage="url("+e.icon+")",r.style.width="35px",r.style.height="35px",r.style.backgroundSize="35px 35px",t.element=r}var o=new mapboxgl.Marker(t);return o.setLngLat([e.location.lng,e.location.lat]).addTo(n),o}},{key:"setupKmls",value:function(e){var n=[],t=void 0;return this.config.kmls.forEach(function(r){r&&(t=new google.maps.KmlLayer({url:r.kmlFile,map:e,preserveViewport:!0,name:r.name}),n.push(t))}),n}},{key:"setupMarkers",value:function(e){var n=this,t=[],r=void 0;return this.config.markers.forEach(function(o){o.show&&(r=n.buildMarker(o,e),n.bounds.extend(r.getLngLat()),t.push(r))}),t}},{key:"setVisibleMarkersByType",value:function(e){var n=this,t=new mapboxgl.LngLatBounds;e.length?this._markerInstances.forEach(function(r){e.includes(r.type)?(r.addTo(n._mapInstance),t.extend(r.getLngLat().toArray())):r.remove(),n._mapInstance.fitBounds(t.toArray())}):this.showAllMarkers()}},{key:"showAllMarkers",value:function(){var e=this;this._markerInstances.forEach(function(n){n.setMap(e._mapInstance)})}}]),e}()}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL21hcGJveC5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJ2YWx1ZSIsIm4iLCJfX2VzTW9kdWxlIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiR292TWFwYm94Iiwic2VsZWN0b3IiLCJvcHRpb25zIiwiX2NsYXNzQ2FsbENoZWNrIiwidGhpcyIsIm1hcGJveGdsIiwiZWxlbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImluaXQiLCJjb25maWciLCJhc3NpZ24iLCJkZWZhdWx0cyIsImN1c3RvbVBvcHVwIiwicG9wdXBUZW1wbGF0ZUVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImJvdW5kcyIsIkxuZ0xhdEJvdW5kcyIsIl9tYXBJbnN0YW5jZSIsImJ1aWxkTWFwIiwiX21hcmtlckluc3RhbmNlcyIsInNldHVwTWFya2VycyIsImZpdEJvdW5kcyIsInRvQXJyYXkiLCJwYWRkaW5nIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwidHlwZUlkIiwiX3RoaXMiLCJmb3JFYWNoIiwibWFya2VyIiwidHlwZSIsImFkZFRvIiwiTWFwIiwiY29udGFpbmVyIiwic3R5bGUiLCJjZW50ZXIiLCJsbmciLCJsYXQiLCJtYXAiLCJtYXJrZXJJbnN0YW5jZSIsImljb24iLCJwbGFjZU1hcmtlciIsInNjYWxlZFNpemUiLCJ0aXRsZSIsIl9pZCIsImlkIiwic2hvd0luZm9Cb3giLCJpbmZvQm94IiwiY29udGVudCIsInBvcHVwIiwiUG9wdXAiLCJjbGFzc05hbWUiLCJjbGFzc2VzIiwiaW1hZ2UiLCJhZGRyZXNzIiwicGhvbmUiLCJkaXJlY3Rpb25zIiwidXJsIiwiY2RuQ3JvcFVybCIsInNldEhUTUwiLCJzZXRQb3B1cCIsIm1hcmtlcklkIiwibWFya2VyVG9Gb2N1cyIsImZpbmQiLCJwYW5UbyIsInBvc2l0aW9uIiwiZ29vZ2xlIiwibWFwcyIsIlNpemUiLCJrbWxzIiwibWFya2VycyIsIm1hcmtlclR5cGVzIiwicmVtb3ZlIiwiZWwiLCJjcmVhdGVFbGVtZW50IiwiYmFja2dyb3VuZEltYWdlIiwid2lkdGgiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kU2l6ZSIsImVsZW1lbnQiLCJuZXdNYXJrZXIiLCJNYXJrZXIiLCJzZXRMbmdMYXQiLCJsb2NhdGlvbiIsImttbExheWVycyIsImN1cnJlbnRMYXllciIsImN1cnJlbnRLbWwiLCJLbWxMYXllciIsImttbEZpbGUiLCJwcmVzZXJ2ZVZpZXdwb3J0IiwicHVzaCIsIl90aGlzMiIsIm1hcmtlckluc3RhbmNlcyIsInNob3ciLCJidWlsZE1hcmtlciIsImV4dGVuZCIsImdldExuZ0xhdCIsInZpc2libGVUeXBlSWRzIiwiX3RoaXMzIiwibmV3Qm91bmRzIiwibGVuZ3RoIiwiaW5jbHVkZXMiLCJzaG93QWxsTWFya2VycyIsIl90aGlzNCIsInNldE1hcCJdLCJtYXBwaW5ncyI6IjZCQUNBLElBQUFBLEtBR0EsU0FBQUMsRUFBQUMsR0FHQSxHQUFBRixFQUFBRSxHQUNBLE9BQUFGLEVBQUFFLEdBQUFDLFFBR0EsSUFBQUMsRUFBQUosRUFBQUUsSUFDQUcsRUFBQUgsRUFDQUksR0FBQSxFQUNBSCxZQVVBLE9BTkFJLEVBQUFMLEdBQUFNLEtBQUFKLEVBQUFELFFBQUFDLElBQUFELFFBQUFGLEdBR0FHLEVBQUFFLEdBQUEsRUFHQUYsRUFBQUQsUUEyQ0EsT0F0Q0FGLEVBQUFRLEVBQUFGLEVBR0FOLEVBQUFTLEVBQUFWLEVBR0FD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QUFDLEVBQUF0RyxLQUNiQSxLQUFLZ0IsaUJBQWlCVyxRQUFRLFNBQUFDLEdBQzFCQSxFQUFPMkUsT0FBT0QsRUFBS3hGIiwiZmlsZSI6Ikdvdk1hcGJveC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYXBib3guanNcIik7XG4iLCIvKipcbiAqIEBkZXNjcmlwdGlvbiBHb3Zlcm5vciBoZWxwZXIgZm9yIHNldHRpbmcgdXAgTWFwYm94IG1hcHMgdXNpbmcgZ292ZXJub3IgbWFwIGNvbmZpZ3NcbiAqXG4gKiBAY2xhc3MgR292TWFwQm94XG4gKi9cbmV4cG9ydCBjbGFzcyBHb3ZNYXBib3gge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb3ZNYXAuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIGNzcyBzZWxlY3RvciBvZiB0aGUgZWxlbWVudCB0byB1c2UgZm9yIHRoZSBtYXBcbiAgICAgKiBAcGFyYW0ge2FueX0gb3B0aW9ucyBnb3Zlcm5vciBtYXBzIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICogQG1lbWJlcm9mIEdvdk1hcGJveFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBvcHRpb25zKSB7XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIGdvb2dsZVxuICAgICAgICBpZiAoIW1hcGJveGdsKSB7XG4gICAgICAgICAgICB0aHJvdyAnbWFwYm94IG11c3QgYmUgbG9hZGVkIHRvIHVzZSBHb3Zlcm5vciBNYXBzJ1xuICAgICAgICB9XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgbWFwIGNvbmZpZyBleGlzdHNcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICB0aHJvdyAnbm8gbWFwIGNvbmZpZ3VyYXRpb24gd2FzIHN1cHBsaWVkJ1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ3JhYiB0aGUgZWxlbWVudCB1c2luZyB0aGUgZWxlbWVudCBzZWxlY3RvclxuICAgICAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIGFuIGVsZW1lbnQgd2FzIGZvdW5kXG4gICAgICAgIGlmICghdGhpcy5lbGVtKSB7XG4gICAgICAgICAgICB0aHJvdyBgbm8gZWxlbWVudCBmb3VuZCB1c2luZyB0aGUgcHJvdmlkZWQgc2VsZWN0b3I6ICR7c2VsZWN0b3J9YFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0dXAgdGhlIG1hcFxuICAgICAgICB0aGlzLmluaXQoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBtYXBib3ggbWFwIHVzaW5nIHRoZSBnb3Zlcm5vciBtYXAgY29uZmlnXG4gICAgICogQG1lbWJlcm9mIEdvdk1hcGJveFxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0cywgdGhpcy5vcHRpb25zKVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jdXN0b21Qb3B1cCkge1xuICAgICAgICAgICAgdGhpcy5wb3B1cFRlbXBsYXRlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuY29uZmlnLmN1c3RvbVBvcHVwKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib3VuZHMgPSBuZXcgbWFwYm94Z2wuTG5nTGF0Qm91bmRzKClcbiAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UgPSB0aGlzLmJ1aWxkTWFwKHRoaXMuZWxlbSwgdGhpcy5vcHRpb25zKVxuICAgICAgICAvLyB0aGlzLl9rbWxMYXllcnMgPSB0aGlzLnNldHVwS21scyh0aGlzLl9tYXBJbnN0YW5jZSlcbiAgICAgICAgdGhpcy5fbWFya2VySW5zdGFuY2VzID0gdGhpcy5zZXR1cE1hcmtlcnModGhpcy5fbWFwSW5zdGFuY2UpXG4gICAgICAgIHRoaXMuX21hcEluc3RhbmNlLmZpdEJvdW5kcyh0aGlzLmJvdW5kcy50b0FycmF5KCksIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IHsgdG9wOiAyNSwgYm90dG9tOiAyNSwgbGVmdDogMjUsIHJpZ2h0OiAyNSB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhpZGUgYWxsIG1hcmtlcnMgd2l0aCB0aGUgc3BlY2lmaWVkIG1hcmtlciB0eXBlIGlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVJZCAtIHRoZSBpZCBvZiB0aGUgbWFya2VyIHR5cGUgdG8gc2hvd1xuICAgICAqIEBtZW1iZXJvZiBHb3ZNYXBib3hcbiAgICAgKi9cbiAgICBzaG93TWFya2Vyc0J5VHlwZSh0eXBlSWQpIHtcbiAgICAgICAgdGhpcy5fbWFya2VySW5zdGFuY2VzLmZvckVhY2gobWFya2VyID0+IHtcbiAgICAgICAgICAgIGlmIChtYXJrZXIudHlwZSA9PT0gdHlwZUlkKSB7XG4gICAgICAgICAgICAgICAgbWFya2VyLmFkZFRvKHRoaXMuX21hcEluc3RhbmNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBjcmVhdGUgYSBtYXBib3ggbWFwIGluc3RhbmNlIHVzaW5nIHRoZSBnb3Zlcm5vciBtYXAgY29uZmlnXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbSAtIHRoZSBlbGVtZW50IHRvIHVzZSBmb3IgdGhlIG1hcFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBtYXBib3ggbWFwIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICogQHJldHVybnMge21hcGJveGdsLk1hcH0gYSBuZXdseSBjb25maWd1cmVkIG1hcGJveCBtYXBcbiAgICAgKiBAbWVtYmVyb2YgR292TWFwYm94XG4gICAgICovXG4gICAgYnVpbGRNYXAoZWxlbSwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBtYXBib3hnbC5NYXAoe1xuICAgICAgICAgICAgY29udGFpbmVyOiBlbGVtLFxuICAgICAgICAgICAgLy8gc3R5bGU6ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjknLFxuICAgICAgICAgICAgc3R5bGU6ICdtYXBib3g6Ly9zdHlsZXMvZ3JlYXRwYXJrcy9jam5vcjY1OHgxaXFwMnJtaWt2dW9rM2V6JyxcbiAgICAgICAgICAgIGNlbnRlcjogW1xuICAgICAgICAgICAgICAgIGNvbmZpZy5jZW50ZXIubG5nLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5jZW50ZXIubGF0XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBtYXBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gYnVpbGQgYSBnb29nbGUgbWFwcyBtYXJrZXIgYW5kXG4gICAgICogYWRkIGxpc3RlbmVycyBmb3IgdGhlIGluZm8gd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0gbWFya2VyIC0gZ292ZXJub3IgbWFya2VyIGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtnb29nbGUubWFwcy5NYXJrZXJ9IC0gZ29vZ2xlIG1hcCBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBHb3ZNYXBib3hcbiAgICAgKi9cbiAgICBidWlsZE1hcmtlcihtYXJrZXIsIG1hcCkge1xuICAgICAgICBsZXQgbWFya2VySW5zdGFuY2VcblxuICAgICAgICAvLyBpZiB0aGUgbWFya2VyIGhhcyBhIG1hcmtlciB0eXBlIHNlbGVjdGVkLCBncmFiIGl0IHNvIHdlIGNhbiB1c2UgdGhlIGljb25cbiAgICAgICAgaWYgKG1hcmtlci50eXBlKSB7XG4gICAgICAgICAgICBtYXJrZXIuaWNvbiA9IG1hcmtlci50eXBlLmljb25cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbWFya2VyIGFuZCBhZGQgaXQgdG8gdGhlIG1hcFxuICAgICAgICBtYXJrZXJJbnN0YW5jZSA9IHRoaXMucGxhY2VNYXJrZXIobWFya2VyLCBtYXAsIG1hcmtlci50eXBlLnNjYWxlZFNpemUpXG4gICAgICAgIG1hcmtlckluc3RhbmNlLnRpdGxlID0gbWFya2VyLm5hbWVcbiAgICAgICAgbWFya2VySW5zdGFuY2UudHlwZSA9IG1hcmtlci50eXBlLl9pZFxuICAgICAgICBtYXJrZXJJbnN0YW5jZS5pZCA9IG1hcmtlci5faWRcbiAgICAgICAgXG4gICAgICAgIGlmIChtYXJrZXIuc2hvd0luZm9Cb3gpIHtcbiAgICAgICAgICAgIGxldCBpbmZvQm94ID0gbWFya2VyLmNvbnRlbnRcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwID0gbmV3IG1hcGJveGdsLlBvcHVwKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdtYXBib3gtcG9wJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5jdXN0b21Qb3B1cCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAoIW1hcmtlci5pbWFnZSkgPyAnaW5mby1ibG9jay1oaWRlJyA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAoIW1hcmtlci5uYW1lKSA/ICdpbmZvLWJsb2NrLWhpZGUnIDogJycsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICghbWFya2VyLmFkZHJlc3MpID8gJ2luZm8tYmxvY2staGlkZScgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6ICghbWFya2VyLnBob25lKSA/ICdpbmZvLWJsb2NrLWhpZGUnIDogJycsXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbnM6ICghbWFya2VyLmRpcmVjdGlvbnMpID8gJ2luZm8tYmxvY2staGlkZScgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAoIW1hcmtlci51cmwpID8gJ2luZm8tYmxvY2staGlkZScgOiAnJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmZvQm94ID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Yi1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtaG9sZGVyICR7Y2xhc3Nlcy5pbWFnZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke21hcmtlci5pbWFnZS5jZG5Dcm9wVXJsfVwiIGFsdD1cImltYWdlIGRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCIke2NsYXNzZXMubmFtZX1cIj4ke21hcmtlci5uYW1lfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWRkcmVzcyBjbGFzcz1cIiR7Y2xhc3Nlcy5hZGRyZXNzfVwiPiR7bWFya2VyLmFkZHJlc3N9PC9hZGRyZXNzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvbmUtcm93ICR7Y2xhc3Nlcy5waG9uZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJ0ZWw6JHttYXJrZXIucGhvbmV9XCIgY2xhc3M9XCJwaG9uZVwiPiR7bWFya2VyLnBob25lfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItcm93IHN1Yi1yb3ctYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7bWFya2VyLmRpcmVjdGlvbnN9XCIgY2xhc3M9XCJidG4gJHtjbGFzc2VzLmRpcmVjdGlvbnN9IGJ0bi1wcmltYXJ5XCI+ZGlyZWN0aW9uczwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHttYXJrZXIudXJsfVwiIGNsYXNzPVwiYnRuICR7Y2xhc3Nlcy51cmx9IGJ0bi1wcmltYXJ5XCI+TGVhcm4gTW9yZTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9wdXAuc2V0SFRNTChpbmZvQm94KVxuICAgICAgICAgICAgbWFya2VySW5zdGFuY2Uuc2V0UG9wdXAocG9wdXApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWFya2VySW5zdGFuY2VcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gRm9jdXMgYSBtYXJrZXIgb24gdGhlIG1hcFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtYXJrZXJJZCAtIHRoZSBpZCBvZiB0aGUgbWFya2VyIHRvIGZvY3VzXG4gICAgICogQG1lbWJlcm9mIEdvdk1hcGJveFxuICAgICAqL1xuICAgIGZvY3VzTWFya2VyKG1hcmtlcklkKSB7XG4gICAgICAgIC8vIGdldCB0aGUgbWFya2VyIGluc3RhbmNlIHVzaW5nIHRoZSBtYXJrZXJJZCBwYXNzZWQgaW5cbiAgICAgICAgY29uc3QgbWFya2VyVG9Gb2N1cyA9IHRoaXMuX21hcmtlckluc3RhbmNlcy5maW5kKG1hcmtlciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbWFya2VyLmlkID09PSBtYXJrZXJJZFxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGlmIHdlIGZpbmQgYSBtYXJrZXIsIHBhbiB0byB0aGUgbWFya2VycyBwb3NpdGlvblxuICAgICAgICBpZiAobWFya2VyVG9Gb2N1cykge1xuICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UucGFuVG8obWFya2VyVG9Gb2N1cy5wb3NpdGlvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBjcmVhdGUgYSBnb29nbGUgbWFwcyBpY29uIGNvbmZpZyBvYmplY3QgdGhhdCBpcyB1c2VkIGJ5IHRoZSBtYXJrZXJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIGdvb2dsZSBtYXBzIEljb24gY29uZmlnXG4gICAgICogQG1lbWJlcm9mIEdvdk1hcGJveFxuICAgICAqL1xuICAgIGdldEljb25Db25maWcobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZTogbWFya2VyLm5hbWUsXG4gICAgICAgICAgICB1cmw6IG1hcmtlci5pY29uLCAvLyB1cmxcbiAgICAgICAgICAgIHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDM1LCAzNSksIC8vIHNjYWxlZCBzaXplXG4gICAgICAgICAgICAvLyBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSAvLyBhbmNob3JcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBnZXQgdGhlIGNvbGxlY3Rpb24gb2YgS01McyBvbiB0aGUgbWFwIGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtBcnJheX0gLSBjb2xsZWN0aW9uIG9mIEtNTHMgZnJvbSB0aGUgbWFwIGNvbmZpZ1xuICAgICAqIEBtZW1iZXJvZiBHb3ZNYXBib3hcbiAgICAgKi9cbiAgICBnZXRLTUxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmttbHNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gZ2V0IHRoZSBjb2xsZWN0aW9uIG9mIG1hcmtlcnMgb24gdGhlIG1hcCBjb25maWdcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IC0gY29sbGVjdGlvbiBvZiBtYXJrZXJzIGZyb20gdGhlIG1hcCBjb25maWdcbiAgICAgKiBAbWVtYmVyb2YgR292TWFwYm94XG4gICAgICovXG4gICAgZ2V0TWFya2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5tYXJrZXJzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIGdldCB0aGUgY29sbGVjdGlvbiBvZiBtYXJrZXIgaW5zdGFuY2VzIGNyZWF0ZWQgZm9yIHRoZSBtYXBcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IC0gY29sbGVjdGlvbiBvZiBtYXJrZXIgaW5zdGFuY2VzXG4gICAgICogQG1lbWJlcm9mIEdvdk1hcGJveFxuICAgICAqL1xuICAgIGdldE1hcmtlckluc3RhbmNlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlckluc3RhbmNlc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBsb29wIG92ZXIgbWFya2VycyBpbiB0aGUgbWFwIGNvbmZpZyBhbmQgYnVpbGQgYSBsaXN0IG9mXG4gICAgICogdW5pcXVlIG1hcmtlciB0eXBlc1xuICAgICAqIEByZXR1cm5zIHtBcnJheX0gLSBjb2xsZWN0aW9uIG9mIG1hcmtlclR5cGVzXG4gICAgICogQG1lbWJlcm9mIEdvdk1hcGJveFxuICAgICAqL1xuICAgIGdldE1hcmtlclR5cGVzKCkge1xuICAgICAgICBjb25zdCBtYXJrZXJUeXBlcyA9IHt9XG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXJrZXJzLmZvckVhY2gobWFya2VyID0+IHtcbiAgICAgICAgICAgIGlmICghbWFya2VyVHlwZXNbbWFya2VyLnR5cGUuX2lkXSkge1xuICAgICAgICAgICAgICAgIG1hcmtlclR5cGVzW21hcmtlci50eXBlLl9pZF0gPSBtYXJrZXIudHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gbWFya2VyVHlwZXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGlkZSBhbGwgbWFya2VycyB3aXRoIHRoZSBzcGVjaWZpZWQgbWFya2VyIHR5cGUgaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZUlkIC0gdGhlIGlkIG9mIHRoZSBtYXJrZXIgdHlwZSB0byBoaWRlXG4gICAgICogQG1lbWJlcm9mIEdvdk1hcGJveFxuICAgICAqL1xuICAgIGhpZGVNYXJrZXJzQnlUeXBlKHR5cGVJZCkge1xuICAgICAgICB0aGlzLl9tYXJrZXJJbnN0YW5jZXMuZm9yRWFjaChtYXJrZXIgPT4ge1xuICAgICAgICAgICAgaWYgKG1hcmtlci50eXBlID09PSB0eXBlSWQpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gYWRkIG1hcmtlciB0byBtYXAgYXQgc3BlY2lmaWVkIGxhdCBhbmQgbG5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFya2VyIGdvdmVybm9yIG1hcmtlciBjb25maWdcbiAgICAgKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIGdvb2dsZSBtYXBzIE1hcFxuICAgICAqIEByZXR1cm5zIHtnb29nbGUubWFwcy5NYXJrZXJ9IGdvb2dsZSBtYXBzIE1hcmtlclxuICAgICAqIEBtZW1iZXJvZiBHb3ZNYXBib3hcbiAgICAgKi9cbiAgICBwbGFjZU1hcmtlcihtYXJrZXIsIG1hcCkge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICB0aXRsZTogbWFya2VyLm5hbWUsXG4gICAgICAgICAgICB0eXBlOiBtYXJrZXIudHlwZS5faWQsXG4gICAgICAgICAgICBpZDogbWFya2VyLl9pZCxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXJrZXIuaWNvbikge1xuICAgICAgICAgICAgbGV0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9ICdtYXJrZXInXG4gICAgICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7bWFya2VyLmljb259KWBcbiAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gJzM1cHgnXG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnMzVweCdcbiAgICAgICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzM1cHggMzVweCdcbiAgICAgICAgICAgIGNvbmZpZy5lbGVtZW50ID0gZWxcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBpZiAobWFya2VyLnR5cGUgJiYgbWFya2VyLnR5cGUuc2NhbGVkU2l6ZSkge1xuICAgICAgICAgICAgLy8gICAgIGNvbmZpZy5zY2FsZWRTaXplID0gbWFya2VyLnR5cGUuc2NhbGVkU2l6ZVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3TWFya2VyID0gbmV3IG1hcGJveGdsLk1hcmtlcihjb25maWcpXG5cbiAgICAgICAgbmV3TWFya2VyXG4gICAgICAgICAgICAuc2V0TG5nTGF0KFtcbiAgICAgICAgICAgICAgICBtYXJrZXIubG9jYXRpb24ubG5nLFxuICAgICAgICAgICAgICAgIG1hcmtlci5sb2NhdGlvbi5sYXRcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAuYWRkVG8obWFwKVxuXG4gICAgICAgIHJldHVybiBuZXdNYXJrZXJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gY3JlYXRlcyBhIGBLbWxMYXllcmAgZm9yIGFsbCBvZiB0aGUgZ292ZXJub3IgbWFwc1xuICAgICAqIHNlbGVjdGVkIEtNTCBmaWxlc1xuICAgICAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgLSBUaGUgbWFwIHRvIGFkZCB0aGUgS01MIGxheWVycyB0b1xuICAgICAqIEByZXR1cm5zIHtBcnJheX0gY29sbGVjdGlvbiBvZiBLTUwgbGF5ZXIgaW50YW5jZXNcbiAgICAgKiBAbWVtYmVyb2YgR292TWFwYm94XG4gICAgICovXG4gICAgc2V0dXBLbWxzKG1hcCkge1xuICAgICAgICBjb25zdCBrbWxMYXllcnMgPSBbXVxuICAgICAgICBsZXQgY3VycmVudExheWVyXG5cbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBrbWwgaWRzIG9uIHRoZSBtYXBcbiAgICAgICAgdGhpcy5jb25maWcua21scy5mb3JFYWNoKGN1cnJlbnRLbWwgPT4ge1xuICAgICAgICAgICAgLy8gaWYgb25lIGV4aXN0cywgY3JlYXRlIGEga21sIGxheWVyIGFuZCBhZGQgaXQgdG8gdGhlIG1hcFxuICAgICAgICAgICAgaWYgKGN1cnJlbnRLbWwpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuS21sTGF5ZXIoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGN1cnJlbnRLbWwua21sRmlsZSxcbiAgICAgICAgICAgICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgICAgICAgICAgIHByZXNlcnZlVmlld3BvcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGN1cnJlbnRLbWwubmFtZVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvLyBzdG9yZSB0aGUgbGF5ZXJcbiAgICAgICAgICAgICAgICBrbWxMYXllcnMucHVzaChjdXJyZW50TGF5ZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBrbWxMYXllcnNcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIGJ1aWxkIGEgZ29vZ2xlIG1hcHMgbWFya2VyIGZvciBlYWNoIG9mIHRoZVxuICAgICAqIG1hcmtlcnMgY29uZmlnc1xuICAgICAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgLSBUaGUgbWFwIHRvIGFkZCB0aGUgbWFya2VycyB0b1xuICAgICAqIEByZXR1cm5zIHtBcnJheX0gY29sbGVjdGlvbiBvZiBtYXJrZXIgaW50YW5jZXNcbiAgICAgKiBAbWVtYmVyb2YgR292TWFwYm94XG4gICAgICovXG4gICAgc2V0dXBNYXJrZXJzKG1hcCkge1xuICAgICAgICBjb25zdCBtYXJrZXJJbnN0YW5jZXMgPSBbXVxuICAgICAgICBsZXQgbWFya2VySW5zdGFuY2VcbiAgICAgICAgdGhpcy5jb25maWcubWFya2Vycy5mb3JFYWNoKG1hcmtlciA9PiB7XG4gICAgICAgICAgICBpZiAobWFya2VyLnNob3cpIHtcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYSBnb29nbGUgbWFwcyBtYXJrZXIgdXNpbmcgdGhlIGdvdmVybm9yIG1hcmtlciBjb25maWdcbiAgICAgICAgICAgICAgICBtYXJrZXJJbnN0YW5jZSA9IHRoaXMuYnVpbGRNYXJrZXIobWFya2VyLCBtYXApXG5cbiAgICAgICAgICAgICAgICAvLyBleHRlbmQgdGhlIGJvdW5kcyB3aXRoIHRoZSBtYXJrZXJzIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBhbGxvd3MgdXMgdG8gZml0IGFsbCB0aGUgbWFya2VycyBpbnRvIHZpZXdcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kcy5leHRlbmQobWFya2VySW5zdGFuY2UuZ2V0TG5nTGF0KCkpXG5cbiAgICAgICAgICAgICAgICAvLyBzdG9yZSB0aGUgbWFya2VyIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgbWFya2VySW5zdGFuY2VzLnB1c2gobWFya2VySW5zdGFuY2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBtYXJrZXJJbnN0YW5jZXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gU2hvdyBhbGwgbWFya2VycyB3aXRoIGNvcnJlc3BvbmRpbmcgdHlwZSBpZHNcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB2aXNpYmxlVHlwZUlkcyAtIGNvbGxlY3Rpb24gb2YgdHlwZUlkcyB0byBzaG93IG9uIHRoZSBtYXBcbiAgICAgKiBAbWVtYmVyb2YgR292TWFwYm94XG4gICAgICovXG4gICAgc2V0VmlzaWJsZU1hcmtlcnNCeVR5cGUodmlzaWJsZVR5cGVJZHMpIHtcbiAgICAgICAgY29uc3QgbmV3Qm91bmRzID0gbmV3IG1hcGJveGdsLkxuZ0xhdEJvdW5kcygpXG4gICAgICAgIGlmICh2aXNpYmxlVHlwZUlkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlckluc3RhbmNlcy5mb3JFYWNoKG1hcmtlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZpc2libGVUeXBlSWRzLmluY2x1ZGVzKG1hcmtlci50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYWRkVG8odGhpcy5fbWFwSW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgICAgIG5ld0JvdW5kcy5leHRlbmQobWFya2VyLmdldExuZ0xhdCgpLnRvQXJyYXkoKSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXIucmVtb3ZlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UuZml0Qm91bmRzKG5ld0JvdW5kcy50b0FycmF5KCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2hvdyBhbGxcbiAgICAgICAgICAgIHRoaXMuc2hvd0FsbE1hcmtlcnMoKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gU2hvdyBhbGwgdGhlIG1hcmtlcnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBtYXBcbiAgICAgKiBAbWVtYmVyb2YgR292TWFwYm94XG4gICAgICovXG4gICAgc2hvd0FsbE1hcmtlcnMoKSB7XG4gICAgICAgIHRoaXMuX21hcmtlckluc3RhbmNlcy5mb3JFYWNoKG1hcmtlciA9PiB7XG4gICAgICAgICAgICBtYXJrZXIuc2V0TWFwKHRoaXMuX21hcEluc3RhbmNlKVxuICAgICAgICB9KVxuICAgIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9