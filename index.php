<main class="main">

	<section class="banner-home cf">
		<div class="banner-slider slider">
			<?php
			$args = array(
				'post_type' => 'banner',
				'order' 		=> 'ASC',
				'orderby'		=> 'ID',
				'posts_per_page' => 6,
			);
			$loop = new WP_Query($args);
			if ($loop->have_posts()) :
				while ($loop->have_posts()) :
					$loop->the_post(); ?>

					<div class="banner-item loader">
						<a href="<?= rwmb_meta('banner-link') ?>" class="all" target="_blank">
							<?php if (rwmb_meta('banner-image')) : ?>
								<figure>
									<?php $images = rwmb_meta('banner-image', array('limit' => 1, 'size' => 'image-banner'));
									$image = reset($images);	?>
									<img data-src="<?= $image['url']; ?>">
								</figure>
							<?php else : ?>
								<div class="iframe-banner">
									<video autoplay preload="auto" muted loop>
										<?php $videos = rwmb_meta('banner-video', array('limit' => 1));
										$video = reset($videos); ?>
										<source src="<?= $video['src']; ?>" type="video/mp4">
									</video>
								</div>
							<?php endif; ?>
						</a>
					</div>

				<?php endwhile; ?>
				<?php wp_reset_postdata(); ?>
			<?php endif; ?>
		</div>
	</section>

	<section class="product-releases">
		<div class="container">
			<h3>Lançamentos</h3>
			<div class="releases-wine-list">
				<?php
				$args = array(
					'post_type' => 'produtos',
					'posts_per_page' => 16,
					'date_query' => array(
						'after' => date('Y-m-d', strtotime('-30 days'))
					)
				);
				$loop = new WP_Query($args);
				if ($loop->have_posts()) :
					while ($loop->have_posts()) :
						$loop->the_post(); ?>

						<div class="product-item">
							<div class="product-thumb loader">
								<figure>
									<?php $images = rwmb_meta('produto-imagem', array('limit' => 1, 'size' => 'thumb-produto'));
									$image = reset($images); ?>
									<img data-src="<?= $image['url']; ?>">
								</figure>
							</div>
							<div class="product-description">
								<h4><?php the_title(); ?></h4>
								<p><?php the_content(); ?></p>
							</div>
							<a href="<?php the_permalink(); ?>" class="all"></a>
						</div>

					<?php endwhile; ?>
					<?php wp_reset_postdata(); ?>
				<?php endif; ?>
			</div>
			<a href="<?= $site_url; ?>/produtos" class="btn btn-outine">
				<strong>
					Ver mais
				</strong>
			</a>
		</div>
	</section>
</main>