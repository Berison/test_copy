;(function($, window, document) {
	$(document).ready(function() {
		var win = jQuery(window);
		var boxes = jQuery('#gp-map');
		var activeClass = 'inited';
		var scrollTop, winHeight;

		function scrollHandler() {
			scrollTop = win.scrollTop();

			boxes.each(function() {
				var box = jQuery(this);

                if (box.data('height') <= winHeight) {
    				if (scrollTop + winHeight >= box.data('offset') + box.data('height')) {
    					if (!box.hasClass(activeClass)) {
    					    initializeMapData();
    					    box.addClass(activeClass);
    					}
    				}
                } else {
                    if (scrollTop + winHeight >= box.data('offset') + winHeight / 2) {
    					if (!box.hasClass(activeClass)) {
    					    initializeMapData();
    					    box.addClass(activeClass);
    					}
    				}
                }
			});
		}

		function resizeHandler() {
			winHeight = getWindowHeight();
			boxes = boxes.not('.' + activeClass);

			boxes.each(function() {
				var box = jQuery(this);

				box.data({
					offset: box.offset().top,
					height: box.outerHeight()
				});
			});

			scrollHandler();
		}

		function getWindowHeight() {
			return typeof window.innerHeight === 'number' ? window.innerHeight : document.documentElement.clientHeight;
		}

		resizeHandler();
		win.on('load resize orientationchange', resizeHandler).on('scroll', scrollHandler);

		window.setTimeout(function() {
			if (new Boolean(document.querySelector('.gm-style'))) {
				// do nothing
			} else {
				$('#explore-section').remove()
			}
		});
	});

	function isValidMapId(mapId) {
		return mapId && mapId.length === 24;
	}

	function initializeMapData() {
		var map = $('#gp-map');
		var mapId = map.data('map-id');
		var markerTypes = {};
		var endPoint;
		var mapInstance;

		var geoData = {
		    "type": "FeatureCollection",
		    features: []
		}

		if (isValidMapId(mapId)) {
			endPoint = 'https://data.governor.io/api/maps/' + mapId;

			// get the map data
			$.getJSON(endPoint).done(function(mapData) {
				// tell the map to zoom to fit all markers
				// mapData.mapObj.fitBounds = true;
				mapData.mapObj.customPopup = 'popup-tmpl';
				
				geoData.features = mapData.mapObj.markers;

				// build the map
				mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JlYXRwYXJrcyIsImEiOiJjamxlMTdla2IwaDZvM2twYTRpNmY1d3prIn0.SAEBoskIX1eZCwvL2Y3Bqw';
				mapInstance = new GovMapbox.GovMapbox('#gp-map', mapData.mapObj);

				// mapInstance = new GovMapbox.GovMapbox('#gp-map', {
    //                 center: mapData.mapObj.center,
    //                 markers: [],
    //                 zoom: mapData.mapObj.zoom
				// });
				
				window.mapInstance = mapInstance;
				// setup the filters
				// get the active filters from the map
				// setupFilters(mapInstance);
				setupButtonFilters(mapInstance);
				initMapButtonTooltips();

				// disable scroll to zoom and add controls ui
				mapInstance._mapInstance.scrollZoom.disable();
				mapInstance._mapInstance.addControl(new mapboxgl.NavigationControl());
				
				mapInstance._mapInstance.on('load', function() {
				    return
				    console.log(geoData);
				    
				    mapInstance._mapInstance.addSource('markers', {
                    	type: 'geojson',
                    	data: geoData,
                    	cluster: true,
                    	clusterMaxZoom: 14,
                    	clusterRadius: 50
                    });

    				mapInstance._mapInstance.addLayer({
                        id: 'clusters',
                        type: 'circle',
                        source: 'markers',
                        filter: ['has', 'point_count'],
                        paint: {
                            'circle-color': [
                                'step',
                                ['get', 'point_count'],
                                '#51bbd6',
                                100,
                                '#f1f075',
                                750,
                                '#f28cb1'
                                ],
                                'circle-radius': [
                                'step',
                                ['get', 'point_count'],
                                20,
                                100,
                                30,
                                750,
                                40
                            ]
                        }
                    });
                    
                    mapInstance._mapInstance.addLayer({
                    	id: 'cluster-count',
                    	type: 'symbol',
                    	source: 'markers',
                    	filter: ['has', 'point_count'],
                    	layout: {
                    		'text-field': '{point_count_abbreviated}',
                    		'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    		'text-size': 12
                    	}
                    });
                    
                    mapInstance._mapInstance.addLayer({
                    	id: 'unclustered-point',
                    	type: 'circle',
                    	source: 'markers',
                    	filter: ['!', ['has', 'point_count']],
                    	paint: {
                    		'circle-color': '#11b4da',
                    		'circle-radius': 4,
                    		'circle-stroke-width': 1,
                    		'circle-stroke-color': '#fff'
                    	}
                    });
				
    				// inspect a cluster on click
                    // mapInstance._mapInstance.on('click', 'clusters', function(e) {
                    // 	var features = mapInstance._mapInstance.queryRenderedFeatures(e.point, {
                    // 		layers: ['clusters']
                    // 	});
                    	
                    // 	var clusterId = features[0].properties.cluster_id;
                    	
                    // 	mapInstance._mapInstance.getSource('markers').getClusterExpansionZoom(
                    // 		clusterId,
                    // 		function(err, zoom) {
                    // 			if (err) return;
                    
                    // 			mapInstance._mapInstance.easeTo({
                    // 				center: features[0].geometry.coordinates,
                    // 				zoom: zoom
                    // 			});
                    // 		}
                    // 	);
                    // });
                    
                    // When a click event occurs on a feature in
                    // the unclustered-point layer, open a popup at
                    // the location of the feature, with
                    // description HTML from its properties.
                    // mapInstance._mapInstance.on('click', 'unclustered-point', function(e) {
                    // 	var coordinates = e.features[0].geometry.coordinates.slice();
                    // 	var mag = e.features[0].properties.mag;
                    // 	var tsunami;
                    
                    // 	if (e.features[0].properties.tsunami === 1) {
                    // 		tsunami = 'yes';
                    // 	} else {
                    // 		tsunami = 'no';
                    // 	}
                    
                    // 	// Ensure that if the map is zoomed out such that
                    // 	// multiple copies of the feature are visible, the
                    // 	// popup appears over the copy being pointed to.
                    // 	while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    // 		coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    // 	}
                    
                    // 	new mapboxgl.Popup()
                    // 		.setLngLat(coordinates)
                    // 		.setHTML(
                    // 			'magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami
                    // 		)
                    // 		.addTo(mapInstance._mapInstance);
                    // });
                    
                    // mapInstance._mapInstance.on('mouseenter', 'clusters', function() {
                    // 	mapInstance._mapInstance.getCanvas().style.cursor = 'pointer';
                    // });
                    
                    // mapInstance._mapInstance.on('mouseleave', 'clusters', function() {
                    // 	mapInstance._mapInstance.getCanvas().style.cursor = '';
                    // });
				});
			}).fail(function(err) {
				console.error(err);
			});
		}
	}

	function setupFilters(mapInstance) {
		var filters = mapInstance.getMarkerTypes();
		var currentFilterElement;
		var filterContainer = $('#activities');
		var activeFilters = [];

		// loop over them and create an element for each one
		$.each(filters, function(i, filter) {
			currentFilterElement = $('<li></li>');
			currentFilterElement.attr({
				'data-type-id': filter._id,
				'data-active': false
			});

			currentFilterElement.html(
				[
					'<a href="#">',
					'<img style="height: 30px;" src="' + filter.icon + '"/>',
					filter.name,
					'</a>'
				].join('')
			);

			filterContainer.append(currentFilterElement);
		});

		$('#close-filters').on('click', function() {
			//set up the visible markers
			mapInstance.setVisibleMarkersByType(activeFilters);
		})

		// watch for clicks on the filters
		filterContainer.on('click', 'li', function() {
			var $el = $(this);
			var typeId = $el.data('type-id');
			var activeTypeIndex = activeFilters.indexOf(typeId);

			// check if the typeId is currently active
			if (activeTypeIndex > -1) {
				// remove from active filters
				activeFilters.splice(activeTypeIndex, 1);
				$el.attr('data-active', false);
			} else {
				// add to active filters
				activeFilters.push(typeId);
				$el.attr('data-active', true);
			}
		})
	}
	function showAllLayers(mapInstance) {
		var $this;
		var currentName;
		var currentKmlLayer;

		$('#map-slider div')
			.each(function() {
				$this = $(this);
				currentName = $this.data('name');

				// if there is a name format it
				if (currentName && currentName.length) {
					currentName = currentName.toLowerCase().replace(' ', '-')
				}

				// grab the kml layer
				currentKmlLayer = mapInstance._mapInstance.getLayer(currentName);

				// if it exists, show it
				if (currentKmlLayer) {
					mapInstance._mapInstance.setLayoutProperty(currentKmlLayer.id, 'visibility', 'visible')
				}

				// set the elements data attr to true
				$this.attr('data-active', true);
			});
	}

	function hideAllLayers(mapInstance) {

		var $this;
		var currentName;
		var currentKmlLayer;

		$('#map-slider div')
			.each(function() {
				$this = $(this);
				currentName = $this.data('name');

				// if there is a name format it
				if (currentName && currentName.length) {
					currentName = currentName.toLowerCase().replace(' ', '-')
				}

				// grab the kml layer
				currentKmlLayer = mapInstance._mapInstance.getLayer(currentName);

				// if it exists, hide it
				if (currentKmlLayer) {
					mapInstance._mapInstance.setLayoutProperty(currentKmlLayer.id, 'visibility', 'none')
				}

				// set the elements data attr to false
				$this.attr('data-active', false);
			});
	}

	function setupButtonFilters(mapInstance) {
		var filters = mapInstance.getMarkerTypes();
		var kmlLayers = mapInstance._kmlLayers;
		var currentFilterElement;
		var filterContainer = $('#map-slider');
		var allFilterIds = [];
		var activeFilter = null;
		var activeFilters = [];
		var $img;

		// loop over them and create an element for each one
		$.each(filters, function(i, filter) {
			allFilterIds.push(filter._id);

			activeFilters.push(filter._id);
			currentFilterElement = $('<div></div>');
			currentFilterElement.attr({
				'data-type-id': filter._id,
				'data-active': true,
				'data-name': filter.name.toLowerCase().replace(' ', '-') + 's'
			});

			$img = $('<img>')

			$img
				.attr({
					src: filter.icon,
					alt: filter.name,
					title: filter.name
				})

			currentFilterElement.html(
				$img
			);

			filterContainer.append(currentFilterElement);
		});

		jQuery('.maps-slider').slick({
			slidesToShow: 13,
			responsive: [{
				breakpoint: 1023,
				settings: {
					slidesToShow: 10
				}
			}, {
				breakpoint: 767,
				settings: {
					slidesToShow: 6
				}
			}]
		});
		
		jQuery('.maps-slider').find('.slick-arrow').addClass('btn-outline');

		// watch for clicks on the filters
		filterContainer.on('click', 'div', function() {

			var $el = $(this);
			var typeId = $el.data('type-id');
			var name = $el.data('name').toLowerCase().replace(' ', '-');
			var activeTypeIndex = activeFilters.indexOf(typeId);
			var kmlLayer = mapInstance._mapInstance.getLayer(name);

			// check if the clicked element is the current active filter
			if (typeId === activeFilter) {
				// show all filters
				allFilterIds.forEach(function(filterId) {
					mapInstance.showMarkersByType(filterId);
				});
				// set all of the filter buttons to active
				showAllLayers(mapInstance);
				activeFilter = null;

			} else {
				if (activeFilter) {
					// hide the current active filter
					mapInstance.hideMarkersByType(activeFilter);

					// deactivate the current filter element 
					filterContainer.find('[data-type-id=' + activeFilter + ']').attr('data-active', false);

					// if the filter has an associated layer, hide that also
				} else {
					// hide all other filters
					allFilterIds.forEach(function(filterId) {
						mapInstance.hideMarkersByType(filterId);
					});

				}

				hideAllLayers(mapInstance);
				// show the clicked filter
				mapInstance.showMarkersByType(typeId);

				// activate the clicked filter element 
				$el.attr('data-active', true);

				if (kmlLayer) {
					mapInstance._mapInstance.setLayoutProperty(kmlLayer.id, 'visibility', 'visible')
				}

				// update the active filter
				activeFilter = typeId;
			}

			// // check if the typeId is currently active
			// if (activeTypeIndex > -1) {
			//     // hide
			//     mapInstance.hideMarkersByType(typeId)
			//     // remove from active filters
			//     activeFilters.splice(activeTypeIndex, 1);
			//     $el.attr('data-active', false);

			//     if (kmlLayer) {
			//         mapInstance._mapInstance.setLayoutProperty(kmlLayer.id, 'visibility', 'none')
			//     }
			//     // hide kml layer if exists
			//     // if (kmlLayer) {
			//     //     kmlLayer.setMap(null)
			//     // }
			// } else {
			//     // show
			//     mapInstance.showMarkersByType(typeId)
			//     // add to active filters
			//     activeFilters.push(typeId);
			//     $el.attr('data-active', true);

			//     if (kmlLayer) {
			//         mapInstance._mapInstance.setLayoutProperty(kmlLayer.id, 'visibility', 'visible')
			//     }

			//     // if (kmlLayer) {
			//     //     kmlLayer.setMap(mapInstance._mapInstance)
			//     // }
			// }
		})
	}

	function getLayerNames(layer) {
		return layer.name.toLowerCase().replace(' ', '-');
	}

	// function setupButtonFilters(mapInstance) {
	//     var filters = mapInstance.getMarkerTypes();
	//     var currentFilterElement;
	//     var filterContainer = $('#map-slider');
	//     var activeFilters = [];
	//     var $img;
	//     // loop over them and create an element for each one
	//     $.each(filters, function (i, filter) {
	//         activeFilters.push(filter._id);
	//         currentFilterElement = $('<div></div>');
	//         currentFilterElement.attr({
	//             'data-type-id': filter._id,
	//             'data-active': true,
	//         });

	//         $img = $('<img>')

	//         $img
	//             .attr({
	//                 src: filter.icon,
	//                 alt: filter.name,
	//                 title: filter.name
	//             })

	//         currentFilterElement.html(
	//             $img
	//         );

	//         filterContainer.append(currentFilterElement);
	//     });

	//     jQuery('.maps-slider').slick({
	//         slidesToShow: 13,
	//         responsive: [{
	//             breakpoint: 1023,
	//             settings: {
	//                 slidesToShow: 10
	//             }
	//         }, {
	//             breakpoint: 767,
	//             settings: {
	//                 slidesToShow: 6
	//             }
	//         }]
	//     });

	//     // watch for clicks on the filters
	//     filterContainer.on('click', 'div', function () {
	//         var $el = $(this);
	//         var typeId = $el.data('type-id');
	//         var activeTypeIndex = activeFilters.indexOf(typeId);

	//         // check if the typeId is currently active
	//         if (activeTypeIndex > -1) {
	//             // hide
	//             mapInstance.hideMarkersByType(typeId)
	//             // remove from active filters
	//             activeFilters.splice(activeTypeIndex, 1);
	//             $el.attr('data-active', false);
	//         } else {
	//             // show
	//             mapInstance.showMarkersByType(typeId)
	//             // add to active filters
	//             activeFilters.push(typeId);
	//             $el.attr('data-active', true);
	//         }
	//     })
	// }

	function setupDownloadButton() {
		$("#download-map").click(function() {
			var element = $('#gp-map').get(0);
			html2canvas(element)
				.then(function(canvas) {
					// Convert and download as image 
					Canvas2Image.saveAsPNG(canvas);
				});
		});
	}

	// greatparks map button tooltip testing
	function initMapButtonTooltips() {
		var $template;
		var title;
		var $this;
		var position;

		// setup the mouse event
		$('.maps-slider').on('mouseover', 'img', function() {
			// the element
			$this = $(this)

			// the title
			title = $this.attr('title')

			// where to put the tooltip
			position = calcTooltipPosition($this);

			// the tooltip element
			$template = $(buildTooltipTemplate(title));

			// add the tooltip to the body
			$('body').append($template);

			// update the tooltips position and fade it in
			$template
				.css({
					top: position.top - $template.height() * 3.5,
					left: position.left - $template.width() / 1.8,
				})
				.fadeIn();

		})

		// when the mouse leaves the button
		$('.maps-slider').on('mouseleave', 'img', function() {
			// if a tooltip is active remove it
			if ($template) {
				$template.remove();
				$template = null;
			}
		})
	}

	function buildTooltipTemplate(title) {
		var template = [
			'<div class="gp-tooltip">',
			title,
			'</div>'
		];

		return template.join('');
	}

	function calcTooltipPosition($baseElement) {
		var offset = $baseElement.offset();

		// get the center point for the element
		var center = {
			left: offset.left + $baseElement.width() / 2,
			top: offset.top + ($baseElement.height() / 2)
		};

		return center;
	}
})(jQuery, window, document);