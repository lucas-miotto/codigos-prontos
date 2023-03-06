<?php

/*
 * 
 * 
 * METABOXES. Arquivo utilizado para criar os campos persinalizados.
 * 
 * 
 */
function banner_info_meta_box($meta_boxes)
{
	$prefix = 'banner-';

	$meta_boxes[] = [
		'id' => 'banner-info',
		'title' => esc_html__('Informações do Banner', ''),
		'post_types' => array('banner'),
		'context' => 'after_editor',
		'priority' => 'default',
		'autosave' => 'false',
		'fields'  => [
			[
				'id'   => $prefix . 'link',
				'type' => 'url',
				'name' => esc_html__('Link do banner', ''),
				'size' => 60,
			],
			[
				'id'   => $prefix . 'image',
				'type' => 'image_advanced',
				'name' => esc_html__('Imagem do banner desktop', ' '),
				'desc' => esc_html__('Tamanho recomendado: 1920px de largura e 500px de altura', ''),
				'max_file_uploads' => 1,
			],
			[
				'type' => 'video',
				'name' => esc_html__('Video exibido no banner desktop', ''),
				'id'   => $prefix . 'video',
				'desc' => esc_html__('Arquivo para o vídeo no banner', ''),
				'max_file_uploads' => 1,
			],
			[
				'id'   => $prefix . 'image-mobile',
				'type' => 'image_advanced',
				'name' => esc_html__('Imagem do banner mobile', ''),
				'desc' => esc_html__('', ' '),
				'max_file_uploads' => 1,
			],
			[
				'id' 	 => $prefix . 'video-mobile',
				'type' => 'video',
				'name' => esc_html__('Video exibido no banner mobile', ''),
				'desc' => esc_html__('Arquivo para o vídeo no banner', ''),
				'max_file_uploads' => 1,
			],
		],
	];

	return $meta_boxes;
}
add_filter('rwmb_meta_boxes', 'banner_info_meta_box');

function product_info_meta_box($meta_boxes)
{
	$prefix = 'produto-';

	$meta_boxes[] = [
		'id' => 'product_info_meta_box',
		'title' => esc_html__('Caracteristicas do produto', 'product_info_meta_box'),
		'post_types' => array('produtos'),
		'context' => 'after_editor',
		'priority' => 'default',
		'autosave' => 'false',
		'fields'  => [
			[
				'id'   => $prefix . 'imagem',
				'type' => 'image_advanced',
				'name' => esc_html__('Imagem do produto', ''),
				'max_file_uploads' => '1',
			],
			[
				'type' => 'heading',
				'name' => esc_html__('Informações detalhadas sobre o produto', ''),
			],
			[
				'id' 	 => $prefix . 'descricao',
				'type' => 'textarea',
				'name' => esc_html__('Descrição completa do produto', ''),
				'placeholder' => esc_html__('Descrição completa do produto', ''),
			],
			[
				'id' 	 => $prefix . 'resumo',
				'type' => 'text',
				'name' => esc_html__('Resumo do produto', ''),
				'placeholder' => esc_html__('Resumo do produto', ''),
			],
		],
	];

	return $meta_boxes;
}
add_filter('rwmb_meta_boxes', 'product_info_meta_box');
