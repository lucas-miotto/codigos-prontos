<?php

add_filter('query_vars', function ($vars) {
	//!!SUPER IMPORTANT!! - always *APPEND* $vars array (NOT re-assign)
	$vars[] = 'page';
	$vars[] = 'paged';

	//!!SUPER IMPORTANT!! - always return $vars
	return $vars;
});

//paginação padrão site em WordPress.
function new_pagination($pages = '', $range = 2)
{
	$showitems = ($range * 2) + 1;

	global $paged;
	if (empty($paged)) $paged = 1;

	if ($pages == '') {
		global $wp_query;
		$pages = $wp_query->max_num_pages;
		if (!$pages) {
			$pages = 1;
		}
	}

	if (1 != $pages) {
		$string = _x('', '%1$s = current page, %2$s = all pages', 'pietergoosen');
		echo "<div class='pagination'><span>" . sprintf($string, $paged, $pages) . "</span>";
		if ($paged > 2 && $paged > $range + 1 && $showitems < $pages) echo "<a href='" . get_pagenum_link(1) . "'>" . __('&#60;', 'pietergoosen') . "</a>";

		for ($i = 1; $i <= $pages; $i++) {
			if (1 != $pages && (!($i >= $paged + $range + 1 || $i <= $paged - $range - 1) || $pages <= $showitems)) {
				echo ($paged == $i) ? "<span class=\"current\">" . $i . "</span>" : "<a href='" . get_pagenum_link($i) . "' class=\"inactive\">" . $i . "</a>";
			}
		}

		if ($paged < $pages - 1 &&  $paged + $range - 1 < $pages && $showitems < $pages) echo "<a href='" . get_pagenum_link($pages) . "'>" . __('&#62;', 'pietergoosen') . "</a>";
		echo "</div>\n";
	}
}

// codigo para realizar download com base no campo e item cadastrado.
function get_the_ebook_url()
{
	$post_id = get_the_ID();

	$args = array(
		'post_type' => 'post-type',
		'post__in' => array($post_id),
		'posts_per_page' => 1,
	);
	$loop = new WP_Query($args);
	if ($loop->have_posts()) {

		while ($loop->have_posts()) {
			$loop->the_post();
			//pegando o link: 
			$ebooks = rwmb_meta('campo-pdf', array('limit' => 1));
			$ebook = reset($ebooks);
			$url_do_ebook = $ebook['url'];
			return $url_do_ebook;
		}
	}
}

add_action('wp_footer', 'download_ebook', 200);
