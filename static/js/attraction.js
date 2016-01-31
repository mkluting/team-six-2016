$(document).ready(function() {
	var Attraction = {
		
		// object cache
		cache : {
		},

		config : {
			getUrl : '/api/attractions',
		},

		// initialize functionality
		init : function () {
			var self = this;

			self.initClickEvents();
		},

		initClickEvents : function () {
			var self = this;

			$('.arrival-date').datepicker();
		},

		getAttractions : function() {
			var self = this;

			var data = {};

			data.destination_id = 7;

			var xhr = $.ajax({
				url : self.config.getUrl,
				data : data,
				dataType: 'json'
			});

			xhr.success(function(data) {
				var attrs = data;

				console.log(attrs);
				if (attrs.length <= 0){
					//no phases 
					console.log(attrs);
				}

				/*
				var count = 1;
				$.each(phases, function(index, val) {
					var phase = val;
					console.log(phase);

					var	$leg = $('<li class="leg panel panel-default" data-id="'+phase.id+'"></li>'),
						$legHeader = $('<div class="leg-header panel-heading col-md-12"><div class="header col-md-9">Leg <span class="leg-number">'+count+'</span> - <span class="leg-name">'+phase.name+'</span></div></div>'),
						$actions = $('<div class="leg-header-actions col-pull-right col-md-3"></div>'),
						$addDestination = $('<button class="btn btn-primary add-destionation">Add Destination</button>'),
						$deleteLeg = $('<button class="btn btn-warning delete-leg">X</div>'),
						$legBody = $('<div class="leg-body panel-body"></div>');

					$actions.append($addDestination);
					$actions.append($deleteLeg);
					$legHeader.append($actions);
					$leg.append($legHeader);
					$leg.append($legBody);
					
					self.cache.legsListing.append($leg);
					count++;
				});
				*/
			});

			xhr.fail(function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
				console.log(errorThrown);
			});
		}
	};

	Attraction.init();
	Attraction.getAttractions();
});
