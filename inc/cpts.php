<?php

/*
 * 
 * 
 * CUSTOM POST TYPES. Arquivo utilizado para criar custom post no WordPress.
 * 
 * 
 */

// Register Custom Post Type Banners
function custom_banners()
{
	$description = 'Seção para cadastro de banners do site';
	$singular = 'Banner';
	$plural = 'Banners';

	$supports = array(
		'title',
		'editor'
	);

	$labels = array(
		'name'                  => $plural,
		'singular_name'         => $singular,
		'menu_name'             => $plural,
		'name_admin_bar'        => $plural,
		'archives'              => 'Arquivos do Item',
		'attributes'            => 'Atributos do Item',
		'parent_item_colon'     => 'Item pai:',
		'all_items'             => 'Todos ' . $plural,
		'add_new_item'          => 'Adicionar novo ' . $singular,
		'add_new'               => 'Adicionar novo',
		'new_item'              => 'Adicionar ' . $singular,
		'edit_item'             => 'Editar ' . $singular,
		'update_item'           => 'Atualizar ' . $singular,
		'view_item'             => 'Visualizar ' . $singular,
		'view_items'            => 'Visualizar ' . $plural,
		'search_items'          => 'Procurar ' . $singular,
		'not_found'             => 'Nenhum ' . $singular . ' cadastrado',
		'not_found_in_trash'    => 'Nenhum ' . $singular . ' na lixeira',
		'featured_image'        => 'Imagem em destaque',
		'set_featured_image'    => 'Selecionar imagem em destaque',
		'remove_featured_image' => 'Remover imagem em destaque',
		'use_featured_image'    => 'Usar imagem em destaque',
		'insert_into_item'      => 'Inserir no item',
		'uploaded_to_this_item' => 'Atualizar este ' . $singular,
		'items_list'            => 'Lista de item',
		'items_list_navigation' => 'Navegação de lista dos itens',
		'filter_items_list'     => 'Filtrar lista de itens',
	);

	$args = array(
		'label'                 => $singular,
		'description'           => $description,
		'labels'                => $labels,
		'supports'              => $supports,
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-cart',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'rewrite'               => true,
		'capability_type'       => 'post',
	);
	register_post_type('banner', $args);
}
add_action('init', 'custom_banners', 0);

// Register Custom Post Type produtos
function custom_products()
{
	$description = 'Seção para cadastro de produtos';
	$singular = 'Produto';
	$plural = 'Produtos';

	$supports = array(
		'title',
		'editor'
	);

	$labels = array(
		'name'                  => $plural,
		'singular_name'         => $singular,
		'menu_name'             => $plural,
		'name_admin_bar'        => $plural,
		'archives'              => 'Arquivos do Item',
		'attributes'            => 'Atributos do Item',
		'parent_item_colon'     => 'Item pai:',
		'all_items'             => 'Todos ' . $plural,
		'add_new_item'          => 'Adicionar novo ' . $singular,
		'add_new'               => 'Adicionar novo',
		'new_item'              => 'Adicionar ' . $singular,
		'edit_item'             => 'Editar ' . $singular,
		'update_item'           => 'Atualizar ' . $singular,
		'view_item'             => 'Visualizar ' . $singular,
		'view_items'            => 'Visualizar ' . $plural,
		'search_items'          => 'Procurar ' . $singular,
		'not_found'             => 'Nenhum ' . $singular . ' cadastrado',
		'not_found_in_trash'    => 'Nenhum ' . $singular . ' na lixeira',
		'featured_image'        => 'Imagem em destaque',
		'set_featured_image'    => 'Selecionar imagem em destaque',
		'remove_featured_image' => 'Remover imagem em destaque',
		'use_featured_image'    => 'Usar imagem em destaque',
		'insert_into_item'      => 'Inserir no item',
		'uploaded_to_this_item' => 'Atualizar este ' . $singular,
		'items_list'            => 'Lista de item',
		'items_list_navigation' => 'Navegação de lista dos itens',
		'filter_items_list'     => 'Filtrar lista de itens',
	);

	$args = array(
		'label'                 => $singular,
		'description'           => $description,
		'labels'                => $labels,
		'supports'              => $supports,
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-cart',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'rewrite'               => true,
		'capability_type'       => 'post',
	);
	register_post_type('produtos', $args);
}
add_action('init', 'custom_products', 0);
