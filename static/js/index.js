$(document).ready(function() {
	var Plan = {
		
		// object cache
		cache : {
			loading : $('.loading-svg'),
			legsListing : $('.legs-listing')
		},

		config : {
			getUrl : '/api/phases'
		},

		// initialize functionality
		init : function () {
			var self = this;

			self.initClickEvents();
		},

		initClickEvents : function () {
			var self = this;
		},

		getPhases : function() {
			var self = this;

			var data = {};

			var xhr = $.ajax({
				url : self.config.getUrl,
				data : data,
				dataType: 'json'
			});

			xhr.success(function(data) {
				var phases = data;
				console.log(phases);

				if (phases.length <= 0){
					//no phases 
				}

				var count = 1;
				$.each(phases, function(index, val) {
					var phase = val;

					var	$leg = $('<li class="leg panel panel-default" data-id="'+phase.id+'"></li>'),
						$legHeader = $('<div class="leg-header panel-heading col-md-12"><div class="header col-md-9">Leg <span class="leg-number">'+count+'</span> - '+phase.name+'</div></div>'),
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

				self.cache.legsListing.sortable({
					start: function(event, ui) {
						var start_pos = ui.item.index();
				        ui.item.data('start_pos', start_pos);
					},
					stop: function(event, ui) {
						var start_pos = ui.item.data('start_pos');
						var new_pos = ui.item.index();

						$.each($('.legs-listing').children('.leg'), function(index, val) {
							$(this).find('.leg-number').html(index+1);
						});

						if($('.update-order-btn').length <= 0) {
							console.log('adding button');
						
							var $btn = $('<button class="update-order-btn btn-danger">Update Order</button>');
							$('.voyages-body').prepend($btn);	

							//click event for updating
							$btn.on('click', function() {
								alert('updating sort');
								self.updateSort();
							});	
						}
					}
				});

				self.cache.loading.fadeOut(1000, function() {
					self.cache.legsListing.fadeIn(1000);
				});

				
			});

			xhr.fail(function(jqXHR, textStatus, errorThrown) {
				alert('api error');
			});
		},

		updateSort : function() {
			var data = {};
			
			$.each($('.legs-listing').children('.leg'), function(index, val) {
				var id = $(this).attr('data-id');
				data.id = index+1;
			});
			console.log(data);
			return false;
		}
	};

	Plan.init();
	Plan.getPhases();
});
