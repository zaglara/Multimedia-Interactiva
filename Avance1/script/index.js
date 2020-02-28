$(document).ready(function(){
			$('.principal').show();
			$('.puntuaciones').hide();
			$('.pausa').hide();
			$('.ajustes').hide();
			$('.juego1').hide();
			$('.nivel').hide();

			$('#ind').click(function(){
				$('.principal').hide();
				$('.nivel').show();
			});

			$('.dif').click(function(){
				$('.nivel').hide();
				$('.juego1').show();
				$("body").css("background-color", "white");
			});

			$('#volver').click(function(){
				$('.nivel').hide();
				$('.principal').show();
			});

			$('#Menu').click(function(){
				$('.ajustes').hide();
				$('.principal').show();
			});

			$('#fondo').click(function(){
				if($(this).text() == "si"){
					$(this).text("no");
				}
				else{
					$(this).text("si");
				}
			});

			$('#efectos').click(function(){
				if($(this).text() == "si"){
					$(this).text("no");
				}
				else{
					$(this).text("si");
				}
			});

			$('#Punt').click(function(){
				$('.principal').hide();
				$('.puntuaciones').show();
			});

			$('#Menu2').click(function(){
				$('.puntuaciones').hide();
				$('.principal').show();
			});

			$('#salir').click(function(){
				$('.pausa').hide();
				$('.principal').show();
			});

			$('#Pausa').click(function(){
				$('.juego1').hide();
				$('.pausa').show();
				$("body").css("background-color", "#FF5733");
			});

		});