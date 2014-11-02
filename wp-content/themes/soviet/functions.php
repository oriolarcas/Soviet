<?php

defined('ABSPATH') or die("No script kiddies please!");

/**
 * Soviet theme CSS and JS scripts
 */
function soviet_scripts() {
	wp_enqueue_style( 'bootstrap', get_template_directory_uri() . '/css/bootstrap.min.css' );
	wp_enqueue_script( 'angular-core', get_template_directory_uri() . '/js/angular.js', array(), '1.3.0', true );
	wp_enqueue_script( 'angular-route', get_template_directory_uri() . '/js/angular-route.min.js', array('angular-core'), '1.3.0', true );
	wp_enqueue_script( 'angular-ui-bootstrap', get_template_directory_uri() . '/js/ui-bootstrap-tpls-0.11.0.min.js', array('angular-core'), '0.11.0', true );
	wp_enqueue_script( 'soviet', get_template_directory_uri() . '/js/soviet-core.js', array('angular-core', 'angular-ui-bootstrap'), '0.0.1', true );

	wp_localize_script( 'soviet', 'Directory', array( 'url' => get_template_directory_uri(), 'site' => get_bloginfo('wpurl')) );

	wp_localize_script( 'soviet', 'WPAPI', array(
		'url' => json_url(),
		'nonce' => wp_create_nonce('wp_json'),
		'uid' => get_current_user_id()
		) );
}

add_action( 'wp_enqueue_scripts', 'soviet_scripts' );



?>
