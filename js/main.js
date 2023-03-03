$(document).ready(function () {
	// chamada de click para menu responsivo
	$('.menu-icon').click(function () {
		$('#header').toggleClass('open-menu');
		return false;
	});

	// chamada de funcao para verificar a altura e fixar o menu
	$(window).bind('scroll', function (e) {
		var scrolly = 0;
		if (typeof (window.pageYOffset) == 'number') {
			scrolly = e.currentTarget.pageYOffset;
		} else {
			scrolly = document.documentElement.scrollTop;
		}
		scrollVerification(scrolly);
	});

	// chamada de funcao para scroll interno suave com base nos links do header;
	$('.header a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
			targetOffset = $(id).offset().top;

		$('html, body').animate({
			scrollTop: targetOffset - 88
		}, 600);
	});

	// Chamada para o slider funcionar;
	$('.testimony-slide-list').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 6000,
		infinite: false,
		dots: true,
		arrows: true,
		prevArrow: $('.arrows .prev'),
		nextArrow: $('.arrows .next'),
		speed: 400,
	});

	// chamada para o slider funcionar com responsivo;
	$('.brand-list').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		infinite: true,
		arrows: false,
		speed: 400,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
				}
			},
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 4,
				}
			},

			{
				breakpoint: 700,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 2,
				}
			},
		]
	});

	//chamada para filtrar produto com base no input de busca.
	$(".search-field").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$(".table-content -table-item").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	//chamada para modal de lgpd
	var login = getCookie("lgpd-accept-cookie");
	if (login == "accept") {
		$("#footer-lgpd").remove();
	} else {
		$("#footer-lgpd").addClass("footer-lgpd-opened");
	}

	$('#lgpd-accept').click(function () {
		$('#footer-lgpd').remove();
		createCookie("lgpd-accept-cookie", "accept", 30);
	});

	// chamada da funcao para filtrar produto com select
	$('select#sort-produtos').change(function () {
		var filter = $(this).val();
		filterList(filter);
	});

	// chamada para navegacao em lista com base no titulo clicado.
	$('.item-filters h4').click(function () {
		if (!($(this).parent().hasClass('atv'))) {
			$('.item-filters ul li').removeClass('atv');
			$(this).parent().addClass('atv');
		} else {
			$(this).parent().removeClass('atv')
		}
	});
});

// transoformar imagens em background. Basta adicionar a classe .loader no container das imagens.
function backgroundFigure() {
	var allFigures = $('.loader');

	allFigures.find('figure').each(function (index, element) {
		var it = $(this);
		var objSrc = it.find('img').data('src');
		loadingGalleryImage(it, objSrc, 'figure', 'center', 'cover');
	});
}

// funcao que faz a tranformacao em cada imagem
function loadingGalleryImage(obj, objSrc, type, position, size) {
	var IMG = new Image;
	IMG.src = objSrc;

	IMG.onload = function () {
		if (type == 'img') {
			obj.attr('src', objSrc);
		} else {
			obj.find('img').css({ 'opacity': 0 })
			obj.css({
				'background': 'url(' + objSrc + ') ' + position + ' no-repeat',
				'background-size': size
			});
		}
	}
}

// funcao para verificar a altura do scroll e adicionar classe
function scrollVerification(scrolly) {
	var scrollMax = window.innerHeight;

	if (scrolly >= scrollMax) {
		$('.main-header').addClass('scroll');
	} else {
		$('.main-header').removeClass('scroll');
	}
}

// funcão de lazyload ativada quando o usuario realizar o scroll.
function lazyload() {
	var already = false;
	window.onscroll = function () {

		// throttle
		if (already) return;
		already = true;
		setTimeout(function () {
			already = false;
		}, 200);

		// código em si
		var imgs = document.querySelectorAll('img[data-src]:not([src])');

		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].getBoundingClientRect().top < window.innerHeight + 200) {

				imgs[i].src = imgs[i].getAttribute('data-src');

			}
		}
	};
}

// script para lazyload.
var loadImages;
$(document).ready(function () {
	$(".lazy-img img").on("load", function () {
		$(this).addClass("loaded");
	});

	$(document).on("scroll", function () {
		loadImages();
	});

	(loadImages = function loadImages() {
		$.each($(".lazy-img"), function () {
			var block = $(this);
			var image = block.find("img");

			if (isOnScreen(block)) {
				var url = image.data("url");

				if (image.attr("src") != url) {
					image.attr("src", url);
				};
			}
		});
	})();
});

function isOnScreen(element) {
	var win = $(window);

	var screenTop = win.scrollTop();
	var screenBottom = screenTop + win.height();

	var elementTop = element.offset().top;
	var elementBottom = elementTop + element.height();

	return elementBottom > screenTop && elementTop < screenBottom;
}

// funcao para criar cookies no navegador
function createCookie(name, value, days) {
	var expires;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	else {
		expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";

}

// funcao para verificar se algum cookie exite com base no nome.
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

// funcao para filtrar os produtos com select
function filterList(value) {
	var list = $(".table-content .table-item");
	$(list).hide();
	if (value == "all") {
		$(".table-content").find("article").each(function (i) {
			$(this).show();
		});
	} else {
		$(".table-content").find("article[data-custom-type*=" + value + "]").each(function (i) {
			$(this).show();
		});
	}
}

//funcao para ordenar uma lista de produtos/item com base no titulo.
function sortingList() {
	$('.table-header h3').click(function () {
		var awards = $('.table-content .table-item');
		var it = $(this);
		var dataType = it.data('filter');

		if (it.hasClass('arrow-filter-down')) {
			awards.sort(sort_li).appendTo('.table-content');
			function sort_li(a, b) {
				return ($(b).data(dataType)) < ($(a).data(dataType)) ? 1 : -1;
			}
			it.addClass('arrow-filter-up');
			it.removeClass('arrow-filter-down');

		} else if (it.hasClass('arrow-filter-up')) {
			awards.sort(sort_li).appendTo('.table-content');
			function sort_li(a, b) {
				return ($(b).data(dataType)) > ($(a).data(dataType)) ? 1 : -1;
			}
			it.addClass('arrow-filter-down');
			it.removeClass('arrow-filter-up');
		}
	});
}

// funcão para navevação em abas.
function navTabs() {
	$('.nav-content li').click(function () {
		var id = $(this);
		var navListItem = $(".nav-content li");
		var dataId = id.data('index');
		var navContentItem = $(".content-item");

		navListItem.removeClass("atv");
		id.addClass("atv");
		navContentItem.removeClass("atv");

		navContentItem.each(function (index, element) {
			var it = $(this);
			if (it.data('index') === dataId) {
				it.addClass('atv');
				return false;
			}
		});
		return false;
	});
}

//chamada para filtro de produto com base na categoria/submenu.
$('.nav-filters-submenu li a').click(function () {
	var colorName = $(this).data("color");

	colorFilter(colorName);
	changeSubtitle(true, colorName);

	$('.nav-filters-submenu li a').removeClass('atv');
	$(this).addClass("atv");
	$('.filter-brand-clear .clear-filters').addClass('atv');
	$('.filter-brand-clear h4').addClass('atv');

	$('html, body').animate({
		scrollTop: $('.filter-brand-clear').offset().top
	}, 'slow');

	return false;
});

// chamada para limpar o filtro.
$('.clear-filters').click(function () {
	$('.product-list li').addClass('atv');
	$('.nav-filters-submenu li a').removeClass('atv');
	$('.clear-filters').removeClass('atv');
	$('.filter-brand-clear h4').removeClass('atv');

	return false;
});

//funcao para filtro de produto com base na categoria/submenu.
function colorFilter(colorName) {
	var allProducts = $('.product-list li');
	allProducts.removeClass('atv');

	allProducts.each(function (index, element) {
		var it = $(this);
		var spansColor = it.find('.color-name-filter');

		//adicionando suporte a mais de uma cor/filtro por produto.
		spansColor.each(function () {
			if ($(this).text() == colorName) {
				it.addClass('atv');
			}
		})
	});
}

//funcao para alterar titulo;
function changeSubtitle(filterAtv, colorName) {
	var subtitle = "";
	if (filterAtv) {
		var subtitle = "Você está vendo todos produtos da marca: " + colorName;
	}
	$(".filter-brand-clear h4").text(subtitle);
}

// funcao para colocar todos os elementos com mesmo tamanho. 
// Adicionar a chamada no window.resize para suporte responsivo.
// Agora faço com css e flexbox.
function sameHeight() {
	// preciso adicionar a class same-height no html

	var box = $('.same-height-flag .same-height');
	var finalHeight = 0;
	// reseta o height para comparação.
	$(box).height('auto');

	// faz a comparação
	$.each(box, function (i, compare) {
		if ($(compare).height() > finalHeight) {
			finalHeight = $(compare).height();
		}
	});

	// aplica o maior valor
	$.each(box, function (i, change) {
		$(change).height(finalHeight);
	});
}

//funcao para adicionar suporte ao zoom em uma galeria de imagem
function zoomGallery() {
	$('.tile')
		.on('mouseover', function () {
			$(this).children('.photo').css({
				'transform': 'scale(' + $(this).attr('data-scale') + ')'
			});
		})
		.on('mouseout', function () {
			$(this).children('.photo').css({
				'transform': 'scale(1)'
			});
		})
		.on('mousemove', function (e) {
			$(this).children('.photo').css({
				'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + '%'
			});
		})
		.each(function () {
			$(this)
				.append('<div class="photo"></div>')
				.children('.photo').css({
					'background-image': 'url(' + $(this).attr('data-image') + ')'
				});
		})
}

//funcao para carousel
function postCarousel() {
	var articlePost = $('.gallery-product figure');
	var thumb = $('.thumbs a');

	thumb.click(function () {
		var it = $(this);
		var currentThumb = it.data('index');
		moveArticle(currentThumb);
		return false;
	});

	function moveArticle(currentThumb) {
		articlePost.removeClass('atv');
		articlePost.each(function (index, element) {
			var it = $(this);
			if (it.data('index') === currentThumb) {
				it.addClass('atv');
				return false;
			}
		});
	}
}

//funcao para modulo de faq 
function faqList() {
	$('.faq-list .header-faq').click(function () {
		// verifica se tem atv, se tiver remove e sai
		if ($(this).parent().hasClass("atv")) {
			$(this).parent().removeClass('atv');
		} else {
			$('.faq-list li').removeClass('atv');
			$(this).parent().addClass('atv');
			$('html, body').animate({
				scrollTop: $(this).parent().offset().top
			}, 'slow');
		}
		return false;
	});

}

// plugin jquery para efeito de typing
(function ($) {
	function typeString($target, str, cursor, delay, cb) {
		$target.html(function (_, html) {
			return html + str[cursor];
		});

		if (cursor < str.length - 1) {
			setTimeout(function () {
				typeString($target, str, cursor + 1, delay, cb);
			}, delay);
		}
		else {
			cb();
		}
	}

	function deleteString($target, delay, cb) {
		var length;

		$target.html(function (_, html) {
			length = html.length;
			return html.substr(0, length - 1);
		});

		if (length > 1) {
			setTimeout(function () {
				deleteString($target, delay, cb);
			}, delay);
		}
		else {
			cb();
		}
	}

	$.fn.extend({
		teletype: function (opts) {
			var settings = $.extend({}, $.teletype.defaults, opts);

			return $(this).each(function () {
				(function loop($tar, idx) {
					// type
					typeString($tar, settings.text[idx], 0, settings.delay, function () {
						// delete
						setTimeout(function () {
							deleteString($tar, settings.delay, function () {
								loop($tar, (idx + 1) % settings.text.length);
							});
						}, settings.pause);
					});

				}($(this), 0));
			});
		}
	});

	// plugin defaults  
	$.extend({
		teletype: {
			defaults: {
				delay: 100,
				pause: 4000,
				text: []
			}
		}
	});
}(jQuery));

// chamada com o texto
$('#target').teletype({
	text: [
		'o seu Website',
		'o seu E-commerce',
		'a sua Hospedagem',

	]
});

// informacoes sobre o cursor.
$('#cursor').teletype({
	text: ['_', ' '],
	delay: 0,
	pause: 500
});

//funcao de login muito simples e sem nenhuma segurança.
function loginSimple() {
	var done = 0;
	var username = document.login.username.value;
	username = username.toLowerCase();
	var password = document.login.password.value;
	password = password.toLowerCase();
	if (username == "gebb" && password == "gebb123") {
		$(".login-download").remove();
		createCookie("login-feito", 1, 1);
		done = 1;
	}
	if (done == 0) {
		alert("Senha ou Usuário inválido.");
	}
}

// funcao de mascara para formularios
// Basta adicionar a classe ao campo input
function maskInputForm() {
	$('.date').mask('00/00/0000');
	$('.time').mask('00:00:00');
	$('.date_time').mask('00/00/0000 00:00:00');
	$('.cep').mask('00000-000');
	$('.phone_with_ddd_home').mask('(00) 0000-0000');
	$('.phone_with_ddd').mask('(00) 00000-0000');
	$('.phone_us').mask('(000) 000-0000');
	$('.mixed').mask('AAA 000-S0S');
	$('.ip_address').mask('099.099.099.099');
	$('.percent').mask('##0,00%', { reverse: true });
	$('.clear-if-not-match').mask("00/00/0000", { clearIfNotMatch: true });
	$('.placeholder').mask("00/00/0000", { placeholder: "__/__/____" });
	$('.fallback').mask("00r00r0000", {
		translation: {
			'r': {
				pattern: /[\/]/,
				fallback: '/'
			},
			placeholder: "__/__/____"
		}
	});

	$('.selectonfocus').mask("00/00/0000", { selectOnFocus: true });

	$('.cep_with_callback').mask('00000-000', {
		onComplete: function (cep) {
			console.log('Mask is done!:', cep);
		},
		onKeyPress: function (cep, event, currentField, options) {
			console.log('An key was pressed!:', cep, ' event: ', event, 'currentField: ', currentField.attr('class'), ' options: ', options);
		},
		onInvalid: function (val, e, field, invalid, options) {
			var error = invalid[0];
			console.log("Digit: ", error.v, " is invalid for the position: ", error.p, ". We expect something like: ", error.e);
		}
	});

	$('.crazy_cep').mask('00000-000', {
		onKeyPress: function (cep, e, field, options) {
			var masks = ['00000-000', '0-00-00-00'];
			mask = (cep.length > 7) ? masks[1] : masks[0];
			$('.crazy_cep').mask(mask, options);
		}
	});

	$('.cnpj').mask('00.000.000/0000-00', { reverse: true });
	$('.cpf').mask('000.000.000-00', { reverse: true });
	$('.rg').mask('000.000.000-0', { reverse: true });
	$('.money').mask('#.##0,00', { reverse: true });

	var SPMaskBehavior = function (val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	},
		spOptions = {
			onKeyPress: function (val, e, field, options) {
				field.mask(SPMaskBehavior.apply({}, arguments), options);
			}
		};

	$('.sp_celphones').mask(SPMaskBehavior, spOptions);

	$(".bt-mask-it").click(function () {
		$(".mask-on-div").mask("000.000.000-00");
		$(".mask-on-div").fadeOut(500).fadeIn(500)
	})

	$('pre').each(function (i, e) { hljs.highlightBlock(e) });
}